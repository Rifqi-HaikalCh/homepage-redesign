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

export default function CategoryFilter() {
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilih Konten</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilih kategori yang sesuai dengan kebutuhan dan minat Anda
          </p>
        </div>

        <motion.div
          className="relative"
          variants={containerVariants}
          animate={isExpanded ? 'expanded' : 'collapsed'}
          initial="collapsed"
        >
          {!isExpanded ? (
            // Horizontal scrollable row layout
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                const isShowAll = category.text === 'Show All';
                
                return (
                  <motion.div
                    key={category.id}
                    className={`
                      flex-shrink-0 w-40 p-4 rounded-xl border-2 cursor-pointer
                      transition-all duration-300 group
                      ${isShowAll 
                        ? 'border-[#7124A8] bg-[#7124A8]/5 hover:bg-[#7124A8]/10' 
                        : 'border-gray-200 bg-white hover:border-[#7124A8]/30 hover:shadow-lg'
                      }
                    `}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={isShowAll ? handleShowAllClick : undefined}
                    layout
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`
                        p-3 rounded-lg transition-colors duration-300
                        ${isShowAll 
                          ? 'bg-[#7124A8] text-white' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-[#7124A8]/10 group-hover:text-[#7124A8]'
                        }
                      `}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className={`
                        text-xs font-medium transition-colors duration-300
                        ${isShowAll 
                          ? 'text-[#7124A8]' 
                          : 'text-gray-900 group-hover:text-[#7124A8]'
                        }
                      `}>
                        {category.text}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // Grid layout when expanded
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="collapsed"
              animate="expanded"
            >
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                const isShowAll = category.text === 'Show All';
                
                return (
                  <motion.div
                    key={category.id}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer
                      transition-all duration-300 group
                      ${isShowAll 
                        ? 'border-[#7124A8] bg-[#7124A8]/5 hover:bg-[#7124A8]/10' 
                        : 'border-gray-200 bg-white hover:border-[#7124A8]/30 hover:shadow-lg'
                      }
                    `}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={isShowAll ? handleShowAllClick : undefined}
                    layout
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`
                        p-3 rounded-lg transition-colors duration-300
                        ${isShowAll 
                          ? 'bg-[#7124A8] text-white' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-[#7124A8]/10 group-hover:text-[#7124A8]'
                        }
                      `}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className={`
                        text-xs font-medium transition-colors duration-300
                        ${isShowAll 
                          ? 'text-[#7124A8]' 
                          : 'text-gray-900 group-hover:text-[#7124A8]'
                        }
                      `}>
                        {category.text}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Additional items to demonstrate the grid expansion */}
              {[7, 8, 9, 10, 11, 12].map((id) => (
                <motion.div
                  key={id}
                  className="p-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-[#7124A8]/30 hover:shadow-lg cursor-pointer transition-all duration-300 group"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  layout
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-xl bg-gray-100 text-gray-600 group-hover:bg-[#7124A8]/10 group-hover:text-[#7124A8] transition-colors duration-300">
                      <Grid3X3 className="w-8 h-8" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#7124A8] transition-colors duration-300">
                      Category {id}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}