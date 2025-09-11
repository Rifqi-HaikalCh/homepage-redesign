'use client';

import { useState, useEffect } from 'react';
import { Search, Moon, Sun, User, LogOut, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, role, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/5 dark:shadow-black/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/dapur-buzzer-logo.png" 
                alt="Dapur Buzzer Logo" 
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          
          <div className="relative flex-1 max-w-md mx-8">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-gray-400 dark:text-gray-500 z-10" />
              <Input
                className="pl-10 pr-16 py-2 w-full rounded-full border border-white/30 dark:border-gray-600/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80 focus:border-[#7124A8]/50 transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-sm"
                placeholder="Cari produk & transaksi"
              />
              <div className="absolute right-3 z-10">
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
                  ctrl+k
                </kbd>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-10 h-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-[#7124A8]/30 text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    {/* Role Badge */}
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-[#7124A8]/10 text-[#7124A8] border border-[#7124A8]/20">
                      {role === 'admin' && '👑 Admin'}
                      {role === 'client' && '👤 Client'}
                      {role === 'influencer' && '⭐ Influencer'}
                      {role === 'guest' && '👋 Guest'}
                    </div>
                    
                    {/* Profile Button */}
                    <Link href="/profile">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-10 h-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-[#7124A8]/30 text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-sm"
                      >
                        <User className="w-5 h-5" />
                      </Button>
                    </Link>
                    
                    {/* Sign Out Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSignOut}
                      className="rounded-full w-10 h-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-red-500/30 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-all duration-300 shadow-sm"
                    >
                      <LogOut className="w-5 h-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {/* Login Button */}
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-[#7124A8]/30 text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-sm"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Masuk
                      </Button>
                    </Link>
                    
                    {/* Register Button */}
                    <Link href="/register">
                      <Button
                        size="sm"
                        className="rounded-full px-4 bg-[#7124A8] hover:bg-[#5a1d87] text-white transition-all duration-300 shadow-sm"
                      >
                        Daftar
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
          
        </div>
      </div>
    </header>
  );
}