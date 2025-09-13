'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import komponen Image

const ExpandingCardsPackages = () => {
  const [activePanel, setActivePanel] = useState(0);
  const router = useRouter();

  const packages = [
    {
      id: 1,
      title: "Starter Package",
      subtitle: "Paket Pemula untuk UMKM",
      image: "/paket 1.png"
    },
    {
      id: 2,
      title: "Professional Package",
      subtitle: "Solusi Lengkap Bisnis Menengah",
      image: "/paket 2.png"
    },
    {
      id: 3,
      title: "Business Package",
      subtitle: "Paket Enterprise yang Powerful",
      image: "/paket 3.png"
    },
    {
      id: 4,
      title: "Premium Package",
      subtitle: "Solusi Custom untuk Kebutuhan Khusus",
      image: "/paket 4.png"
    },
    {
      id: 5,
      title: "Enterprise Package",
      subtitle: "Solusi Khusus Skala Besar",
      image: "/paket 5.png"
    }
  ];

  const handlePanelClick = (index: number) => {
    if (activePanel === index) {
      router.push('/packages');
    } else {
      setActivePanel(index);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-6"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Pilih <span className="text-[#7124A8]">Paket Terbaik</span> untuk Bisnis Anda
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Solusi lengkap influencer marketing yang disesuaikan dengan kebutuhan dan skala bisnis Anda
        </p>
      </motion.div>

      {/* Expanding Cards Container */}
      <div className="flex justify-center px-6">
        <div
          className="flex w-[90vw] h-[80vh] max-w-7xl"
          style={{ gap: '10px' }}
        >
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`
                relative cursor-pointer bg-cover bg-center bg-no-repeat text-white
                transition-all duration-700 ease-in-out rounded-[50px] overflow-hidden
                ${activePanel === index ? 'flex-[5]' : 'flex-[0.5]'}
              `}
              onClick={() => handlePanelClick(index)}
            >
              {/* Ganti backgroundImage dengan komponen Image */}
              <Image
                src={pkg.image}
                alt={pkg.title}
                layout="fill"
                objectFit="cover"
                className="z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
              
              {/* Content */}
              <div
                className={`
                  absolute bottom-5 left-5 transition-opacity duration-300 z-20
                  ${activePanel === index
                    ? 'opacity-100 transition-delay-[0.4s]'
                    : 'opacity-0'
                  }
                `}
              >
                <h3 className="text-2xl font-bold mb-2 m-0">
                  {pkg.title}
                </h3>
                <p className="text-lg text-gray-200 m-0">
                  {pkg.subtitle}
                </p>
              </div>

              {/* Panel Number for inactive panels */}
              <div
                className={`
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20
                  transition-opacity duration-300
                  ${activePanel === index ? 'opacity-0' : 'opacity-100'}
                `}
              >
                <div className="text-6xl font-bold text-white/60">
                  {pkg.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#7124A8]/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default ExpandingCardsPackages;