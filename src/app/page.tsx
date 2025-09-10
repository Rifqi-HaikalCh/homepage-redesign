import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import ContentCarousel from '@/components/content-carousel';
import RecommendedInfluencer from '@/components/recommended-influencer';
import OtherInfluencers from '@/components/other-influencers';
import RecommendationCards from '@/components/recommendation-cards';
import TestimonialStack from '@/components/testimonial-stack';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-all duration-500">
      {/* Glossy Glass Background Effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10">
        <Header />
        <main>
          <HeroCarousel />
          <ContentCarousel />
          <RecommendedInfluencer />
          <OtherInfluencers />
          <RecommendationCards />
          <TestimonialStack />
        </main>
        <Footer />
      </div>
    </div>
  );
}
