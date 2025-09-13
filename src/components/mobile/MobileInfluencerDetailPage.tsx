'use client';

// React hooks untuk state management dan routing
import { useState, useEffect } from 'react';
// Animasi yang smooth untuk mobile interactions
import { motion, AnimatePresence } from 'framer-motion';
// Icon set yang konsisten untuk UI elements
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
// Next.js navigation untuk routing dinamis
import { useParams } from 'next/navigation';
// Layout wrapper khusus mobile
import MobileLayout from './MobileLayout';

// ======================== TYPE DEFINITIONS ========================
// Interface comprehensive untuk data influencer
interface Influencer {
  id: number;
  name: string;
  content_type: string; // Kategori konten specialty
  city: string; // Lokasi base influencer
  avatar: string; // URL foto profil
  
  // Instagram analytics
  instagram_handle: string;
  instagram_followers: string; // Format: "10.5K", "1.2M"
  instagram_engagement_rate: string; // Format: "3.2%"
  instagram_avg_likes: string;
  instagram_avg_comments: string;
  
  // TikTok analytics (optional)
  tiktok_handle?: string;
  tiktok_followers?: string;
  tiktok_engagement_rate?: string;
  tiktok_avg_likes?: string;
  tiktok_avg_views?: string;
  
  // Business info
  services?: string[]; // Layanan yang ditawarkan
  portfolio?: Array<{
    id: string;
    title: string;
    image_url: string;
    description?: string;
  }>[];
  
  // Metadata
  user_id?: string;
  created_at: string;
  updated_at: string;
}

// Type untuk tab navigation
type TabType = 'stats' | 'services' | 'portfolio';

// ======================== CONSTANTS ========================
// Konfigurasi tab navigation
const TAB_CONFIG = [
  { id: 'stats', label: 'Stats', icon: TrendingUp },
  { id: 'services', label: 'Services', icon: Star },
  { id: 'portfolio', label: 'Portfolio', icon: Eye }
] as const;

// Konfigurasi animasi untuk consistent feel
const ANIMATION_CONFIG = {
  TAB_TRANSITION: { duration: 0.3 },
  STAGGER_DELAY: 0.1,
  HERO_ANIMATION: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  }
} as const;

/**
 * Halaman detail influencer dengan comprehensive profile view
 * 
 * Features:
 * - Hero section dengan foto profil dan basic info
 * - Quick stats grid untuk metrics overview
 * - Tab navigation untuk detailed stats, services, portfolio
 * - Interactive elements (like, share)
 * - Contact CTA untuk collaboration
 */
const MobileInfluencerDetailPage = () => {
  // ======================== ROUTING & PARAMS ========================
  const params = useParams();
  
  // ======================== STATE MANAGEMENT ========================
  // Data states
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI states
  const [activeTab, setActiveTab] = useState<TabType>('stats');
  const [isLiked, setIsLiked] = useState(false); // Local like state

  // ======================== DATA FETCHING ========================
  // Effect untuk fetch influencer data berdasarkan ID dari URL
  useEffect(() => {
    const fetchInfluencerData = async (): Promise<void> => {
      try {
        const response = await fetch('/api/influencers');
        if (response.ok) {
          const allInfluencers: Influencer[] = await response.json();
          const targetInfluencer = allInfluencers.find(
            (inf: Influencer) => inf.id === parseInt(params.id as string)
          );
          setInfluencer(targetInfluencer || null);
        } else {
          console.error('Failed to fetch influencers:', response.status);
        }
      } catch (error) {
        console.error('Error fetching influencer data:', error);
        // TODO: Bisa ditambahkan error state untuk user feedback
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchInfluencerData();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <MobileLayout showBack headerTitle="Loading...">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7124a8]"></div>
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

  // ======================== HELPER FUNCTIONS ========================
  /**
   * Handle tab switching dengan type safety
   */
  const handleTabChange = (tabId: string): void => {
    setActiveTab(tabId as TabType);
  };

  /**
   * Handle share functionality
   * TODO: Implement native sharing API untuk mobile
   */
  const handleShare = (): void => {
    // Future: Native share API atau custom modal
    console.log('Share influencer profile');
  };

  /**
   * Handle like toggle dengan optimistic update
   */
  const toggleLike = (): void => {
    setIsLiked(prev => !prev);
    // TODO: Sync dengan backend untuk persistent likes
  };

  // ======================== RENDER CONDITIONS ========================

  return (
    <MobileLayout showBack>
      <div className="space-y-0">
        {/* Hero Section */}
        <section className="relative">
          <div className="aspect-[4/3] bg-gradient-to-br from-[#7124a8] to-[#7124a8] relative overflow-hidden">
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
                onClick={toggleLike}
                className="w-10 h-10 bg-black/20 backdrop-blur-lg rounded-full flex items-center justify-center transition-colors"
                aria-label={isLiked ? 'Unlike influencer' : 'Like influencer'}
              >
                <Heart className={`w-5 h-5 transition-colors ${
                  isLiked ? 'text-red-500 fill-current' : 'text-white'
                }`} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="w-10 h-10 bg-black/20 backdrop-blur-lg rounded-full flex items-center justify-center"
                aria-label="Share influencer profile"
              >
                <Share className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Basic Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.h1
                {...ANIMATION_CONFIG.HERO_ANIMATION}
                className="text-3xl font-bold mb-2"
              >
                {influencer.name}
              </motion.h1>
              <motion.p
                {...ANIMATION_CONFIG.HERO_ANIMATION}
                transition={{ delay: ANIMATION_CONFIG.STAGGER_DELAY }}
                className="text-white/80 font-medium mb-2"
              >
                {influencer.content_type}
              </motion.p>
              <motion.div
                {...ANIMATION_CONFIG.HERO_ANIMATION}
                transition={{ delay: ANIMATION_CONFIG.STAGGER_DELAY * 2 }}
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
            {TAB_CONFIG.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 relative ${
                    isActive
                      ? 'bg-white text-[#7124a8] shadow-sm'
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
          <div className="bg-gradient-to-r from-[#7124a8] to-[#7124a8] rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Ready to collaborate?</h3>
            <p className="text-white/80 mb-4 text-sm">
              Get in touch with {influencer.name} to discuss your project
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-[#7124a8] font-semibold py-3 rounded-xl flex items-center justify-center"
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