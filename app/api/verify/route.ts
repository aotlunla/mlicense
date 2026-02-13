import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cors } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const body = await req.json();
    const { key, url } = body;

    if (!url) {
        return cors(NextResponse.json({ valid: false, message: 'กรุณาระบุ URL' }, { status: 400 }));
    }

    // Normalize URL to origin (protocol + host) to ignore paths/slugs
    let normalizedUrl = url.trim();
    try {
        const urlObj = new URL(normalizedUrl);
        normalizedUrl = urlObj.origin;
    } catch (e) {
        console.warn('Invalid URL provided, using as-is:', normalizedUrl);
    }

    // SCENARIO 1: Key is provided -> Standard Verification
    if (key) {
        const license = await prisma.license.findUnique({
            where: { key },
            include: { sites: true },
        });

        if (!license) {
            return cors(NextResponse.json({ valid: false, message: 'ไม่พบรหัสใบอนุญาตนี้' }));
        }

        if (!license.isActive) {
            return cors(NextResponse.json({ valid: false, message: 'ใบอนุญาตนี้ถูกระงับการใช้งาน' }));
        }

        if (new Date() > new Date(license.validUntil)) {
            return cors(NextResponse.json({ valid: false, message: 'ใบอนุญาตนี้หมดอายุแล้ว' }));
        }

        if (new Date() < new Date(license.validFrom)) {
            return cors(NextResponse.json({ valid: false, message: 'ใบอนุญาตนี้ยังไม่ถึงกำหนดเริ่มใช้งาน' }));
        }

        // 4. Check if URL is registered
        const existingSite = license.sites.find((site) => site.url === normalizedUrl);

        if (existingSite) {
            // Already registered - Just update checked time
            await prisma.registeredSite.update({
                where: { id: existingSite.id },
                data: { lastCheckedAt: new Date() },
            });
            return cors(NextResponse.json({ valid: true, message: 'ใบอนุญาตถูกต้อง (Updated)' }));
        }

        // 5. Check limits
        if (license.sites.length >= license.maxSites) {
            return cors(NextResponse.json({ valid: false, message: `สิทธิ์การใช้งานเต็มแล้ว (${license.sites.length}/${license.maxSites})` }));
        }

        // 6. Register new site
        await prisma.registeredSite.create({
            data: {
                licenseId: license.id,
                url: normalizedUrl, // Use normalized origin URL
                lastCheckedAt: new Date(),
            },
        });

        return cors(NextResponse.json({ valid: true, message: 'ลงทะเบียนเว็บไซต์เรียบร้อยแล้ว' }));
    }
    // SCENARIO 2: No Key provided -> Domain Recovery
    else {
        // Find a registered site with this URL that has a VALID license
        const site = await prisma.registeredSite.findFirst({
            where: {
                url: normalizedUrl, // Use normalized origin URL
                license: {
                    isActive: true,
                    validUntil: { gt: new Date() },
                    validFrom: { lt: new Date() }
                }
            },
            include: {
                license: true
            }
        });

        if (site) {
            // Found a valid license for this domain!
            // Update check time
            await prisma.registeredSite.update({
                where: { id: site.id },
                data: { lastCheckedAt: new Date() },
            });

            return cors(NextResponse.json({
                valid: true,
                message: 'ยืนยันใบอนุญาตผ่านโดเมนสำเร็จ',
                key: site.license.key // Return the key so client can save it
            }));
        }

        return cors(NextResponse.json({ valid: false, message: 'ไม่พบใบอนุญาตสำหรับการใช้งาน' })); // General error for no key + no active site
    }
}

export async function OPTIONS(request: Request) {
    return cors(
        new NextResponse(null, {
            status: 204,
        })
    );
}
