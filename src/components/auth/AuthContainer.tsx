import React, { useState } from 'react';
import { Card } from 'antd';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import type { AuthMode, User } from '../../types/auth';

interface AuthContainerProps {
  onLogin: (user: User) => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const handleSwitchToLogin = () => setAuthMode('login');
  const handleSwitchToSignUp = () => setAuthMode('signup');
  const handleSwitchToForgotPassword = () => setAuthMode('forgot-password');

  const renderAuthForm = () => {
    switch (authMode) {
      case 'login':
        return (
          <LoginForm 
            onLogin={onLogin}
            onSwitchToSignUp={handleSwitchToSignUp}
            onSwitchToForgotPassword={handleSwitchToForgotPassword}
          />
        );
      case 'signup':
        return (
          <SignUpForm 
            onLogin={onLogin}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm 
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      default:
        return (
          <LoginForm 
            onLogin={onLogin}
            onSwitchToSignUp={handleSwitchToSignUp}
            onSwitchToForgotPassword={handleSwitchToForgotPassword}
          />
        );
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