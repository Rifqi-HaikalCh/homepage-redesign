'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  LogOut, 
  Camera, 
  Edit3, 
  Instagram,
  Music,
  MapPin,
  Users,
  TrendingUp,
  Star,
  ChevronRight,
  UserPlus,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import MobileLayout from './MobileLayout';

interface ProfileData {
  id?: number;
  name: string;
  content_type: string;
  city: string;
  avatar: string;
  instagram_handle: string;
  instagram_followers: string;
  instagram_engagement_rate: string;
  instagram_avg_likes: string;
  instagram_avg_comments: string;
  tiktok_handle?: string;
  tiktok_followers?: string;
  services?: string[];
}

const MobileProfilePage = () => {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [, setShowEditModal] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      if (user && role === 'influencer') {
        try {
          const response = await fetch(`/api/influencers/profile?user_id=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
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

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading || isLoadingProfile) {
    return (
      <MobileLayout headerTitle="Profile">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7124a8]"></div>
        </div>
      </MobileLayout>
    );
  }

  // Guest/Not authenticated
  if (role === 'guest' || !user) {
    return (
      <MobileLayout headerTitle="Profile">
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-sm"
          >
            <div className="w-20 h-20 bg-[#7124a8]/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <User className="w-10 h-10 text-[#7124a8]" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Your Profile
            </h1>
            
            <p className="text-gray-600 mb-8 text-sm">
              Sign in to access your profile and manage your account settings
            </p>
            
            <div className="space-y-3">
              <Link href="/login" className="block">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#7124a8] text-white font-semibold py-3 rounded-xl flex items-center justify-center"
                >
                  <User className="w-5 h-5 mr-2" />
                  Sign In
                </motion.button>
              </Link>
              
              <Link href="/register" className="block">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-[#7124a8] text-[#7124a8] font-semibold py-3 rounded-xl flex items-center justify-center"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create Account
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </MobileLayout>
    );
  }

  // Client Profile
  if (role === 'client') {
    return (
      <MobileLayout headerTitle="Profile">
        <div className="space-y-6 p-4">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm text-center"
          >
            <div className="w-20 h-20 bg-[#7124a8]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-[#7124a8]" />
            </div>
            
            <h1 className="text-xl font-bold text-gray-900 mb-1">Client Profile</h1>
            <p className="text-[#7124a8] text-sm font-medium">{user?.email}</p>
          </motion.div>

          {/* Profile Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Role</span>
                <span className="font-medium text-[#7124a8] flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Client
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">January 2024</span>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSignOut}
              className="w-full bg-red-50 text-red-600 font-semibold py-4 rounded-xl flex items-center justify-center border border-red-100"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </motion.button>
          </motion.div>
        </div>
      </MobileLayout>
    );
  }

  // Influencer Profile
  return (
    <MobileLayout headerTitle="Profile">
      <div className="space-y-0">
        {/* Profile Hero */}
        <section className="relative bg-gradient-to-br from-[#7124a8] to-[#7124a8] text-white">
          <div className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                <img
                  src={profileData?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=center'}
                  alt={profileData?.name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <h1 className="text-2xl font-bold mb-1">
              {profileData?.name || 'Complete Your Profile'}
            </h1>
            <p className="text-white/80 font-medium mb-1">
              {profileData?.content_type || 'Set your content type'}
            </p>
            <p className="text-white/80 text-sm flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-1" />
              {profileData?.city || 'Add your city'}
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        {profileData && (
          <section className="px-4 py-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                <div className="flex items-center text-blue-600 mb-2">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Followers</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {profileData.instagram_followers || '0'}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                <div className="flex items-center text-green-600 mb-2">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Engagement</span>
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {profileData.instagram_engagement_rate || '0%'}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Profile Details */}
        <section className="px-4 pb-4">
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Profile Details</h2>
              <button
                onClick={() => setShowEditModal(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit3 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Instagram */}
              <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-[#7124a8]/10 to-[#7124a8]/20 rounded-xl">
                <Instagram className="w-6 h-6 text-pink-500" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Instagram</div>
                  <div className="text-sm text-gray-600">
                    @{profileData?.instagram_handle || 'Not set'}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              {/* TikTok */}
              {profileData?.tiktok_handle && (
                <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <Music className="w-6 h-6 text-black" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">TikTok</div>
                    <div className="text-sm text-gray-600">
                      @{profileData.tiktok_handle}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              )}

              {/* Services */}
              <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <div className="font-medium text-gray-900">Services</div>
                </div>
                <div className="text-sm text-gray-600">
                  {profileData?.services && profileData.services.length > 0
                    ? `${profileData.services.length} services available`
                    : 'No services set'
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="px-4 pb-6">
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-4 rounded-xl flex items-center justify-center"
            >
              <Settings className="w-5 h-5 mr-2" />
              Account Settings
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSignOut}
              className="w-full bg-red-50 text-red-600 font-semibold py-4 rounded-xl flex items-center justify-center border border-red-100"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </motion.button>
          </div>
        </section>
      </div>
    </MobileLayout>
  );
};

export default MobileProfilePage;