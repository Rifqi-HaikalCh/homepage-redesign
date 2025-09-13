'use client';

import { Home, Users, Package, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const MobileBottomNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: 'Home',
      isActive: pathname === '/'
    },
    {
      href: '/influencer',
      icon: Users,
      label: 'Influencer',
      isActive: pathname.startsWith('/influencer')
    },
    {
      href: '/packages',
      icon: Package,
      label: 'Packages',
      isActive: pathname === '/packages'
    },
    {
      href: '/profile',
      icon: User,
      label: 'Profile',
      isActive: pathname === '/profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 z-50">
      <div className="safe-area-padding-bottom">
        <nav className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center py-2 px-3 min-w-[60px] relative"
              >
                {item.isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-100 rounded-xl"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <IconComponent 
                    className={`w-5 h-5 mb-1 ${
                      item.isActive 
                        ? 'text-purple-600' 
                        : 'text-gray-500'
                    }`} 
                  />
                  <span 
                    className={`text-xs font-medium ${
                      item.isActive 
                        ? 'text-purple-600' 
                        : 'text-gray-500'
                    }`}
                  >
                    {item.label}
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