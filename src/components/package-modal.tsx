'use client';

import { GlassmorphismModal } from '@/components/glassmorphism-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PackageFormData {
  title: string;
  description: string;
  price: string;
  icon: string;
}

interface PackageFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PackageFormData) => void;
  initialData?: Partial<PackageFormData>;
  isLoading?: boolean;
  mode: 'add' | 'edit';
}

export function PackageFormModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  isLoading = false,
  mode 
}: PackageFormModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const data: PackageFormData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      icon: formData.get('icon') as string,
    };
    
    onSave(data);
  };

  return (
    <GlassmorphismModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={mode === 'add' ? 'Tambah Paket' : 'Edit Paket'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nama Paket
          </label>
          <Input
            name="title"
            defaultValue={initialData.title || ''}
            placeholder="Paket Endorsement 10 Micro Influencer"
            required
            className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Deskripsi
          </label>
          <textarea
            name="description"
            defaultValue={initialData.description || ''}
            placeholder="Kampanye endorsement dengan 10 micro influencer pilihan"
            required
            rows={3}
            className="w-full p-2 rounded-lg border border-white/30 dark:border-gray-600/30 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 backdrop-blur-sm resize-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Harga
          </label>
          <Input
            name="price"
            defaultValue={initialData.price || ''}
            placeholder="Rp 2.500.000"
            required
            className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 backdrop-blur-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Icon (Emoji)
          </label>
          <Input
            name="icon"
            defaultValue={initialData.icon || ''}
            placeholder="🎯"
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