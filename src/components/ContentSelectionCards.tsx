'use client';

// React hooks untuk state management
import { useState } from 'react';
// Animasi yang smooth untuk interactions
import { motion } from 'framer-motion';
// Icon set yang konsisten
import {
  Utensils,
  Cpu,
  Music,
  Heart,
  Shirt,
  Dumbbell,
  Camera,
  BookOpen,
  Palette,
  Users,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

// ======================== TYPE DEFINITIONS ========================
// Interface untuk kategori konten
interface ContentCategory {
  id: string;
  name: string;
  displayName: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  description: string;
}

// Props untuk komponen utama
interface ContentSelectionCardsProps {
  selectedCategory?: string;
  onCategorySelect: (categoryId: string) => void;
  variant?: 'mobile' | 'desktop';
  className?: string;
}

// ======================== CONSTANTS ========================
// Mapping kategori konten dengan detail lengkap - Brand identity colors
// IMPORTANT: Category names MUST match the content_type in mockInfluencers.ts
const CONTENT_CATEGORIES: ContentCategory[] = [
  {
    id: 'all',
    name: 'All',
    displayName: 'Semua Kategori',
    icon: Users,
    gradient: 'from-[#7124A8] to-[#8B35B8]',
    description: 'Lihat semua influencer dari berbagai kategori'
  },
  {
    id: 'lifestyle-fashion',
    name: 'Lifestyle & Fashion',  // ✅ Matches mockInfluencers.ts
    displayName: 'Lifestyle & Fashion',
    icon: Shirt,
    gradient: 'from-[#7124A8]/80 to-[#9147C4]/80',
    description: 'Fashion dan gaya hidup'
  },
  {
    id: 'tech-gaming',
    name: 'Tech & Gaming',  // ✅ Matches mockInfluencers.ts
    displayName: 'Tech & Gaming',
    icon: Cpu,
    gradient: 'from-[#7124A8]/70 to-[#A165D1]/70',
    description: 'Teknologi dan gaming'
  },
  {
    id: 'beauty-skincare',
    name: 'Beauty & Skincare',  // ✅ Matches mockInfluencers.ts
    displayName: 'Beauty & Skincare',
    icon: Palette,
    gradient: 'from-[#9147C4]/80 to-[#7124A8]/80',
    description: 'Kecantikan dan perawatan kulit'
  },
  {
    id: 'travel-food',
    name: 'Travel & Food',  // ✅ Matches mockInfluencers.ts
    displayName: 'Travel & Food',
    icon: Utensils,
    gradient: 'from-[#9147C4]/70 to-[#7124A8]/70',
    description: 'Perjalanan dan kuliner'
  },
  {
    id: 'fitness-health',
    name: 'Fitness & Health',  // ✅ Matches mockInfluencers.ts
    displayName: 'Fitness & Health',
    icon: Dumbbell,
    gradient: 'from-[#A165D1]/80 to-[#8B35B8]/80',
    description: 'Kebugaran dan kesehatan'
  },
  {
    id: 'art-creative',
    name: 'Art & Creative',  // ✅ Matches mockInfluencers.ts
    displayName: 'Art & Creative',
    icon: Camera,
    gradient: 'from-[#8B35B8]/70 to-[#A165D1]/70',
    description: 'Seni dan kreativitas'
  }
];

// Konfigurasi animasi
const ANIMATION_CONFIG = {
  CARD_HOVER: { scale: 1.05, y: -2 },
  CARD_TAP: { scale: 0.98 },
  CARD_TRANSITION: { duration: 0.2 },
  STAGGER_DELAY: 0.05
} as const;

/**
 * Komponen kartu seleksi konten yang interaktif
 * 
 * Features:
 * - Responsive design untuk mobile dan desktop
 * - Perubahan warna saat dipilih
 * - Animasi hover dan tap yang smooth
 * - Callback untuk filtering influencer
 * - Accessible dengan keyboard navigation
 */
const ContentSelectionCards = ({
  selectedCategory = 'all',
  onCategorySelect,
  variant = 'mobile',
  className = ''
}: ContentSelectionCardsProps) => {

  // ======================== STATE MANAGEMENT ========================
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // ======================== HELPER FUNCTIONS ========================
  /**
   * Handle category selection dengan smooth feedback
   */
  const handleCategoryClick = (categoryId: string): void => {
    onCategorySelect(categoryId);
    // Haptic feedback untuk mobile (jika tersedia)
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  /**
   * Generate class names berdasarkan state kartu
   */
  const getCardClassName = (category: ContentCategory, isSelected: boolean): string => {
    const baseClasses = variant === 'mobile'
      ? 'p-3 rounded-2xl text-center shadow-lg cursor-pointer transition-all duration-200'
      : 'p-4 rounded-3xl text-center shadow-lg cursor-pointer transition-all duration-200';

    if (isSelected) {
      return `${baseClasses} bg-gradient-to-br ${category.gradient} text-white transform scale-105 shadow-xl`;
    }

    return `${baseClasses} bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300`;
  };

  /**
   * Generate icon size berdasarkan variant
   */
  const getIconSize = (): string => {
    return variant === 'mobile' ? 'w-6 h-6' : 'w-8 h-8';
  };

  /**
   * Generate text size berdasarkan variant
   */
  const getTextSize = (): string => {
    return variant === 'mobile' ? 'text-xs' : 'text-sm';
  };

  // ======================== HELPER FUNCTIONS ========================
  const getCompactCategories = () => {
    // Tampilkan 6 kategori pertama dalam mode compact
    return CONTENT_CATEGORIES.slice(0, 6);
  };


  // ======================== RENDER ========================
  return (
    <div className={`${className}`}>
      {/* Header dengan informasi */}
      <div className="mb-4">
        <h2 className={`font-bold text-gray-900 mb-2 ${
          variant === 'mobile' ? 'text-xl' : 'text-2xl'
        }`}>
          Pilih Kategori Konten
        </h2>
        <p className={`text-gray-600 ${
          variant === 'mobile' ? 'text-sm' : 'text-base'
        }`}>
          Temukan influencer sesuai dengan jenis konten yang Anda butuhkan
        </p>
      </div>

      {/* Compact Row Layout */}
      {!isExpanded ? (
        <div className="space-y-4">
          {/* Single Row Scrollable Categories */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 momentum-scroll"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {getCompactCategories().map((category, index) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              const isHovered = hoveredCard === category.id;

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex-shrink-0 px-4 py-3 rounded-2xl flex items-center space-x-3
                    transition-all duration-200 cursor-pointer touch-manipulation
                    min-w-max tap-highlight-transparent
                    ${isSelected
                      ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
                    }
                  `}
                  onClick={() => handleCategoryClick(category.id)}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div
                    animate={{
                      scale: isSelected || isHovered ? 1.1 : 1,
                      rotate: isSelected ? 360 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${
                        isSelected ? 'text-white' : 'text-gray-600'
                      }`}
                    />
                  </motion.div>
                  <span className={`font-medium text-sm whitespace-nowrap ${
                    isSelected ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.displayName}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Show All Button */}
          <div className="flex justify-center pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-[#7124A8]/10 hover:bg-[#7124A8]/20
                         text-[#7124A8] rounded-xl border border-[#7124A8]/20 hover:border-[#7124A8]/40
                         transition-all duration-200 group touch-manipulation tap-highlight-transparent
                         min-h-[44px]"
            >
              <span className="font-medium text-sm">Tampilkan Semua Kategori</span>
              <motion.div
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4 group-hover:text-[#7124A8]" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      ) : (
        /* Expanded Grid Layout */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Grid kartu kategori */}
          <div className={`grid ${variant === 'mobile' ? 'grid-cols-3' : 'grid-cols-5'} ${variant === 'mobile' ? 'gap-3' : 'gap-4'}`}>
            {CONTENT_CATEGORIES.map((category, index) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              const isHovered = hoveredCard === category.id;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * ANIMATION_CONFIG.STAGGER_DELAY,
                    duration: 0.3
                  }}
                  whileHover={ANIMATION_CONFIG.CARD_HOVER}
                  whileTap={ANIMATION_CONFIG.CARD_TAP}
                  className={`${getCardClassName(category, isSelected)} relative touch-manipulation tap-highlight-transparent`}
                  onClick={() => handleCategoryClick(category.id)}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Pilih kategori ${category.displayName}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCategoryClick(category.id);
                    }
                  }}
                >
                  {/* Icon dengan animasi */}
                  <motion.div
                    animate={{
                      scale: isSelected || isHovered ? 1.1 : 1,
                      rotate: isSelected ? 360 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="mb-2 mx-auto"
                  >
                    <IconComponent
                      className={`${getIconSize()} mx-auto ${
                        isSelected ? 'text-white' : 'text-gray-600'
                      }`}
                    />
                  </motion.div>

                  {/* Label kategori */}
                  <h3 className={`font-semibold ${getTextSize()} mb-1 ${
                    isSelected ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.displayName}
                  </h3>

                  {/* Description untuk desktop */}
                  {variant === 'desktop' && (
                    <p className={`text-xs opacity-80 ${
                      isSelected ? 'text-white' : 'text-gray-500'
                    }`}>
                      {category.description}
                    </p>
                  )}

                  {/* Selected indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-md"
                    >
                      <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Collapse Button */}
          <div className="flex justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(false)}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200
                         text-gray-700 rounded-xl border border-gray-200 hover:border-gray-300
                         transition-all duration-200 group touch-manipulation tap-highlight-transparent
                         min-h-[44px]"
            >
              <span className="font-medium text-sm">Sembunyikan</span>
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Selected category info */}
      {selectedCategory !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-[#7124a8]/10 rounded-xl border border-[#7124a8]/20"
        >
          <p className="text-sm text-[#7124a8] font-medium">
            Menampilkan influencer dengan kategori: {' '}
            <span className="font-bold">
              {CONTENT_CATEGORIES.find(cat => cat.id === selectedCategory)?.displayName}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ContentSelectionCards;