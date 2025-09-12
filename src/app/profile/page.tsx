'use client';

import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, LogOut, Instagram, User, UserPlus, Camera, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import SecondaryHeader from '@/components/secondary-header';
import { useAuth } from '@/contexts/AuthContext';

// Interface untuk profile data
interface ProfileData {
  id?: number;
  name: string;
  content_type?: string;
  city: string;
  avatar: string;
  instagram: string;
  instagram_data?: {
    followers: string;
    engagement_rate: string;
    avg_likes: string;
    avg_comments: string;
  };
  tiktok?: {
    handle: string;
    followers: string;
    engagement_rate: string;
    avg_likes: string;
    avg_views: string;
  };
}

// Default data
const defaultUserData: ProfileData = {
  name: 'Default User',
  content_type: 'Content Creator',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center',
  city: 'Jakarta',
  instagram: 'defaultuser',
  instagram_data: {
    followers: '15.4K',
    engagement_rate: '5.4%',
    avg_likes: '1.2K',
    avg_comments: '32'
  },
  tiktok: {
    handle: '@defaultuser',
    followers: '5.2K',
    engagement_rate: '8.1%',
    avg_likes: '500',
    avg_views: '10.5K'
  }
};

// Guest Login Prompt Component
const GuestLoginPrompt = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 transition-all duration-500">
    <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />
    <div className="fixed inset-0 backdrop-blur-[0.5px] pointer-events-none" />
    
    <div className="relative z-10">
      <SecondaryHeader title="Profile" backUrl="/" />
      
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Avatar Upload */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-gray-200"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute -bottom-2 -right-2 bg-[#7124A8] text-white p-2 rounded-full hover:bg-[#5a1d87] disabled:opacity-50"
              >
                {isUploading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Masukkan nama"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kota Asal</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Masukkan kota"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Instagram Handle</label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#E4405F]" />
              <Input
                value={formData.instagram}
                onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                placeholder="username"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">TikTok Handle</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-black dark:bg-white rounded-sm flex items-center justify-center">
                <svg className="w-2 h-2 text-white dark:text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.98-1.55-1.99-2.3-4.49-2.2-6.87.09-2.38 1.01-4.74 2.48-6.42 1.45-1.66 3.49-2.69 5.59-2.71.01 1.54-.01 3.08.01 4.61-.13 1.17-.72 2.3-1.57 3.12-1.32 1.25-3.33 1.76-4.96 1.13.04-2.05-.01-4.11.02-6.16.22-1.63 1.15-3.2 2.3-4.25 1.16-1.06 2.74-1.58 4.27-1.71v-4.04c.01-.02.02-.02.02-.02z"/>
                </svg>
              </div>
              <Input
                value={formData.tiktok?.handle || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  tiktok: { 
                    ...(prev.tiktok || {}), 
                    handle: e.target.value,
                    followers: prev.tiktok?.followers || '',
                    engagement_rate: prev.tiktok?.engagement_rate || '',
                    avg_likes: prev.tiktok?.avg_likes || '',
                    avg_views: prev.tiktok?.avg_views || ''
                  }
                }))}
                placeholder="@username"
                className="pl-10"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#7124A8] hover:bg-[#5a1d87]">
              Save Changes
            </Button>
          </div>
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
        <SecondaryHeader title="Profile" backUrl="/" />
        
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

export default function ProfilePage() {
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
            setProfileData({
              ...data,
              instagram_data: data.instagram_data,
              tiktok: data.tiktok
            });
          }
        } catch (error) {
          console.error('Error loading profile:', error);
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
        <SecondaryHeader title="Profile" backUrl="/" />
        
        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div
            className="container mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Kolom Kiri - Profil Utama */}
          <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 mb-4 shadow-md">
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 font-sans">
                  {profileData.name}
                </h1>
                <p className="text-[#7124A8] font-medium text-sm mb-2 font-sans">
                  {profileData.content_type}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {profileData.city}
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full bg-[#7124A8] hover:bg-[#5a1d87] text-white rounded-xl py-3 font-semibold"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kolom Kanan - Detail Statistik & Portofolio */}
          <motion.div className="lg:col-span-3 space-y-6" variants={itemVariants}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Kartu Instagram */}
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Instagram className="w-5 h-5 text-[#E4405F] mr-2" />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white font-sans">
                      Summary Instagram
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#7124A8] font-sans">
                        @{profileData.instagram}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Followers</div>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">{profileData.instagram_data?.followers || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Engagement Rate</div>
                        <div className="text-xl font-bold text-green-600">{profileData.instagram_data?.engagement_rate || 'N/A'}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Average Like</div>
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{profileData.instagram_data?.avg_likes || 'N/A'}</div>
                      </div>
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Average Comment</div>
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{profileData.instagram_data?.avg_comments || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kartu TikTok */}
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-5 h-5 bg-black dark:bg-white rounded-sm mr-2 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white dark:text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.98-1.55-1.99-2.3-4.49-2.2-6.87.09-2.38 1.01-4.74 2.48-6.42 1.45-1.66 3.49-2.69 5.59-2.71.01 1.54-.01 3.08.01 4.61-.13 1.17-.72 2.3-1.57 3.12-1.32 1.25-3.33 1.76-4.96 1.13.04-2.05-.01-4.11.02-6.16.22-1.63 1.15-3.2 2.3-4.25 1.16-1.06 2.74-1.58 4.27-1.71v-4.04c.01-.02.02-.02.02-.02z"/></svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white font-sans">
                      Summary TikTok
                    </h3>
                  </div>
                  <div className="space-y-4">
                     <div className="text-center">
                      <div className="text-2xl font-bold text-[#7124A8] font-sans">
                        {profileData.tiktok?.handle || '@notset'}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Followers</div>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">{profileData.tiktok?.followers || 'N/A'}</div>
                      </div>
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Engagement Rate</div>
                        <div className="text-xl font-bold text-green-600">{profileData.tiktok?.engagement_rate || 'N/A'}</div>
                      </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Average Like</div>
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{profileData.tiktok?.avg_likes || 'N/A'}</div>
                      </div>
                       <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Average View</div>
                        <div className="text-lg font-bold text-gray-800 dark:text-white">{profileData.tiktok?.avg_views || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-700/30 rounded-3xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 font-sans">Portfolio</h3>
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500 text-lg">📁</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Portfolio Coming Soon
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Portfolio management feature will be available in the next update
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
}