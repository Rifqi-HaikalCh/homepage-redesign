'use client';

import { ReactNode } from 'react';
import MobileBottomNavigation from './MobileBottomNavigation';
import MobileHeader from './MobileHeader';

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  headerTitle?: string;
  showBack?: boolean;
  showMenu?: boolean;
  showSearch?: boolean;
  showNotification?: boolean;
  showLogo?: boolean;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
}

const MobileLayout = ({
  children,
  showBottomNav = true,
  headerTitle,
  showBack = false,
  showMenu = false,
  showSearch = false,
  showNotification = false,
  showLogo = false,
  onMenuClick,
  onSearchClick,
  onNotificationClick,
}: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <MobileHeader
        title={headerTitle}
        showBack={showBack}
        showMenu={showMenu}
        showSearch={showSearch}
        showNotification={showNotification}
        showLogo={showLogo}
        onMenuClick={onMenuClick}
        onSearchClick={onSearchClick}
        onNotificationClick={onNotificationClick}
      />

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto ${showBottomNav ? 'pb-20' : 'pb-4'}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && <MobileBottomNavigation />}
    </div>
  );
};

export default MobileLayout;