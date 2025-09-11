'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function GuestNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { role } = useAuth();

  useEffect(() => {
    // Only show for guest users
    if (role === 'guest' && !isDismissed) {
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, [role, isDismissed]);

  const handleDismiss = () => {
    setShowNotification(false);
    setIsDismissed(true);
    // Remember dismissal for this session
    sessionStorage.setItem('guestNotificationDismissed', 'true');
  };

  // Check if notification was already dismissed this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('guestNotificationDismissed');
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  if (role !== 'guest' || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#7124A8]/10 dark:bg-[#7124A8]/20 rounded-full">
                    <User className="w-5 h-5 text-[#7124A8]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      Dapatkan Akses Penuh!
                    </h3>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDismiss}
                  className="h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 -mt-1 -mr-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">
                Masuk atau buat akun untuk mengakses semua fitur dan menyimpan preferensi Anda.
              </p>
              
              <div className="flex gap-2">
                <Link href="/login" className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-8 border-[#7124A8]/30 text-[#7124A8] hover:bg-[#7124A8]/10"
                  >
                    <User className="w-3 h-3 mr-1" />
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button
                    size="sm"
                    className="w-full text-xs h-8 bg-[#7124A8] hover:bg-[#5a1d87] text-white"
                  >
                    <UserPlus className="w-3 h-3 mr-1" />
                    Daftar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}