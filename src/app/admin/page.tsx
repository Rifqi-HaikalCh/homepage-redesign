'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Package, Plus, Edit, Trash2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Types
interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

interface Package {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export default function AdminDashboard() {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{type: 'user' | 'package', id: string} | null>(null);

  // Show access denied for non-admin users instead of redirecting
  const showAccessDenied = !loading && (!user || role !== 'admin');

  // Load data
  useEffect(() => {
    if (user && role === 'admin') {
      loadUsers();
      loadPackages();
    }
  }, [user, role]);

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.log('No users found, showing empty state');
        setUsers([]);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers([]);
    } finally {
      setIsLoadingData(false);
    }
  };

  const loadPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
      } else {
        console.log('No packages found, showing empty state');
        setPackages([]);
      }
    } catch (error) {
      console.error('Error loading packages:', error);
      setPackages([]);
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
      setPackages(packages.filter(p => p.id.toString() !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
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

  // Show access denied page for non-admin users
  if (showAccessDenied) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">🚫</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            You need admin privileges to access this page. Please contact an administrator or login with an admin account.
          </p>
          <div className="space-y-4">
            <Link href="/login">
              <Button className="bg-[#7124A8] hover:bg-[#5a1d87] text-white px-6 py-3">
                Login as Admin
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="px-6 py-3">
                Back to Homepage
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Current role: {role || 'Not logged in'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950">
      {/* Admin Header */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/30 dark:border-gray-700/30 sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <div className="flex items-center">
              <img 
                src="/dapur-buzzer-logo.png" 
                alt="Dapur Buzzer Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            
            {/* Logout Button - Right */}
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl p-6">
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
                {users.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Users Found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Users will appear here once they are loaded from the database.</p>
                  </div>
                ) : (
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
                )}
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
                {packages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Packages Found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Packages will appear here once they are loaded from the database.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packages.map((pkg) => (
                    <Card key={pkg.id} className="border border-gray-200 dark:border-gray-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{pkg.icon}</span>
                            <CardTitle className="text-lg">{pkg.title}</CardTitle>
                          </div>
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
                              onClick={() => setDeleteConfirm({type: 'package', id: pkg.id.toString()})}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-[#7124A8]">{pkg.price}</p>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full">
                            {pkg.category}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400">{pkg.description}</p>
                      </CardContent>
                    </Card>
                    ))}
                  </div>
                )}
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