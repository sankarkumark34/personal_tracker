import React, { useState } from 'react';
import { Button, Form, Input, Checkbox, message } from 'antd';
import { LockOutlined, MailOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import type { AuthMode, LoginCredentials, User } from '../../types/auth';
import { authService } from '../../services/authService';

interface LoginFormProps {
  onSwitchMode: (mode: AuthMode) => void;
  onLogin: (user: User) => void;
}

// Using LoginCredentials type from auth types
type LoginFormValues = LoginCredentials & { remember: boolean };

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchMode, onLogin }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await authService.login(values);
      if (result.success && result.user) {
        message.success(result.message);
        console.log('Logged in user:', result.user);
        onLogin(result.user);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
        <p className="text-gray-600">Welcome back! Please sign in to your account</p>
      </div>

      {/* Login Form */}
      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        requiredMark={false}
        className="space-y-6"
      >
        {/* Email Field */}
        <Form.Item
          label={<span className="text-gray-700 font-medium text-sm">Email address</span>}
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
          className="mb-5"
        >
          <Input
            prefix={<MailOutlined className="text-gray-400 mr-2" />}
            placeholder="Enter your email"
            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
            style={{ 
              fontSize: '14px',
              backgroundColor: '#ffffff'
            }}
          />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label={<span className="text-gray-700 font-medium text-sm">Password</span>}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className="mb-5"
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400 mr-2" />}
            placeholder="Enter your password"
            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            style={{ 
              fontSize: '14px',
              backgroundColor: '#ffffff'
            }}
          />
        </Form.Item>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between mb-8">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-gray-600 text-sm font-medium">
              Remember me
            </Checkbox>
          </Form.Item>
          <Button
            type="link"
            onClick={() => onSwitchMode('forgot-password')}
            className="p-0 h-auto text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
          >
            Forgot your password?
          </Button>
        </div>

        {/* Sign In Button */}
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="h-12 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ 
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
              border: 'none',
              boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)'
            }}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm; 