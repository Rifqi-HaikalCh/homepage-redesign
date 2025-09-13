'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Zap, Crown, Shield, ChevronRight } from 'lucide-react';
import MobileLayout from './MobileLayout';

interface Package {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: string;
  category: string;
  features?: string[];
}

const MobilePackagesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');


  useEffect(() => {
    // Fetch packages from API
    const fetchPackages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/packages');
        if (response.ok) {
          const data = await response.json();
          setPackages(data);
        } else {
          console.error('Failed to fetch packages from API');
          setPackages([]);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        setPackages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const categories = ['All', 'Basic', 'Professional', 'Enterprise', 'Services'];

  const filteredPackages = selectedCategory === 'All' 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  const getPackageColor = (category: string) => {
    switch (category) {
      case 'Basic':
        return 'from-blue-500 to-blue-600';
      case 'Professional':
        return 'from-[#7124a8] to-[#7124a8]';
      case 'Enterprise':
        return 'from-yellow-500 to-yellow-600';
      case 'Services':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getPackageIcon = (category: string) => {
    switch (category) {
      case 'Basic':
        return <Zap className="w-6 h-6" />;
      case 'Professional':
        return <Star className="w-6 h-6" />;
      case 'Enterprise':
        return <Crown className="w-6 h-6" />;
      case 'Services':
        return <Shield className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  return (
    <MobileLayout headerTitle="Packages">
      <div className="space-y-6">
        {/* Hero Section */}
        <section className="px-4 py-6 bg-gradient-to-r from-[#7124a8] to-[#7124a8] text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold mb-2">
              Choose Your Perfect Plan
            </h1>
            <p className="text-white/80">
              Scale your influencer marketing with our premium packages
            </p>
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="px-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#7124a8] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Packages Grid */}
        <section className="px-4 pb-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${
                    pkg.category === 'Professional' ? 'ring-2 ring-[#7124a8]' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.category === 'Professional' && (
                    <div className="bg-[#7124a8] text-white text-center py-2 text-sm font-medium">
                      🔥 Most Popular
                    </div>
                  )}

                  <div className="p-6">
                    {/* Package Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getPackageColor(pkg.category)} flex items-center justify-center text-white`}>
                        {pkg.icon ? (
                          <span className="text-xl">{pkg.icon}</span>
                        ) : (
                          getPackageIcon(pkg.category)
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {pkg.title}
                          </h3>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              {pkg.price}
                            </div>
                            <div className="text-sm text-gray-500">
                              /month
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {pkg.description}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    {pkg.features && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          What&apos;s included:
                        </h4>
                        <div className="space-y-2">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-green-600" />
                              </div>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center transition-colors ${
                        pkg.category === 'Professional'
                          ? 'bg-[#7124a8] text-white hover:bg-[#7124a8]/90'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      <span>Choose Plan</span>
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}

              {filteredPackages.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
                  <p className="text-gray-500 text-sm">Try selecting a different category</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section className="px-4 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Looking for something specific? Our team can create a custom package tailored to your unique needs and budget.
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-gray-900 font-semibold py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Contact Sales Team
            </motion.button>
          </motion.div>
        </section>
      </div>
    </MobileLayout>
  );
};

export default MobilePackagesPage;