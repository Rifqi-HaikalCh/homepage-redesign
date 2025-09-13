'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, MapPin, TrendingUp, Users, Check } from 'lucide-react';
import Link from 'next/link';
import MobileLayout from './MobileLayout';

interface Influencer {
  id: number;
  name: string;
  content_type: string;
  city: string;
  avatar: string;
  instagram_handle: string;
  instagram_followers: string;
  instagram_engagement_rate: string;
  created_at: string;
  updated_at: string;
}

interface PackageItem {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: string;
  category: string;
  features?: string[];
}

const MobileHomePage = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "Find Perfect\nInfluencers",
      subtitle: "Connect with top creators for your brand",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=800&fit=crop&crop=center",
      cta: "Explore Now"
    },
    {
      id: 2,
      title: "Grow Your\nBusiness",
      subtitle: "Reach millions through authentic partnerships",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop&crop=center",
      cta: "Get Started"
    },
    {
      id: 3,
      title: "Premium\nPackages",
      subtitle: "Professional services tailored for you",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop&crop=center",
      cta: "View Packages"
    }
  ];

  // Mock packages data
  const mockPackages: PackageItem[] = [
    {
      id: 1,
      title: "Starter Package",
      description: "Perfect for small businesses starting their influencer marketing journey",
      price: "$99",
      icon: "🚀",
      category: "Basic",
      features: ["5 Influencer Connections", "Basic Analytics", "Email Support"]
    },
    {
      id: 2,
      title: "Professional Package",
      description: "Advanced tools for growing businesses and marketing agencies",
      price: "$299",
      icon: "⭐",
      category: "Professional",
      features: ["20 Influencer Connections", "Advanced Analytics", "Priority Support"]
    },
    {
      id: 3,
      title: "Enterprise Package",
      description: "Full-scale solution for large enterprises and marketing teams",
      price: "$599",
      icon: "👑",
      category: "Enterprise",
      features: ["Unlimited Connections", "Full Analytics Suite", "24/7 Support"]
    }
  ];

  // Fetch influencers
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch('/api/influencers');
        if (response.ok) {
          const data = await response.json();
          setInfluencers(data.slice(0, 4)); // Show top 4 for mobile
        }
      } catch (error) {
        console.error('Error fetching influencers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  // Fetch packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoadingPackages(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPackages(mockPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setPackages(mockPackages);
      } finally {
        setIsLoadingPackages(false);
      }
    };

    fetchPackages();
  }, [mockPackages]);

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[currentHeroIndex];

  return (
    <MobileLayout showMenu showNotification>
      <div className="space-y-6">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentSlide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl font-bold mb-2 leading-tight"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {currentSlide.title}
                </motion.h1>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-white/90 mb-6 text-lg"
                >
                  {currentSlide.subtitle}
                </motion.p>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Link
                    href={currentSlide.id === 3 ? "/packages" : "/influencer"}
                    className="inline-flex items-center px-6 py-3 bg-[#7124a8] rounded-full font-semibold shadow-lg active:scale-95 transition-transform"
                  >
                    {currentSlide.cta}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Hero Indicators */}
          <div className="absolute bottom-20 left-6 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentHeroIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-4">
          <div className="grid grid-cols-2 gap-3">
            <Link href="/influencer" className="group">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-[#7124a8] to-[#7124a8] p-4 rounded-2xl text-white shadow-lg"
              >
                <Users className="w-6 h-6 mb-2" />
                <h3 className="font-semibold text-sm">Find Influencers</h3>
                <p className="text-white/80 text-xs">Discover creators</p>
              </motion.div>
            </Link>
            
            <Link href="/packages" className="group">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg"
              >
                <Star className="w-6 h-6 mb-2" />
                <h3 className="font-semibold text-sm">Premium Plans</h3>
                <p className="text-blue-100 text-xs">Special offers</p>
              </motion.div>
            </Link>
          </div>
        </section>

        {/* Featured Influencers */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Top Influencers</h2>
            <Link href="/influencer" className="text-[#7124a8] text-sm font-medium flex items-center">
              See All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {influencers.map((influencer, index) => (
                <motion.div
                  key={influencer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={`/influencer/${influencer.id}`}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:bg-gray-50 transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {influencer.name}
                        </h3>
                        <p className="text-[#7124a8] text-xs font-medium mb-1">
                          {influencer.content_type}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {influencer.city}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {influencer.instagram_followers}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center text-green-600 text-xs font-medium mb-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {influencer.instagram_engagement_rate}
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Packages Section */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Premium Packages</h2>
            <Link href="/packages" className="text-[#7124a8] text-sm font-medium flex items-center">
              See All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {isLoadingPackages ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-5 bg-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={`/packages`}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors ${
                        pkg.category === 'Professional' ? 'ring-2 ring-[#7124a8]' : ''
                      }`}
                    >
                      {/* Popular Badge */}
                      {pkg.category === 'Professional' && (
                        <div className="bg-[#7124a8] text-white text-center py-1 px-3 rounded-full text-xs font-medium mb-3 w-fit">
                          🔥 Most Popular
                        </div>
                      )}

                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-[#7124a8] flex items-center justify-center text-white">
                          <span className="text-lg">{pkg.icon}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {pkg.title}
                            </h3>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                {pkg.price}
                              </div>
                              <div className="text-xs text-gray-500">
                                /month
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                            {pkg.description}
                          </p>
                          
                          {/* Features */}
                          {pkg.features && (
                            <div className="space-y-1">
                              {pkg.features.slice(0, 2).map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <div className="w-3 h-3 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="w-2 h-2 text-green-600" />
                                  </div>
                                  <span className="text-xs text-gray-700">{feature}</span>
                                </div>
                              ))}
                              {pkg.features.length > 2 && (
                                <div className="text-xs text-gray-500 ml-5">
                                  +{pkg.features.length - 2} more features
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Testimonials or Recommendations Section */}
        <section className="px-4 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us?</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#7124a8]">500+</div>
                <div className="text-gray-600 text-xs">Influencers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#7124a8]">10M+</div>
                <div className="text-gray-600 text-xs">Reach</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#7124a8]">98%</div>
                <div className="text-gray-600 text-xs">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </MobileLayout>
  );
};

export default MobileHomePage;