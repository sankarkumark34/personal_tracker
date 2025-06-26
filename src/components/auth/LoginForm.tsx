import React, { useState } from 'react';
import { Button, Form, Input, Checkbox, Divider, message } from 'antd';
import { LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import type { AuthMode, LoginCredentials, User } from '../../types/auth';
import { authService } from '../../services/authService';
import { googleOAuthService } from '../../services/googleOAuthService';

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

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Use real Google OAuth service
      await googleOAuthService.initiateLogin();
    } catch (error) {
      message.error('Failed to initiate Google login. Please try again.');
      console.error('Google login error:', error);
      setLoading(false);
    }
    // Note: setLoading(false) is not called here because the page will redirect
  };

  return (
    <div>
      {/* Header with Icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4">
          <LockOutlined className="text-lg text-gray-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
      </div>

      {/* Google Login Button */}
      <Button
        type="default"
        size="large"
        block
        icon={<GoogleOutlined />}
        onClick={handleGoogleLogin}
        loading={loading}
        className="mb-6 h-12 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium"
        style={{ borderRadius: '8px' }}
      >
        Continue with Google
      </Button>

      {/* Divider */}
      <Divider className="my-6">
        <span className="text-gray-400 text-xs font-medium">OR CONTINUE WITH EMAIL</span>
      </Divider>

      {/* Login Form */}
      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        requiredMark={false}
      >
        <Form.Item
          label={<span className="text-gray-700 text-sm font-medium">Email address</span>}
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Enter your email"
            className="h-12 border-gray-300"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-gray-700 text-sm font-medium">Password</span>}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Enter your password"
            className="h-12 border-gray-300"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-gray-600 text-sm">Remember me</Checkbox>
          </Form.Item>
          <Button
            type="link"
            onClick={() => onSwitchMode('forgot-password')}
            className="p-0 text-blue-600 hover:text-blue-700 text-sm"
          >
            Forgot password?
          </Button>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="h-12 font-medium"
            style={{ 
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>

      {/* Sign Up Link */}
      <div className="text-center mt-6">
        <span className="text-gray-600 text-sm">Don't have an account? </span>
        <Button
          type="link"
          onClick={() => onSwitchMode('signup')}
          className="p-0 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Sign up
        </Button>
      </div>

      {/* Demo Credentials - Subtle hint */}
      <div className="text-center mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Demo: admin@gmail.com / 123456
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 