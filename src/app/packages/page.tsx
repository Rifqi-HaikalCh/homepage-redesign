'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import useMobileView from '@/hooks/useMobileView';

interface Package {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  popular?: boolean;
  features: string[];
  image: string;
  color: string;
  description: string;
}

const PackagesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const isMobile = useMobileView();

  const packages: Package[] = [
    {
      id: 1,
      name: "Starter",
      title: "Starter Package",
      subtitle: "Paket Pemula untuk UMKM",
      price: "Rp 2,500,000",
      originalPrice: "Rp 3,000,000",
      description: "Paket ideal untuk bisnis kecil yang baru memulai perjalanan influencer marketing",
      features: [
        "5 Konten Video Premium",
        "10 Konten Foto Berkualitas",
        "Strategi Konten Dasar",
        "Report Analytics Mingguan",
        "Support Email 24/7",
        "Konsultasi Awal Gratis"
      ],
      image: "/paket 1.png",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Professional",
      title: "Professional Package",
      subtitle: "Solusi Lengkap Bisnis Menengah",
      price: "Rp 5,000,000",
      originalPrice: "Rp 6,000,000",
      popular: true,
      description: "Paket terpopuler untuk bisnis yang ingin meningkatkan reach dan engagement",
      features: [
        "15 Konten Video Premium",
        "25 Konten Foto Berkualitas",
        "Strategi Konten Lanjutan",
        "Report Analytics Harian",
        "Konsultasi 1-on-1 Mingguan",
        "Brand Guidelines",
        "Support Priority WhatsApp",
        "Influencer Collaboration"
      ],
      image: "/paket 2.png",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      name: "Business",
      title: "Business Package",
      subtitle: "Paket Enterprise yang Powerful",
      price: "Rp 8,500,000",
      originalPrice: "Rp 10,000,000",
      description: "Solusi komprehensif untuk perusahaan yang ingin mendominasi pasar digital",
      features: [
        "25 Konten Video Premium",
        "40 Konten Foto Berkualitas",
        "Strategi Konten Expert",
        "Real-time Analytics Dashboard",
        "Dedicated Account Manager",
        "Campaign Management",
        "Multi-platform Distribution",
        "Competitor Analysis",
        "Monthly Strategy Review"
      ],
      image: "/paket 3.png",
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      name: "Premium",
      title: "Premium Package",
      subtitle: "Solusi Custom untuk Kebutuhan Khusus",
      price: "Rp 15,000,000",
      description: "Paket premium dengan layanan full-service dan personalisasi maksimal",
      features: [
        "50+ Konten Video Premium",
        "100+ Konten Foto Berkualitas",
        "Custom Content Strategy",
        "Advanced Analytics Suite",
        "Dedicated Creative Team",
        "White-label Solutions",
        "API Integration",
        "Custom Reporting",
        "24/7 Priority Support",
        "Quarterly Business Review"
      ],
      image: "/paket 4.png",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "Enterprise",
      title: "Enterprise Package",
      subtitle: "Solusi Khusus Skala Besar",
      price: "Custom Quote",
      description: "Solusi enterprise dengan fleksibilitas penuh sesuai kebutuhan korporat",
      features: [
        "Unlimited Premium Content",
        "Custom Development",
        "Enterprise-grade Security",
        "Dedicated Development Team",
        "Global Campaign Support",
        "Advanced Integration",
        "Custom Analytics Platform",
        "Executive Reporting",
        "SLA Guarantee",
        "Training & Onboarding"
      ],
      image: "/paket 5.png",
      color: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7124A8] to-purple-600 text-white">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>
            <h1 className={`font-bold mb-4 ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
              Paket Influencer Marketing
            </h1>
            <p className={`text-white/90 max-w-3xl mx-auto ${isMobile ? 'text-lg' : 'text-xl'}`}>
              Pilih paket yang tepat untuk mengembangkan bisnis Anda dengan strategi
              influencer marketing yang terbukti efektif
            </p>
          </motion.div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedPackage === pkg.id
                  ? 'border-[#7124A8] scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-bl-2xl font-bold text-sm flex items-center z-10">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-80`}></div>
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute top-4 left-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                  <p className="text-white/90">{pkg.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {pkg.price}
                    </div>
                    {pkg.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {pkg.originalPrice}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">per bulan</div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                  {pkg.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {pkg.features.slice(0, selectedPackage === pkg.id ? pkg.features.length : 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                  {pkg.features.length > 4 && selectedPackage !== pkg.id && (
                    <button
                      onClick={() => setSelectedPackage(pkg.id)}
                      className="text-[#7124A8] text-sm font-medium hover:underline ml-8"
                    >
                      +{pkg.features.length - 4} fitur lainnya
                    </button>
                  )}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#7124A8] to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>Pilih {pkg.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`font-bold text-gray-900 dark:text-white mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              Tidak Yakin Paket Mana yang Tepat?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Konsultasikan kebutuhan bisnis Anda dengan tim ahli kami.
              Dapatkan rekomendasi paket yang paling sesuai secara gratis.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#7124A8] to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto shadow-lg"
            >
              <span>Konsultasi Gratis</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;