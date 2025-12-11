import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Mail, Shield, ArrowLeft, KeyRound, RefreshCw, Clock } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

// OTP expires after 5 minutes
const OTP_EXPIRY_MINUTES = 5;

export default function AdminLogin() {
    const { signIn, user, isAdmin, otpVerified, verifyOTP, resetOTP, signOut, otpCreatedAt } = useAuth();
    const [, setLocation] = useLocation();

    // Login form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // OTP form state
    const [otpCode, setOtpCode] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpTimeLeft, setOtpTimeLeft] = useState(OTP_EXPIRY_MINUTES * 60);

    // Forgot password state
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetLoading, setResetLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    // OTP countdown timer
    useEffect(() => {
        if (user && isAdmin && !otpVerified && otpCreatedAt) {
            const interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - otpCreatedAt) / 1000);
                const remaining = (OTP_EXPIRY_MINUTES * 60) - elapsed;
                setOtpTimeLeft(Math.max(0, remaining));

                if (remaining <= 0) {
                    setOtpError('OTP expired. Please request a new code.');
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [user, isAdmin, otpVerified, otpCreatedAt]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    const handleOTPVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setOtpError('');

        if (otpTimeLeft <= 0) {
            setOtpError('OTP expired. Please request a new code.');
            return;
        }

        if (verifyOTP(otpCode)) {
            setLocation('/admin');
        } else {
            setOtpError('Invalid OTP code. Please try again.');
        }
    };

    const handleLogout = async () => {
        await signOut();
        setEmail('');
        setPassword('');
        setOtpCode('');
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
                redirectTo: `${window.location.origin}/admin/reset-password`,
            });

            if (error) throw error;
            setResetSuccess(true);
        } catch (err: any) {
            setError(err.message);
        }

        setResetLoading(false);
    };

    // Forgot Password Form
    if (showForgotPassword) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Card className="border-primary/20 bg-slate-800/50 backdrop-blur">
                        <CardHeader className="text-center">
                            <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                <Mail className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl text-white">Reset Password</CardTitle>
                            <CardDescription className="text-slate-400">
                                Enter your email to receive a password reset link
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {resetSuccess ? (
                                <div className="space-y-4">
                                    <Alert className="bg-green-500/20 border-green-500/30 text-green-400">
                                        <AlertDescription>
                                            Password reset email sent! Check your inbox.
                                        </AlertDescription>
                                    </Alert>
                                    <Button
                                        onClick={() => { setShowForgotPassword(false); setResetSuccess(false); }}
                                        className="w-full bg-primary hover:bg-primary/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                    >
                                        Back to Login
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleForgotPassword} className="space-y-4">
                                    {error && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="resetEmail" className="text-slate-300">Email</Label>
                                        <Input
                                            id="resetEmail"
                                            type="email"
                                            placeholder="admin@example.com"
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            className="bg-slate-700/50 border-slate-600 text-white focus:ring-2 focus:ring-primary/50 transition-all"
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-primary/25"
                                        disabled={resetLoading}
                                    >
                                        {resetLoading ? 'Sending...' : 'Send Reset Link'}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setShowForgotPassword(false)}
                                        className="w-full text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // If logged in but not admin
    if (user && !isAdmin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="w-full max-w-md border-red-500/20 bg-slate-800/50 backdrop-blur">
                        <CardHeader className="text-center">
                            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                                <Shield className="w-8 h-8 text-red-500" />
                            </div>
                            <CardTitle className="text-2xl text-white">Access Denied</CardTitle>
                            <CardDescription className="text-slate-400">
                                You don't have admin privileges.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert variant="destructive">
                                <AlertDescription>
                                    Email "{user.email}" is not authorized to access the admin panel.
                                </AlertDescription>
                            </Alert>
                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="w-full border-slate-600 text-white hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                Sign Out
                            </Button>
                            <Link href="/">
                                <Button
                                    variant="ghost"
                                    className="w-full text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // If logged in as admin but OTP not verified - show 2FA form
    if (user && isAdmin && !otpVerified) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="w-full max-w-md border-orange-500/20 bg-slate-800/50 backdrop-blur">
                        <CardHeader className="text-center">
                            <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
                                <KeyRound className="w-8 h-8 text-orange-500" />
                            </div>
                            <CardTitle className="text-2xl text-white">Two-Factor Authentication</CardTitle>
                            <CardDescription className="text-slate-400">
                                Enter the 6-digit code to continue
                            </CardDescription>

                            {/* OTP Timer */}
                            <div className={`flex items-center justify-center gap-2 mt-4 text-sm ${otpTimeLeft <= 60 ? 'text-red-400' : 'text-slate-400'}`}>
                                <Clock className="w-4 h-4" />
                                <span>Code expires in: <strong>{formatTime(otpTimeLeft)}</strong></span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleOTPVerify} className="space-y-4">
                                {otpError && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{otpError}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="otp" className="text-slate-300">OTP Code</Label>
                                    <Input
                                        id="otp"
                                        type="text"
                                        placeholder="Enter 6-digit code"
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        className="bg-slate-700/50 border-slate-600 text-white text-center text-2xl tracking-widest focus:ring-2 focus:ring-orange-500/50 transition-all"
                                        maxLength={6}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-orange-600 hover:bg-orange-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                                    disabled={otpTimeLeft <= 0}
                                >
                                    <Shield className="mr-2 h-4 w-4" /> Verify
                                </Button>

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={resetOTP}
                                        className="flex-1 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                                    >
                                        <RefreshCw className="mr-2 h-4 w-4" /> Resend Code
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleLogout}
                                        className="flex-1 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // If already fully authenticated, redirect to admin
    if (user && isAdmin && otpVerified) {
        setLocation('/admin');
        return null;
    }

    // Login form
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-primary/20 bg-slate-800/50 backdrop-blur">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
                        <CardDescription className="text-slate-400">
                            Sign in to access the admin dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-300">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-slate-700/50 border-slate-600 text-white focus:ring-2 focus:ring-primary/50 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-300">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 bg-slate-700/50 border-slate-600 text-white focus:ring-2 focus:ring-primary/50 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-primary/25"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Button>

                            <Button
                                type="button"
                                variant="link"
                                onClick={() => setShowForgotPassword(true)}
                                className="w-full text-slate-400 hover:text-primary transition-colors"
                            >
                                Forgot password?
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href="/">
                                <Button
                                    variant="ghost"
                                    className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-slate-500 text-sm mt-4">
                    Protected by Supabase Authentication + 2FA
                </p>
            </motion.div>
        </div>
    );
}
