'use client';

import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import type { User } from '@/types/auth';
import AuthContainer from '@/components/auth/AuthContainer';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Only run Firebase auth on client side
    const initAuth = async () => {
      try {
        const { firebaseAuthService } = await import('@/services/firebaseAuthService');
        
        // Listen for auth state changes
        const unsubscribe = firebaseAuthService.onAuthStateChange((user) => {
          setUser(user);
          setLoading(false);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
      } catch (error) {
        console.error('Auth initialization error:', error);
        setLoading(false);
      }
    };

    const cleanup = initAuth();
    
    return () => {
      cleanup.then(unsubscribe => {
        if (unsubscribe) unsubscribe();
      });
    };
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogin = (user: User) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 8,
        },
      }}
    >
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <AuthContainer onLogin={handleLogin} />
      )}
    </ConfigProvider>
  );
}
