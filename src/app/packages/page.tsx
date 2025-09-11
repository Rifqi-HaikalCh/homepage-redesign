'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Plus, Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import SecondaryHeader from '@/components/secondary-header';
import Footer from '@/components/footer';
import { ConfirmDeleteModal } from '@/components/glassmorphism-modal';
import { PackageFormModal } from '@/components/package-modal';

interface Package {
  id: number;
  title: string;
  description: string;
  price: string;
}

const initialPackagesData = [
  {
    id: 1,
    title: 'Paket Endorsement 10 Micro Influencer',
    description: 'Kampanye endorsement dengan 10 micro influencer pilihan',
    price: 'Rp 2.500.000'
  },
  {
    id: 2,
    title: 'Paket Paid Promote 10 Micro Influencer',
    description: 'Promosi berbayar melalui 10 micro influencer terverifikasi',
    price: 'Rp 1.500.000'
  },
  {
    id: 3,
    title: 'Paket Produk Review 10 Micro Influencer',
    description: 'Review produk mendalam oleh 10 micro influencer',
    price: 'Rp 2.000.000'
  },
  {
    id: 4,
    title: 'Paket Bundle TikTok + Instagram Story 10 Micro Influencer',
    description: 'Konten multi-platform TikTok dan Instagram Story',
    price: 'Rp 3.500.000'
  },
  {
    id: 5,
    title: 'Paket Kampanye Viral 100 Micro Influencer',
    description: 'Kampanye viral massal dengan 100 micro influencer',
    price: 'Rp 25.000.000'
  }
];

const categories = ['Semua', 'Endorsement', 'Paid Promote', 'Review', 'Bundle', 'Viral'];
const priceRanges = ['Semua', '0-2 Juta', '2-5 Juta', '5-10 Juta', '10 Juta+'];

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedPriceRange, setSelectedPriceRange] = useState('Semua');
  
  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Fetch packages data
  const fetchPackages = async () => {
    try {
      setIsDataLoading(true);
      const response = await fetch('/api/packages');
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
      } else {
        console.error('Failed to fetch packages');
        // Fallback to dummy data if API fails
        setPackages(initialPackagesData);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      // Fallback to dummy data if API fails
      setPackages(initialPackagesData);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // CRUD functions
  const handleAddPackage = () => {
    setFormMode('add');
    setSelectedPackage(null);
    setIsFormModalOpen(true);
  };

  const handleEditPackage = (pkg: Package) => {
    setFormMode('edit');
    setSelectedPackage(pkg);
    setIsFormModalOpen(true);
  };

  const handleDeletePackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPackage) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/packages?id=${selectedPackage.id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Refresh the data
        await fetchPackages();
      } else {
        console.error('Failed to delete package');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
    
    setIsDeleteModalOpen(false);
    setSelectedPackage(null);
    setIsLoading(false);
  };

  const handleSavePackage = async (data: Partial<Package>) => {
    setIsLoading(true);
    
    try {
      let response;
      
      if (formMode === 'add') {
        response = await fetch('/api/packages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      } else {
        response = await fetch('/api/packages', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...data, id: selectedPackage?.id })
        });
      }
      
      if (response.ok) {
        // Refresh the data
        await fetchPackages();
      } else {
        console.error('Failed to save package');
      }
    } catch (error) {
      console.error('Error saving package:', error);
    }
    
    setIsFormModalOpen(false);
    setSelectedPackage(null);
    setIsLoading(false);
  };

  const parsePrice = (priceStr: string) => {
    const numStr = priceStr.replace(/[^0-9]/g, '');
    return parseInt(numStr) || 0;
  };

  const filterPackages = () => {
    return packages.filter(pkg => {
      const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = true; // Remove category filtering since it's not in the database
      
      let matchesPrice = true;
      if (selectedPriceRange !== 'Semua') {
        const price = parsePrice(pkg.price);
        switch (selectedPriceRange) {
          case '0-2 Juta':
            matchesPrice = price <= 2000000;
            break;
          case '2-5 Juta':
            matchesPrice = price > 2000000 && price <= 5000000;
            break;
          case '5-10 Juta':
            matchesPrice = price > 5000000 && price <= 10000000;
            break;
          case '10 Juta+':
            matchesPrice = price > 10000000;
            break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  };

  const filteredPackages = filterPackages();

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
        <SecondaryHeader title="Semua Paket" backUrl="/" />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Package Micro Influencer
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Paket kolaborasi dengan micro influencer terpilih untuk meningkatkan brand awareness
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <Input
                className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:bg-white dark:focus:bg-gray-800 focus:border-[#7124A8]/50 transition-all duration-300 text-gray-900 dark:text-gray-100"
                placeholder="Cari paket berdasarkan nama atau deskripsi..."
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
                          Kategori
                        </label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Rentang Harga
                        </label>
                        <select
                          value={selectedPriceRange}
                          onChange={(e) => setSelectedPriceRange(e.target.value)}
                          className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                          {priceRanges.map(range => (
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
              Menampilkan {filteredPackages.length} dari {packages.length} paket
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleAddPackage}
                className="bg-[#7124A8] hover:bg-[#5a1d87] text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah Paket
              </Button>
            </motion.div>
          </div>

          {isDataLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-72 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
                </div>
              ))}
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500 text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tidak Ada Paket
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Belum ada paket yang tersedia atau sesuai dengan filter yang dipilih
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-4">📦</div>
                      <div className="bg-[#7124A8]/10 dark:bg-[#7124A8]/20 text-[#7124A8] px-4 py-2 rounded-full text-lg font-bold mb-4">
                        {pkg.price}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 text-center group-hover:text-[#7124A8] transition-colors duration-300">
                      {pkg.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center line-clamp-2">
                      {pkg.description}
                    </p>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-[#7124A8] hover:bg-[#5a1d87] text-white transition-colors duration-300"
                        size="sm"
                      >
                        Pilih Paket
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPackage(pkg)}
                        className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePackage(pkg)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
        itemName={selectedPackage?.title || ''}
        isLoading={isLoading}
      />
      
      <PackageFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSavePackage}
        initialData={selectedPackage || {}}
        isLoading={isLoading}
        mode={formMode}
      />
    </div>
  );
}