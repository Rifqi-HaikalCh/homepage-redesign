'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SecondaryHeaderProps {
  title: string;
  showHomeButton?: boolean;
  backUrl?: string;
}

export default function SecondaryHeader({ 
  title, 
  showHomeButton = true, 
  backUrl 
}: SecondaryHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/30 dark:border-gray-700/30 shadow-lg"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
          </motion.div>

          {/* Centered Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl font-bold text-gray-900 dark:text-white text-center"
          >
            {title}
          </motion.h1>

          {/* Home Button */}
          {showHomeButton && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm rounded-xl"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Placeholder when no home button */}
          {!showHomeButton && <div className="w-20"></div>}
        </div>
      </div>
    </motion.header>
  );
}