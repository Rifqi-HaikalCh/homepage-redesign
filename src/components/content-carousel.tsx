'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, Cpu, Music, Plane, Heart, Gamepad2, 
  Clapperboard, Sparkles, Youtube, Mic, Video, Baby, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import Link

const categories = [
  { id: 1, icon: Utensils, text: 'Food & Beverages', link: '/content/food' },
  { id: 2, icon: Cpu, text: 'Technology', link: '/content/tech' },
  { id: 3, icon: Music, text: 'Entertainment', link: '/content/entertainment' },
  { id: 4, icon: Plane, text: 'Travel & Lifestyle', link: '/content/travel' },
  { id: 5, icon: Heart, text: 'Health & Sport', link: '/content/health' },
  { id: 6, icon: Gamepad2, text: 'Gaming', link: '/content/gaming' },
  { id: 7, icon: Clapperboard, text: 'Content Creator', link: '/content/creator' },
  { id: 8, icon: Sparkles, text: 'Beauty & Fashion', link: '/content/beauty' },
  { id: 9, icon: Youtube, text: 'Youtuber', link: '/content/youtube' },
  { id: 10, icon: Mic, text: 'DJ & Penyanyi', link: '/content/dj-singer' },
  { id: 11, icon: Video, text: 'Tiktok', link: '/content/tiktok' },
  { id: 12, icon: Baby, text: 'Mom & Kids', link: '/content/mom-kids' }
];

const ITEMS_PER_PAGE = 4;

export default function ContentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const maxIndex = totalPages - 1;

  const next = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Pilih Konten
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pilih kategori konten yang sesuai dengan kebutuhan kampanye Anda
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden py-4"> {/* Menambahkan padding vertikal di sini */}
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex} className="grid grid-cols-4 gap-4 flex-shrink-0 w-full">
                  {categories.slice(pageIndex * ITEMS_PER_PAGE, (pageIndex + 1) * ITEMS_PER_PAGE).map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link href={category.link} key={category.id} className="group"> {/* Link membungkus seluruh kartu */}
                        <motion.div
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} // Efek hover shadow & scale
                          whileTap={{ scale: 0.95 }} // Efek klik
                          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col justify-center items-center cursor-pointer"
                        >
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110 bg-[#7124A8]/10 group-hover:bg-[#7124A8]/20">
                              <Icon className="w-8 h-8 transition-colors duration-300 text-[#7124A8] group-hover:text-[#5a1d87]" />
                            </div>
                            <h3 className="font-semibold text-sm transition-colors duration-300 text-gray-900 dark:text-white group-hover:text-[#7124A8]">
                              {category.text}
                            </h3>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </div>

          <Button
            size="icon"
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:scale-110 transition-transform text-gray-800 hover:bg-white z-10"
          >
            <ChevronLeft />
          </Button>
          
          <Button
            size="icon"
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:scale-110 transition-transform text-gray-800 hover:bg-white z-10"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}