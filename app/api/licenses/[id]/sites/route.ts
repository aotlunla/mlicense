import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const sites = await prisma.registeredSite.findMany({
            where: { licenseId: id },
            orderBy: { lastCheckedAt: 'desc' },
        });

        return NextResponse.json(sites);
    } catch (error) {
        console.error('Fetch sites error:', error);
        return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 });
    }
}
