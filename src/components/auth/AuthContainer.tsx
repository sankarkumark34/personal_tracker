'use client';

import React, { useState } from 'react';
import { Card } from 'antd';
import type { AuthMode, User } from '@/types/auth';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';

interface AuthContainerProps {
  onLogin: (user: User) => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const handleSwitchMode = (mode: AuthMode) => {
    setAuthMode(mode);
  };

  const renderAuthForm = () => {
    switch (authMode) {
      case 'login':
        return <LoginForm onSwitchMode={handleSwitchMode} onLogin={onLogin} />;
      case 'signup':
        return <SignUpForm onSwitchMode={handleSwitchMode} onLogin={onLogin} />;
      case 'forgot-password':
        return <ForgotPasswordForm onSwitchMode={handleSwitchMode} />;
      default:
        return <LoginForm onSwitchMode={handleSwitchMode} onLogin={onLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card
          className="shadow-2xl border-0 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/95"
          bodyStyle={{ 
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {renderAuthForm()}
        </Card>
      </div>
    </div>
  );
};

export default AuthContainer; 