import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-this';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        const count = await prisma.admin.count();

        // If system is already installed, require an authenticated admin session to re-install/reset
        if (count > 0) {
            const cookieStore = await cookies();
            const token = cookieStore.get('admin_token')?.value;
            if (!token) {
                return NextResponse.json({ error: 'System is already installed. Login to re-install.' }, { status: 403 });
            }

            try {
                const secret = new TextEncoder().encode(JWT_SECRET);
                await jwtVerify(token, secret);
            } catch {
                return NextResponse.json({ error: 'Invalid or expired session. Login to re-install.' }, { status: 403 });
            }

            // Authenticated admin: wipe and recreate fresh
            await prisma.admin.deleteMany();
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await prisma.admin.create({
            data: {
                username,
                passwordHash,
            },
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Install error:', error);
        return NextResponse.json({ error: 'Failed to install' }, { status: 500 });
    }
}
