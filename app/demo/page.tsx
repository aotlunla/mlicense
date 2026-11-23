'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Globe, Key, Loader2, ShieldCheck, XCircle } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VerifyResponse {
    valid: boolean;
    message?: string;
    key?: string;
}

export default function DemoPage() {
    const [key, setKey] = useState('');
    const [url, setUrl] = useState('https://mysite.com');
    const [result, setResult] = useState<VerifyResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null);
        setIsLoading(true);
        try {
            const res = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, url }),
            });
            const data: VerifyResponse = await res.json();
            setResult(data);
        } catch (error) {
            console.error('Verification failed', error);
            setResult({ valid: false, message: 'Network or connection error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-[100%] min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-[4%] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-[100%] h-[100%] overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[45%] aspect-square bg-[#e7258a]/10 dark:bg-[#e7258a]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[45%] aspect-square bg-[#f43f9e]/10 dark:bg-[#f43f9e]/5 rounded-full blur-[100px]" />
            </div>

            {/* Top Navigation Bar */}
            <div className="w-[92%] sm:w-[80%] md:w-[60%] lg:w-[48%] flex items-center justify-between mb-[1.5rem]">
                <Button variant="ghost" size="sm" asChild className="text-[0.875rem]">
                    <Link href="/" className="flex items-center gap-[0.5rem] text-[#e7258a]">
                        <ArrowLeft className="w-[1rem] h-[1rem]" />
                        หน้าหลัก
                    </Link>
                </Button>
                <div className="flex items-center gap-[0.5rem]">
                    <Button variant="outline" size="sm" asChild className="text-[0.875rem] border-[#f5d0e3] text-[#e7258a]">
                        <Link href="/sys-admin">Admin Dashboard</Link>
                    </Button>
                    <ModeToggle />
                </div>
            </div>

            <Card className="w-[92%] sm:w-[80%] md:w-[60%] lg:w-[48%] border-border shadow-xl bg-card rounded-[1rem]">
                <CardHeader className="p-[6%]">
                    <div className="flex items-center gap-[0.75rem]">
                        <div className="p-[0.5rem] bg-[#fdf2f8] dark:bg-[#2e122b] rounded-[0.5rem] text-[#e7258a]">
                            <ShieldCheck className="w-[1.5rem] h-[1.5rem]" />
                        </div>
                        <div>
                            <CardTitle className="text-[1.5rem] font-bold">Client Verification Demo</CardTitle>
                            <CardDescription className="text-[0.875rem]">
                                ทดสอบการตรวจสอบสิทธิ์ License API จำลองการเรียกจาก Client Website
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-[1.5rem] p-[6%] pt-0">
                    <form onSubmit={handleVerify} className="space-y-[1rem]">
                        <div className="space-y-[0.5rem]">
                            <Label htmlFor="license-key" className="flex items-center gap-[0.5rem] text-[0.875rem]">
                                <Key className="w-[1rem] h-[1rem] text-[#e7258a]" />
                                License Key
                            </Label>
                            <Input
                                id="license-key"
                                type="text"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                placeholder="e.g. XXXX-XXXX-XXXX-XXXX"
                                className="font-mono text-[0.9375rem] h-[2.5rem]"
                                required
                            />
                        </div>

                        <div className="space-y-[0.5rem]">
                            <Label htmlFor="sim-url" className="flex items-center gap-[0.5rem] text-[0.875rem]">
                                <Globe className="w-[1rem] h-[1rem] text-[#e7258a]" />
                                Simulated URL
                            </Label>
                            <Input
                                id="sim-url"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="text-[0.9375rem] h-[2.5rem]"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-[100%] bg-[#e7258a] hover:bg-[#c81a73] text-white text-[0.9375rem] h-[2.75rem] rounded-[0.5rem]" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-[0.5rem] h-[1rem] w-[1rem] animate-spin" />
                                    กำลังตรวจสอบ...
                                </>
                            ) : (
                                'Verify License'
                            )}
                        </Button>
                    </form>

                    {result && (
                        <div
                            className={`p-[1rem] rounded-[0.5rem] border flex items-start gap-[0.75rem] ${
                                result.valid
                                    ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400'
                                    : 'bg-destructive/10 border-destructive/20 text-destructive'
                            }`}
                        >
                            {result.valid ? (
                                <CheckCircle2 className="w-[1.25rem] h-[1.25rem] mt-[0.125rem] shrink-0" />
                            ) : (
                                <XCircle className="w-[1.25rem] h-[1.25rem] mt-[0.125rem] shrink-0" />
                            )}
                            <div>
                                <h4 className="font-semibold text-[0.875rem]">
                                    {result.valid ? 'License Valid' : 'License Invalid'}
                                </h4>
                                <p className="text-[0.75rem] mt-[0.25rem] opacity-90">{result.message}</p>
                            </div>
                        </div>
                    )}

                    <div className="pt-[1rem] border-t text-[0.75rem] text-muted-foreground space-y-[0.5rem]">
                        <p className="font-semibold text-foreground text-[0.8125rem]">ขั้นตอนการทดสอบ:</p>
                        <ol className="list-decimal list-inside space-y-[0.25rem]">
                            <li>คัดลอก License Key จากหน้า <Link href="/sys-admin" className="underline hover:text-[#e7258a]">Admin Dashboard</Link></li>
                            <li>กรอก Key และจำลอง Domain URL ที่ต้องการทดสอบ</li>
                            <li>กด &quot;Verify License&quot; เพื่อทดสอบการลงทะเบียน Site และตรวจสอบสถานะโควต้า</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
