'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push('/sys-admin');
            } else {
                const data = await res.json();
                setError(data.error || 'Login failed');
                setIsLoading(false);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred');
            setIsLoading(false);
        }
    };

    return (
        <div className="w-[100%] min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-[4%] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-[100%] h-[100%] overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[45%] aspect-square bg-[#e7258a]/10 dark:bg-[#e7258a]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[45%] aspect-square bg-[#f43f9e]/10 dark:bg-[#f43f9e]/5 rounded-full blur-[100px]" />
            </div>

            {/* Top Bar */}
            <div className="w-[90%] sm:w-[75%] md:w-[50%] lg:w-[32%] flex items-center justify-between mb-[1.5rem]">
                <Button variant="ghost" size="sm" asChild className="text-[0.875rem]">
                    <Link href="/" className="flex items-center gap-[0.5rem] text-[#e7258a]">
                        <ArrowLeft className="w-[1rem] h-[1rem]" />
                        กลับหน้าหลัก
                    </Link>
                </Button>
                <ModeToggle />
            </div>

            <Card className="w-[90%] sm:w-[75%] md:w-[50%] lg:w-[32%] shadow-xl border-border bg-card rounded-[1rem]">
                <CardHeader className="space-y-[0.5rem] text-center p-[6%]">
                    <div className="flex justify-center mb-[0.75rem]">
                        <div className="p-[0.75rem] bg-[#fdf2f8] dark:bg-[#2e122b] rounded-full text-[#e7258a]">
                            <Lock className="w-[1.5rem] h-[1.5rem]" />
                        </div>
                    </div>
                    <CardTitle className="text-[1.5rem] font-bold">เข้าสู่ระบบเจ้าหน้าที่</CardTitle>
                    <CardDescription className="text-[0.875rem]">
                        ระบบบริหารจัดการใบอนุญาตดิจิทัล (MLicense Admin)
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="grid gap-[1rem] p-[6%] pt-0">
                        <div className="grid gap-[0.5rem]">
                            <Label htmlFor="username" className="text-[0.875rem]">ชื่อผู้ใช้งาน (Username)</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="admin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isLoading}
                                className="text-[0.9375rem] h-[2.5rem]"
                            />
                        </div>
                        <div className="grid gap-[0.5rem]">
                            <Label htmlFor="password" className="text-[0.875rem]">รหัสผ่าน (Password)</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                className="text-[0.9375rem] h-[2.5rem]"
                            />
                        </div>
                        {error && (
                            <div className="p-[0.75rem] bg-destructive/10 text-destructive text-[0.875rem] rounded-[0.5rem] text-center">
                                {error}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="p-[6%] pt-0">
                        <Button className="w-[100%] bg-[#e7258a] hover:bg-[#c81a73] text-white text-[0.9375rem] h-[2.75rem] rounded-[0.5rem]" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-[0.5rem] h-[1rem] w-[1rem] animate-spin" />}
                            เข้าสู่ระบบ
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
