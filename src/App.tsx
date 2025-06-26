import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import AuthContainer from './components/auth/AuthContainer';
import Dashboard from './components/Dashboard';
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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 8,
        },
      }}
    >
      {isAuthenticated && user ? (
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
