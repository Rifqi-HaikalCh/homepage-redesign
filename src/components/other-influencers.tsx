'use client';

import { motion, Variants } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Influencer {
  id: number;
  name: string;
  content_type: string;
  instagram_handle: string;
  instagram_followers: string;
  avatar: string;
}

export default function OtherInfluencers() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch('/api/influencers');
        if (response.ok) {
          const data = await response.json();
          // Take first 4 influencers for this section
          setInfluencers(data.slice(0, 4));
        } else {
          console.error('Failed to fetch influencers');
          // Fallback to dummy data if API fails
          setInfluencers([
            {
              id: 1,
              name: 'Sari Indah',
              content_type: 'Beauty & Skincare',
              instagram_handle: '@sariindah',
              instagram_followers: '45.2K',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=680&h=1020&fit=crop&crop=center'
            },
            {
              id: 2,
              name: 'Maya Putri',
              content_type: 'Lifestyle & Fashion',
              instagram_handle: '@mayaputri',
              instagram_followers: '38.7K',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=680&h=1020&fit=crop&crop=center'
            },
            {
              id: 3,
              name: 'Dewi Lestari',
              content_type: 'Travel & Food',
              instagram_handle: '@dewilestari',
              instagram_followers: '52.1K',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=680&h=1020&fit=crop&crop=center'
            },
            {
              id: 4,
              name: 'Rina Safitri',
              content_type: 'Art & Creative',
              instagram_handle: '@rinasafitri',
              instagram_followers: '41.9K',
              avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=680&h=1020&fit=crop&crop=center'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching influencers:', error);
        // Fallback to dummy data on error
        setInfluencers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Influencer Lainnya
            </h2>
            <Link href="/influencer">
              <Button variant="outline" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Lihat Semua Influencer
              </Button>
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Temukan lebih banyak influencer berbakat untuk kolaborasi brand Anda
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {influencers.map((influencer) => (
            <motion.div
              key={influencer.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Link href={`/influencer/${influencer.id}`}>
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  <img
                    src={influencer.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=680&h=1020&fit=crop&crop=center'}
                    alt={influencer.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ aspectRatio: '680/1020' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-0 left-0 right-0 p-4 bg-black/20 backdrop-blur-sm rounded-t-3xl">
                    <h3 className="text-lg font-bold text-white text-center drop-shadow-lg">
                      {influencer.name}
                    </h3>
                    <p className="text-white/90 text-xs text-center font-medium drop-shadow-md">
                      {influencer.content_type}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-3 border border-white/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Instagram className="w-4 h-4 text-white" />
                          <div>
                            <p className="text-white text-xs font-medium">
                              {influencer.instagram_handle || '@username'}
                            </p>
                            <p className="text-white/80 text-xs">
                              {influencer.instagram_followers || '0'}
                            </p>
                          </div>
                        </div>
                        <Button 
                          className="bg-white hover:bg-gray-50 text-gray-900 text-xs px-3 py-1 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/5 group-hover:to-pink-400/10 transition-all duration-500 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}