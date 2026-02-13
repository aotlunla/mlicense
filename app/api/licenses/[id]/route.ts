import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { maxSites, validUntil, isActive } = body;

        const license = await prisma.license.update({
            where: { id },
            data: {
                maxSites: maxSites !== undefined ? parseInt(maxSites) : undefined,
                validUntil: validUntil ? new Date(validUntil) : undefined,
                isActive: isActive !== undefined ? isActive : undefined,
            },
        });

        return NextResponse.json(license);
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update license' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await prisma.license.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete license' }, { status: 500 });
    }
}
