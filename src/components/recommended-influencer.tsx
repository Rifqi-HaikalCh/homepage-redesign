'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, MapPin, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';


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

export default function RecommendedInfluencer() {
  const [influencersData, setInfluencersData] = useState<Influencer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch influencers from API
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch('/api/influencers');
        if (response.ok) {
          const data = await response.json();
          setInfluencersData(data.slice(0, 6)); // Limit to 6 for carousel
        } else {
          setInfluencersData([]);
        }
      } catch (error) {
        console.error('Error fetching influencers:', error);
        setInfluencersData([]);
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
  
  // EFEK UNTUK OTOMATISASI
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      nextInfluencer();
    }, 5000); // Bergerak setiap 5 detik

    return () => clearInterval(interval); // Membersihkan interval saat komponen dibongkar
  }, [isAutoRotating, currentIndex]);


  const activeInfluencer = influencersData[currentIndex];
  
  // Show loading or empty state
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
  
  if (influencersData.length === 0) {
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

    switch (position) {
      case 0:
        return { x: 80, scale: 1.2, zIndex: 3, opacity: 1 };
      case -1:
        return { x: -120, scale: 1, zIndex: 2, opacity: 0.8 };
      case -2:
        return { x: -280, scale: 0.8, zIndex: 1, opacity: 0.5 };
      default:
        return { x: position < 0 ? -320 : 320, scale: 0.5, zIndex: 0, opacity: 0 };
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
          <div className="w-2/3 h-full flex justify-end items-center" style={{ perspective: '1500px' }}>
            <div className="relative w-[500px] h-80" style={{ transformStyle: 'preserve-3d' }}>
              {influencersData.map((influencer, index) => (
                <motion.div
                  key={influencer.id}
                  className="absolute w-48 h-72 cursor-pointer"
                  style={{ top: '50%', left: '50%', marginTop: '-144px', marginLeft: '-96px' }}
                  initial={false}
                  animate={getInfluencerStyle(index)}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl relative group">
                    <img
                      src={influencer.avatar}
                      alt={influencer.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h4 className="font-semibold text-sm mb-1">{influencer.name}</h4>
                      <p className="text-xs opacity-90">{influencer.content_type}</p>
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
                      {activeInfluencer.name}
                    </h3>
                    <p className="text-[#7124A8] font-semibold text-md mb-6">
                      {activeInfluencer.content_type}
                    </p>
                    <div className="space-y-4 mb-8 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Instagram className="w-4 h-4 mr-3 text-[#7124A8]" />
                        <span className="font-medium">{activeInfluencer.instagram}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Users className="w-4 h-4 mr-3 text-[#7124A8]" />
                        <span>{activeInfluencer.followers} Followers</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <MapPin className="w-4 h-4 mr-3 text-[#7124A8]" />
                        <span>{activeInfluencer.city}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <TrendingUp className="w-4 h-4 mr-3 text-[#7124A8]" />
                        <span>{activeInfluencer.engagement_rate} Engagement Rate</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                       <Link href={`/influencer/${activeInfluencer.id}`} className="w-full">
                         <Button className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white">
                            View Profile
                          </Button>
                       </Link>
                       <Button variant="outline" className="w-full">Book Now</Button>
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
    </section>
  );
}