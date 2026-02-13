import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        const site = await prisma.registeredSite.update({
            where: { id },
            data: { url },
        });

        return NextResponse.json(site);
    } catch (error) {
        console.error('Update site error:', error);
        return NextResponse.json({ error: 'Failed to update site' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await prisma.registeredSite.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete site error:', error);
        return NextResponse.json({ error: 'Failed to delete site' }, { status: 500 });
    }
}
