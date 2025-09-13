'use client';

import { motion } from 'framer-motion';

const ClientsSection = () => {
  const clients = [
    {
      name: 'DANA',
      description: 'Digital Payment Platform',
      logo: '💰',
      stats: '5M+ Users',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Shopee',
      description: 'E-commerce Platform',
      logo: '🛍️',
      stats: '10M+ Products',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Gojek',
      description: 'Super App Platform',
      logo: '🏍️',
      stats: '100M+ Rides',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'MS Glow',
      description: 'Beauty & Skincare',
      logo: '✨',
      stats: '1M+ Customers',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const stats = [
    { number: '500+', label: 'Brand Partners', icon: '🤝' },
    { number: '10K+', label: 'Successful Campaigns', icon: '🚀' },
    { number: '50M+', label: 'Total Reach', icon: '📈' },
    { number: '98%', label: 'Client Satisfaction', icon: '⭐' }
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${client.color} flex items-center justify-center text-2xl`}>
                {client.logo}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{client.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{client.description}</p>
              <div className="text-[#7124A8] font-semibold text-sm">{client.stats}</div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#7124A8] to-[#7124A8] rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Hasil yang Menginspirasi
            </h3>
            <p className="text-white/90 text-lg">
              Angka-angka yang membuktikan dedikasi kami dalam memberikan hasil terbaik
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#7124A8]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default ClientsSection;