'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Instagram, TrendingUp, Users, Heart, MessageCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Influencer Detail
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      {/* Top Carousel */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center space-x-6 overflow-x-auto pb-4">
            {influencersData.map((influencer, index) => (
              <motion.div
                key={influencer.id}
                className={`flex-shrink-0 cursor-pointer relative ${
                  index === selectedIndex ? 'z-10' : 'z-0'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleInfluencerSelect(index)}
              >
                <motion.div
                  className={`w-16 h-24 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                    index === selectedIndex
                      ? 'border-[#7124A8] shadow-lg shadow-[#7124A8]/20 scale-110'
                      : 'border-white dark:border-gray-600 scale-90 opacity-70'
                  }`}
                  animate={{
                    scale: index === selectedIndex ? 1.1 : 0.9,
                    opacity: index === selectedIndex ? 1 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-full h-full object-cover"
                    style={{
                      aspectRatio: '680/1020'
                    }}
                  />
                </motion.div>
                
                {index === selectedIndex && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#7124A8] rounded-full"
                    layoutId="selectedIndicator"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto relative overflow-hidden">
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
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Profile Section */}
                  <div className="md:col-span-1">
                    <Card className="bg-white dark:bg-gray-800 shadow-xl">
                      <CardContent className="p-6 text-center">
                        <div className="w-40 h-60 mx-auto rounded-2xl overflow-hidden border-4 border-[#7124A8]/20 mb-4">
                          <img
                            src={selectedInfluencer.avatar}
                            alt={selectedInfluencer.name}
                            className="w-full h-full object-cover"
                            style={{
                              aspectRatio: '680/1020'
                            }}
                          />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {selectedInfluencer.name}
                        </h2>
                        <p className="text-[#7124A8] font-medium mb-4">
                          {selectedInfluencer.contentType}
                        </p>
                        <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 text-sm mb-6">
                          <Users className="w-4 h-4 mr-2" />
                          {selectedInfluencer.city}
                        </div>
                        <Button className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white">
                          Book Collaboration
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Stats Section */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Instagram Stats */}
                    <Card className="bg-white dark:bg-gray-800 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Instagram className="w-6 h-6 text-[#E4405F] mr-3" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Instagram Summary
                          </h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl font-bold text-[#7124A8]">
                              @{selectedInfluencer.instagram.handle}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Handle</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl font-bold text-[#7124A8]">
                              {selectedInfluencer.instagram.followers}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                              <span className="text-lg font-bold text-green-600">
                                {selectedInfluencer.instagram.engagementRate}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Engagement</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <Heart className="w-4 h-4 text-red-500 mr-1" />
                              <span className="text-lg font-bold text-red-500">
                                {selectedInfluencer.instagram.avgLikes}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Avg Likes</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <MessageCircle className="w-4 h-4 text-blue-500 mr-1" />
                              <span className="text-lg font-bold text-blue-500">
                                {selectedInfluencer.instagram.avgComments}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Avg Comments</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* TikTok Stats */}
                    <Card className="bg-white dark:bg-gray-800 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-6 h-6 bg-black dark:bg-white rounded-full mr-3 flex items-center justify-center">
                            <span className="text-white dark:text-black text-xs font-bold">T</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            TikTok Summary
                          </h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl font-bold text-[#7124A8]">
                              {selectedInfluencer.tiktok.handle}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Handle</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl font-bold text-[#7124A8]">
                              {selectedInfluencer.tiktok.followers}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                              <span className="text-lg font-bold text-green-600">
                                {selectedInfluencer.tiktok.engagementRate}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Engagement</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <Heart className="w-4 h-4 text-red-500 mr-1" />
                              <span className="text-lg font-bold text-red-500">
                                {selectedInfluencer.tiktok.avgLikes}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Avg Likes</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <Eye className="w-4 h-4 text-purple-500 mr-1" />
                              <span className="text-lg font-bold text-purple-500">
                                {selectedInfluencer.tiktok.avgViews}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Avg Views</div>
                          </div>
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