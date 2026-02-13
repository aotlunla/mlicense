import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: List all licenses
export async function GET() {
  try {
    const licenses = await prisma.license.findMany({
      include: {
        _count: {
          select: { sites: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(licenses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch licenses' }, { status: 500 });
  }
}

// POST: Create a new license
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, maxSites, validFrom, validUntil } = body;

    if (!key || !maxSites || !validFrom || !validUntil) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const license = await prisma.license.create({
      data: {
        key,
        maxSites: parseInt(maxSites),
        validFrom: new Date(validFrom),
        validUntil: new Date(validUntil),
      },
    });

    return NextResponse.json(license);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create license' }, { status: 500 });
  }
}
