'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting mobile view with smooth transitions
 *
 * Features:
 * - Debounced resize handler for better performance
 * - Smooth transition between mobile and desktop views
 * - SSR safe (prevents hydration mismatch)
 * - Configurable breakpoint
 */
const useMobileView = (breakpoint: number = 768): boolean => {
  // Initialize with null to detect SSR
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkScreenSize = () => {
      const mobile = window.innerWidth < breakpoint;

      // Add slight delay to prevent rapid switching during resize
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsMobile(mobile);
        if (!isInitialized) {
          setIsInitialized(true);
        }
      }, 100); // 100ms debounce for smooth transition
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for resize with debouncing
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener and timeout
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [breakpoint, isInitialized]);

  return isMobile;
};

export default useMobileView;