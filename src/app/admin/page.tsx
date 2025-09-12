'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Package, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

// Types
interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  created_at: string;
}

export default function AdminDashboard() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{type: 'user' | 'package', id: string} | null>(null);

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && (!user || role !== 'admin')) {
      router.push('/');
    }
  }, [user, role, loading, router]);

  // Load data
  useEffect(() => {
    if (user && role === 'admin') {
      loadUsers();
      loadPackages();
    }
  }, [user, role]);

  const loadUsers = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockUsers: User[] = [
        { id: '1', email: 'admin@example.com', role: 'admin', created_at: '2024-01-01' },
        { id: '2', email: 'client@example.com', role: 'client', created_at: '2024-01-02' },
        { id: '3', email: 'influencer@example.com', role: 'influencer', created_at: '2024-01-03' },
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const loadPackages = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockPackages: Package[] = [
        {
          id: '1',
          name: 'Basic Package',
          description: 'Basic social media management',
          price: 500000,
          features: ['1 Platform', 'Weekly Posts', 'Basic Analytics'],
          created_at: '2024-01-01'
        },
        {
          id: '2',
          name: 'Premium Package',
          description: 'Comprehensive social media strategy',
          price: 1500000,
          features: ['3 Platforms', 'Daily Posts', 'Advanced Analytics', 'Influencer Matching'],
          created_at: '2024-01-02'
        }
      ];
      setPackages(mockPackages);
    } catch (error) {
      console.error('Error loading packages:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      setUsers(users.filter(u => u.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeletePackage = async (id: string) => {
    try {
      setPackages(packages.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  if (loading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7124A8] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 p-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage users and packages for Dapur Buzzer
          </p>
        </motion.div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Packages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
                <Button
                  onClick={() => {
                    setEditingUser(null);
                    setShowUserModal(true);
                  }}
                  className="bg-[#7124A8] hover:bg-[#5a1d87]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Role</th>
                        <th className="text-left p-4">Created</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                              user.role === 'influencer' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                              'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">{new Date(user.created_at).toLocaleDateString()}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingUser(user);
                                  setShowUserModal(true);
                                }}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setDeleteConfirm({type: 'user', id: user.id})}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages">
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Package Management
                </CardTitle>
                <Button
                  onClick={() => {
                    setEditingPackage(null);
                    setShowPackageModal(true);
                  }}
                  className="bg-[#7124A8] hover:bg-[#5a1d87]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Package
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <Card key={pkg.id} className="border border-gray-200 dark:border-gray-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{pkg.name}</CardTitle>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingPackage(pkg);
                                setShowPackageModal(true);
                              }}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteConfirm({type: 'package', id: pkg.id})}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-[#7124A8]">
                          Rp {pkg.price.toLocaleString()}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{pkg.description}</p>
                        <ul className="space-y-1">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                              <span className="w-1 h-1 bg-[#7124A8] rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-red-600">Confirm Delete</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (deleteConfirm.type === 'user') {
                      handleDeleteUser(deleteConfirm.id);
                    } else {
                      handleDeletePackage(deleteConfirm.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Modal - Simplified for now */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>{editingUser ? 'Edit User' : 'Add User'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                User management modal - implement form here
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowUserModal(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-[#7124A8] hover:bg-[#5a1d87]">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Package Modal - Simplified for now */}
      {showPackageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>{editingPackage ? 'Edit Package' : 'Add Package'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Package management modal - implement form here
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowPackageModal(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-[#7124A8] hover:bg-[#5a1d87]">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}