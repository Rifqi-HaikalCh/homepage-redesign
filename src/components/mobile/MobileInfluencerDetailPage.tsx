'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share, 
  Heart, 
  Instagram, 
  Music, 
  MapPin, 
  Users, 
  TrendingUp, 
  Eye,
  Star,
  ChevronRight
} from 'lucide-react';
import { useParams } from 'next/navigation';
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
  instagram_avg_likes: string;
  instagram_avg_comments: string;
  tiktok_handle?: string;
  tiktok_followers?: string;
  tiktok_engagement_rate?: string;
  tiktok_avg_likes?: string;
  tiktok_avg_views?: string;
  services?: string[];
  portfolio?: Array<{
    id: string;
    title: string;
    image_url: string;
    description?: string;
  }>[];
  user_id?: string;
  created_at: string;
  updated_at: string;
}

const MobileInfluencerDetailPage = () => {
  const params = useParams();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'services' | 'portfolio'>('stats');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        const response = await fetch('/api/influencers');
        if (response.ok) {
          const data = await response.json();
          const influencerData = data.find((inf: Influencer) => inf.id === parseInt(params.id as string));
          setInfluencer(influencerData);
        }
      } catch (error) {
        console.error('Error fetching influencer:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencer();
  }, [params.id]);

  if (isLoading) {
    return (
      <MobileLayout showBack headerTitle="Loading...">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </MobileLayout>
    );
  }

  if (!influencer) {
    return (
      <MobileLayout showBack headerTitle="Not Found">
        <div className="flex items-center justify-center min-h-[60vh] text-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Influencer not found</h2>
            <p className="text-gray-500">The influencer you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  const tabs = [
    { id: 'stats', label: 'Stats', icon: TrendingUp },
    { id: 'services', label: 'Services', icon: Star },
    { id: 'portfolio', label: 'Portfolio', icon: Eye }
  ];

  return (
    <MobileLayout showBack>
      <div className="space-y-0">
        {/* Hero Section */}
        <section className="relative">
          <div className="aspect-[4/3] bg-gradient-to-br from-purple-400 to-blue-500 relative overflow-hidden">
            <img
              src={influencer.avatar}
              alt={influencer.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className="w-10 h-10 bg-black/20 backdrop-blur-lg rounded-full flex items-center justify-center"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-black/20 backdrop-blur-lg rounded-full flex items-center justify-center"
              >
                <Share className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Basic Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-bold mb-2"
              >
                {influencer.name}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-purple-200 font-medium mb-2"
              >
                {influencer.content_type}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center text-white/80"
              >
                <MapPin className="w-4 h-4 mr-2" />
                <span>{influencer.city}</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="px-4 py-6 bg-white">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {influencer.instagram_followers}
              </div>
              <div className="text-xs text-gray-500 flex items-center justify-center">
                <Users className="w-3 h-3 mr-1" />
                Followers
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {influencer.instagram_engagement_rate}
              </div>
              <div className="text-xs text-gray-500 flex items-center justify-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Engagement
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {influencer.instagram_avg_likes}
              </div>
              <div className="text-xs text-gray-500 flex items-center justify-center">
                <Heart className="w-3 h-3 mr-1" />
                Avg Likes
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="px-4 pb-4 bg-white border-b border-gray-100">
          <div className="flex bg-gray-100 rounded-2xl p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'stats' | 'services' | 'portfolio')}
                  className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Tab Content */}
        <section className="bg-gray-50 min-h-[50vh]">
          <AnimatePresence mode="wait">
            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4 space-y-4"
              >
                {/* Instagram Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <Instagram className="w-6 h-6 text-pink-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Instagram</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">Handle</span>
                      <span className="font-medium text-gray-900">@{influencer.instagram_handle}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">Followers</span>
                      <span className="font-medium text-blue-600">{influencer.instagram_followers}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">Engagement Rate</span>
                      <span className="font-medium text-green-600">{influencer.instagram_engagement_rate}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">Avg Likes</span>
                      <span className="font-medium text-gray-900">{influencer.instagram_avg_likes}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">Avg Comments</span>
                      <span className="font-medium text-gray-900">{influencer.instagram_avg_comments}</span>
                    </div>
                  </div>
                </div>

                {/* TikTok Stats */}
                {influencer.tiktok_handle && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <Music className="w-6 h-6 text-black mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">TikTok</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">Handle</span>
                        <span className="font-medium text-gray-900">@{influencer.tiktok_handle}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">Followers</span>
                        <span className="font-medium text-blue-600">{influencer.tiktok_followers || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">Engagement Rate</span>
                        <span className="font-medium text-green-600">{influencer.tiktok_engagement_rate || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">Avg Likes</span>
                        <span className="font-medium text-gray-900">{influencer.tiktok_avg_likes || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-600">Avg Views</span>
                        <span className="font-medium text-gray-900">{influencer.tiktok_avg_views || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Services</h3>
                  {influencer.services && influencer.services.length > 0 ? (
                    <div className="space-y-3">
                      {influencer.services.map((service, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                        >
                          <span className="font-medium text-gray-900">{service}</span>
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Available
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Star className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                      <p>No specific services listed</p>
                      <p className="text-sm mt-1">Contact for collaboration options</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h3>
                  <div className="text-center py-8 text-gray-500">
                    <Eye className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                    <p>Portfolio coming soon</p>
                    <p className="text-sm mt-1">Check back later for content samples</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Contact CTA */}
        <section className="p-4 bg-gray-50">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Ready to collaborate?</h3>
            <p className="text-purple-100 mb-4 text-sm">
              Get in touch with {influencer.name} to discuss your project
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl flex items-center justify-center"
            >
              Contact Influencer
              <ChevronRight className="w-4 h-4 ml-2" />
            </motion.button>
          </div>
        </section>
      </div>
    </MobileLayout>
  );
};

export default MobileInfluencerDetailPage;