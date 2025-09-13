'use client';

import { useAuth } from '@/contexts/AuthContext';
import useMobileView from '@/hooks/useMobileView';
import MobileHomePage from '@/components/mobile/MobileHomePage';

// Desktop components
import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import ContentSelectionWithFiltering from '@/components/ContentSelectionWithFiltering';
import RecommendedInfluencer from '@/components/recommended-influencer';
import RecommendationCards from '@/components/recommendation-cards';
import TestimonialStack from '@/components/testimonial-stack';
import Footer from '@/components/footer';

const DesktopHomePage = () => {
  const { user, role } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-all duration-500">
      {/* Glossy Glass Background Effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10">
        <Header />
        
        {/* Welcome Message Based on Role */}
        {user && (
          <div className="container mx-auto px-6 pt-8">
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Selamat datang, {user.email}!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {role === 'admin' && '👑 Anda login sebagai Admin - Kelola semua data sistem'}
                {role === 'client' && '👤 Anda login sebagai Client - Temukan influencer terbaik untuk brand Anda'}
                {role === 'influencer' && '⭐ Anda login sebagai Influencer - Kelola profil dan portofolio Anda'}
                {role === 'guest' && '👋 Anda dalam mode Guest - Jelajahi platform kami'}
              </p>
            </div>
          </div>
        )}
        
        <main>
          <HeroCarousel />
          <ContentSelectionWithFiltering 
            variant="desktop" 
            showInfluencerResults={true}
            maxInfluencersToShow={8}
          />
          <RecommendedInfluencer />
          <RecommendationCards />
          <TestimonialStack />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default function Home() {
  const { loading } = useAuth();
  const isMobile = useMobileView();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7124A8] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return <MobileHomePage />;
  }

  return <DesktopHomePage />;
}
