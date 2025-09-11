'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const packages = [
  {
    id: 1,
    title: 'Paket Endorsement 10 Micro Influencer',
    description: 'Kampanye endorsement dengan 10 micro influencer pilihan',
    price: 'Rp 2.500.000',
    icon: '🎯'
  },
  {
    id: 2,
    title: 'Paket Paid Promote 10 Micro Influencer',
    description: 'Promosi berbayar melalui 10 micro influencer terverifikasi',
    price: 'Rp 1.500.000',
    icon: '📢'
  },
  {
    id: 3,
    title: 'Paket Produk Review 10 Micro Influencer',
    description: 'Review produk mendalam oleh 10 micro influencer',
    price: 'Rp 2.000.000',
    icon: '⭐'
  },
  {
    id: 4,
    title: 'Paket Bundle TikTok + Instagram Story 10 Micro Influencer',
    description: 'Konten multi-platform TikTok dan Instagram Story',
    price: 'Rp 3.500.000',
    icon: '📱'
  },
  {
    id: 5,
    title: 'Paket Kampanye Viral 100 Micro Influencer',
    description: 'Kampanye viral massal dengan 100 micro influencer',
    price: 'Rp 25.000.000',
    icon: '🚀'
  }
];

export default function RecommendationCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;
  const maxIndex = Math.max(0, packages.length - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visiblePackages = packages.slice(currentIndex, currentIndex + cardsToShow);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Package Micro Influencer</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Paket kolaborasi dengan micro influencer terpilih untuk meningkatkan brand awareness dan engagement produk Anda
          </p>
        </div>

        <div className="relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {visiblePackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="overflow-hidden bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 group border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-4">{pkg.icon}</div>
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

                    <Button 
                      className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white transition-colors duration-300"
                      size="sm"
                    >
                      Pilih Paket
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          {packages.length > cardsToShow && (
            <div className="flex justify-center items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? 'bg-[#7124A8] w-8'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/packages">
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#7124A8] text-[#7124A8] hover:bg-[#7124A8] hover:text-white dark:border-[#7124A8] dark:text-[#7124A8] dark:hover:bg-[#7124A8] dark:hover:text-white transition-all duration-300 px-8"
            >
              Lihat Semua Paket
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}