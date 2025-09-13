'use client';

import { useState, useEffect } from 'react';
import useMobileView from '@/hooks/useMobileView';
import MobileInfluencerDetailPage from '@/components/mobile/MobileInfluencerDetailPage';

// Desktop components
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, ChevronLeft, ChevronRight, Music, MapPin, Users, Heart, MessageCircle, Eye, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import SecondaryHeader from '@/components/secondary-header';

interface Influencer {
  id: number;
  name: string;
  content_type: string;
  city: string;
  avatar: string;
  instagram_handle: string;
  instagram_followers: string;
  instagram_engagement_rate: string;
  instagram_avg_likes: string;
  instagram_avg_comments: string;
  tiktok_handle?: string;
  tiktok_followers?: string;
  tiktok_engagement_rate?: string;
  tiktok_avg_likes?: string;
  tiktok_avg_views?: string;
  services: string[] | null;
  portfolio: Array<{
    id: string;
    title: string;
    image_url: string;
    description?: string;
  }> | null;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

const DesktopInfluencerDetail = () => {
  const params = useParams();
  const [influencersData, setInfluencersData] = useState<Influencer[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch('/api/influencers');
        if (response.ok) {
          const data = await response.json();
          setInfluencersData(data);
          
          // Find the specific influencer by ID
          const id = parseInt(params.id as string);
          const index = data.findIndex((inf: Influencer) => inf.id === id);
          if (index !== -1) {
            setSelectedIndex(index);
          }
        } else {
          setInfluencersData([]);
        }
      } catch (error) {
        console.error('Error fetching influencers:', error);
        setInfluencersData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencers();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950">
        <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
        <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
        
        <div className="relative z-10">
          <SecondaryHeader title="Loading..." backUrl="/influencer" />
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (influencersData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950">
        <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
        <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
        
        <div className="relative z-10">
          <SecondaryHeader title="Influencer Detail" backUrl="/influencer" />
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Data Tidak Ditemukan
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Belum ada data influencer yang tersedia
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                    return {
                      transform: 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)',
                      zIndex: 10,
                      opacity: 1
                    };
                  } else if (offset === 1) {
                    return {
                      transform: 'translateX(200px) translateZ(-100px) rotateY(-25deg) scale(0.85)',
                      zIndex: 5,
                      opacity: 0.7
                    };
                  } else if (offset === -1) {
                    return {
                      transform: 'translateX(-200px) translateZ(-100px) rotateY(25deg) scale(0.85)',
                      zIndex: 5,
                      opacity: 0.7
                    };
                  } else if (offset === 2) {
                    return {
                      transform: 'translateX(350px) translateZ(-200px) rotateY(-35deg) scale(0.7)',
                      zIndex: 2,
                      opacity: 0.5
                    };
                  } else if (offset === -2) {
                    return {
                      transform: 'translateX(-350px) translateZ(-200px) rotateY(35deg) scale(0.7)',
                      zIndex: 2,
                      opacity: 0.5
                    };
                  } else {
                    return {
                      transform: offset > 0 
                        ? 'translateX(500px) translateZ(-300px) rotateY(-45deg) scale(0.5)'
                        : 'translateX(-500px) translateZ(-300px) rotateY(45deg) scale(0.5)',
                      zIndex: 1,
                      opacity: 0.3
                    };
                  }
                };

                const cardStyle = getCardTransform();

                return (
                  <motion.div
                    key={influencer.id}
                    className="absolute w-48 h-72 cursor-pointer"
                    style={{
                      ...cardStyle,
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onClick={() => handleInfluencerSelect(index)}
                    whileHover={isActive ? { scale: 1.05 } : {}}
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl relative group">
                      <img
                        src={influencer.avatar}
                        alt={influencer.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h4 className="font-semibold text-sm mb-1">{influencer.name}</h4>
                        <p className="text-xs opacity-90">{influencer.content_type}</p>
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 ring-4 ring-purple-400/50 rounded-2xl" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleInfluencerSelect(Math.max(0, selectedIndex - 1))}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex gap-2">
              {influencersData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleInfluencerSelect(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === selectedIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleInfluencerSelect(Math.min(influencersData.length - 1, selectedIndex + 1))}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Detailed Info Section */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={selectedIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="py-16 bg-white dark:bg-gray-900"
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card className="bg-white dark:bg-gray-800 shadow-2xl border border-gray-200/50 dark:border-gray-700/30 rounded-3xl overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 mb-6 shadow-lg">
                      <img
                        src={selectedInfluencer.avatar}
                        alt={selectedInfluencer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {selectedInfluencer.name}
                    </h1>
                    <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-6">
                      {selectedInfluencer.content_type}
                    </p>
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 text-sm mb-6">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedInfluencer.city}
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3">
                      Contact Influencer
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Stats Section */}
              <div className="lg:col-span-3 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Instagram Card */}
                  <Card className="bg-white dark:bg-gray-800 shadow-2xl border border-gray-200/50 dark:border-gray-700/30 rounded-3xl">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <Instagram className="w-6 h-6 text-pink-500 mr-3" />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          Instagram Stats
                        </h3>
                      </div>
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            @{selectedInfluencer.instagram_handle}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Users className="w-4 h-4 text-gray-500 mr-1" />
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Followers</div>
                            </div>
                            <div className="text-xl font-bold text-gray-800 dark:text-white">{selectedInfluencer.instagram_followers}</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Zap className="w-4 h-4 text-gray-500 mr-1" />
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Engagement</div>
                            </div>
                            <div className="text-xl font-bold text-green-600">{selectedInfluencer.instagram_engagement_rate}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Heart className="w-4 h-4 text-gray-500 mr-1" />
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg Likes</div>
                            </div>
                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedInfluencer.instagram_avg_likes}</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <MessageCircle className="w-4 h-4 text-gray-500 mr-1" />
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg Comments</div>
                            </div>
                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedInfluencer.instagram_avg_comments}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* TikTok Stats or Services */}
                  <Card className="bg-white dark:bg-gray-800 shadow-2xl border border-gray-200/50 dark:border-gray-700/30 rounded-3xl">
                    <CardContent className="p-8">
                      {selectedInfluencer.tiktok_handle ? (
                        <>
                          <div className="flex items-center mb-6">
                            <Music className="w-6 h-6 text-black mr-3" />
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                              TikTok Stats
                            </h3>
                          </div>
                          <div className="text-center mb-6">
                            <div className="text-lg font-bold text-black dark:text-white">
                              @{selectedInfluencer.tiktok_handle}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Users className="w-4 h-4 text-gray-500 mr-1" />
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Followers</div>
                              </div>
                              <div className="text-xl font-bold text-gray-800 dark:text-white">{selectedInfluencer.tiktok_followers || 'N/A'}</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Zap className="w-4 h-4 text-gray-500 mr-1" />
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Engagement</div>
                              </div>
                              <div className="text-xl font-bold text-green-600">{selectedInfluencer.tiktok_engagement_rate || 'N/A'}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Heart className="w-4 h-4 text-gray-500 mr-1" />
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg Likes</div>
                              </div>
                              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedInfluencer.tiktok_avg_likes || 'N/A'}</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Eye className="w-4 h-4 text-gray-500 mr-1" />
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg Views</div>
                              </div>
                              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedInfluencer.tiktok_avg_views || 'N/A'}</div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                            Services Available
                          </h3>
                          <div className="space-y-3">
                            {selectedInfluencer.services && selectedInfluencer.services.length > 0 ? (
                              selectedInfluencer.services.map((service, index) => (
                                <div key={index} className="flex justify-between items-center py-2">
                                  <span className="text-gray-600 dark:text-gray-400">{service}</span>
                                  <span className="text-green-600 font-semibold">Available</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-center text-gray-500 dark:text-gray-400">
                                <p>No specific services listed</p>
                                <p className="text-sm mt-2">Contact for available collaboration options</p>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default function InfluencerDetail() {
  const isMobile = useMobileView();

  if (isMobile) {
    return <MobileInfluencerDetailPage />;
  }

  return <DesktopInfluencerDetail />;
}