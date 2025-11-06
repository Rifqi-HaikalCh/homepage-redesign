'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useMobileView from '@/hooks/useMobileView';

interface ResponsiveWrapperProps {
  mobileComponent: ReactNode;
  desktopComponent: ReactNode;
  breakpoint?: number;
}

/**
 * ResponsiveWrapper Component
 *
 * Provides smooth transitions between mobile and desktop views
 *
 * Features:
 * - Animated fade transitions when switching views
 * - Prevents layout shift during transition
 * - Optimized performance with AnimatePresence
 */
export default function ResponsiveWrapper({
  mobileComponent,
  desktopComponent,
  breakpoint = 768
}: ResponsiveWrapperProps) {
  const isMobile = useMobileView(breakpoint);

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const transitionConfig = {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
  };

  return (
    <AnimatePresence mode="wait">
      {isMobile ? (
        <motion.div
          key="mobile"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transitionConfig}
        >
          {mobileComponent}
        </motion.div>
      ) : (
        <motion.div
          key="desktop"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transitionConfig}
        >
          {desktopComponent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
