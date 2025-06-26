import React from 'react';
import { Card, Button, Avatar, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, GoogleOutlined } from '@ant-design/icons';
import type { User } from '../types/auth';

const { Title, Text } = Typography;

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Title level={2} className="text-white mb-0">Dashboard</Title>
          <Button 
            type="primary" 
            danger 
            icon={<LogoutOutlined />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>

        {/* User Profile Card */}
        <Card className="mb-6">
          <div className="flex items-center space-x-4">
            <Avatar 
              size={64} 
              src={user.avatar} 
              icon={!user.avatar && <UserOutlined />}
            />
            <div>
              <Title level={4} className="mb-1">{user.name || 'User'}</Title>
              <Text type="secondary">{user.email}</Text>
              <div className="flex items-center mt-2">
                {user.avatar && <GoogleOutlined className="text-blue-500 mr-2" />}
                <Text className="text-sm">
                  {user.avatar ? 'Google Account' : 'Email Account'}
                </Text>
              </div>
            </div>
          </div>
        </Card>

        {/* Welcome Message */}
        <Card>
          <Title level={3}>Welcome to React Modern App! 🎉</Title>
          <p className="text-gray-600 mb-4">
            You have successfully logged in to your account. This is a demo dashboard 
            showing that the authentication system is working properly.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-blue-800 font-medium mb-2">Authentication Features Implemented:</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>✅ Email/Password Login</li>
              <li>✅ Google OAuth Integration</li>
              <li>✅ User Registration</li>
              <li>✅ Password Reset</li>
              <li>✅ Form Validation</li>
              <li>✅ Loading States</li>
              <li>✅ Error Handling</li>
              <li>✅ Responsive Design</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 