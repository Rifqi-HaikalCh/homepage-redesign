'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Plane, Heart, Headphones, Clapperboard, Grid3X3 } from 'lucide-react';

const categories = [
  { id: 1, icon: Utensils, text: 'Food Influencer' },
  { id: 2, icon: Plane, text: 'Travel Influencer' },
  { id: 3, icon: Heart, text: 'Health Influencer' },
  { id: 4, icon: Headphones, text: 'Music Influencer' },
  { id: 5, icon: Clapperboard, text: 'Content Creator' },
  { id: 6, icon: Grid3X3, text: 'Show All' }
];

export default function ContentCarousel() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShowAllClick = () => {
    setIsExpanded(!isExpanded);
  };

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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isShowAll = category.id === 6;
            
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative group cursor-pointer
                  ${isShowAll ? 'col-span-2 md:col-span-3 lg:col-span-6' : ''}
                `}
                onClick={isShowAll ? handleShowAllClick : undefined}
              >
                <div className={`
                  bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl 
                  transition-all duration-300 border border-gray-100 dark:border-gray-700
                  group-hover:border-[#7124A8]/30 dark:group-hover:border-[#7124A8]/30
                  ${isShowAll ? 'bg-gradient-to-r from-[#7124A8] to-[#5a1d87] text-white' : ''}
                  ${isShowAll ? 'hover:from-[#5a1d87] hover:to-[#4a1570]' : ''}
                `}>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`
                      p-3 rounded-xl transition-all duration-300 group-hover:scale-110
                      ${isShowAll ? 'bg-white/20' : 'bg-[#7124A8]/10 group-hover:bg-[#7124A8]/20'}
                    `}>
                      <Icon className={`
                        w-8 h-8 transition-colors duration-300
                        ${isShowAll ? 'text-white' : 'text-[#7124A8] group-hover:text-[#5a1d87]'}
                      `} />
                    </div>
                    <h3 className={`
                      font-semibold text-sm transition-colors duration-300
                      ${isShowAll ? 'text-white' : 'text-gray-900 dark:text-white group-hover:text-[#7124A8]'}
                    `}>
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