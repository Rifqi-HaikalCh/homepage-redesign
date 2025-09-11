'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);

  const nextStep = () => setStep(prev => prev < 3 ? (prev + 1) as Step : prev);
  const prevStep = () => setStep(prev => prev > 1 ? (prev - 1) as Step : prev);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] 
      }
    },
  };

  const stepVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    })
  };

  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };
  
  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
      {/* Glossy Glass Background Effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        {/* Back Button */}
        <Link href="/" className="absolute top-6 left-6">
          <Button variant="ghost" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
        </Link>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img 
                  src="/dapur-buzzer-logo.png" 
                  alt="Dapur Buzzer Logo" 
                  className="h-12 w-auto"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Buat Akun Baru
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Bergabung dengan kami dan mulai perjalanan Anda.
              </p>
            </div>

            {/* Indikator Stepper */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3].map(s => (
                <motion.div
                  key={s}
                  className="h-2 rounded-full bg-purple-200 dark:bg-purple-900"
                  animate={{ 
                    width: s === step ? '2.5rem' : '0.5rem',
                    backgroundColor: s === step ? '#8B5CF6' : '#E9D5FF'
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              ))}
            </div>

            <div className="relative h-80">
              <AnimatePresence initial={false} custom={direction}>
                {step === 1 && (
                  <motion.div
                    key={1}
                    custom={direction}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6 absolute w-full"
                  >
                    <h2 className="font-semibold text-lg text-center text-gray-800 dark:text-gray-200">Account Details</h2>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        type="email" 
                        placeholder="masukkan@email.com" 
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        type="password" 
                        placeholder="Masukkan password" 
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                       <Button onClick={handleNext} className="w-full h-12 bg-[#7124A8] hover:bg-[#5a1d87] text-white font-bold rounded-lg text-base">
                        Next <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key={2}
                    custom={direction}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6 absolute w-full"
                  >
                     <h2 className="font-semibold text-lg text-center text-gray-800 dark:text-gray-200">Personal Info</h2>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        placeholder="Nama Lengkap" 
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                      />
                    </div>
                     <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        placeholder="Username" 
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                      />
                    </div>
                    <div className="flex gap-4">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                         <Button onClick={handlePrev} variant="outline" className="w-full h-12 rounded-lg">
                          <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                         <Button onClick={handleNext} className="w-full h-12 bg-[#7124A8] hover:bg-[#5a1d87] text-white font-bold rounded-lg text-base">
                          Next <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                 {step === 3 && (
                  <motion.div
                    key={3}
                    custom={direction}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6 absolute w-full text-center flex flex-col items-center justify-center h-full"
                  >
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Ready to Go!</h2>
                    <p className="text-gray-600 dark:text-gray-300">You're all set. Click below to create your account.</p>
                     <div className="flex gap-4 w-full pt-4">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                         <Button onClick={handlePrev} variant="outline" className="w-full h-12 rounded-lg">
                          <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                         <Button className="w-full h-12 bg-[#7124A8] hover:bg-[#5a1d87] text-white font-bold rounded-lg text-base">
                          Buat Akun
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
             <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
              Sudah punya akun?{' '}
              <Link href="/login" className="font-semibold text-[#7124A8] hover:text-[#5a1d87]">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}