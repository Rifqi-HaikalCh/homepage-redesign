'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const influencersData = [
  { id: 1, name: 'Khansa Mariska', contentType: 'Lifestyle & Fashion', instagram: '@khansa_mariska', followers: '76.8K', city: 'Jakarta', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=680&h=1020&fit=crop&crop=center', engagementRate: '6.7%' },
  { id: 2, name: 'Rina Salsabila', contentType: 'Beauty & Skincare', instagram: '@rinasalsabila', followers: '92.3K', city: 'Bandung', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=680&h=1020&fit=crop&crop=center', engagementRate: '8.2%' },
  { id: 3, name: 'Dimas Anggara', contentType: 'Tech & Gaming', instagram: '@dimasanggara', followers: '154.7K', city: 'Surabaya', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=680&h=1020&fit=crop&crop=center', engagementRate: '5.4%' },
  { id: 4, name: 'Sarah Octavia', contentType: 'Travel & Food', instagram: '@sarahoctavia', followers: '128.9K', city: 'Bali', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=680&h=1020&fit=crop&crop=center', engagementRate: '7.1%' },
  { id: 5, name: 'Arya Pratama', contentType: 'Fitness & Health', instagram: '@aryapratama', followers: '67.2K', city: 'Yogyakarta', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=680&h=1020&fit=crop&crop=center', engagementRate: '9.3%' },
  { id: 6, name: 'Luna Maharani', contentType: 'Art & Creative', instagram: '@lunamaharani', followers: '203.4K', city: 'Medan', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=680&h=1020&fit=crop&crop=center', engagementRate: '4.8%' }
];

export default function RecommendedInfluencer() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % influencersData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const nextInfluencer = () => {
    setCurrentIndex(prev => (prev + 1) % influencersData.length);
  };

  const prevInfluencer = () => {
    setCurrentIndex(prev => (prev - 1 + influencersData.length) % influencersData.length);
  };

  const getInfluencerStyle = (index: number) => {
    const position = (index - currentIndex + influencersData.length) % influencersData.length;
    
    if (position === 0) {
      // Center (main)
      return {
        transform: 'translateX(0px) translateZ(0px) scale(1.2)',
        zIndex: 30,
        opacity: 1
      };
    } else if (position === 1 || position === influencersData.length - 1) {
      // Adjacent
      const translateX = position === 1 ? 180 : -180;
      return {
        transform: `translateX(${translateX}px) translateZ(-100px) scale(0.8) rotateY(${position === 1 ? '-25deg' : '25deg'})`,
        zIndex: 20,
        opacity: 0.7
      };
    } else if (position === 2 || position === influencersData.length - 2) {
      // Far sides
      const translateX = position === 2 ? 300 : -300;
      return {
        transform: `translateX(${translateX}px) translateZ(-200px) scale(0.6) rotateY(${position === 2 ? '-45deg' : '45deg'})`,
        zIndex: 10,
        opacity: 0.4
      };
    } else {
      // Hidden
      return {
        transform: 'translateX(0px) translateZ(-300px) scale(0.4)',
        zIndex: 5,
        opacity: 0
      };
    }
  };


  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Recommended Influencer
            </h2>
            <Link href="/influencer">
              <Button variant="outline" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Lihat Semua
              </Button>
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Discover top-performing influencers perfect for your brand collaboration
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto" style={{ perspective: '1000px' }}>
          <div className="flex justify-center items-center min-h-[400px] relative overflow-hidden">
            <div className="relative w-full flex justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {influencersData.map((influencer, index) => (
                <motion.div
                  key={influencer.id}
                  className="absolute"
                  style={getInfluencerStyle(index)}
                  animate={getInfluencerStyle(index)}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  onMouseEnter={() => {
                    setIsAutoRotating(false);
                    if ((index - currentIndex + influencersData.length) % influencersData.length === 0) {
                      setHoveredIndex(index);
                    }
                  }}
                  onMouseLeave={() => {
                    setIsAutoRotating(true);
                    setHoveredIndex(null);
                  }}
                >
                  <Link href={`/influencer/${influencer.id}`}>
                    <div className="w-40 h-60 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl cursor-pointer relative group">
                      <img 
                        src={influencer.avatar} 
                        alt={influencer.name} 
                        className="w-full h-full object-cover transition-all duration-500 ease-out" 
                        style={{ aspectRatio: '680/1020' }} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h4 className="font-semibold text-sm mb-1">{influencer.name}</h4>
                        <p className="text-xs opacity-90">{influencer.contentType}</p>
                      </div>
                    </div>
                  </Link>

                  <AnimatePresence>
                    {hoveredIndex === index && (index - currentIndex + influencersData.length) % influencersData.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: 200, scale: 0.8 }}
                        animate={{ opacity: 1, x: 200, scale: 1 }}
                        exit={{ opacity: 0, x: 200, scale: 0.8 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute left-full top-0 z-40 ml-4"
                      >
                        <Card className="w-72 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30">
                          <CardContent className="p-5">
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                {influencer.name}
                              </h3>
                              <p className="text-[#7124A8] font-medium text-sm mb-3">
                                {influencer.contentType}
                              </p>
                            </div>
                            
                            <div className="space-y-3 mb-5">
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <Instagram className="w-4 h-4 mr-2 text-[#7124A8]" />
                                <span className="font-medium">{influencer.instagram}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <Users className="w-4 h-4 mr-2 text-[#7124A8]" />
                                <span>{influencer.followers} Followers</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <MapPin className="w-4 h-4 mr-2 text-[#7124A8]" />
                                <span>{influencer.city}</span>
                              </div>
                            </div>
                            
                            <Link href={`/influencer/${influencer.id}`}>
                              <Button className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white">
                                Book Now
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8 space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={prevInfluencer} 
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex space-x-2">
            {influencersData.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-[#7124A8] w-8' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={nextInfluencer} 
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}