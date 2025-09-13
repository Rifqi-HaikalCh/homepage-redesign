'use client';

// Navigation icons - menggunakan Lucide untuk konsistensi
import { Home, Users, Package, User } from 'lucide-react';
import Link from 'next/link';
// Hook untuk detect active route
import { usePathname } from 'next/navigation';
// Animasi untuk active state transitions
import { motion } from 'framer-motion';

/**
 * Bottom navigation untuk mobile app
 * Menggunakan tab-based navigation pattern yang familiar untuk mobile users
 * 
 * Features:
 * - Active state dengan animated background
 * - Smooth transitions menggunakan Framer Motion
 * - Accessible dengan proper labels
 */
const MobileBottomNavigation = () => {
  const currentPath = usePathname();

  // Konfigurasi navigation items - mudah untuk ditambah/dikurangi
  const navigationItems = [
    {
      href: '/',
      icon: Home,
      label: 'Home',
      isActive: currentPath === '/'
    },
    {
      href: '/influencer',
      icon: Users,
      label: 'Influencer',
      // Menggunakan startsWith untuk catch semua sub-routes
      isActive: currentPath.startsWith('/influencer')
    },
    {
      href: '/packages',
      icon: Package,
      label: 'Packages',
      isActive: currentPath === '/packages'
    },
    {
      href: '/profile',
      icon: User,
      label: 'Profile',
      isActive: currentPath === '/profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 z-50">
      <div className="safe-area-padding-bottom">
        {/* Navigation container dengan equal spacing */}
        <nav className="flex items-center justify-around py-2 px-4">
          {navigationItems.map((navItem) => {
            const IconComponent = navItem.icon;
            
            return (
              <Link
                key={navItem.href}
                href={navItem.href}
                className="flex flex-col items-center justify-center py-2 px-3 min-w-[60px] relative transition-all duration-200 hover:scale-105"
              >
                {/* Animated active background */}
                {navItem.isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#7124a8]/20 rounded-xl"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      bounce: 0.2, 
                      duration: 0.6 
                    }}
                  />
                )}
                
                {/* Icon dan label dengan proper spacing */}
                <div className="relative z-10 flex flex-col items-center">
                  <IconComponent 
                    className={`w-5 h-5 mb-1 transition-colors duration-200 ${
                      navItem.isActive 
                        ? 'text-[#7124a8]' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`} 
                  />
                  <span 
                    className={`text-xs font-medium transition-colors duration-200 ${
                      navItem.isActive 
                        ? 'text-[#7124a8]' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {navItem.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileBottomNavigation;