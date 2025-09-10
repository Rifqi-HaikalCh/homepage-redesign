'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const carouselItems = [
  {
    id: 1,
    title: 'Slide 1',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop&crop=center'
  },
  {
    id: 2,
    title: 'Slide 2',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop&crop=center'
  },
  {
    id: 3,
    title: 'Slide 3',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop&crop=center'
  },
  {
    id: 4,
    title: 'Slide 4',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop&crop=center'
  },
  {
    id: 5,
    title: 'Slide 5',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=400&fit=crop&crop=center'
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with middle slide

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex;
    
    if (diff === 0) {
      // Active slide (center)
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
        rotateY: 0
      };
    } else if (diff === 1 || (currentIndex === carouselItems.length - 1 && index === 0)) {
      // Next slide (right)
      return {
        x: 380,
        scale: 0.8,
        opacity: 0.6,
        zIndex: 5,
        rotateY: -25
      };
    } else if (diff === -1 || (currentIndex === 0 && index === carouselItems.length - 1)) {
      // Previous slide (left)
      return {
        x: -380,
        scale: 0.8,
        opacity: 0.6,
        zIndex: 5,
        rotateY: 25
      };
    } else {
      // Hidden slides
      return {
        x: diff > 0 ? 750 : -750,
        scale: 0.6,
        opacity: 0,
        zIndex: 1,
        rotateY: diff > 0 ? -45 : 45
      };
    }
  };

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="relative h-96 flex items-center justify-center">
          <AnimatePresence mode="sync">
            {carouselItems.map((item, index) => {
              const position = getSlidePosition(index);
              
              return (
                <motion.div
                  key={item.id}
                  className="absolute w-[500px] h-80 cursor-pointer"
                  style={{ perspective: '1000px' }}
                  initial={position}
                  animate={position}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <motion.div
                    className="w-full h-full rounded-2xl overflow-hidden shadow-xl"
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden'
                    }}
                    whileHover={
                      index === currentIndex 
                        ? { scale: 1.05 }
                        : { scale: 0.85 }
                    }
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 z-20 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 z-20 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#7124A8] w-8' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}