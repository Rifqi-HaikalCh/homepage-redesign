'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import contactAnimation from '../../public/contact.json';

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Animation Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <Lottie
                animationData={contactAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Hubungi <span className="text-[#7124A8]">Kami</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Siap untuk memulai kampanye influencer marketing yang luar biasa?
                Tim ahli kami siap membantu Anda mencapai tujuan bisnis.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#7124A8]/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#7124A8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">hello@dapurbuzzer.id</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#7124A8]/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#7124A8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Telepon</h4>
                  <p className="text-gray-600">+62 21 1234 5678</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#7124A8]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#7124A8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Lokasi</h4>
                  <p className="text-gray-600">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#7124A8] to-[#7124A8] text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <span>Mulai Konsultasi</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7124A8]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ContactSection;