'use client';

import useMobileView from '@/hooks/useMobileView';
import MobileProfilePage from '@/components/mobile/MobileProfilePage';

// Desktop components
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, LogOut, Instagram, User, UserPlus, Camera, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import UnifiedHeader from '@/components/UnifiedHeader';
import { useAuth } from '@/contexts/AuthContext';

// Interface untuk profile data - Updated to match correct structure
interface ProfileData {
  id?: number;
  name: string;
  content_type: string;
  city: string;
  avatar: string;
  
  // Instagram data
  instagram_handle: string;
  instagram_followers: string;
  instagram_engagement_rate: string;
  instagram_avg_likes: string;
  instagram_avg_comments: string;
  
  // TikTok data
  tiktok_handle?: string;
  tiktok_followers?: string;
  tiktok_engagement_rate?: string;
  tiktok_avg_likes?: string;
  tiktok_avg_views?: string;
  
  // Services and Portfolio
  services?: string[];
  portfolio?: Array<{
    id: string;
    title: string;
    image_url: string;
    description?: string;
  }>;
}

// Empty default data - will be populated from database
const defaultUserData: ProfileData = {
  name: '',
  content_type: '',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=center',
  city: '',
  
  // Instagram data
  instagram_handle: '',
  instagram_followers: '',
  instagram_engagement_rate: '',
  instagram_avg_likes: '',
  instagram_avg_comments: '',
  
  // TikTok data
  tiktok_handle: '',
  tiktok_followers: '',
  tiktok_engagement_rate: '',
  tiktok_avg_likes: '',
  tiktok_avg_views: '',
  
  // Services
  services: [],
  
  // Portfolio (empty by default)
  portfolio: []
};

// Guest Login Prompt Component
const GuestLoginPrompt = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
    <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
    <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
    
    <div className="relative z-10">
      <UnifiedHeader
        variant="secondary"
        title="Profile"
        showBackButton={true}
        showHomeButton={true}
        backUrl="/"
      />
      
      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-[#7124A8]/10 dark:bg-[#7124A8]/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <User className="w-10 h-10 text-[#7124A8]" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Akses Profile Terbatas
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Untuk melihat dan mengelola profile Anda, silakan masuk terlebih dahulu atau buat akun baru.
              </p>
              
              <div className="space-y-4">
                <Link href="/login" className="block">
                  <Button className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white py-3 rounded-xl flex items-center justify-center gap-3">
                    <User className="w-5 h-5" />
                    Masuk ke Akun
                  </Button>
                </Link>
                
                <Link href="/register" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#7124A8]/30 text-[#7124A8] hover:bg-[#7124A8]/10 py-3 rounded-xl flex items-center justify-center gap-3"
                  >
                    <UserPlus className="w-5 h-5" />
                    Buat Akun Baru
                  </Button>
                </Link>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                Dengan membuat akun, Anda dapat menyimpan preferensi dan mengakses semua fitur platform.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  </div>
);

// Edit Profile Modal Component
const EditProfileModal = ({ 
  isOpen, 
  onClose, 
  profileData, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  profileData: ProfileData; 
  onSave: (data: ProfileData) => void; 
}) => {
  const [formData, setFormData] = useState<ProfileData>(profileData);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formDataUpload,
      });

      const result = await response.json();
      if (response.ok) {
        setFormData(prev => ({ ...prev, avatar: result.url }));
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="max-w-2xl w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl my-8 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ... (form field yang sudah ada untuk nama, kota, dll.) ... */}

          {/* Services Section (BARU) */}
          <div>
            <label className="block text-sm font-medium mb-2">Services</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Photo Content', 'Video Content', 'Story Posts', 'Reels/TikTok',
                'Live Stream', 'Product Review', 'Event Coverage', 'Brand Ambassador'
              ].map((service) => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(formData.services || []).includes(service)}
                    onChange={(e) => {
                      const newServices = [...(formData.services || [])];
                      if (e.target.checked) {
                        newServices.push(service);
                      } else {
                        const index = newServices.indexOf(service);
                        if (index > -1) newServices.splice(index, 1);
                      }
                      setFormData(prev => ({ ...prev, services: newServices }));
                    }}
                    className="rounded border-gray-300 dark:border-gray-600 text-[#7124A8] focus:ring-[#7124A8]/50"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ... (Tombol Aksi) ... */}
        </CardContent>
      </Card>
    </div>
  );
};

// Client Profile Component (Simple Layout)
const ClientProfile = ({ user, onSignOut }: { user: { email?: string }, onSignOut: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10">
        <UnifiedHeader
        variant="secondary"
        title="Profile"
        showBackButton={true}
        showHomeButton={true}
        backUrl="/"
      />
        
        <div className="flex items-center justify-center min-h-[80vh] p-4">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-[#7124A8]/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User className="w-12 h-12 text-[#7124A8]" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Profile Client
                </h1>
                
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                    <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <label className="text-sm text-gray-500 dark:text-gray-400">Role</label>
                    <p className="font-medium text-[#7124A8]">👤 Client</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <label className="text-sm text-gray-500 dark:text-gray-400">Member Since</label>
                    <p className="font-medium text-gray-900 dark:text-white">January 2024</p>
                  </div>
                </div>
                
                <Button 
                  onClick={onSignOut}
                  variant="destructive" 
                  className="w-full mt-6"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const DesktopProfilePage = () => {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData>(defaultUserData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Load profile data for influencers
  useEffect(() => {
    const loadProfileData = async () => {
      if (user && role === 'influencer') {
        try {
          const response = await fetch(`/api/influencers/profile?user_id=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
          } else {
            // Profile not found, keep default empty data
            console.log('Profile not found, showing empty state');
          }
        } catch (error) {
          console.error('Error loading profile:', error);
          // Keep default empty data on error
        } finally {
          setIsLoadingProfile(false);
        }
      } else {
        setIsLoadingProfile(false);
      }
    };

    if (!loading && user) {
      loadProfileData();
    }
  }, [user, role, loading]);

  // Handle profile update
  const handleProfileUpdate = async (updatedData: ProfileData) => {
    try {
      const response = await fetch('/api/influencers/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user?.id,
          ...updatedData
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setProfileData(result.profile);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  // Show loading state while auth is being determined
  if (loading || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7124A8] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  // Show guest login prompt if user is a guest or not authenticated
  if (role === 'guest' || !user) {
    return <GuestLoginPrompt />;
  }

  // Show client profile for clients
  if (role === 'client') {
    return <ClientProfile user={user} onSignOut={handleSignOut} />;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut"} },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
      {/* Glossy Glass Background Effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      
      <div className="relative z-10">
        <UnifiedHeader
        variant="secondary"
        title="Profile"
        showBackButton={true}
        showHomeButton={true}
        backUrl="/"
      />
        
        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div
            className="container mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
<div className="grid lg:grid-cols-4 gap-6">
          {/* Kolom Kiri - Profil Utama (Tidak banyak berubah) */}
          <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
            {/* ... Card Profil Utama ... */}
          </motion.div>

          {/* Kolom Kanan - Detail Statistik & Portofolio */}
          <motion.div className="lg:col-span-3 space-y-6" variants={itemVariants}>
            {/* Grid Statistik (Instagram & TikTok) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Kartu Instagram (Sudah ada, hanya perlu memastikan semua data tampil) */}
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
                <CardContent className="p-6">
                  {/* ... Konten kartu Instagram ... */}
                  {/* Pastikan semua data dari profileData.instagram_* ditampilkan */}
                </CardContent>
              </Card>

              {/* Kartu TikTok (Sudah ada, pastikan semua data tampil) */}
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
                <CardContent className="p-6">
                  {/* ... Konten kartu TikTok ... */}
                  {/* Tampilkan juga tiktok_followers, tiktok_avg_likes, dll. */}
                </CardContent>
              </Card>
            </div>
            
            {/* Kartu Layanan yang Ditawarkan (BARU) */}
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profileData.services && profileData.services.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profileData.services.map((service, index) => (
                      <div
                        key={index}
                        className="px-3 py-1.5 bg-[#7124A8]/10 text-[#7124A8] rounded-full text-sm font-medium"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Belum ada layanan yang ditambahkan.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Kartu Portofolio (BARU) */}
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">📁</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Fitur Portofolio Segera Hadir
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Fitur untuk mengelola portofolio akan tersedia pada pembaruan berikutnya.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
          </motion.div>

          {/* Tombol Logout */}
          <motion.div 
            className="fixed bottom-8 right-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.5, ease: "easeOut" } }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleSignOut}
              variant="destructive"
              className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
            >
              <LogOut className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
        onSave={handleProfileUpdate}
      />
    </div>
  );
};

export default function ProfilePage() {
  const isMobile = useMobileView();

  if (isMobile) {
    return <MobileProfilePage />;
  }

  return <DesktopProfilePage />;
}