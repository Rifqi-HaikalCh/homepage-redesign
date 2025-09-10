'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Cpu, Music, Plane, Heart, Gamepad2, Clapperboard, Sparkles, Youtube, Mic, Video, Baby } from 'lucide-react';

const categories = [
  { id: 1, icon: Utensils, text: 'Food & Beverages' },
  { id: 2, icon: Cpu, text: 'Technology' },
  { id: 3, icon: Music, text: 'Entertainment' },
  { id: 4, icon: Plane, text: 'Travel & Lifestyle' },
  { id: 5, icon: Heart, text: 'Health & Sport' },
  { id: 6, icon: Gamepad2, text: 'Gaming' },
  { id: 7, icon: Clapperboard, text: 'Content Creator' },
  { id: 8, icon: Sparkles, text: 'Beauty & Fashion' },
  { id: 9, icon: Youtube, text: 'Youtuber' },
  { id: 10, icon: Mic, text: 'DJ & Penyanyi' },
  { id: 11, icon: Video, text: 'Tiktok' },
  { id: 12, icon: Baby, text: 'Mom & Kids' }
];

export default function ContentCarousel() {

  const containerVariants = {
    collapsed: {
      height: 'auto'
    },
    expanded: {
      height: 'auto',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    collapsed: {
      x: 0,
      y: 0,
      scale: 1
    },
    expanded: {
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
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

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="collapsed"
          animate="expanded"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110 bg-[#7124A8]/10 group-hover:bg-[#7124A8]/20">
                      <Icon className="w-8 h-8 transition-colors duration-300 text-[#7124A8] group-hover:text-[#5a1d87]" />
                    </div>
                    <h3 className="font-semibold text-sm transition-colors duration-300 text-gray-900 dark:text-white group-hover:text-[#7124A8]">
                      {category.text}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}