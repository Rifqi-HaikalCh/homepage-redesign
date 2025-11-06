'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Moon, Sun, User, LogOut, LogIn, ArrowLeft, Home } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface UnifiedHeaderProps {
  variant?: 'main' | 'secondary';
  title?: string;
  showSearch?: boolean;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  backUrl?: string;
}

/**
 * UnifiedHeader Component
 *
 * Modern glassmorphism header dengan konsistensi design
 * Support untuk dark mode yang sempurna
 *
 * Variants:
 * - main: Header utama dengan logo dan search (homepage, dashboard)
 * - secondary: Header halaman detail dengan back button dan title
 */
export default function UnifiedHeader({
  variant = 'main',
  title = '',
  showSearch = true,
  showBackButton = false,
  showHomeButton = false,
  backUrl
}: UnifiedHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, role, signOut, loading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      router.push(`/influencer?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleBack = () => {
    // Use browser's back() for better performance (no full page reload)
    // Only use push() if explicitly needed for specific backUrl logic
    if (backUrl && backUrl !== '/') {
      router.push(backUrl);
    } else {
      // Use browser back navigation - faster and preserves state
      router.back();
    }
  };

  // Glassmorphism styles yang konsisten
  const headerClasses = `sticky top-0 z-50 transition-all duration-500 ${
    isScrolled || variant === 'secondary'
      ? 'backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/5 dark:shadow-black/20'
      : 'bg-transparent'
  }`;

  // Button glassmorphism style yang konsisten
  const buttonGlassClasses = "rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-[#7124A8]/30 text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-sm hover:shadow-md";

  if (variant === 'secondary') {
    return (
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={headerClasses}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            {showBackButton && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className={`flex items-center gap-2 px-4 py-2 ${buttonGlassClasses}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Kembali</span>
                </Button>
              </motion.div>
            )}

            {/* Centered Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-bold bg-gradient-to-r from-[#7124A8] to-[#9333EA] bg-clip-text text-transparent text-center"
            >
              {title}
            </motion.h1>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`w-10 h-10 ${buttonGlassClasses}`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              {/* Home Button */}
              {showHomeButton && (
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`w-10 h-10 ${buttonGlassClasses}`}
                  >
                    <Home className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.header>
    );
  }

  // Main header variant
  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
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

          {/* Search Bar */}
          {showSearch && (
            <div className="relative flex-1 max-w-md mx-4">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-gray-400 dark:text-gray-500 z-10" />
                <Input
                  className="pl-10 pr-16 py-2 w-full rounded-full border border-white/30 dark:border-gray-600/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80 focus:border-[#7124A8]/50 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm"
                  placeholder="Cari influencer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <div className="absolute right-3 z-10">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
                    ctrl+k
                  </kbd>
                </div>
              </div>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`w-10 h-10 ${buttonGlassClasses}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Auth Actions */}
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    {/* Role Badge */}
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#7124A8]/10 to-[#9333EA]/10 text-[#7124A8] dark:text-[#A855F7] border border-[#7124A8]/20 dark:border-[#A855F7]/20 backdrop-blur-sm">
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
                        className={`w-10 h-10 ${buttonGlassClasses}`}
                      >
                        <User className="w-5 h-5" />
                      </Button>
                    </Link>

                    {/* Sign Out Button */}
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className={`flex items-center gap-2 px-4 py-2 ${buttonGlassClasses}`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline">Keluar</span>
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className={`flex items-center gap-2 px-4 py-2 ${buttonGlassClasses}`}
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="hidden sm:inline">Masuk</span>
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
