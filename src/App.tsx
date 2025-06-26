import React from 'react';
import { ConfigProvider } from 'antd';
import AuthContainer from './components/auth/AuthContainer';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 8,
        },
      }}
    >
      <div className="min-h-screen bg-gray-900">
        <AuthContainer />
      </div>
    </ConfigProvider>
  );
};

export default App;
