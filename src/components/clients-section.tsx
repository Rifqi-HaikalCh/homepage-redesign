'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const ClientsSection = () => {
  const clients = [
    {
      name: 'DANA',
      logo: '/Dana logo.png',
    },
    {
      name: 'Gojek',
      logo: '/gojek-logo.png',
    },
    {
      name: 'MS Glow',
      logo: '/ms-glow.png',
    },
    {
      name: 'Shopee',
      logo: '/Shopee-Logo.png',
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Dipercaya oleh <span className="text-[#7124A8]">Brand Terkemuka</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bergabung dengan ratusan brand ternama Indonesia yang telah merasakan
            kesuksesan kampanye influencer marketing bersama kami
          </p>
        </motion.div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex justify-center items-center p-4 bg-gray-50 rounded-2xl"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={150}
                height={50}
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#7124A8]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default ClientsSection;