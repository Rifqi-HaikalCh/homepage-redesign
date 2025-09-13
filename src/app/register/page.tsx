'use client';

import useMobileView from '@/hooks/useMobileView';
import MobileRegisterPage from '@/components/mobile/MobileRegisterPage';

// Desktop components
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, ArrowLeft, Instagram, MapPin, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

type Step = 1 | 2 | 3 | 4;

const DesktopRegisterPage = () => {
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // Form data - Updated to match correct structure
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    username: '',
    role: 'client' as 'admin' | 'client' | 'influencer',
    // Influencer specific fields
    contentType: '',
    instagramHandle: '',
    tiktokHandle: '',
    city: '',
    avatar: '',
    services: [] as string[]
  });

  const { signUp } = useAuth();
  const router = useRouter();

  const nextStep = () => setStep(prev => prev < 4 ? (prev + 1) as Step : prev);
  const prevStep = () => setStep(prev => prev > 1 ? (prev - 1) as Step : prev);

  // Countdown timer untuk rate limiting
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isRateLimited && countdown === 0) {
      setIsRateLimited(false);
      setError('');
    }
  }, [countdown, isRateLimited]);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (isRateLimited) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Create the registration payload
      const registrationData = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        fullName: formData.fullName,
        username: formData.username,
        // Include influencer data if role is influencer
        ...(formData.role === 'influencer' && {
          influencerData: {
            name: formData.fullName,
            content_type: formData.contentType,
            city: formData.city,
            instagram_handle: formData.instagramHandle,
            tiktok_handle: formData.tiktokHandle,
            services: formData.services,
            avatar: formData.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=center'
          }
        })
      };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/login?message=Registration successful, please login');
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('Terlalu banyak percobaan')) {
        const seconds = error.message.match(/(\d+) detik/)?.[1];
        if (seconds) {
          setCountdown(parseInt(seconds));
          setIsRateLimited(true);
        }
      }
      const message = error instanceof Error ? error.message : 'Registration failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    },
  };

  const stepVariants: Variants = {
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

  // Form validation functions
  const isStep1Valid = () => {
    return formData.email.trim() !== '' && formData.password.length >= 6;
  };

  const isStep2Valid = () => {
    return formData.fullName.trim() !== '' && formData.username.trim() !== '' && formData.role.length > 0;
  };

  const isStep3Valid = () => {
    if (formData.role !== 'influencer') return true;
    return (
      formData.contentType.trim() !== '' &&
      formData.instagramHandle.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.services.length > 0
    );
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (step === 1 && !isStep1Valid()) return;
    if (step === 2 && !isStep2Valid()) return;
    if (step === 3 && !isStep3Valid()) return;
    
    setDirection(1);
    // Skip influencer step if not an influencer
    if (step === 2 && formData.role !== 'influencer') {
      setStep(4); // Go directly to final step
    } else {
      nextStep();
    }
  };
  
  const handlePrev = () => {
    setDirection(-1);
    // Skip influencer step when going back if not an influencer
    if (step === 4 && formData.role !== 'influencer') {
      setStep(2); // Go directly to step 2
    } else {
      prevStep();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
      {/* Glossy Glass Background Effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
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
                  className="h-12 object-contain"
                  style={{ width: "auto" }}
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
              {(formData.role === 'influencer' ? [1, 2, 3, 4] : [1, 2, 4]).map((s, index) => (
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
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                        required
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        type="password" 
                        placeholder="Masukkan password" 
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                        required
                        minLength={6}
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                       <Button 
                         onClick={handleNext} 
                         disabled={!isStep1Valid()}
                         className={`w-full h-12 font-bold rounded-lg text-base ${
                           isStep1Valid() 
                             ? 'bg-[#7124A8] hover:bg-[#5a1d87] text-white' 
                             : 'bg-gray-300 cursor-not-allowed text-gray-500'
                         }`}
                       >
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
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                        required
                      />
                    </div>
                     <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        placeholder="Username" 
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="w-full p-3 h-12 rounded-lg border border-white/30 dark:border-gray-600/30 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 backdrop-blur-sm"
                      >
                        <option value="client">Client (Saya ingin booking talent)</option>
                        <option value="influencer">Influencer (Saya adalah talent)</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex gap-4">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                         <Button onClick={handlePrev} variant="outline" className="w-full h-12 rounded-lg">
                          <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                         <Button 
                           onClick={handleNext} 
                           disabled={!isStep2Valid()}
                           className={`w-full h-12 font-bold rounded-lg text-base ${
                             isStep2Valid() 
                               ? 'bg-[#7124A8] hover:bg-[#5a1d87] text-white' 
                               : 'bg-gray-300 cursor-not-allowed text-gray-500'
                           }`}
                         >
                          Next <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                {step === 3 && formData.role === 'influencer' && (
                  <motion.div
                    key={3}
                    custom={direction}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4 absolute w-full overflow-y-auto max-h-80"
                  >
                    <h2 className="font-semibold text-lg text-center text-gray-800 dark:text-gray-200">Influencer Profile</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Content Type
                      </label>
                      <select
                        value={formData.contentType}
                        onChange={(e) => handleInputChange('contentType', e.target.value)}
                        className="w-full p-3 h-12 rounded-lg border border-white/30 dark:border-gray-600/30 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 backdrop-blur-sm"
                        required
                      >
                        <option value="">Pilih Content Type</option>
                        <option value="Food & Beverages">Food & Beverages</option>
                        <option value="Technology">Technology</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Travel & Lifestyle">Travel & Lifestyle</option>
                        <option value="Health & Sport">Health & Sport</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Content Creator">Content Creator</option>
                        <option value="Beauty & Fashion">Beauty & Fashion</option>
                        <option value="Youtuber">Youtuber</option>
                        <option value="DJ & Penyanyi">DJ & Penyanyi</option>
                        <option value="Tiktok">Tiktok</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Mom & Kids">Mom & Kids</option>
                      </select>
                    </div>

                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E4405F]" />
                      <Input 
                        placeholder="Instagram Handle (tanpa @)" 
                        value={formData.instagramHandle}
                        onChange={(e) => handleInputChange('instagramHandle', e.target.value)}
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                        required
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-black dark:bg-white rounded-sm flex items-center justify-center">
                        <svg className="w-2 h-2 text-white dark:text-black" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.98-1.55-1.99-2.3-4.49-2.2-6.87.09-2.38 1.01-4.74 2.48-6.42 1.45-1.66 3.49-2.69 5.59-2.71.01 1.54-.01 3.08.01 4.61-.13 1.17-.72 2.3-1.57 3.12-1.32 1.25-3.33 1.76-4.96 1.13.04-2.05-.01-4.11.02-6.16.22-1.63 1.15-3.2 2.3-4.25 1.16-1.06 2.74-1.58 4.27-1.71v-4.04c.01-.02.02-.02.02-.02z"/>
                        </svg>
                      </div>
                      <Input 
                        placeholder="TikTok Handle (@username)" 
                        value={formData.tiktokHandle}
                        onChange={(e) => handleInputChange('tiktokHandle', e.target.value)}
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        placeholder="Kota Asal" 
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="pl-10 h-12 rounded-lg bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80" 
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Services (Pilih yang sesuai)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Endorse', 'Foto Katalog', 'Video Review', 'Live Streaming', 'Content Creation', 'Brand Ambassador'].map((service) => (
                          <label key={service} className="flex items-center space-x-2 text-sm">
                            <input
                              type="checkbox"
                              checked={formData.services.includes(service)}
                              onChange={(e) => {
                                const newServices = e.target.checked
                                  ? [...formData.services, service]
                                  : formData.services.filter(s => s !== service);
                                handleInputChange('services', newServices);
                              }}
                              className="rounded border-gray-300 text-[#7124A8] focus:ring-[#7124A8]"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                         <Button onClick={handlePrev} variant="outline" className="w-full h-12 rounded-lg">
                          <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                         <Button 
                           onClick={handleNext} 
                           disabled={!isStep3Valid()}
                           className={`w-full h-12 font-bold rounded-lg text-base ${
                             isStep3Valid() 
                               ? 'bg-[#7124A8] hover:bg-[#5a1d87] text-white' 
                               : 'bg-gray-300 cursor-not-allowed text-gray-500'
                           }`}
                         >
                          Next <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                 {step === 4 && (
                  <motion.div
                    key={4}
                    custom={direction}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6 absolute w-full text-center flex flex-col items-center justify-center h-full"
                  >
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Ready to Go!</h2>
                    <p className="text-gray-600 dark:text-gray-300">You&apos;re all set. Click below to create your account.</p>
                    
                    {/* Error Message */}
                    {error && (
                      <div className={`border rounded-lg p-3 w-full ${
                        isRateLimited 
                          ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      }`}>
                        <p className={`text-sm ${
                          isRateLimited 
                            ? 'text-orange-600 dark:text-orange-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {error}
                        </p>
                        {isRateLimited && countdown > 0 && (
                          <div className="mt-2 p-2 bg-orange-100 dark:bg-orange-900/40 rounded text-center">
                            <p className="text-orange-700 dark:text-orange-300 text-sm font-semibold">
                              Coba lagi dalam: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                            </p>
                            <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-1 mt-1">
                              <div 
                                className="bg-orange-500 h-1 rounded-full transition-all duration-1000"
                                style={{ width: `${100 - (countdown / 60) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                     <div className="flex gap-4 w-full pt-4">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                         <Button onClick={handlePrev} variant="outline" className="w-full h-12 rounded-lg" disabled={isLoading}>
                          <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                         <Button 
                           onClick={handleSubmit} 
                           disabled={isLoading || isRateLimited}
                           className={`w-full h-12 font-bold rounded-lg text-base ${
                             isRateLimited 
                               ? 'bg-gray-400 cursor-not-allowed'
                               : 'bg-[#7124A8] hover:bg-[#5a1d87]'
                           } text-white`}
                         >
                          {isLoading ? 'Membuat Akun...' : isRateLimited ? `Tunggu ${countdown}s` : 'Buat Akun'}
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
    </div>
  );
};

export default function RegisterPage() {
  const isMobile = useMobileView();

  if (isMobile) {
    return <MobileRegisterPage />;
  }

  return <DesktopRegisterPage />;
}