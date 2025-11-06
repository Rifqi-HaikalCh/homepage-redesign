'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, MapPin, Users, TrendingUp, X, Send, Calendar, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import Image from 'next/image';
import { cachedFetch } from '@/lib/apiCache';


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
  }>;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export default function RecommendedInfluencer() {
  const [influencersData, setInfluencersData] = useState<Influencer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  // Fungsi untuk mengubah string followers (e.g., "85.2K") menjadi angka
  const parseFollowerCount = (followerStr: string): number => {
    if (!followerStr) return 0;
    
    const numStr = followerStr.toLowerCase().replace(/[^0-9.]/g, '');
    const num = parseFloat(numStr);
    
    if (followerStr.toLowerCase().includes('m')) {
      return num * 1000000;
    } else if (followerStr.toLowerCase().includes('k')) {
      return num * 1000;
    }
    
    return num || 0;
  };

  // Fetch, urutkan, dan ambil 3 influencer teratas with caching
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        // Use cachedFetch to prevent duplicate API calls
        const data = await cachedFetch<Influencer[]>('/api/influencers');
        if (data && data.length > 0) {
          // Urutkan influencer berdasarkan jumlah followers dari terbanyak ke terkecil
          const sortedData = data.sort((a: Influencer, b: Influencer) =>
            parseFollowerCount(b.instagram_followers) - parseFollowerCount(a.instagram_followers)
          );
          // Ambil 3 influencer teratas
          setInfluencersData(sortedData.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching influencers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  const nextInfluencer = () => {
    setCurrentIndex(prev => (prev + 1) % influencersData.length);
  };

  const prevInfluencer = () => {
    setCurrentIndex(prev => (prev - 1 + influencersData.length) % influencersData.length);
  };

  // Handler for booking modal
  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingFormData);
    // TODO: Send to API
    alert(`Booking request sent for ${activeInfluencer?.name}!\n\nWe'll contact you at ${bookingFormData.email} soon.`);
    setBookingFormData({ name: '', email: '', phone: '', date: '', message: '' });
    setShowBookingModal(false);
  };

  // Efek untuk rotasi otomatis
  useEffect(() => {
    if (!isAutoRotating || influencersData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % influencersData.length);
    }, 5000); // Bergerak setiap 5 detik

    return () => clearInterval(interval);
  }, [isAutoRotating, influencersData.length]);


  const activeInfluencer = influencersData[currentIndex];
  
  // Tampilan Loading
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (influencersData.length === 0 || !activeInfluencer) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Recommended Influencer
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Belum ada data influencer yang tersedia
            </p>
          </div>
        </div>
      </section>
    );
  }

  const getInfluencerStyle = (index: number) => {
    const offset = index - currentIndex;
    const totalItems = influencersData.length;
    let position = offset;

    if (offset > totalItems / 2) {
      position = offset - totalItems;
    } else if (offset < -totalItems / 2) {
      position = offset + totalItems;
    }

    // Improved stack animation with depth effect
    switch (position) {
      case 0:
        // Active card - center front
        return {
          x: 0,
          y: 0,
          scale: 1.15,
          zIndex: 30,
          opacity: 1,
          rotateY: 0,
          rotateZ: 0
        };
      case -1:
        // Behind left
        return {
          x: -180,
          y: 10,
          scale: 0.95,
          zIndex: 20,
          opacity: 0.85,
          rotateY: 15,
          rotateZ: -3
        };
      case 1:
        // Behind right
        return {
          x: 180,
          y: 10,
          scale: 0.95,
          zIndex: 20,
          opacity: 0.85,
          rotateY: -15,
          rotateZ: 3
        };
      case -2:
        // Far behind left
        return {
          x: -280,
          y: 20,
          scale: 0.8,
          zIndex: 10,
          opacity: 0.5,
          rotateY: 25,
          rotateZ: -5
        };
      case 2:
        // Far behind right
        return {
          x: 280,
          y: 20,
          scale: 0.8,
          zIndex: 10,
          opacity: 0.5,
          rotateY: -25,
          rotateZ: 5
        };
      default:
        // Hidden cards
        return {
          x: position < 0 ? -350 : 350,
          y: 30,
          scale: 0.6,
          zIndex: 0,
          opacity: 0,
          rotateY: position < 0 ? 30 : -30,
          rotateZ: 0
        };
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
           <div className="flex justify-between items-center mb-6">
            <div></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Recommended Influencer
            </h2>
            <Link href="/influencer">
              <Button variant="outline" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Lihat Semua
              </Button>
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover top-performing influencers perfect for your brand collaboration
          </p>
        </div>

        <div 
          className="relative flex items-center justify-center gap-4 max-w-6xl mx-auto min-h-[450px]"
          onMouseEnter={() => setIsAutoRotating(false)}
          onMouseLeave={() => setIsAutoRotating(true)}
        >
          <div className="w-2/3 h-full flex justify-end items-center" style={{ perspective: '2000px' }}>
            <div className="relative w-[500px] h-80" style={{ transformStyle: 'preserve-3d' }}>
              {influencersData.map((influencer, index) => (
                <motion.div
                  key={influencer.id}
                  className="absolute w-48 h-72 cursor-pointer"
                  style={{
                    top: '50%',
                    left: '50%',
                    marginTop: '-144px',
                    marginLeft: '-96px',
                    transformStyle: 'preserve-3d'
                  }}
                  initial={false}
                  animate={getInfluencerStyle(index)}
                  transition={{
                    duration: 0.7,
                    ease: [0.34, 1.56, 0.64, 1], // Elastic ease for smoother feel
                    opacity: { duration: 0.4 }
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl relative group">
                    <Image
                      src={influencer?.avatar || '/placeholder-avatar.png'}
                      alt={influencer?.name || 'Influencer'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 192px"
                      loading="lazy"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h4 className="font-semibold text-sm mb-1">{influencer?.name}</h4>
                      <p className="text-xs opacity-90">{influencer?.content_type}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-1/3 flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } }}
              >
                <Card className="w-full bg-white dark:bg-gray-900 shadow-2xl border border-gray-200/50 dark:border-gray-700/30 rounded-2xl">
                   <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {activeInfluencer?.name}
                    </h3>
                    <p className="text-[#7124A8] font-semibold text-md mb-6">
                      {activeInfluencer?.content_type}
                    </p>
                    <div className="space-y-4 mb-8 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Instagram className="w-4 h-4 mr-3 text-[#7124A8]" />
                        <span className="font-medium">{activeInfluencer?.instagram_handle}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Users className="w-4 h-4 mr-3 text-[#7124A8]" />
                        <span>{activeInfluencer?.instagram_followers} Followers</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <MapPin className="w-4 h-4 mr-3 text-[#7124A8]" />
                        <span>{activeInfluencer?.city}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <TrendingUp className="w-4 h-4 mr-3 text-[#7124A8]" />
                        <span>{activeInfluencer?.instagram_engagement_rate} Engagement Rate</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                       <Link href={`/influencer/${activeInfluencer?.id || 1}`} className="w-full">
                         <Button className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white">
                            View Profile
                          </Button>
                       </Link>
                       <Button
                         variant="outline"
                         className="w-full"
                         onClick={handleBookNow}
                       >
                         Book Now
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex justify-center items-center mt-8 space-x-4">
          <Button variant="ghost" size="icon" onClick={prevInfluencer} className="w-10 h-10 rounded-full bg-white shadow-lg text-gray-700 dark:text-gray-300 dark:bg-gray-900">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex space-x-2">
            {influencersData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-[#7124A8] w-8' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
              />
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={nextInfluencer} className="w-10 h-10 rounded-full bg-white shadow-lg text-gray-700 dark:text-gray-300 dark:bg-gray-900">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Book {activeInfluencer?.name}
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    required
                    value={bookingFormData.name}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      required
                      value={bookingFormData.email}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="tel"
                      required
                      value={bookingFormData.phone}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                      placeholder="+62 xxx xxxx xxxx"
                      className="w-full pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="date"
                      required
                      value={bookingFormData.date}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, date: e.target.value })}
                      className="w-full pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    value={bookingFormData.message}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, message: e.target.value })}
                    placeholder="Tell us about your project or campaign..."
                    rows={4}
                    className="w-full resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#7124A8] hover:bg-[#5a1d87] text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Booking Request
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}