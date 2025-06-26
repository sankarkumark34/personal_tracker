import React, { useState } from 'react';
import { Card } from 'antd';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import type { AuthMode } from '../../types/auth';

const AuthContainer: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const renderAuthForm = () => {
    switch (authMode) {
      case 'login':
        return <LoginForm onSwitchMode={setAuthMode} />;
      case 'signup':
        return <SignUpForm onSwitchMode={setAuthMode} />;
      case 'forgot-password':
        return <ForgotPasswordForm onSwitchMode={setAuthMode} />;
      default:
        return <LoginForm onSwitchMode={setAuthMode} />;
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