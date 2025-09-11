'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to send reset email';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <Link href="/login" className="absolute top-6 left-6">
          <Button variant="ghost" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Login
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/dapur-buzzer-logo.png" 
                    alt="Dapur Buzzer Logo" 
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {isSubmitted ? 'Email Terkirim!' : 'Lupa Password?'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {isSubmitted 
                    ? 'Kami telah mengirim instruksi reset password ke email Anda.'
                    : 'Masukkan email Anda dan kami akan mengirim instruksi untuk reset password.'
                  }
                </p>
              </div>

              {!isSubmitted ? (
                <>
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
                      <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm focus:bg-white/80 dark:focus:bg-gray-800/80"
                          placeholder="masukkan@email.com"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span className="ml-2">Mengirim...</span>
                        </div>
                      ) : (
                        'Kirim Instruksi Reset'
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tidak menerima email? Periksa folder spam atau{' '}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#7124A8] hover:text-[#5a1d87] font-medium"
                    >
                      coba lagi
                    </button>
                  </p>
                </div>
              )}

              <div className="mt-6 text-center">
                <Link href="/login" className="text-[#7124A8] hover:text-[#5a1d87] font-medium text-sm">
                  Kembali ke halaman login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}