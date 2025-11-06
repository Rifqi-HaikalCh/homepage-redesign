/**
 * Dark Mode Class Utilities
 *
 * Utility untuk konsistensi dark mode classes di seluruh aplikasi
 * Gunakan class utilities ini untuk memastikan dark mode terimplementasi dengan sempurna
 */

// Background Classes
export const bgClasses = {
  // Primary backgrounds
  primary: 'bg-white dark:bg-gray-900',
  secondary: 'bg-gray-50 dark:bg-gray-800',
  tertiary: 'bg-gray-100 dark:bg-gray-700',

  // Glassmorphism
  glass: 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl',
  glassLight: 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm',
  glassCard: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md',

  // Gradient backgrounds
  gradientPurple: 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950',
  gradientOverlay: 'bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10',

  // Card backgrounds
  card: 'bg-white dark:bg-gray-800',
  cardHover: 'hover:bg-gray-50 dark:hover:bg-gray-700',
};

// Text Classes
export const textClasses = {
  // Primary text
  primary: 'text-gray-900 dark:text-white',
  secondary: 'text-gray-600 dark:text-gray-400',
  tertiary: 'text-gray-500 dark:text-gray-500',
  muted: 'text-gray-400 dark:text-gray-600',

  // Headings
  heading: 'text-gray-900 dark:text-white',
  subheading: 'text-gray-700 dark:text-gray-300',

  // Links
  link: 'text-[#7124A8] dark:text-[#A855F7] hover:text-[#9333EA] dark:hover:text-[#C084FC]',

  // Status colors
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-orange-600 dark:text-orange-400',
  info: 'text-blue-600 dark:text-blue-400',
};

// Border Classes
export const borderClasses = {
  // Standard borders
  default: 'border-gray-200 dark:border-gray-700',
  light: 'border-gray-100 dark:border-gray-800',
  strong: 'border-gray-300 dark:border-gray-600',

  // Glassmorphism borders
  glass: 'border-white/20 dark:border-gray-700/30',
  glassLight: 'border-white/30 dark:border-gray-600/50',

  // Accent borders
  primary: 'border-[#7124A8] dark:border-[#A855F7]',
  primaryLight: 'border-[#7124A8]/20 dark:border-[#A855F7]/20',
};

// Shadow Classes
export const shadowClasses = {
  sm: 'shadow-sm shadow-black/5 dark:shadow-black/20',
  md: 'shadow-md shadow-black/10 dark:shadow-black/30',
  lg: 'shadow-lg shadow-black/10 dark:shadow-black/40',
  xl: 'shadow-xl shadow-black/15 dark:shadow-black/50',

  // Colored shadows
  purple: 'shadow-lg shadow-purple-500/20 dark:shadow-purple-500/40',
};

// Input Classes
export const inputClasses = {
  base: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-[#7124A8] dark:focus:border-[#A855F7] focus:ring-[#7124A8]/20 dark:focus:ring-[#A855F7]/20',
  glass: 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/30 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white/80 dark:focus:bg-gray-800/80 focus:border-[#7124A8]/50',
};

// Button Classes
export const buttonClasses = {
  // Primary button
  primary: 'bg-[#7124A8] hover:bg-[#9333EA] text-white dark:bg-[#A855F7] dark:hover:bg-[#C084FC] border-none',

  // Secondary button
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',

  // Ghost button
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',

  // Glass button
  glass: 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 hover:bg-white/80 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300',

  // Outline button
  outline: 'bg-transparent border-2 border-[#7124A8] dark:border-[#A855F7] text-[#7124A8] dark:text-[#A855F7] hover:bg-[#7124A8]/10 dark:hover:bg-[#A855F7]/10',
};

// Badge Classes
export const badgeClasses = {
  default: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700',
  primary: 'bg-[#7124A8]/10 dark:bg-[#A855F7]/10 text-[#7124A8] dark:text-[#A855F7] border-[#7124A8]/20 dark:border-[#A855F7]/20',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  warning: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
};

// Hover Classes
export const hoverClasses = {
  cardScale: 'hover:scale-[1.02] transition-transform duration-300',
  cardShadow: 'hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40 transition-shadow duration-300',
  brightness: 'hover:brightness-110 dark:hover:brightness-125 transition-all duration-300',
};

// Utility Functions
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Get consistent classes for common component patterns
 */
export const getComponentClasses = {
  // Card with glassmorphism
  card: () => cn(
    bgClasses.glassCard,
    borderClasses.glass,
    shadowClasses.lg,
    'border rounded-2xl p-6'
  ),

  // Modal backdrop
  modalBackdrop: () => cn(
    'bg-black/50 dark:bg-black/70 backdrop-blur-sm'
  ),

  // Section container
  section: () => cn(
    bgClasses.primary,
    'py-16 px-6'
  ),

  // Page wrapper
  pageWrapper: () => cn(
    'min-h-screen',
    bgClasses.gradientPurple,
    'transition-colors duration-500'
  ),
};

export default {
  bg: bgClasses,
  text: textClasses,
  border: borderClasses,
  shadow: shadowClasses,
  input: inputClasses,
  button: buttonClasses,
  badge: badgeClasses,
  hover: hoverClasses,
  cn,
  getComponentClasses,
};
