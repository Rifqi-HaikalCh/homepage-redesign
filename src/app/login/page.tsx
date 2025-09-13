'use client';

import useMobileView from '@/hooks/useMobileView';
import MobileLoginPage from '@/components/mobile/MobileLoginPage';

// Desktop components
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const DesktopLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const { user, role, signIn, setGuestMode, setUser, setRole } = useAuth();
  const router = useRouter();

  // Auto redirect when user is authenticated
  useEffect(() => {
    if (user) {
      setIsRedirecting(true);
      // Redirect admin to dashboard, others to homepage
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [user, role, router]);

  // Countdown timer untuk rate limiting
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isRateLimited && countdown === 0) {
      setIsRateLimited(false);
      setError('');
    }
  }, [countdown, isRateLimited]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRateLimited) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await signIn(email, password);
      // useEffect will handle redirect automatically
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('Terlalu banyak percobaan')) {
        const seconds = error.message.match(/(\d+) detik/)?.[1];
        if (seconds) {
          setCountdown(parseInt(seconds));
          setIsRateLimited(true);
        }
      }
      const message = error instanceof Error ? error.message : 'Login failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestMode = () => {
    setGuestMode();
    router.push('/');
  };

  // Show redirecting state
  if (isRedirecting || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7124A8] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Mengarahkan ke halaman utama...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
      {/* Glossy Glass Background Effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              {/* Logo and Title */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <img
                    src="/dapur-buzzer-logo.png"
                    alt="Dapur Buzzer Logo"
                    className="h-12 object-contain"
                    style={{ width: "auto" }}
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Masuk ke Akun Anda
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Selamat datang kembali! Silakan masuk untuk melanjutkan.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className={`border rounded-lg p-3 mb-6 ${
                  isRateLimited 
                    ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <p className={`text-sm ${
                    isRateLimited 
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {error}
                  </p>
                  {isRateLimited && countdown > 0 && (
                    <div className="mt-2 p-2 bg-orange-100 dark:bg-orange-900/40 rounded text-center">
                      <p className="text-orange-700 dark:text-orange-300 text-sm font-semibold">
                        Coba lagi dalam: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                      </p>
                      <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-1 mt-1">
                        <div 
                          className="bg-orange-500 h-1 rounded-full transition-all duration-1000"
                          style={{ width: `${100 - (countdown / 60) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80"
                      placeholder="masukkan@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80"
                      placeholder="Masukkan password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#7124A8] focus:ring-[#7124A8]"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Ingat saya
                    </span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-[#7124A8] hover:text-[#5a1d87]">
                    Lupa password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || isRateLimited}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isRateLimited 
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#7124A8] hover:bg-[#5a1d87]'
                  } text-white`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span className="ml-2">Masuk...</span>
                    </div>
                  ) : isRateLimited ? (
                    `Tunggu ${countdown}s`
                  ) : (
                    'Masuk'
                  )}
                </Button>
              </form>

              {/* Guest Mode Button */}
              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGuestMode}
                  className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Masuk sebagai Tamu
                </Button>
              </div>

              {/* Test Login Buttons for Development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
                    🧪 Test Accounts (Development Only)
                  </p>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/test-login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: 'admin@test.com', role: 'admin' })
                          });
                          const data = await response.json();
                          if (response.ok) {
                            setUser(data.user);
                            setRole(data.role);
                            router.push('/admin');
                          }
                        } catch (error) {
                          console.error('Test login failed:', error);
                        }
                      }}
                      className="w-full text-xs"
                      size="sm"
                    >
                      👑 Test Admin
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/test-login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: 'client@test.com', role: 'client' })
                          });
                          const data = await response.json();
                          if (response.ok) {
                            setUser(data.user);
                            setRole(data.role);
                            router.push('/profile');
                          }
                        } catch (error) {
                          console.error('Test login failed:', error);
                        }
                      }}
                      className="w-full text-xs"
                      size="sm"
                    >
                      👤 Test Client
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/test-login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: 'influencer@test.com', role: 'influencer' })
                          });
                          const data = await response.json();
                          if (response.ok) {
                            setUser(data.user);
                            setRole(data.role);
                            router.push('/profile');
                          }
                        } catch (error) {
                          console.error('Test login failed:', error);
                        }
                      }}
                      className="w-full text-xs"
                      size="sm"
                    >
                      ⭐ Test Influencer
                    </Button>
                  </div>
                </div>
              )}

              {/* Register Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Belum punya akun?{' '}
                  <Link href="/register" className="text-[#7124A8] hover:text-[#5a1d87] font-medium">
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const isMobile = useMobileView();

  if (isMobile) {
    return <MobileLoginPage />;
  }

  return <DesktopLoginPage />;
}