import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import CategoryFilter from '@/components/category-filter';
import RecommendationCards from '@/components/recommendation-cards';
import TestimonialStack from '@/components/testimonial-stack';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main>
        <HeroCarousel />
        <CategoryFilter />
        <RecommendationCards />
        <TestimonialStack />
      </main>
      <Footer />
    </div>
  );
}
