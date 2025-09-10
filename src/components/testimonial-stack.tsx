'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    quote: "This platform completely transformed my career. The courses are incredibly well-structured and the instructors are top-notch professionals.",
    author: "Sarah Johnson",
    role: "Full Stack Developer",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: 2,
    quote: "I've tried many online learning platforms, but none come close to the quality and engagement I found here. Highly recommended!",
    author: "Michael Chen",
    role: "UX Designer",
    company: "DesignStudio",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: 3,
    quote: "The interactive content and real-world projects helped me build a portfolio that landed me my dream job. Thank you for this amazing experience!",
    author: "Emily Rodriguez",
    role: "Data Scientist",
    company: "DataTech Solutions",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: 4,
    quote: "As a complete beginner, I was worried about keeping up. But the step-by-step approach made everything so clear and achievable.",
    author: "David Thompson",
    role: "Marketing Manager",
    company: "GrowthCorp",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center"
  },
  {
    id: 5,
    quote: "The community support and mentorship opportunities are invaluable. I've made connections that will last a lifetime.",
    author: "Lisa Wang",
    role: "Product Manager",
    company: "InnovateTech",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=center"
  }
];

export default function TestimonialStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      rotate: direction > 0 ? 15 : -15,
      scale: 0.8,
      opacity: 0,
      zIndex: 1
    }),
    center: {
      zIndex: 10,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 1,
      x: direction < 0 ? 300 : -300,
      rotate: direction < 0 ? 15 : -15,
      scale: 0.8,
      opacity: 0
    })
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
                    setDirection(index > currentIndex ? 1 : -1);
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