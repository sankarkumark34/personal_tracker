'use client';

import React, { useState } from 'react';
import { Button, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { firebaseAuthService } from '@/services/firebaseAuthService';
import type { User } from '@/types/auth';

interface GoogleSignInButtonProps {
  onLogin: (user: User) => void;
  loading?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onLogin, loading = false }) => {
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await firebaseAuthService.googleAuth();
      if (result.success && result.user) {
        message.success(result.message);
        onLogin(result.user);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('Google sign-in failed. Please try again.');
      console.error('Google sign-in error:', error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Button
      size="large"
      block
      icon={<GoogleOutlined />}
      onClick={handleGoogleSignIn}
      loading={googleLoading || loading}
      className="h-12 rounded-lg font-medium text-base border-gray-300 hover:border-red-400 hover:text-red-500 transition-all duration-300"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton; 