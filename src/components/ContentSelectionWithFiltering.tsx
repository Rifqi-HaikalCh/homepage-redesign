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
    'food': ['Food & Travel', 'Food & Beverages'],
    'tech': ['Tech & Gaming', 'Technology'],
    'entertainment': ['Music & Entertainment', 'Entertainment'],
    'lifestyle': ['Lifestyle & Fashion'],
    'health': ['Beauty & Health', 'Health & Sport'],
    'sports': ['Sports & Fitness'],
    'photo': ['Photography'],
    'education': ['Education'],
    'art': ['Art & Design']
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
 * 
 * Features:
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="group"
    >
      <Link href={`/influencer/${influencer.id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 ${
            variant === 'desktop' ? 'p-6' : 'p-4'
          }`}
        >
          {/* Avatar dan basic info */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <img
                src={influencer.avatar}
                alt={influencer.name}
                className={`rounded-2xl object-cover ${
                  variant === 'desktop' ? 'w-16 h-16' : 'w-12 h-12'
                }`}
              />
              <div className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold text-gray-900 mb-1 ${
                variant === 'desktop' ? 'text-lg' : 'text-base'
              }`}>
                {influencer.name}
              </h3>
              <p className="text-[#7124a8] text-sm font-medium">
                {influencer.content_type}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-gray-600">
                <Instagram className="w-4 h-4 mr-2" />
                @{influencer.instagram_handle}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-blue-600 font-medium">
                <Users className="w-4 h-4 mr-1" />
                {influencer.instagram_followers}
              </span>
              <span className="flex items-center text-green-600 font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                {influencer.instagram_engagement_rate}
              </span>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#7124a8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-200">
              <Eye className="w-5 h-5 text-[#7124a8]" />
            </div>
          </div>
        </motion.div>
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
                    : `Influencer ${selectedCategory === 'food' ? 'Food & Travel' :
                        selectedCategory === 'tech' ? 'Tech & Gaming' :
                        selectedCategory === 'entertainment' ? 'Entertainment' :
                        selectedCategory === 'lifestyle' ? 'Lifestyle & Fashion' :
                        selectedCategory === 'health' ? 'Beauty & Health' :
                        selectedCategory === 'sports' ? 'Sports & Fitness' :
                        selectedCategory === 'photo' ? 'Photography' :
                        selectedCategory === 'education' ? 'Education' :
                        selectedCategory === 'art' ? 'Art & Design' : selectedCategory
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