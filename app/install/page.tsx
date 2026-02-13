'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Key, User, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function InstallPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [formData, setFormData] = useState({
        username: 'admin',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        try {
            // Check if installed
            const statusRes = await fetch('/api/setup/status');
            const statusData = await statusRes.json();

            if (statusData.installed) {
                setIsInstalled(true);
                // Check if user is logged in as admin to allow re-install
                const authRes = await fetch('/api/auth/verify'); // We need this endpoint or try accessing a protected route
                // Alternatively, try to access a known admin api
                const adminCheck = await fetch('/api/licenses'); // Protected
                if (adminCheck.ok) {
                    setIsAdmin(true);
                } else {
                    // Installed but not admin -> Redirect
                    router.push('/');
                    return;
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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

        } catch (err) {
            setError('An error occurred during installation');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
                {/* Header */}
                <div className="p-8 pb-0 text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        {isInstalled ? 'System Re-Installation' : 'System Setup'}
                    </h1>
                    <p className="text-gray-400">
                        {isInstalled
                            ? 'Warning: This will reset the admin account.'
                            : 'Configure your administrator account to get started.'}
                    </p>
                </div>

                {/* Content */}
                <div className="p-8">
                    {step === 1 ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5 pl-1">Admin Username</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Enter username"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5 pl-1">Password</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Create password"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5 pl-1">Confirm Password</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Confirm password"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                            >
                                {isInstalled ? 'Reset & Re-Install' : 'Complete Setup'}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </motion.div>
                            <h2 className="text-2xl font-bold mb-2">Setup Complete!</h2>
                            <p className="text-gray-400">Redirecting to login...</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
