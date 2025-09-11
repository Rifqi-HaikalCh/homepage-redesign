'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import SecondaryHeader from '@/components/secondary-header';

const influencersData = [
  {
    id: 1,
    name: 'Khansa Mariska',
    contentType: 'Lifestyle & Fashion',
    city: 'Jakarta',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=680&h=1020&fit=crop&crop=center',
    instagram: {
      handle: 'khansa_mariska',
      followers: '76.8K',
      engagementRate: '6.7%',
      avgLikes: '5.1K',
      avgComments: '24'
    },
    tiktok: {
      handle: '@khansamariskaa',
      followers: '271.8K',
      engagementRate: '4.8%',
      avgLikes: '12.1K',
      avgViews: '105.6K'
    }
  },
  {
    id: 2,
    name: 'Rina Salsabila',
    contentType: 'Beauty & Skincare',
    city: 'Bandung',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=680&h=1020&fit=crop&crop=center',
    instagram: {
      handle: 'rinasalsabila',
      followers: '92.3K',
      engagementRate: '8.2%',
      avgLikes: '7.6K',
      avgComments: '45'
    },
    tiktok: {
      handle: '@rinasalsabila_',
      followers: '189.4K',
      engagementRate: '6.1%',
      avgLikes: '11.5K',
      avgViews: '87.3K'
    }
  },
  {
    id: 3,
    name: 'Dimas Anggara',
    contentType: 'Tech & Gaming',
    city: 'Surabaya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=680&h=1020&fit=crop&crop=center',
    instagram: {
      handle: 'dimasanggara',
      followers: '154.7K',
      engagementRate: '5.4%',
      avgLikes: '8.3K',
      avgComments: '67'
    },
    tiktok: {
      handle: '@dimasanggara_tech',
      followers: '425.9K',
      engagementRate: '7.2%',
      avgLikes: '30.7K',
      avgViews: '178.2K'
    }
  },
  {
    id: 4,
    name: 'Sarah Octavia',
    contentType: 'Travel & Food',
    city: 'Bali',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=680&h=1020&fit=crop&crop=center',
    instagram: {
      handle: 'sarahoctavia',
      followers: '128.9K',
      engagementRate: '7.1%',
      avgLikes: '9.2K',
      avgComments: '54'
    },
    tiktok: {
      handle: '@sarahoctavia_travel',
      followers: '312.6K',
      engagementRate: '5.9%',
      avgLikes: '18.4K',
      avgViews: '142.8K'
    }
  },
  {
    id: 5,
    name: 'Arya Pratama',
    contentType: 'Fitness & Health',
    city: 'Yogyakarta',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=680&h=1020&fit=crop&crop=center',
    instagram: {
      handle: 'aryapratama',
      followers: '67.2K',
      engagementRate: '9.3%',
      avgLikes: '6.2K',
      avgComments: '38'
    },
    tiktok: {
      handle: '@aryapratama_fit',
      followers: '156.8K',
      engagementRate: '8.4%',
      avgLikes: '13.2K',
      avgViews: '95.4K'
    }
  },
  {
    id: 6,
    name: 'Luna Maharani',
    contentType: 'Art & Creative',
    city: 'Medan',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=680&h=1020&fit=crop&crop=center',
    instagram: {
      handle: 'lunamaharani',
      followers: '203.4K',
      engagementRate: '4.8%',
      avgLikes: '9.8K',
      avgComments: '72'
    },
    tiktok: {
      handle: '@lunamaharani_art',
      followers: '387.2K',
      engagementRate: '6.3%',
      avgLikes: '24.4K',
      avgViews: '198.7K'
    }
  }
];

export default function InfluencerDetail() {
  const params = useParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  useEffect(() => {
    const id = parseInt(params.id as string);
    const index = influencersData.findIndex(inf => inf.id === id);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [params.id]);

  const handleInfluencerSelect = (index: number) => {
    const newDirection = index > selectedIndex ? 1 : -1;
    setDirection(newDirection);
    setSelectedIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const selectedInfluencer = influencersData[selectedIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
      {/* Glossy Glass Background Effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10">
        <SecondaryHeader title="Influencer Detail" backUrl="/influencer" />
      </div>

      {/* 3D Coverflow Carousel */}
      <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 dark:from-black dark:via-gray-900 dark:to-purple-950 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative h-80 flex items-center justify-center perspective-1000">
            <div className="relative w-full max-w-6xl flex items-center justify-center">
              {influencersData.map((influencer, index) => {
                const offset = index - selectedIndex;
                const isActive = index === selectedIndex;
                
                // Calculate position and styling based on offset from center
                const getCardTransform = () => {
                  if (offset === 0) {
                    // Active card - center position
                    return {
                      transform: 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)',
                      zIndex: 50,
                      opacity: 1,
                      filter: 'brightness(1) contrast(1.1)'
                    };
                  } else if (Math.abs(offset) === 1) {
                    // Adjacent cards
                    const direction = offset > 0 ? 1 : -1;
                    return {
                      transform: `translateX(${direction * 180}px) translateZ(-100px) rotateY(${-direction * 45}deg) scale(0.8)`,
                      zIndex: 40,
                      opacity: 0.7,
                      filter: 'brightness(0.8)'
                    };
                  } else if (Math.abs(offset) === 2) {
                    // Second level cards
                    const direction = offset > 0 ? 1 : -1;
                    return {
                      transform: `translateX(${direction * 320}px) translateZ(-200px) rotateY(${-direction * 60}deg) scale(0.6)`,
                      zIndex: 30,
                      opacity: 0.4,
                      filter: 'brightness(0.6)'
                    };
                  } else {
                    // Hidden cards
                    const direction = offset > 0 ? 1 : -1;
                    return {
                      transform: `translateX(${direction * 400}px) translateZ(-300px) rotateY(${-direction * 75}deg) scale(0.4)`,
                      zIndex: 20,
                      opacity: 0,
                      filter: 'brightness(0.4)'
                    };
                  }
                };

                const cardStyle = getCardTransform();

                return (
                  <motion.div
                    key={influencer.id}
                    className="absolute cursor-pointer"
                    style={{
                      ...cardStyle,
                      transformStyle: 'preserve-3d',
                    }}
                    animate={cardStyle}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={isActive ? {} : { 
                      scale: isActive ? 1.05 : Math.abs(offset) === 1 ? 0.85 : 0.65 
                    }}
                    onClick={() => handleInfluencerSelect(index)}
                  >
                    <div className="relative w-48 h-64 group">
                      {/* Card Background with Glow Effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br transition-all duration-500 ${
                        isActive 
                          ? 'from-purple-500/20 via-pink-500/20 to-blue-500/20 shadow-2xl shadow-purple-500/25' 
                          : 'from-gray-700/50 to-gray-800/50 shadow-lg'
                      }`} />
                      
                      {/* Premium Shine Effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-white/5 transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-30'
                      }`} />
                      
                      {/* Image Container */}
                      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="w-full h-full object-cover transition-all duration-500"
                          style={{ aspectRatio: '680/1020' }}
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Content Overlay - Only show on active card */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              className="absolute bottom-0 left-0 right-0 p-6 text-white"
                            >
                              <h3 className="text-xl font-bold mb-1 font-sans">
                                {influencer.name}
                              </h3>
                              <p className="text-purple-300 text-sm font-medium mb-2 font-sans">
                                {influencer.contentType}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-300 font-sans">
                                  {influencer.city}
                                </span>
                                <div className="px-3 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full border border-purple-400/30">
                                  <span className="text-xs font-semibold text-purple-200 font-sans">
                                    Available
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      {/* Active Card Ring Effect */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute -inset-2 rounded-3xl border-2 border-purple-400/30 animate-pulse"
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => handleInfluencerSelect(selectedIndex > 0 ? selectedIndex - 1 : influencersData.length - 1)}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors" />
            </button>

            <button
              onClick={() => handleInfluencerSelect(selectedIndex < influencersData.length - 1 ? selectedIndex + 1 : 0)}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {influencersData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleInfluencerSelect(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-purple-400 w-8 shadow-lg shadow-purple-400/50'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="py-8 bg-[#F5F7FA] dark:bg-gray-950 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={selectedIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
              >
                <div className="grid lg:grid-cols-4 gap-6">
                  {/* Left Column - Profile & Information */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Profile Card */}
                    <Card className="bg-white dark:bg-gray-900 shadow-sm border-0 rounded-2xl">
                      <CardContent className="p-6 text-center">
                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 mb-4 shadow-md">
                          <img
                            src={selectedInfluencer.avatar}
                            alt={selectedInfluencer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1 font-sans">
                          {selectedInfluencer.name}
                        </h2>
                        <p className="text-[#7124A8] font-medium text-sm mb-6 font-sans">
                          {selectedInfluencer.contentType}
                        </p>
                        <Button className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white rounded-xl py-3 font-semibold font-sans transition-all duration-300 shadow-md hover:shadow-lg">
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Information Card */}
                    <Card className="bg-white dark:bg-gray-900 shadow-sm border-0 rounded-2xl">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 font-sans">Information:</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 font-sans">Nama Lengkap</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-white font-sans">{selectedInfluencer.name}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 font-sans">Kota Asal</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-white font-sans">{selectedInfluencer.city}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 font-sans">Status</span>
                            <span className="text-sm font-semibold text-green-600 font-sans">Available</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Section - Service Cards & Portfolio */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* Service Cards Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Instagram Summary Card */}
                      <Card className="bg-white dark:bg-gray-900 shadow-sm border-0 rounded-2xl">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <Instagram className="w-5 h-5 text-[#E4405F] mr-2" />
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white font-sans">
                              Summary Instagram
                            </h3>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#7124A8] font-sans">
                                @{selectedInfluencer.instagram.handle}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 font-sans">Followers</div>
                                <div className="text-xl font-bold text-gray-800 dark:text-white font-sans">
                                  {selectedInfluencer.instagram.followers}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 font-sans">Engagement Rate</div>
                                <div className="text-xl font-bold text-green-600 font-sans">
                                  {selectedInfluencer.instagram.engagementRate}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 font-sans">Average Like</div>
                                <div className="text-lg font-bold text-gray-800 dark:text-white font-sans">
                                  {selectedInfluencer.instagram.avgLikes}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 font-sans">Average Comment</div>
                                <div className="text-lg font-bold text-gray-800 dark:text-white font-sans">
                                  {selectedInfluencer.instagram.avgComments}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* TikTok Summary Card */}
                      <Card className="bg-white dark:bg-gray-900 shadow-sm border-0 rounded-2xl">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-5 h-5 bg-black dark:bg-white rounded-sm mr-2 flex items-center justify-center">
                              <span className="text-white dark:text-black text-xs font-bold">T</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white font-sans">
                              Summary TikTok
                            </h3>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#7124A8] font-sans">
                                {selectedInfluencer.tiktok.handle}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 font-sans">Followers</div>
                                <div className="text-xl font-bold text-gray-800 dark:text-white font-sans">
                                  {selectedInfluencer.tiktok.followers}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 font-sans">Engagement Rate</div>
                                <div className="text-xl font-bold text-green-600 font-sans">
                                  {selectedInfluencer.tiktok.engagementRate}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 font-sans">Average Like</div>
                                <div className="text-lg font-bold text-gray-800 dark:text-white font-sans">
                                  {selectedInfluencer.tiktok.avgLikes}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 font-sans">Average View</div>
                                <div className="text-lg font-bold text-gray-800 dark:text-white font-sans">
                                  {selectedInfluencer.tiktok.avgViews}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Portfolio Card */}
                    <Card className="bg-white dark:bg-gray-900 shadow-sm border-0 rounded-2xl">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 font-sans">Portfolio</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          {/* Portfolio items - placeholder for now */}
                          {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                  <span className="text-gray-400 dark:text-gray-500 text-sm font-sans">#{item}</span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-sans">Portfolio {item}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}