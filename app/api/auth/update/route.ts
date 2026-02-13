import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { username, password } = body;

        // Basic validation
        if (!username && !password) {
            return NextResponse.json({ error: 'No changes provided' }, { status: 400 });
        }

        // Find the first admin (single admin system for now)
        const admin = await prisma.admin.findFirst();

        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        const data: any = {};
        if (username) data.username = username;
        if (password) {
            data.passwordHash = await bcrypt.hash(password, 10);
        }

        await prisma.admin.update({
            where: { id: admin.id },
            data,
        });

        // If successful, we might want to verify headers or just return success.
        // The client will handle logout/redirect.

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Update settings error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
