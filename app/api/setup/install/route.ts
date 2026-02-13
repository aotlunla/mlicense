import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        const count = await prisma.admin.count();

        // Security check: Only allow if count is 0 OR if we implement a "force re-install" with auth check.
        // For simplicity and per user request to "force install", we might allow it if we authenticate the request 
        // OR we just create a new admin/update existing (since the user asked to "force install new").

        // Strategy:
        // If count == 0, create new.
        // If count > 0, we should ensure this request comes from an authenticated source OR we treat it as a reset if using a specific secret?
        // User said: "force install... by going to admin page and adding menu". This implies the user is already logged in as admin to force it.
        // But if they are locked out, they can't login.
        // The wizard is open at /install. If anyone can access /install when system is installed, they could overwrite admin.
        // WE MUST PROTECT THIS.
        // However, the user specifically asked for "force install" via admin menu.
        // Implementation:
        // 1. If count == 0, allow.
        // 2. If count > 0, check for admin_token cookie.

        if (count > 0) {
            const cookieStore = await cookies();
            const token = cookieStore.get('admin_token');
            if (!token) {
                return NextResponse.json({ error: 'System is already installed. Login to re-install.' }, { status: 403 });
            }
            // If logged in, we update the EXISTING admin (or delete all and create new). 
            // Let's delete all and create new to be "fresh".
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
