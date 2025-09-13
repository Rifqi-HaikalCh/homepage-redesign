'use client';

import { ArrowLeft, Menu, Bell, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  showSearch?: boolean;
  showNotification?: boolean;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  className?: string;
}

const MobileHeader = ({
  title,
  showBack = false,
  showMenu = false,
  showSearch = false,
  showNotification = false,
  onMenuClick,
  onSearchClick,
  onNotificationClick,
  className = ''
}: MobileHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
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
                onClick={handleBack}
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

          {/* Center Section */}
          {title && (
            <h1 className="text-lg font-semibold text-gray-900 truncate mx-4">
              {title}
            </h1>
          )}

          {/* Right Section */}
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
                {/* Notification dot */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default MobileHeader;