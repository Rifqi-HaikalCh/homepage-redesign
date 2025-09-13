'use client';

// React types untuk props validation
import { ReactNode } from 'react';
// Komponen navigasi mobile yang reusable
import MobileBottomNavigation from './MobileBottomNavigation';
import MobileHeader from './MobileHeader';

// Interface untuk props - comprehensive tapi tetap flexible
interface MobileLayoutProps {
  children: ReactNode; // Konten utama yang akan di-wrap
  
  // Bottom navigation controls
  showBottomNav?: boolean; // Default: true
  
  // Header configuration
  headerTitle?: string; // Judul untuk halaman tertentu
  showBack?: boolean; // Tombol back navigation
  showMenu?: boolean; // Hamburger menu
  showSearch?: boolean; // Icon search
  showNotification?: boolean; // Bell notification dengan badge
  showLogo?: boolean; // Logo brand di center header
  
  // Event handlers - optional untuk flexibility
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
}

/**
 * Layout wrapper untuk semua halaman mobile
 * Menghandle header, content area, dan bottom navigation
 * 
 * Pattern ini memudahkan konsistensi UI across pages
 * dan memungkinkan customization per halaman
 */
const MobileLayout = ({
  children,
  showBottomNav = true, // Default show bottom nav
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
  // Kalkulasi padding bottom untuk memberikan space untuk bottom nav
  const contentPadding = showBottomNav ? 'pb-20' : 'pb-4';
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ================== HEADER SECTION ================== */}
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

      {/* ================== MAIN CONTENT ================== */}
      {/* Scrollable area dengan proper spacing */}
      <main className={`flex-1 overflow-y-auto ${contentPadding}`}>
        {children}
      </main>

      {/* ================== BOTTOM NAVIGATION ================== */}
      {/* Conditional rendering berdasarkan props */}
      {showBottomNav && <MobileBottomNavigation />}
    </div>
  );
};

export default MobileLayout;