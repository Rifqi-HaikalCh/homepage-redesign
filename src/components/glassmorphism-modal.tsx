'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function GlassmorphismModal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {title}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                {children}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  isLoading?: boolean;
}

export function ConfirmDeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName, 
  isLoading = false 
}: ConfirmDeleteModalProps) {
  return (
    <GlassmorphismModal isOpen={isOpen} onClose={onClose} title="Konfirmasi Hapus">
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Apakah Anda yakin ingin menghapus <span className="font-semibold text-gray-900 dark:text-white">{itemName}</span>?
        </p>
        <p className="text-sm text-red-600 dark:text-red-400">
          Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Menghapus...' : 'Hapus'}
          </Button>
        </div>
      </div>
    </GlassmorphismModal>
  );
}

interface InfluencerFormData {
  name: string;
  content_type: string;
  instagram: string;
  followers: string;
  city: string;
  avatar: string;
  engagement_rate: string;
}

interface InfluencerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: InfluencerFormData) => void;
  initialData?: Partial<InfluencerFormData>;
  isLoading?: boolean;
  mode: 'add' | 'edit';
}

export function InfluencerFormModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  isLoading = false,
  mode 
}: InfluencerFormModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const data: InfluencerFormData = {
      name: formData.get('name') as string,
      content_type: formData.get('content_type') as string,
      instagram: formData.get('instagram') as string,
      followers: formData.get('followers') as string,
      city: formData.get('city') as string,
      avatar: formData.get('avatar') as string,
      engagement_rate: formData.get('engagement_rate') as string,
    };
    
    onSave(data);
  };

  return (
    <GlassmorphismModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={mode === 'add' ? 'Tambah Influencer' : 'Edit Influencer'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nama Lengkap
          </label>
          <Input
            name="name"
            defaultValue={initialData.name || ''}
            placeholder="Masukkan nama lengkap"
            required
            className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Jenis Konten
          </label>
          <select
            name="content_type"
            defaultValue={initialData.content_type || ''}
            required
            className="w-full p-2 rounded-lg border border-white/30 dark:border-gray-600/30 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 backdrop-blur-sm"
          >
            <option value="">Pilih jenis konten</option>
            <option value="Lifestyle & Fashion">Lifestyle & Fashion</option>
            <option value="Beauty & Skincare">Beauty & Skincare</option>
            <option value="Tech & Gaming">Tech & Gaming</option>
            <option value="Travel & Food">Travel & Food</option>
            <option value="Fitness & Health">Fitness & Health</option>
            <option value="Art & Creative">Art & Creative</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Instagram Handle
          </label>
          <Input
            name="instagram"
            defaultValue={initialData.instagram || ''}
            placeholder="@username"
            required
            className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Followers
          </label>
          <Input
            name="followers"
            defaultValue={initialData.followers || ''}
            placeholder="76.8K"
            required
            className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kota
          </label>
          <Input
            name="city"
            defaultValue={initialData.city || ''}
            placeholder="Jakarta"
            required
            className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Avatar URL
          </label>
          <Input
            name="avatar"
            defaultValue={initialData.avatar || ''}
            placeholder="https://images.unsplash.com/..."
            required
            className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Engagement Rate
          </label>
          <Input
            name="engagement_rate"
            defaultValue={initialData.engagement_rate || ''}
            placeholder="5.4%"
            required
            className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm"
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#7124A8] hover:bg-[#5a1d87]"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </GlassmorphismModal>
  );
}