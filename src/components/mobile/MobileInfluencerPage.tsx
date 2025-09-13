'use client';

// React hooks untuk state management dan side effects
import { useState, useEffect, useCallback } from 'react';
// Animasi yang smooth untuk mobile interactions
import { motion, AnimatePresence } from 'framer-motion';
// Icon set yang konsisten untuk UI elements
import { Search, Filter, MapPin, Users, TrendingUp, Instagram, X } from 'lucide-react';
// Next.js navigation untuk client-side routing
import Link from 'next/link';
// Layout wrapper khusus mobile
import MobileLayout from './MobileLayout';
import { Button } from '@/components/ui/button';

// ======================== TYPE DEFINITIONS ========================
// Interface untuk data influencer dari API
interface Influencer {
  id: number;
  name: string;
  content_type: string; // Kategori konten yang dibuat
  city: string; // Lokasi influencer
  avatar: string; // URL foto profil
  instagram_handle: string; // Username Instagram tanpa @
  instagram_followers: string; // Format: "10.5K", "1.2M", dll
  created_at: string;
  updated_at: string;
}

// ======================== CONSTANTS ========================
// Kategori konten untuk filtering - mudah maintain dan extend
const CONTENT_CATEGORIES = [
  'All', 
  'Lifestyle & Fashion', 
  'Tech & Gaming', 
  'Food & Travel', 
  'Beauty & Health', 
  'Sports & Fitness', 
  'Music & Entertainment'
] as const;

// Konfigurasi animasi untuk consistent feel
const ANIMATION_CONFIG = {
  STAGGER_DELAY: 0.05, // Delay antar item saat render
  CARD_TRANSITION: 0.3, // Durasi animasi card
  FILTER_ANIMATION: { 
    type: "spring", 
    bounce: 0.2, 
    duration: 0.4 
  }
} as const;

/**
 * Halaman utama untuk eksplorasi influencer
 * * Features:
 * - Real-time search dengan instant results
 * - Multi-filter system (kategori + lokasi)
 * - Sorting berdasarkan jumlah followers
 * - Mobile-optimized dengan smooth animations
 * - Loading states untuk better UX
 */
const MobileInfluencerPage = () => {
  // ======================== STATE MANAGEMENT ========================
  // Data states
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI states
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  // ======================== DATA FETCHING ========================
  // Effect untuk load initial data dari API
  useEffect(() => {
    const fetchInfluencers = async (): Promise<void> => {
      try {
        const response = await fetch('/api/influencers');
        if (response.ok) {
          const data: Influencer[] = await response.json();
          setInfluencers(data);
          setFilteredInfluencers(data); // Initial state sama dengan semua data
        } else {
          console.error('Failed to fetch influencers:', response.status);
        }
      } catch (error) {
        console.error('Error fetching influencers:', error);
        // TODO: Bisa ditambahkan error state untuk user feedback
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  // ======================== DERIVED DATA ========================
  // Extract unique cities untuk city filter options
  const availableCities = [...new Set(influencers.map(inf => inf.city))];

  // ======================== HELPER FUNCTIONS ========================
  /**
   * Parse string follower count ke number untuk sorting
   * Mendukung format: "10.5K", "1.2M", "500", "2.1B"
   */
  const parseFollowerCount = (followerStr: string): number => {
    if (!followerStr) return 0;
    
    const normalizedStr = followerStr.toLowerCase().replace(/[^0-9.kmb]/g, '');
    const baseNumber = parseFloat(normalizedStr);
    
    // Konversi berdasarkan suffix
    if (followerStr.toLowerCase().includes('b')) {
      return baseNumber * 1_000_000_000; // Billion
    } else if (followerStr.toLowerCase().includes('m')) {
      return baseNumber * 1_000_000; // Million
    } else if (followerStr.toLowerCase().includes('k')) {
      return baseNumber * 1_000; // Thousand
    }
    
    return baseNumber || 0;
  };

  /**
   * Advanced filtering dengan multiple criteria
   * Menggunakan fuzzy search untuk better user experience
   */
  const applyFilters = useCallback((data: Influencer[]): Influencer[] => {
    let filtered = [...data];

    // Search query filter - case insensitive, multiple fields
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(influencer => {
        const nameMatch = influencer.name.toLowerCase().includes(query);
        const contentMatch = influencer.content_type.toLowerCase().includes(query);
        const cityMatch = influencer.city.toLowerCase().includes(query);
        const handleMatch = influencer.instagram_handle.toLowerCase().includes(query);
        
        return nameMatch || contentMatch || cityMatch || handleMatch;
      });
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(influencer => 
        influencer.content_type === selectedCategory
      );
    }

    // City filter
    if (selectedCity !== 'All') {
      filtered = filtered.filter(influencer => 
        influencer.city === selectedCity
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedCity]);

  /**
   * Reset semua filter ke state initial
   */
  const clearAllFilters = (): void => {
    setSelectedCategory('All');
    setSelectedCity('All');
    setSearchQuery('');
    setShowFilter(false);
  };

  // ======================== EFFECTS ========================
  // Effect untuk apply filters setiap ada perubahan
useEffect(() => {
    const filtered = applyFilters(influencers);
    setFilteredInfluencers(filtered);
}, [influencers, searchQuery, selectedCategory, selectedCity, applyFilters]);

  return (
    <MobileLayout
      headerTitle="Influencers"
      showSearch
      onSearchClick={() => setShowSearch(true)}
    >
      <div className="space-y-4">
        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-50 flex flex-col"
            >
              <div className="flex items-center p-4 border-b border-gray-200">
                <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search influencers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => setShowSearch(false)}
                  className="ml-4 p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto p-4">
                {searchQuery && (
                  <div className="space-y-3">
                    {filteredInfluencers.map((influencer) => (
                      <Link key={influencer.id} href={`/influencer/${influencer.id}`}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                          onClick={() => setShowSearch(false)}
                        >
                          <img
                            src={influencer.avatar}
                            alt={influencer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{influencer.name}</h3>
                            <p className="text-sm text-gray-500">{influencer.content_type}</p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Section */}
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredInfluencers.length} Influencers
            </h2>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2 px-3 py-2 bg-[#7124a8]/20 text-[#7124a8] rounded-full text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-white rounded-2xl border border-gray-200 p-4"
              >
                <div className="space-y-4">
                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CONTENT_CATEGORIES.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            selectedCategory === category
                              ? 'bg-[#7124a8] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* City Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      City
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCity('All')}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          selectedCity === 'All'
                            ? 'bg-[#7124a8] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        All
                      </button>
                      {availableCities.map((city) => (
                        <button
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            selectedCity === city
                              ? 'bg-[#7124a8] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={clearAllFilters}
                    className="w-full py-2 text-sm text-[#7124a8] font-medium hover:bg-[#7124a8]/5 rounded-lg transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Influencer Grid */}
        <div className="px-4 pb-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredInfluencers
                .sort((a, b) => parseFollowerCount(b.instagram_followers) - parseFollowerCount(a.instagram_followers))
                .map((influencer, index) => (
                <motion.div
                  key={influencer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * ANIMATION_CONFIG.STAGGER_DELAY, 
                    duration: ANIMATION_CONFIG.CARD_TRANSITION 
                  }}
                  className="group"
                >
                  <Link href={`/influencer/${influencer.id}`}>
                    <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
                      <img
                        src={influencer.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=680&h=1020&fit=crop&crop=center'}
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
                                  {influencer.instagram_handle || '@username'}
                                </p>
                                <p className="text-white/80 text-xs">
                                  {influencer.instagram_followers || '0'}
                                </p>
                              </div>
                            </div>
                            <Button 
                              className="bg-white hover:bg-gray-50 text-gray-900 text-xs px-3 py-1 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Detail
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/5 group-hover:to-pink-400/10 transition-all duration-500 pointer-events-none" />
                    </div>
                  </Link>
                </motion.div>
              ))}

              {filteredInfluencers.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No influencers found</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileInfluencerPage;