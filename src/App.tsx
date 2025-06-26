import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import AuthContainer from './components/auth/AuthContainer';
import Dashboard from './components/Dashboard';
import OAuthDebug from './components/auth/OAuthDebug';
import type { User } from './types/auth';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Clear any stored auth data
    sessionStorage.clear();
    localStorage.clear();
  };

  // Check if current URL is for OAuth debug
  const isDebugMode = window.location.pathname === '/oauth-debug' || window.location.search.includes('debug=oauth');

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 8,
        },
      }}
    >
      {isDebugMode ? (
        <div className="min-h-screen bg-gray-100">
          <OAuthDebug />
        </div>
      ) : isAuthenticated && user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <div className="min-h-screen bg-gray-900">
          <AuthContainer onLogin={handleLogin} />
        </div>
      )}
    </ConfigProvider>
  );
};

export default App;
