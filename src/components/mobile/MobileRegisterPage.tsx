'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import MobileLayout from './MobileLayout';

const MobileRegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'client' | 'influencer'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp } = useAuth();
  const router = useRouter();

  const handleNext = () => {
    if (currentStep === 1) {
      if (!email || !password || password !== confirmPassword) {
        setError('Mohon isi semua field dengan benar');
        return;
      }
      if (password.length < 6) {
        setError('Kata sandi minimal 6 karakter');
        return;
      }
    }
    setError('');
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signUp(email, password, role);
      router.push('/');
    } catch (error: unknown) {
      setError((error as Error)?.message || 'Registrasi gagal');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      id: 'client',
      title: 'Klien',
      description: 'Saya ingin menemukan dan menyewa influencer',
      icon: '👤',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'influencer',
      title: 'Influencer',
      description: 'Saya ingin menawarkan layanan sebagai kreator',
      icon: '⭐',
      color: 'from-[#7124a8] to-[#7124a8]'
    }
  ];

  const contentTypeOptions = [
    { value: 'Food & Beverages', label: 'Food & Beverages' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Travel & Lifestyle', label: 'Travel & Lifestyle' },
    { value: 'Health & Sport', label: 'Health & Sport' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Content Creator', label: 'Content Creator' },
    { value: 'Beauty & Fashion', label: 'Beauty & Fashion' },
    { value: 'Youtuber', label: 'Youtuber' },
    { value: 'DJ & Penyanyi', label: 'DJ & Penyanyi' },
    { value: 'Tiktok', label: 'Tiktok' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Mom & Kids', label: 'Mom & Kids' }
  ];

  return (
    <MobileLayout showBack showBottomNav={false} headerTitle="Buat Akun">
      <div className="flex-1 flex flex-col px-6 py-8">
        {/* Progress Indicator */}
        <div className="flex items-center mb-8">
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step <= currentStep
                    ? 'bg-[#7124a8] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
              {step < 2 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded-full ${
                    step < currentStep ? 'bg-[#7124a8]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Account Details */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col justify-center space-y-8"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg border border-gray-100">
                  <img
                    src="/dapur-buzzer-logo.png"
                    alt="Dapur Buzzer Indonesia"
                    className="h-16"
                    style={{ width: "auto" }}
                  />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Buat Akun Baru
                </h1>
                <p className="text-gray-600">
                  Masukkan kredensial untuk memulai
                </p>
              </div>

              <div className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan email Anda"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7124a8] focus:border-transparent outline-none transition-colors"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Buat kata sandi"
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7124a8] focus:border-transparent outline-none transition-colors"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Konfirmasi Kata Sandi
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Konfirmasi kata sandi Anda"
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7124a8] focus:border-transparent outline-none transition-colors"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={handleNext}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#7124a8] to-[#7124a8] text-white font-semibold py-4 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <span>Lanjutkan</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  Sudah punya akun?{' '}
                  <Link
                    href="/login"
                    className="text-[#7124a8] font-semibold hover:text-[#7124a8]/80"
                  >
                    Masuk Sekarang
                  </Link>
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Account Type */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col justify-center space-y-8"
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Pilih Peran Anda
                </h1>
                <p className="text-gray-600">
                  Bagaimana Anda berencana menggunakan platform kami?
                </p>
              </div>

              <div className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {roleOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    type="button"
                    onClick={() => setRole(option.id as 'client' | 'influencer')}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                      role === option.id
                        ? 'border-[#7124a8] bg-[#7124a8]/10'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center text-xl`}>
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {option.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {option.description}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        role === option.id
                          ? 'border-[#7124a8] bg-[#7124a8]'
                          : 'border-gray-300'
                      }`}>
                        {role === option.id && (
                          <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="button"
                  onClick={handleBack}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 rounded-xl flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span>Kembali</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-[#7124a8] to-[#7124a8] text-white font-semibold py-4 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Buat Akun</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
};

export default MobileRegisterPage;