'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const influencersData = [
  {
    id: 1,
    name: 'Khansa Mariska',
    contentType: 'Lifestyle & Fashion',
    instagram: '@khansa_mariska',
    followers: '76.8K',
    city: 'Jakarta',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=680&h=1020&fit=crop&crop=center',
    engagementRate: '6.7%'
  },
  {
    id: 2,
    name: 'Rina Salsabila',
    contentType: 'Beauty & Skincare',
    instagram: '@rinasalsabila',
    followers: '92.3K',
    city: 'Bandung',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=680&h=1020&fit=crop&crop=center',
    engagementRate: '8.2%'
  },
  {
    id: 3,
    name: 'Dimas Anggara',
    contentType: 'Tech & Gaming',
    instagram: '@dimasanggara',
    followers: '154.7K',
    city: 'Surabaya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=680&h=1020&fit=crop&crop=center',
    engagementRate: '5.4%'
  },
  {
    id: 4,
    name: 'Sarah Octavia',
    contentType: 'Travel & Food',
    instagram: '@sarahoctavia',
    followers: '128.9K',
    city: 'Bali',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=680&h=1020&fit=crop&crop=center',
    engagementRate: '7.1%'
  },
  {
    id: 5,
    name: 'Arya Pratama',
    contentType: 'Fitness & Health',
    instagram: '@aryapratama',
    followers: '67.2K',
    city: 'Yogyakarta',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=680&h=1020&fit=crop&crop=center',
    engagementRate: '9.3%'
  },
  {
    id: 6,
    name: 'Luna Maharani',
    contentType: 'Art & Creative',
    instagram: '@lunamaharani',
    followers: '203.4K',
    city: 'Medan',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=680&h=1020&fit=crop&crop=center',
    engagementRate: '4.8%'
  }
];

export default function RecommendedInfluencer() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  
  const visibleInfluencers = influencersData.slice(startIndex, startIndex + 4);

  const nextInfluencers = () => {
    setStartIndex(prev => 
      prev + 4 >= influencersData.length ? 0 : prev + 4
    );
  };

  const prevInfluencers = () => {
    setStartIndex(prev => 
      prev === 0 ? Math.max(0, influencersData.length - 4) : prev - 4
    );
  };

  const getProfilePosition = (index: number, hoveredIndex: number) => {
    if (index === hoveredIndex) {
      return { x: 0, scale: 1.1, opacity: 1 };
    }
    
    if (index < hoveredIndex) {
      return { x: -120, scale: 0.8, opacity: 0.3 };
    } else {
      return { x: 120, scale: 0.8, opacity: 0.3 };
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Recommended Influencer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover top-performing influencers perfect for your brand collaboration
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex justify-center items-center min-h-[500px] relative">
            <div className="flex items-center justify-center space-x-8 relative">
              {visibleInfluencers.map((influencer, index) => (
                <div key={influencer.id} className="relative">
                  <motion.div
                    className="relative"
                    animate={hoveredIndex !== null ? getProfilePosition(index, hoveredIndex) : { x: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Link href={`/influencer/${influencer.id}`}>
                      <div 
                        className="w-32 h-48 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg cursor-pointer relative z-10 group"
                        style={{
                          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
                          style={{
                            aspectRatio: '680/1020'
                          }}
                        />
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-400"
                          style={{
                            opacity: hoveredIndex === index ? '1' : '0'
                          }}
                        />
                        <div 
                          className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full transition-transform duration-400"
                          style={{
                            transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(100%)'
                          }}
                        >
                          <h4 className="font-semibold text-sm mb-1">{influencer.name}</h4>
                          <p className="text-xs opacity-90">{influencer.contentType}</p>
                        </div>
                      </div>
                    </Link>

                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, x: 30, scale: 0.9 }}
                          animate={{ opacity: 1, x: 100, scale: 1 }}
                          exit={{ opacity: 0, x: 30, scale: 0.9 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute top-0 left-0 z-20"
                        >
                          <Card className="w-80 bg-white dark:bg-gray-900 shadow-xl border-2 border-[#7124A8]/20">
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4 mb-4">
                                <div className="w-16 h-24 rounded-xl overflow-hidden border-2 border-[#7124A8]/20 flex-shrink-0">
                                  <img
                                    src={influencer.avatar}
                                    alt={influencer.name}
                                    className="w-full h-full object-cover"
                                    style={{
                                      aspectRatio: '680/1020'
                                    }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                    {influencer.name}
                                  </h3>
                                  <p className="text-[#7124A8] font-medium text-sm mb-2">
                                    {influencer.contentType}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                  <Instagram className="w-4 h-4 mr-2 text-[#7124A8]" />
                                  <span className="font-medium">{influencer.instagram}</span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <Users className="w-4 h-4 mr-2 text-[#7124A8]" />
                                    <span>{influencer.followers} Followers</span>
                                  </div>
                                  <div className="text-sm font-semibold text-green-600">
                                    {influencer.engagementRate} Engagement
                                  </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
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
                </div>
              ))}
            </div>

            {/* Navigation arrows - only show when hovering */}
            <AnimatePresence>
              {hoveredIndex !== null && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute left-4"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevInfluencers}
                      className="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute right-4"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextInfluencers}
                      className="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(influencersData.length / 4) }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(startIndex / 4) === pageIndex
                    ? 'bg-[#7124A8] w-8' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                onClick={() => setStartIndex(pageIndex * 4)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}