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
  Users
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
// Mapping kategori konten dengan detail lengkap
const CONTENT_CATEGORIES: ContentCategory[] = [
  {
    id: 'all',
    name: 'All',
    displayName: 'Semua Kategori',
    icon: Users,
    gradient: 'from-gray-500 to-gray-600',
    description: 'Lihat semua influencer dari berbagai kategori'
  },
  {
    id: 'food',
    name: 'Food & Travel',
    displayName: 'Food & Travel',
    icon: Utensils,
    gradient: 'from-orange-500 to-orange-600',
    description: 'Kuliner dan wisata'
  },
  {
    id: 'tech',
    name: 'Tech & Gaming',
    displayName: 'Tech & Gaming',
    icon: Cpu,
    gradient: 'from-blue-500 to-blue-600',
    description: 'Teknologi dan gaming'
  },
  {
    id: 'entertainment',
    name: 'Music & Entertainment',
    displayName: 'Entertainment',
    icon: Music,
    gradient: 'from-purple-500 to-purple-600',
    description: 'Musik dan hiburan'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Fashion',
    displayName: 'Lifestyle & Fashion',
    icon: Shirt,
    gradient: 'from-pink-500 to-pink-600',
    description: 'Gaya hidup dan mode'
  },
  {
    id: 'health',
    name: 'Beauty & Health',
    displayName: 'Beauty & Health',
    icon: Heart,
    gradient: 'from-red-500 to-red-600',
    description: 'Kecantikan dan kesehatan'
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    displayName: 'Sports & Fitness',
    icon: Dumbbell,
    gradient: 'from-green-500 to-green-600',
    description: 'Olahraga dan kebugaran'
  },
  {
    id: 'photo',
    name: 'Photography',
    displayName: 'Photography',
    icon: Camera,
    gradient: 'from-indigo-500 to-indigo-600',
    description: 'Fotografi dan visual'
  },
  {
    id: 'education',
    name: 'Education',
    displayName: 'Education',
    icon: BookOpen,
    gradient: 'from-teal-500 to-teal-600',
    description: 'Edukasi dan pembelajaran'
  },
  {
    id: 'art',
    name: 'Art & Design',
    displayName: 'Art & Design',
    icon: Palette,
    gradient: 'from-amber-500 to-amber-600',
    description: 'Seni dan desain'
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

  // ======================== RENDER ========================
  const gridCols = variant === 'mobile' ? 'grid-cols-3' : 'grid-cols-5';
  const gap = variant === 'mobile' ? 'gap-3' : 'gap-4';

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

      {/* Grid kartu kategori */}
      <div className={`grid ${gridCols} ${gap}`}>
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
              className={getCardClassName(category, isSelected)}
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