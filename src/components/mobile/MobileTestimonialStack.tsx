'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

const MobileTestimonialStack = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Data testimoni (saat ini masih statis)
  // Anda bisa menggantinya dengan fetch API jika perlu
  useEffect(() => {
    const sampleTestimonials: Testimonial[] = [
      {
        id: 1,
        quote: "Platform ini sangat mengubah cara kami bekerja dengan influencer. Prosesnya jadi lebih cepat, transparan, dan hasilnya sangat memuaskan!",
        author: "Budi Santoso",
        role: "Marketing Manager",
        company: "Brand Lokal Maju",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
      },
      {
        id: 2,
        quote: "Sebagai influencer, saya merasa lebih mudah mendapatkan tawaran kerjasama yang sesuai dengan niche saya. Sangat direkomendasikan!",
        author: "Rina Salsabila",
        role: "Lifestyle Influencer",
        company: "Konten Kreator",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
      },
      {
        id: 3,
        quote: "Analitik yang disediakan sangat membantu kami dalam mengukur keberhasilan kampanye. Data yang akurat adalah kunci!",
        author: "Dewi Lestari",
        role: "Digital Strategist",
        company: "Agensi Kreatif",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
      }
    ];
    setTestimonials(sampleTestimonials);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Ganti slide setiap 5 detik

    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) {
    return null; // Jangan render jika tidak ada testimoni
  }

  return (
    <section className="px-4 pb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Apa Kata Mereka?</h2>
        <div className="relative h-64 overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full"
                >
                    <Quote className="w-8 h-8 text-[#7124a8]/30 mb-2" />
                    <blockquote className="text-gray-700 text-sm leading-relaxed flex-grow">
                        "{testimonials[currentIndex].quote}"
                    </blockquote>
                    <div className="flex items-center mt-4">
                        <img
                            src={testimonials[currentIndex].avatar}
                            alt={testimonials[currentIndex].author}
                            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-[#7124a8]/20"
                        />
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">{testimonials[currentIndex].author}</p>
                            <p className="text-xs text-gray-500">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-[#7124a8] w-4' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    </section>
  );
};

export default MobileTestimonialStack;