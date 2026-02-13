import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-this';

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Protect /sys-admin routes
    if (path.startsWith('/sys-admin')) {
        const token = req.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/sys-login', req.url));
        }

        try {
            const secret = new TextEncoder().encode(JWT_SECRET);
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/sys-login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/sys-admin/:path*'],
};
