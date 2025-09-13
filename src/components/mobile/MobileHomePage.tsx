'use client';

// Import dependencies - React hooks untuk state management
import { useState, useEffect } from 'react';
// Framer Motion untuk animasi yang smooth dan modern
import { motion, AnimatePresence } from 'framer-motion';
// Icons dari Lucide - pilihan yang lebih ringan dibanding FontAwesome
import { ChevronRight, Check, Search, Instagram } from 'lucide-react';
import Link from 'next/link';
// Next.js Image untuk optimisasi gambar otomatis
import Image from 'next/image';
import MobileLayout from './MobileLayout';
// Import komponen baru untuk seleksi konten
import ContentSelectionCards from '@/components/ContentSelectionCards';
// Import Lottie untuk animasi
import Lottie from 'lottie-react';
import contactData from '../../../public/contact.json';
// Import Mobile Expanding Cards
import MobileExpandingCards from './MobileExpandingCards';

// ======================== CONSTANTS ========================
// Konfigurasi untuk komponen - mudah diubah tanpa touching logic
const SLIDE_AUTO_DURATION = 4000; // Durasi auto-rotate slide (4 detik)
const MAX_FEATURED_INFLUENCERS = 4; // Jumlah influencer yang ditampilkan di homepage
const SEARCH_PLACEHOLDER = 'Cari nama atau konten influencer...';

// ======================== INTERFACES ========================
// Interface untuk data influencer - struktur yang konsisten dengan API
interface Influencer {
  id: number;
  name: string;
  content_type: string; // Jenis konten yang dibuat (lifestyle, tech, dll)
  city: string;
  avatar: string; // URL foto profil
  instagram_handle: string; // Handle Instagram tanpa @
  instagram_followers: string; // Formatted followers count (misal: "10K", "1.2M")
  instagram_engagement_rate: string; // Persentase engagement
  created_at: string;
  updated_at: string;
}

// Interface untuk paket layanan - lebih sederhana untuk tampilan mobile
interface PackageItem {
  id: number;
  title: string;
  description: string;
  price: string; // Harga dalam format string (sudah formatted)
  icon: string; // Emoji icon untuk tampilan yang friendly
  category: string;
  features?: string[]; // Fitur-fitur optional
}

// Interface untuk slide hero - data presentasi utama
interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string; // Call to action text
}

// ======================== HELPER FUNCTIONS ========================
// Fungsi untuk generate URL navigasi berdasarkan slide
const getNavigationUrl = (slideId: number): string => {
  // Slide khusus packages redirect ke halaman packages
  if (slideId === 3) return '/packages';
  // Default ke halaman influencer
  return '/influencer';
};

// Fungsi untuk filter influencer - extracted untuk reusability
const filterInfluencers = (influencers: Influencer[], query: string): Influencer[] => {
  if (!query.trim()) return influencers;
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return influencers.filter(influencer => {
    const nameMatch = influencer.name.toLowerCase().includes(normalizedQuery);
    const contentMatch = influencer.content_type.toLowerCase().includes(normalizedQuery);
    const cityMatch = influencer.city.toLowerCase().includes(normalizedQuery);
    
    return nameMatch || contentMatch || cityMatch;
  });
};

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

// ======================== MAIN COMPONENT ========================
const MobileHomePage = () => {
  // State management untuk data influencer dan UI controls
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // State untuk fitur pencarian real-time
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([]);
  
  // State untuk kategori konten yang dipilih
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Konfigurasi slide hero - menggunakan gambar dari folder public
  // Data ini bisa dipindah ke config file untuk maintainability
  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: "Temukan Influencer\nTerbaik",
      subtitle: "Hubungkan brand Anda dengan kreator terpilih",
      image: "/Slide 1.png",
      cta: "Jelajahi Sekarang"
    },
    {
      id: 2,
      title: "Kembangkan\nBisnis Anda",
      subtitle: "Jangkau jutaan audiens melalui kemitraan autentik",
      image: "/Slide 2.png",
      cta: "Mulai Sekarang"
    },
    {
      id: 3,
      title: "Paket\nPremium",
      subtitle: "Layanan profesional yang disesuaikan untuk Anda",
      image: "/Slide 3.png",
      cta: "Lihat Paket"
    },
    {
      id: 4,
      title: "Konten\nBerkualitas",
      subtitle: "Layanan pembuatan konten profesional",
      image: "/Slide 4.png",
      cta: "Pelajari Lebih Lanjut"
    },
    {
      id: 5,
      title: "Kisah\nSukses",
      subtitle: "Bergabunglah dengan ribuan klien yang puas",
      image: "/Slide 5.png",
      cta: "Lihat Testimoni"
    }
  ];

  // Data paket layanan - hardcoded untuk performa yang lebih cepat
  // TODO: Bisa direfactor untuk fetch dari API jika diperlukan update dinamis
  const quickPreviewPackages: PackageItem[] = [
    {
      id: 1,
      title: "Starter Package",
      description: "Perfect for small businesses",
      price: "$99",
      icon: "🚀",
      category: "Basic",
      features: ["5 Connections", "Basic Analytics"]
    },
    {
      id: 2,
      title: "Professional Package",
      description: "Advanced tools for agencies",
      price: "$299",
      icon: "⭐",
      category: "Professional",
      features: ["20 Connections", "Advanced Analytics"]
    },
    {
      id: 3,
      title: "Enterprise Package",
      description: "Full-scale solution",
      price: "$599",
      icon: "👑",
      category: "Enterprise",
      features: ["Unlimited Connections", "Full Analytics"]
    }
  ];

  // Hook untuk fetch data influencer dari API
  // Menggunakan async/await pattern untuk readability yang lebih baik
  useEffect(() => {
    const fetchTopInfluencers = async (): Promise<void> => {
      try {
        setIsLoading(true);
        
        const response = await fetch('/api/influencers');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const allInfluencers: Influencer[] = await response.json();
        
        // Ambil hanya sejumlah tertentu untuk performa mobile
        // Bisa ditambah pagination jika diperlukan
        const topInfluencers = allInfluencers.slice(0, MAX_FEATURED_INFLUENCERS);
        setInfluencers(topInfluencers);
        
      } catch (error) {
        console.error('Gagal memuat data influencer:', error);
        // Fallback ke array kosong agar UI tidak crash
        setInfluencers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopInfluencers();
  }, []);

  // Hook untuk filter influencer berdasarkan input pencarian dan kategori
  // Implementasi debouncing bisa ditambahkan untuk performa yang lebih baik
  useEffect(() => {
    // Apply multiple filters in sequence
    let filtered = influencers;
    
    // Filter berdasarkan kategori terlebih dahulu
    filtered = filterByCategory(filtered, selectedCategory);
    
    // Kemudian filter berdasarkan search query
    filtered = filterInfluencers(filtered, searchQuery);
    
    setFilteredInfluencers(filtered);
  }, [searchQuery, influencers, selectedCategory]);


  // Auto-rotate hero slides setiap 4 detik
  // User bisa manual navigate, auto-rotate akan continue
  useEffect(() => {
    // Gunakan konstanta yang sudah didefinisikan
    
    const slideInterval = setInterval(() => {
      setCurrentHeroIndex((currentIndex) => {
        // Kembali ke slide pertama setelah slide terakhir
        return (currentIndex + 1) % heroSlides.length;
      });
    }, SLIDE_AUTO_DURATION);

    // Cleanup interval saat component unmount
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  // Slide yang sedang aktif
  const currentSlide = heroSlides[currentHeroIndex];

  return (
    <MobileLayout showMenu showNotification showLogo>
      <div className="space-y-6">
        {/* ================== HERO SECTION ================== */}
        {/* Carousel utama dengan auto-rotate dan manual navigation */}
        <section className="relative h-[60vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                style={{ objectFit: 'cover' }}
                priority={currentSlide.id === 1}
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl font-bold mb-2 leading-tight"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {currentSlide.title}
                </motion.h1>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-white/90 mb-6 text-lg"
                >
                  {currentSlide.subtitle}
                </motion.p>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Link
                    href={getNavigationUrl(currentSlide.id)}
                    className="inline-flex items-center px-6 py-3 bg-[#7124a8] rounded-full font-semibold shadow-lg active:scale-95 transition-transform"
                  >
                    {currentSlide.cta}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Hero Indicators */}
          <div className="absolute bottom-20 left-6 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentHeroIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Search Bar */}
        <section className="px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={SEARCH_PLACEHOLDER}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7124a8] outline-none transition-colors"
            />
          </div>
        </section>

        {/* Content Selection Cards - Komponen baru yang interaktif */}
        <section className="px-4">
          <ContentSelectionCards
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            variant="mobile"
          />
        </section>

        {/* Featured Influencers */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Top Influencers</h2>
            <Link href="/influencer" className="text-[#7124a8] text-sm font-medium flex items-center">
              Lihat Semua
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredInfluencers.map((influencer, index) => (
                <motion.div
                  key={influencer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <Link href={`/influencer/${influencer.id}`}>
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer">
                      <Image
                        src={influencer.avatar}
                        alt={influencer.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-0 left-0 right-0 p-3 bg-black/20 backdrop-blur-sm rounded-t-2xl">
                        <h3 className="text-sm font-bold text-white text-center drop-shadow-lg">
                          {influencer.name}
                        </h3>
                        <p className="text-white/90 text-xs text-center font-medium drop-shadow-md">
                          {influencer.content_type}
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-2 border border-white/40">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Instagram className="w-3 h-3 text-white" />
                              <div>
                                <p className="text-white text-xs font-medium">
                                  @{influencer.instagram_handle}
                                </p>
                                <p className="text-white/80 text-xs">
                                  {influencer.instagram_followers}
                                </p>
                              </div>
                            </div>
                            <div className="bg-white hover:bg-gray-50 text-gray-900 text-xs px-2 py-1 rounded-full font-semibold shadow-lg transition-all duration-300">
                              View
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Mobile Expanding Cards Section */}
        <MobileExpandingCards />

        {/* Clients Section */}
        <section className="px-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Klien Terpercaya</h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { name: 'DANA', logo: '💰', color: 'from-blue-500 to-blue-600' },
                { name: 'Shopee', logo: '🛍️', color: 'from-orange-500 to-red-500' },
                { name: 'Gojek', logo: '🏍️', color: 'from-green-500 to-green-600' },
                { name: 'MS Glow', logo: '✨', color: 'from-pink-500 to-rose-500' }
              ].map((client, index) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r ${client.color} flex items-center justify-center text-xl`}>
                    {client.logo}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{client.name}</h3>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#7124a8] to-[#7124a8] rounded-xl p-4 text-center text-white">
              <h3 className="font-bold text-lg mb-2">500+ Brand Partners</h3>
              <p className="text-white/90 text-sm">Dipercaya oleh brand-brand terkemuka Indonesia</p>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="px-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="col-span-2 flex justify-center">
                <div className="w-24 h-24">
                  <Lottie
                    animationData={contactData}
                    loop={true}
                    autoplay={true}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hubungi Kami</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Siap memulai kampanye influencer marketing Anda?
                </p>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#7124a8] text-white px-4 py-2 rounded-xl font-semibold text-sm w-full flex items-center justify-center space-x-2"
                >
                  <span>Contact Us</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials or Recommendations Section */}
        <section className="px-4 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Mengapa Memilih Kami?</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#7124a8]">500+</div>
                <div className="text-gray-600 text-xs">Influencers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#7124a8]">10M+</div>
                <div className="text-gray-600 text-xs">Reach</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#7124a8]">98%</div>
                <div className="text-gray-600 text-xs">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </MobileLayout>
  );
};

export default MobileHomePage;