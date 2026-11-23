'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Key, User, CheckCircle, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function InstallPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isInstalled, setIsInstalled] = useState(false);

    const [formData, setFormData] = useState({
        username: 'admin',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const checkStatus = async () => {
            try {
                // Check if installed
                const statusRes = await fetch('/api/setup/status');
                const statusData = await statusRes.json();

                if (statusData.installed) {
                    setIsInstalled(true);
                    // Check if user is logged in as admin to allow re-install
                    const adminCheck = await fetch('/api/licenses'); // Protected
                    if (!adminCheck.ok) {
                        // Installed but not admin -> Redirect
                        router.push('/');
                        return;
                    }
                }
            } catch (err) {
                console.error('Failed to check status:', err);
            } finally {
                setLoading(false);
            }
        };

        checkStatus();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            const res = await fetch('/api/setup/install', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Installation failed');
                return;
            }

            // Success
            setStep(2);
            setTimeout(() => {
                router.push('/sys-login');
            }, 2000);

        } catch {
            setError('An error occurred during installation');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="w-[100%] min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-[4%] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-[100%] h-[100%] overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square bg-[#e7258a]/10 dark:bg-[#e7258a]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-[#f43f9e]/10 dark:bg-[#f43f9e]/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-[92%] sm:w-[75%] md:w-[50%] lg:w-[32%] z-10"
            >
                <Card className="border-border shadow-2xl backdrop-blur-sm bg-card/80 rounded-[1rem]">
                    <CardHeader className="text-center p-[6%] pb-[1rem]">
                        <div className="mx-auto w-[3rem] h-[3rem] bg-[#fdf2f8] dark:bg-[#2e122b] rounded-[0.75rem] flex items-center justify-center mb-[1rem] text-[#e7258a]">
                            <Shield className="w-[1.5rem] h-[1.5rem]" />
                        </div>
                        <CardTitle className="text-[1.5rem] font-bold">
                            {isInstalled ? 'System Re-Installation' : 'System Setup'}
                        </CardTitle>
                        <CardDescription className="text-[0.875rem]">
                            {isInstalled
                                ? 'Warning: This will reset the admin account.'
                                : 'Configure your administrator account to get started.'}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-[6%] pt-0">
                        {step === 1 ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="username">Admin Username</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="username"
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className="pl-9"
                                            placeholder="Enter username"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-9"
                                            placeholder="Create password"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="pl-9"
                                            placeholder="Confirm password"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full mt-4" size="lg">
                                    {isInstalled ? 'Reset & Re-Install' : 'Complete Setup'}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </motion.div>
                                <h2 className="text-xl font-bold mb-2">Setup Complete!</h2>
                                <p className="text-muted-foreground">Redirecting to login...</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
