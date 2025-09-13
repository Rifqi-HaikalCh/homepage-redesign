'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MobileExpandingCards = () => {
  const [activePanel, setActivePanel] = useState(0);

  const packages = [
    {
      id: 1,
      title: "Starter",
      subtitle: "Paket Pemula",
      image: "/paket 1.png"
    },
    {
      id: 2,
      title: "Professional",
      subtitle: "Solusi Lengkap",
      image: "/paket 2.png"
    },
    {
      id: 3,
      title: "Business",
      subtitle: "Paket Enterprise",
      image: "/paket 3.png"
    },
    {
      id: 4,
      title: "Premium",
      subtitle: "Solusi Custom",
      image: "/paket 4.png"
    }
  ];

  const handlePanelClick = (index: number) => {
    setActivePanel(index);
  };

  return (
    <section className="px-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Paket Premium</h2>
          <Link href="/packages" className="text-[#7124a8] text-sm font-medium flex items-center">
            Lihat Semua
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Mobile Expanding Cards */}
        <div className="flex h-64 gap-2 rounded-2xl overflow-hidden">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`
                relative cursor-pointer bg-cover bg-center bg-no-repeat text-white
                transition-all duration-700 ease-in-out overflow-hidden
                ${activePanel === index ? 'flex-[3]' : 'flex-[0.5]'}
              `}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${pkg.image})`,
                borderRadius: activePanel === index ? '16px' : '12px'
              }}
              onClick={() => handlePanelClick(index)}
            >
              {/* Content */}
              <div
                className={`
                  absolute bottom-4 left-4 transition-opacity duration-300
                  ${activePanel === index
                    ? 'opacity-100 transition-delay-[0.4s]'
                    : 'opacity-0'
                  }
                `}
              >
                <h3 className="text-lg font-bold mb-1 m-0">
                  {pkg.title}
                </h3>
                <p className="text-sm text-gray-200 m-0">
                  {pkg.subtitle}
                </p>
              </div>

              {/* Panel Number for inactive panels */}
              <div
                className={`
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  transition-opacity duration-300
                  ${activePanel === index ? 'opacity-0' : 'opacity-100'}
                `}
              >
                <div className="text-2xl font-bold text-white/60">
                  {pkg.id}
                </div>
              </div>

              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4"
        >
          <Link href="/packages">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#7124a8] to-purple-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Jelajahi Semua Paket</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MobileExpandingCards;