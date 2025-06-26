import React, { useState, useEffect } from 'react';
import { Card, message, Spin } from 'antd';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import type { AuthMode, User } from '../../types/auth';
import { googleOAuthService } from '../../services/googleOAuthService';

interface AuthContainerProps {
  onLogin: (user: User) => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isProcessingOAuth, setIsProcessingOAuth] = useState(false);

  useEffect(() => {
    // Check if this is an OAuth callback
    if (googleOAuthService.isOAuthCallback()) {
      setIsProcessingOAuth(true);
      handleOAuthCallback();
    }
  }, []);

  const handleOAuthCallback = async () => {
    try {
      const result = await googleOAuthService.handleCallback();
      
      if (result.success && result.user) {
        message.success(result.message);
        console.log('OAuth login successful:', result.user);
        onLogin(result.user);
      } else {
        message.error(result.message);
      }
      
      // Clean up URL parameters
      googleOAuthService.cleanupUrl();
    } catch (error) {
      message.error('OAuth login failed. Please try again.');
      console.error('OAuth callback error:', error);
    } finally {
      setIsProcessingOAuth(false);
    }
  };

  const renderAuthForm = () => {
    if (isProcessingOAuth) {
      return (
        <div className="text-center py-8">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">Processing Google login...</p>
        </div>
      );
    }

    switch (authMode) {
      case 'login':
        return <LoginForm onSwitchMode={setAuthMode} onLogin={onLogin} />;
      case 'signup':
        return <SignUpForm onSwitchMode={setAuthMode} onLogin={onLogin} />;
      case 'forgot-password':
        return <ForgotPasswordForm onSwitchMode={setAuthMode} />;
      default:
        return <LoginForm onSwitchMode={setAuthMode} onLogin={onLogin} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card 
        className="w-full max-w-sm shadow-xl border-0 rounded-2xl"
        style={{
          background: '#ffffff',
        }}
        bodyStyle={{ padding: '32px' }}
      >
        {renderAuthForm()}
      </Card>
    </div>
  );
};

export default AuthContainer; 