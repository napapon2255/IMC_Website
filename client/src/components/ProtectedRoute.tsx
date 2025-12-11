import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'wouter';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, isAdmin, otpVerified, loading } = useAuth();

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-slate-500">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Not logged in - redirect to login
    if (!user) {
        return <Redirect to="/admin/login" />;
    }

    // Not admin - redirect to login (will show access denied)
    if (!isAdmin) {
        return <Redirect to="/admin/login" />;
    }

    // OTP not verified - redirect to login (will show 2FA form)
    if (!otpVerified) {
        return <Redirect to="/admin/login" />;
    }

    // All checks passed - render children
    return <>{children}</>;
}
