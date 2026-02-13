import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const count = await prisma.admin.count();
        return NextResponse.json({ installed: count > 0 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to check installation status' }, { status: 500 });
    }
}
