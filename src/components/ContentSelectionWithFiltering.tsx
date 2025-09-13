'use client';

// React hooks untuk state management
import { useState, useEffect, useCallback } from 'react';
// Animasi yang smooth untuk interactions
import { motion, AnimatePresence } from 'framer-motion';
// Icon set yang konsisten
import { 
  Users, 
  Instagram, 
  Eye,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
// Import komponen content selection cards
import ContentSelectionCards from '@/components/ContentSelectionCards';

// ======================== TYPE DEFINITIONS ========================
// Interface untuk data influencer
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
  created_at: string;
  updated_at: string;
}

// Props untuk komponen utama
interface ContentSelectionWithFilteringProps {
  variant?: 'mobile' | 'desktop';
  className?: string;
  showInfluencerResults?: boolean;
  maxInfluencersToShow?: number;
}

// ======================== HELPER FUNCTIONS ========================
// Fungsi untuk filter berdasarkan kategori konten
const filterByCategory = (influencers: Influencer[], category: string): Influencer[] => {
  if (category === 'all') return influencers;
  
  // Mapping kategori ID ke content_type yang sesuai
  const categoryMapping: Record<string, string[]> = {
    'food': ['Food & Beverages'],
    'tech': ['Technology'],
    'entertainment': ['Entertainment'],
    'travel': ['Travel & Lifestyle'],
    'health': ['Health & Sport'],
    'gaming': ['Gaming'],
    'creator': ['Content Creator'],
    'beauty': ['Beauty & Fashion'],
    'youtube': ['Youtuber'],
    'dj-singer': ['DJ & Penyanyi'],
    'tiktok': ['Tiktok'],
    'instagram': ['Instagram'],
    'mom-kids': ['Mom & Kids']
  };
  
  const validTypes = categoryMapping[category] || [];
  
  return influencers.filter(influencer => 
    validTypes.some(type => 
      influencer.content_type.toLowerCase().includes(type.toLowerCase())
    )
  );
};

/**
 * Komponen gabungan content selection dan filtering influencer
 * * Features:
 * - Content selection cards yang interaktif
 * - Real-time filtering influencer berdasarkan kategori
 * - Responsive design untuk mobile dan desktop
 * - Loading states dan empty states
 * - Optimized dengan React.memo dan useCallback
 */
const ContentSelectionWithFiltering = ({
  variant = 'desktop',
  className = '',
  showInfluencerResults = true,
  maxInfluencersToShow = 8
}: ContentSelectionWithFilteringProps) => {

  // ======================== STATE MANAGEMENT ========================
  // Data states
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // ======================== DATA FETCHING ========================
  // Effect untuk fetch influencer data dari API
  useEffect(() => {
    const fetchInfluencers = async (): Promise<void> => {
      try {
        const response = await fetch('/api/influencers');
        if (response.ok) {
          const data: Influencer[] = await response.json();
          setInfluencers(data);
          setFilteredInfluencers(data.slice(0, maxInfluencersToShow));
        } else {
          console.error('Failed to fetch influencers:', response.status);
        }
      } catch (error) {
        console.error('Error fetching influencers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencers();
  }, [maxInfluencersToShow]);

  // ======================== FILTERING LOGIC ========================
  // Optimized filtering dengan useCallback
  const applyFilters = useCallback((category: string): void => {
    const filtered = filterByCategory(influencers, category);
    setFilteredInfluencers(filtered.slice(0, maxInfluencersToShow));
  }, [influencers, maxInfluencersToShow]);

  // Effect untuk apply filters saat kategori berubah
  useEffect(() => {
    applyFilters(selectedCategory);
  }, [selectedCategory, applyFilters]);

  // ======================== EVENT HANDLERS ========================
  /**
   * Handle category selection
   */
  const handleCategorySelect = useCallback((categoryId: string): void => {
    setSelectedCategory(categoryId);
  }, []);

  // ======================== RENDER HELPERS ========================
  /**
   * Render influencer card
   */
  const renderInfluencerCard = (influencer: Influencer, index: number) => (
    <motion.div
      key={influencer.id}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1, y: 0, scale: 1,
          transition: { duration: 0.6, ease: "easeOut" }
        }
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group"
    >
      <Link href={`/influencer/${influencer.id}`}>
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
          <img
            src={influencer.avatar}
            alt={influencer.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ aspectRatio: '680/1020' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 p-4 bg-black/20 backdrop-blur-sm rounded-t-3xl">
            <h3 className="text-lg font-bold text-white text-center drop-shadow-lg">
              {influencer.name}
            </h3>
            <p className="text-white/90 text-xs text-center font-medium drop-shadow-md">
              {influencer.content_type}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-3 border border-white/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Instagram className="w-4 h-4 text-white" />
                  <div>
                    <p className="text-white text-xs font-medium">
                      @{influencer.instagram_handle}
                    </p>
                    <p className="text-white/80 text-xs">
                      {influencer.instagram_followers}
                    </p>
                  </div>
                </div>
                <div className="bg-white hover:bg-gray-50 text-gray-900 text-xs px-3 py-1 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  View Detail
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/5 group-hover:to-pink-400/10 transition-all duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );

  // ======================== MAIN RENDER ========================
  const containerPadding = variant === 'desktop' ? 'py-16' : 'py-8';
  const gridCols = variant === 'desktop' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2';

  return (
    <section className={`${containerPadding} bg-gray-50 ${className}`}>
      <div className={`container mx-auto ${variant === 'desktop' ? 'px-6' : 'px-4'}`}>
        {/* Content Selection Cards */}
        <ContentSelectionCards
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          variant={variant}
          className="mb-12"
        />

        {/* Influencer Results Section */}
        {showInfluencerResults && (
          <div className="mt-12">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className={`font-bold text-gray-900 mb-2 ${
                  variant === 'desktop' ? 'text-2xl' : 'text-xl'
                }`}>
                  {selectedCategory === 'all' 
                    ? 'Semua Influencer' 
                    : `Influencer ${selectedCategory === 'food' ? 'Food & Beverages' :
                        selectedCategory === 'tech' ? 'Technology' :
                        selectedCategory === 'entertainment' ? 'Entertainment' :
                        selectedCategory === 'travel' ? 'Travel & Lifestyle' :
                        selectedCategory === 'health' ? 'Health & Sport' :
                        selectedCategory === 'gaming' ? 'Gaming' :
                        selectedCategory === 'creator' ? 'Content Creator' :
                        selectedCategory === 'beauty' ? 'Beauty & Fashion' :
                        selectedCategory === 'youtube' ? 'Youtuber' :
                        selectedCategory === 'dj-singer' ? 'DJ & Penyanyi' :
                        selectedCategory === 'tiktok' ? 'Tiktok' :
                        selectedCategory === 'instagram' ? 'Instagram' :
                        selectedCategory === 'mom-kids' ? 'Mom & Kids' : selectedCategory
                      }`
                  }
                </h3>
                <p className="text-gray-600">
                  {filteredInfluencers.length} influencer ditemukan
                </p>
              </div>
              <Link 
                href="/influencer" 
                className="text-[#7124a8] font-medium hover:text-[#5a1d87] transition-colors"
              >
                Lihat Semua →
              </Link>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className={`grid ${gridCols} gap-6`}>
                {Array.from({ length: maxInfluencersToShow }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-2xl"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Influencer Grid */}
            {!isLoading && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`grid ${gridCols} gap-6`}
                >
                  {filteredInfluencers.map((influencer, index) =>
                    renderInfluencerCard(influencer, index)
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Empty State */}
            {!isLoading && filteredInfluencers.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Belum ada influencer
                </h3>
                <p className="text-gray-600 mb-6">
                  Belum ada influencer untuk kategori ini. Coba pilih kategori lain.
                </p>
                <button
                  onClick={() => handleCategorySelect('all')}
                  className="bg-[#7124a8] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#5a1d87] transition-colors"
                >
                  Lihat Semua Kategori
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentSelectionWithFiltering;