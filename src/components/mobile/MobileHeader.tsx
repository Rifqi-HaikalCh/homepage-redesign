'use client';

// Icons yang konsisten dengan design system
import { ArrowLeft, Menu, Bell, Search } from 'lucide-react';
// Next.js router untuk navigation
import { useRouter } from 'next/navigation';
// Animasi untuk micro-interactions yang smooth
import { motion } from 'framer-motion';
// Optimized image component
import Image from 'next/image';

// Props interface dengan dokumentasi yang jelas
interface MobileHeaderProps {
  title?: string; // Judul halaman (optional, bisa diganti dengan logo)
  
  // Control visibility berbagai elemen header
  showBack?: boolean; // Arrow back untuk navigation
  showMenu?: boolean; // Hamburger menu
  showSearch?: boolean; // Search icon
  showNotification?: boolean; // Bell dengan red dot indicator
  showLogo?: boolean; // Brand logo di center
  
  // Event handlers untuk interaksi user
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  
  // Custom styling jika diperlukan
  className?: string;
}

/**
 * Header component untuk mobile dengan berbagai konfigurasi
 * Mendukung logo, title, navigation controls, dan action buttons
 * 
 * Design: Sticky header dengan backdrop blur untuk modern feel
 */
const MobileHeader = ({
  title,
  showBack = false,
  showMenu = false,
  showSearch = false,
  showNotification = false,
  showLogo = false,
  onMenuClick,
  onSearchClick,
  onNotificationClick,
  className = ''
}: MobileHeaderProps) => {
  const router = useRouter();

  // Handler untuk back navigation - menggunakan browser history
  const handleBackNavigation = (): void => {
    router.back();
  };

  return (
    <motion.header 
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="safe-area-padding-top">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left Section */}
          <div className="flex items-center">
            {showBack && (
              <motion.button
                onClick={handleBackNavigation}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </motion.button>
            )}
            {showMenu && (
              <motion.button
                onClick={onMenuClick}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </motion.button>
            )}
          </div>

          {/* ================== CENTER SECTION ================== */}
          {/* Flexible center area - bisa logo atau title */}
          <div className="flex-1 flex justify-center mx-4">
            {showLogo ? (
              <Image
                src="/dapur-buzzer-logo.png"
                alt="Dapur Buzzer Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority // Logo penting untuk LCP
              />
            ) : title ? (
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {title}
              </h1>
            ) : null}
          </div>

          {/* ================== RIGHT SECTION ================== */}
          {/* Action buttons area */}
          <div className="flex items-center space-x-2">
            {showSearch && (
              <motion.button
                onClick={onSearchClick}
                className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5 text-gray-700" />
              </motion.button>
            )}
            {showNotification && (
              <motion.button
                onClick={onNotificationClick}
                className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors relative"
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5 text-gray-700" />
                {/* Red dot indicator untuk unread notifications */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default MobileHeader;