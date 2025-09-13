'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import useMobileView from '@/hooks/useMobileView';
import MobileInfluencerPage from '@/components/mobile/MobileInfluencerPage';

// Desktop components
import { Search, Filter, ChevronDown, Instagram, Plus, Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/footer';
import SecondaryHeader from '@/components/secondary-header';
import { ConfirmDeleteModal, InfluencerFormModal } from '@/components/glassmorphism-modal';

interface Influencer {
  id: number;
  name: string;
  content_type: string;
  instagram: string;
  followers: string;
  city: string;
  avatar: string;
  engagement_rate: string;
}


const contentTypes = ['Semua', 'Lifestyle & Fashion', 'Beauty & Skincare', 'Tech & Gaming', 'Travel & Food', 'Fitness & Health', 'Art & Creative'];
const cities = ['Semua', 'Jakarta', 'Bandung', 'Surabaya', 'Bali', 'Yogyakarta', 'Medan', 'Solo', 'Malang', 'Semarang', 'Palembang'];
const followerRanges = ['Semua', '0-50K', '50K-100K', '100K-200K', '200K+'];

const DesktopInfluencerListPage = () => {
  const { role } = useAuth();
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState('Semua');
  const [selectedCity, setSelectedCity] = useState('Semua');
  const [selectedFollowerRange, setSelectedFollowerRange] = useState('Semua');
  
  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Fetch influencers data
  const fetchInfluencers = async () => {
    try {
      setIsDataLoading(true);
      const response = await fetch('/api/influencers');
      if (response.ok) {
        const data = await response.json();
        setInfluencers(data);
      } else {
        console.error('Failed to fetch influencers');
        setInfluencers([]);
      }
    } catch (error) {
      console.error('Error fetching influencers:', error);
      setInfluencers([]);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const parseFollowers = (followers: string) => {
    const num = parseFloat(followers.replace('K', ''));
    return num;
  };

  // CRUD functions
  const handleAddInfluencer = () => {
    setFormMode('add');
    setSelectedInfluencer(null);
    setIsFormModalOpen(true);
  };

  const handleEditInfluencer = (influencer: Influencer) => {
    setFormMode('edit');
    setSelectedInfluencer(influencer);
    setIsFormModalOpen(true);
  };

  const handleDeleteInfluencer = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedInfluencer) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/influencers?id=${selectedInfluencer.id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Refresh the data
        await fetchInfluencers();
      } else {
        console.error('Failed to delete influencer');
      }
    } catch (error) {
      console.error('Error deleting influencer:', error);
    }
    
    setIsDeleteModalOpen(false);
    setSelectedInfluencer(null);
    setIsLoading(false);
  };

  const handleSaveInfluencer = async (data: Partial<Influencer>) => {
    setIsLoading(true);
    
    try {
      let response;
      
      if (formMode === 'add') {
        response = await fetch('/api/influencers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      } else {
        response = await fetch('/api/influencers', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...data, id: selectedInfluencer?.id })
        });
      }
      
      if (response.ok) {
        // Refresh the data
        await fetchInfluencers();
      } else {
        console.error('Failed to save influencer');
      }
    } catch (error) {
      console.error('Error saving influencer:', error);
    }
    
    setIsFormModalOpen(false);
    setSelectedInfluencer(null);
    setIsLoading(false);
  };

  const filterInfluencers = () => {
    return influencers.filter(influencer => {
      const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           influencer.content_type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesContentType = selectedContentType === 'Semua' || influencer.content_type === selectedContentType;
      const matchesCity = selectedCity === 'Semua' || influencer.city === selectedCity;
      
      let matchesFollowers = true;
      if (selectedFollowerRange !== 'Semua') {
        const followerCount = parseFollowers(influencer.followers);
        switch (selectedFollowerRange) {
          case '0-50K':
            matchesFollowers = followerCount <= 50;
            break;
          case '50K-100K':
            matchesFollowers = followerCount > 50 && followerCount <= 100;
            break;
          case '100K-200K':
            matchesFollowers = followerCount > 100 && followerCount <= 200;
            break;
          case '200K+':
            matchesFollowers = followerCount > 200;
            break;
        }
      }
      
      return matchesSearch && matchesContentType && matchesCity && matchesFollowers;
    });
  };

  const filteredInfluencers = filterInfluencers();

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10">
        <SecondaryHeader title="Semua Influencer" backUrl="/" />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Semua Influencer
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Jelajahi koleksi lengkap influencer berbakat untuk kolaborasi brand Anda
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <Input
                className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:bg-white dark:focus:bg-gray-800 focus:border-[#7124A8]/50 transition-all duration-300 text-gray-900 dark:text-gray-100"
                placeholder="Cari influencer berdasarkan nama atau jenis konten..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                <Filter className="w-4 h-4" />
                Filter
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </Button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 right-0 w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Jenis Konten
                        </label>
                        <select
                          value={selectedContentType}
                          onChange={(e) => setSelectedContentType(e.target.value)}
                          className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                          {contentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Daerah
                        </label>
                        <select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                          {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Followers
                        </label>
                        <select
                          value={selectedFollowerRange}
                          onChange={(e) => setSelectedFollowerRange(e.target.value)}
                          className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                          {followerRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Menampilkan {filteredInfluencers.length} dari {influencers.length} influencer
            </p>
            {(role === 'admin' || role === 'influencer') && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleAddInfluencer}
                  className="bg-[#7124A8] hover:bg-[#5a1d87] text-white flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {role === 'influencer' ? 'Buat Profil Saya' : 'Tambah Influencer'}
                </Button>
              </motion.div>
            )}
          </div>

          {isDataLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
                </div>
              ))}
            </div>
          ) : filteredInfluencers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500 text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tidak Ada Influencer
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Belum ada data influencer yang tersedia atau sesuai dengan filter yang dipilih
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {filteredInfluencers.map((influencer) => (
              <motion.div
                key={influencer.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                {/* --- KODE KARTU YANG DIPERBARUI --- */}
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
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Instagram className="w-4 h-4 text-white" />
                            <div>
                              <p className="text-white text-xs font-medium">
                                {influencer.instagram}
                              </p>
                              <p className="text-white/80 text-xs">
                                {influencer.followers}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            className="bg-white hover:bg-gray-50 text-gray-900 text-xs px-2 py-1 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 flex-1"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                          >
                            View Detail
                          </Button>
                          {role === 'admin' && (
                            <>
                              <Button 
                                className="bg-blue-500 hover:bg-blue-600 text-white text-xs p-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  handleEditInfluencer(influencer);
                                }}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button 
                                className="bg-red-500 hover:bg-red-600 text-white text-xs p-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  handleDeleteInfluencer(influencer);
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/5 group-hover:to-pink-400/10 transition-all duration-500 pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
              ))}
            </motion.div>
          )}
        </main>
        <Footer />
      </div>
      
      {/* Modals */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedInfluencer?.name || ''}
        isLoading={isLoading}
      />
      
      <InfluencerFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveInfluencer}
        initialData={selectedInfluencer || {}}
        isLoading={isLoading}
        mode={formMode}
      />
    </div>
  );
};

export default function InfluencerListPage() {
  const isMobile = useMobileView();

  if (isMobile) {
    return <MobileInfluencerPage />;
  }

  return <DesktopInfluencerListPage />;
}