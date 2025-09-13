'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Users, TrendingUp, Instagram, X } from 'lucide-react';
import Link from 'next/link';
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
  created_at: string;
  updated_at: string;
}

const MobileInfluencerPage = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  // Categories for filtering
  const categories = [
    'All', 'Lifestyle & Fashion', 'Tech & Gaming', 'Food & Travel', 
    'Beauty & Health', 'Sports & Fitness', 'Music & Entertainment'
  ];

  // Fetch influencers
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch('/api/influencers');
        if (response.ok) {
          const data = await response.json();
          setInfluencers(data);
          setFilteredInfluencers(data);
        }
      } catch (error) {
        console.error('Error fetching influencers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  // Filter influencers
  useEffect(() => {
    let filtered = influencers;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        influencer =>
          influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          influencer.content_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          influencer.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(influencer => influencer.content_type === selectedCategory);
    }

    // Filter by city
    if (selectedCity !== 'All') {
      filtered = filtered.filter(influencer => influencer.city === selectedCity);
    }

    setFilteredInfluencers(filtered);
  }, [influencers, searchQuery, selectedCategory, selectedCity]);

  const cities = [...new Set(influencers.map(inf => inf.city))];

  const parseFollowerCount = (followerStr: string): number => {
    if (!followerStr) return 0;
    const numStr = followerStr.toLowerCase().replace(/[^0-9.kmb]/g, '');
    const num = parseFloat(numStr);
    
    if (followerStr.toLowerCase().includes('m')) {
      return num * 1000000;
    } else if (followerStr.toLowerCase().includes('k')) {
      return num * 1000;
    } else if (followerStr.toLowerCase().includes('b')) {
      return num * 1000000000;
    }
    
    return num || 0;
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedCity('All');
    setSearchQuery('');
    setShowFilter(false);
  };

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
              className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
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
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            selectedCategory === category
                              ? 'bg-purple-600 text-white'
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
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        All
                      </button>
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            selectedCity === city
                              ? 'bg-purple-600 text-white'
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
                    onClick={clearFilters}
                    className="w-full py-2 text-sm text-purple-600 font-medium"
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
            <div className="space-y-4">
              {filteredInfluencers
                .sort((a, b) => parseFollowerCount(b.instagram_followers) - parseFollowerCount(a.instagram_followers))
                .map((influencer, index) => (
                <motion.div
                  key={influencer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link href={`/influencer/${influencer.id}`}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                    >
                      <div className="relative">
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="w-16 h-16 rounded-2xl object-cover"
                        />
                        <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">
                          {influencer.name}
                        </h3>
                        <p className="text-purple-600 text-sm font-medium mb-2">
                          {influencer.content_type}
                        </p>
                        
                        <div className="space-y-1">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {influencer.city}
                            </span>
                            <span className="flex items-center">
                              <Instagram className="w-3 h-3 mr-1" />
                              @{influencer.instagram_handle}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="flex items-center text-blue-600 font-medium">
                              <Users className="w-3 h-3 mr-1" />
                              {influencer.instagram_followers}
                            </span>
                            <span className="flex items-center text-green-600 font-medium">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {influencer.instagram_engagement_rate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
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