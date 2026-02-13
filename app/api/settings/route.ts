import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-this';

async function verifyAuth(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return false;
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        await jwtVerify(token, secret);
        return true;
    } catch {
        return false;
    }
}

export async function GET() {
    try {
        let config = await prisma.systemConfig.findUnique({ where: { id: 'default' } });
        if (!config) {
            config = await prisma.systemConfig.create({
                data: { id: 'default', contactUrl: 'mailto:support@example.com' }
            });
        }
        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!(await verifyAuth(req))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { contactUrl } = body;

        const config = await prisma.systemConfig.upsert({
            where: { id: 'default' },
            update: { contactUrl },
            create: { id: 'default', contactUrl },
        });

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
