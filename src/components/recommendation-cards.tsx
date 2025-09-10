'use client';

import { motion } from 'framer-motion';
import { Users, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const packages = [
  {
    id: 1,
    title: 'Food & Culinary Influencer',
    category: 'Food',
    followers: '50K-100K',
    price: 'Rp 2.000.000',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=250&fit=crop&crop=center'
  },
  {
    id: 2,
    title: 'Travel Adventure Influencer',
    category: 'Travel',
    followers: '75K-150K',
    price: 'Rp 3.500.000',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop&crop=center'
  },
  {
    id: 3,
    title: 'Beauty & Lifestyle Influencer',
    category: 'Beauty',
    followers: '100K-200K',
    price: 'Rp 4.000.000',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=250&fit=crop&crop=center'
  },
  {
    id: 4,
    title: 'Tech & Gadget Reviewer',
    category: 'Technology',
    followers: '80K-120K',
    price: 'Rp 2.800.000',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop&crop=center'
  },
  {
    id: 5,
    title: 'Fashion & Style Influencer',
    category: 'Fashion',
    followers: '60K-90K',
    price: 'Rp 2.500.000',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop&crop=center'
  },
  {
    id: 6,
    title: 'Fitness & Health Coach',
    category: 'Health',
    followers: '40K-80K',
    price: 'Rp 1.800.000',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center'
  },
  {
    id: 7,
    title: 'Gaming Content Creator',
    category: 'Gaming',
    followers: '120K-250K',
    price: 'Rp 5.000.000',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop&crop=center'
  },
  {
    id: 8,
    title: 'Music & Entertainment',
    category: 'Entertainment',
    followers: '90K-180K',
    price: 'Rp 3.200.000',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop&crop=center'
  }
];

export default function RecommendationCards() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
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
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Package Micro Influencer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Paket kolaborasi dengan micro influencer terpilih untuk meningkatkan brand awareness dan engagement produk Anda
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.4 }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold text-[#7124A8]">
                    {pkg.price}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-[#7124A8] transition-colors duration-300">
                    {pkg.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Tag className="w-4 h-4 text-[#7124A8]" />
                      <span className="font-medium">{pkg.category}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-[#7124A8]" />
                      <span>{pkg.followers} Followers</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-[#7124A8] hover:bg-[#5a1d87] transition-colors duration-300"
                    size="sm"
                  >
                    View Detail
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-[#7124A8] text-[#7124A8] hover:bg-[#7124A8] hover:text-white transition-all duration-300 px-8"
          >
            Show All Packages
          </Button>
        </div>
      </div>
    </section>
  );
}