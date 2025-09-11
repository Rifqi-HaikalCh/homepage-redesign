'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, LogOut, Instagram } from 'lucide-react';
import Link from 'next/link';
import SecondaryHeader from '@/components/secondary-header';

// Data statis yang diperkaya, mirip dengan data influencer
const userData = {
  name: 'Rifqi Haikal',
  contentType: 'Frontend Developer',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center',
  city: 'Jakarta',
  instagram: {
    handle: 'rifqihaikal.dev',
    followers: '15.4K',
    engagementRate: '5.4%',
    avgLikes: '1.2K',
    avgComments: '32'
  },
  tiktok: {
    handle: '@rifqi.codes',
    followers: '5.2K',
    engagementRate: '8.1%',
    avgLikes: '500',
    avgViews: '10.5K'
  },
  portfolioItems: 6,
};

export default function ProfilePage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut"} },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
      {/* Glossy Glass Background Effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10">
        <SecondaryHeader title="Profile" backUrl="/" />
        
        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div
            className="container mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Kolom Kiri - Profil Utama */}
          <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 mb-4 shadow-md">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 font-sans">
                  {userData.name}
                </h1>
                <p className="text-[#7124A8] font-medium text-sm mb-6 font-sans">
                  {userData.contentType}
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white rounded-xl py-3 font-semibold">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kolom Kanan - Detail Statistik & Portofolio */}
          <motion.div className="lg:col-span-3 space-y-6" variants={itemVariants}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Kartu Instagram */}
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Instagram className="w-5 h-5 text-[#E4405F] mr-2" />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white font-sans">
                      Summary Instagram
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#7124A8] font-sans">
                        @{userData.instagram.handle}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Followers</div>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">{userData.instagram.followers}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Engagement Rate</div>
                        <div className="text-xl font-bold text-green-600">{userData.instagram.engagementRate}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Average Like</div>
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{userData.instagram.avgLikes}</div>
                      </div>
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Average Comment</div>
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{userData.instagram.avgComments}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kartu TikTok */}
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-5 h-5 bg-black dark:bg-white rounded-sm mr-2 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white dark:text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.98-1.55-1.99-2.3-4.49-2.2-6.87.09-2.38 1.01-4.74 2.48-6.42 1.45-1.66 3.49-2.69 5.59-2.71.01 1.54-.01 3.08.01 4.61-.13 1.17-.72 2.3-1.57 3.12-1.32 1.25-3.33 1.76-4.96 1.13.04-2.05-.01-4.11.02-6.16.22-1.63 1.15-3.2 2.3-4.25 1.16-1.06 2.74-1.58 4.27-1.71v-4.04c.01-.02.02-.02.02-.02z"/></svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white font-sans">
                      Summary TikTok
                    </h3>
                  </div>
                  <div className="space-y-4">
                     <div className="text-center">
                      <div className="text-2xl font-bold text-[#7124A8] font-sans">
                        {userData.tiktok.handle}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Followers</div>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">{userData.tiktok.followers}</div>
                      </div>
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Engagement Rate</div>
                        <div className="text-xl font-bold text-green-600">{userData.tiktok.engagementRate}</div>
                      </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Average Like</div>
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{userData.tiktok.avgLikes}</div>
                      </div>
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Average View</div>
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{userData.tiktok.avgViews}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 font-sans">Portofolio</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {Array.from({ length: userData.portfolioItems }).map((_, index) => (
                    <motion.div
                      key={index}
                      className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.05, backgroundColor: '#f3e8ff' }}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-gray-400 dark:text-gray-500 text-sm font-sans">#{index + 1}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-sans">Project {index + 1}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
          </motion.div>

          {/* Tombol Logout */}
          <motion.div 
            className="fixed bottom-8 right-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.5, ease: "easeOut" } }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/login">
              <Button
                variant="destructive"
                className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
              >
                <LogOut className="w-6 h-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}