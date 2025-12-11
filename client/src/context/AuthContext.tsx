import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    isAdmin: boolean;
    otpVerified: boolean;
    otpCreatedAt: number | null;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    verifyOTP: (code: string) => boolean;
    resetOTP: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// OTP expires after 5 minutes
const OTP_EXPIRY_MS = 5 * 60 * 1000;

// Simple OTP for demo (in production, use TOTP like Google Authenticator)
const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [currentOTP, setCurrentOTP] = useState<string>('');
    const [otpCreatedAt, setOtpCreatedAt] = useState<number | null>(null);

    // Check if user is admin from database
    const checkAdminStatus = async (userEmail: string | undefined) => {
        if (!userEmail) {
            setIsAdmin(false);
            return;
        }

        try {
            // Fetch admin users from database via API
            const res = await fetch('/api/admin-users');
            if (res.ok) {
                const adminUsers = await res.json();
                const isUserAdmin = adminUsers.some((admin: { email: string }) =>
                    admin.email.toLowerCase() === userEmail.toLowerCase()
                );
                setIsAdmin(isUserAdmin);
            } else {
                // Fallback: check hardcoded list if API fails
                const fallbackAdmins = ['admin@imc.co.th', 'imcmetrologyengineers@gmail.com'];
                setIsAdmin(fallbackAdmins.includes(userEmail.toLowerCase()));
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
            setIsAdmin(false);
        }
    };

    const generateNewOTP = () => {
        const newOTP = generateOTP();
        setCurrentOTP(newOTP);
        setOtpCreatedAt(Date.now());
        setOtpVerified(false);

        // In production, send OTP via email or SMS
        console.log('🔐 Your OTP code is:', newOTP);
        setTimeout(() => {
            alert(`🔐 Your 2FA OTP code is: ${newOTP}\n\nThis code expires in 5 minutes.\n\n(In production, this would be sent to your email/phone)`);
        }, 500);
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                await checkAdminStatus(session.user.email);
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session);
                setUser(session?.user ?? null);

                // Reset OTP verification on logout
                if (event === 'SIGNED_OUT') {
                    setOtpVerified(false);
                    setCurrentOTP('');
                    setOtpCreatedAt(null);
                    setIsAdmin(false);
                }

                // Check admin status and generate OTP on login
                if (event === 'SIGNED_IN' && session?.user) {
                    await checkAdminStatus(session.user.email);
                    generateNewOTP();
                }

                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error: error as Error | null };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setOtpVerified(false);
        setCurrentOTP('');
        setOtpCreatedAt(null);
        setIsAdmin(false);
    };

    const verifyOTP = (code: string): boolean => {
        // Check if OTP expired
        if (otpCreatedAt && Date.now() - otpCreatedAt > OTP_EXPIRY_MS) {
            return false;
        }

        if (code === currentOTP) {
            setOtpVerified(true);
            return true;
        }
        return false;
    };

    const resetOTP = () => {
        generateNewOTP();
    };

    return (
        <AuthContext.Provider value={{
            user,
            session,
            loading,
            isAdmin,
            otpVerified,
            otpCreatedAt,
            signIn,
            signOut,
            verifyOTP,
            resetOTP,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
