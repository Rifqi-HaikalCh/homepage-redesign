'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';


interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export default function TestimonialStack() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // For now, just show empty state since we don't have testimonials API
  useState(() => {
    setIsLoading(false);
    setTestimonials([]);
  });

  if (testimonials.length === 0) {
    return null; // Don't render testimonial section if no data
  }

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    
    if (diff === 0) {
      // Active card (front)
      return {
        zIndex: 10,
        rotate: 0,
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1
      };
    } else if (diff === 1 || (currentIndex === testimonials.length - 1 && index === 0)) {
      // Next card (middle back)
      return {
        zIndex: 9,
        rotate: -8,
        scale: 0.95,
        x: 20,
        y: 10,
        opacity: 0.8
      };
    } else if (diff === -1 || (currentIndex === 0 && index === testimonials.length - 1)) {
      // Previous card (back)
      return {
        zIndex: 8,
        rotate: 5,
        scale: 0.9,
        x: -15,
        y: 20,
        opacity: 0.6
      };
    } else {
      // Hidden cards
      return {
        zIndex: 1,
        rotate: 0,
        scale: 0.8,
        x: 0,
        y: 30,
        opacity: 0
      };
    }
  };


  return (
    <section className="py-16 bg-gradient-to-br from-[#7124A8]/5 via-white to-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our successful graduates who have transformed their careers through our courses
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-80 flex items-center justify-center" style={{ perspective: '1000px' }}>
            <AnimatePresence mode="sync">
              {testimonials.map((testimonial, index) => {
                const style = getCardStyle(index);
                const isActive = index === currentIndex;
                
                return (
                  <motion.div
                    key={testimonial.id}
                    className="absolute w-[500px] h-64"
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                    initial={style}
                    animate={style}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <div className={`
                      w-full h-full bg-white rounded-2xl shadow-xl p-8 border-2
                      ${isActive ? 'border-[#7124A8]/20' : 'border-gray-100'}
                      transition-all duration-300
                    `}>
                      <div className="flex h-full gap-6">
                        <div className="flex-shrink-0">
                          <motion.img
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            className="w-16 h-16 rounded-full object-cover border-2 border-[#7124A8]/20"
                            whileHover={{ scale: 1.1 }}
                          />
                        </div>
                        
                        <div className="flex-1 flex flex-col">
                          <div className="mb-3">
                            <Quote className="w-6 h-6 text-[#7124A8]/30" />
                          </div>
                          
                          <blockquote className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                            {testimonial.quote}
                          </blockquote>
                          
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">
                              {testimonial.author}
                            </div>
                            <div className="text-xs text-gray-500">
                              {testimonial.role} at {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:bg-[#7124A8] hover:text-white border border-gray-200 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#7124A8] w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:bg-[#7124A8] hover:text-white border border-gray-200 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}