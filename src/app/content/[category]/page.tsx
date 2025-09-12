'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface ContentItem {
  id: number;
  title: string;
  description: string;
}

export default function ContentCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/content/${category}`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          console.error('Failed to fetch content');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchContent();
    }
  }, [category]);

  const getCategoryTitle = (cat: string) => {
    const titles: { [key: string]: string } = {
      food: 'Food & Beverages',
      tech: 'Technology',
      entertainment: 'Entertainment',
      travel: 'Travel & Lifestyle',
      health: 'Health & Sport',
      gaming: 'Gaming',
      creator: 'Content Creator',
      beauty: 'Beauty & Fashion',
      youtube: 'Youtuber',
      'dj-singer': 'DJ & Penyanyi',
      tiktok: 'Tiktok',
      'mom-kids': 'Mom & Kids'
    };
    return titles[cat] || 'Content Category';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
        <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
        <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7124A8] mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/30 dark:border-gray-700/30 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getCategoryTitle(category)}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Discover influencers in this category
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-8">
          {content.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-xl border border-white/30 dark:border-gray-700/30 rounded-2xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-[#7124A8]/10 dark:bg-[#7124A8]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#7124A8]/20 dark:group-hover:bg-[#7124A8]/30 transition-colors">
                          <Star className="w-6 h-6 text-[#7124A8]" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#7124A8] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 50 + 10)}K followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{(Math.random() * 5 + 3).toFixed(1)}%</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Star className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Content for {getCategoryTitle(category)} category is coming soon. Stay tuned!
              </p>
              <div className="mt-8">
                <Link href="/">
                  <Button className="bg-[#7124A8] hover:bg-[#5a1d87] text-white">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}