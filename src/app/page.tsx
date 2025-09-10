import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import ContentCarousel from '@/components/content-carousel';
import RecommendedInfluencer from '@/components/recommended-influencer';
import RecommendationCards from '@/components/recommendation-cards';
import TestimonialStack from '@/components/testimonial-stack';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main>
        <HeroCarousel />
        <ContentCarousel />
        <RecommendedInfluencer />
        <RecommendationCards />
        <TestimonialStack />
      </main>
      <Footer />
    </div>
  );
}
