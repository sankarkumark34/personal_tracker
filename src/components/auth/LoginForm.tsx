import React, { useState } from 'react';
import { Button, Form, Input, Checkbox, Divider, message } from 'antd';
import { LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import type { AuthMode, LoginCredentials } from '../../types/auth';
import { authService } from '../../services/authService';

interface LoginFormProps {
  onSwitchMode: (mode: AuthMode) => void;
}

// Using LoginCredentials type from auth types
type LoginFormValues = LoginCredentials & { remember: boolean };

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchMode }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await authService.login(values);
      if (result.success) {
        message.success(result.message);
        console.log('Logged in user:', result.user);
        // TODO: Redirect to dashboard or update global auth state
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
      const result = await authService.googleAuth();
      if (result.success) {
        message.success(result.message);
        console.log('Google login user:', result.user);
        // TODO: Redirect to dashboard or update global auth state
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('Google login failed. Please try again.');
      console.error('Google login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header with Icon */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-4">
          <LockOutlined className="text-2xl text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
        <p className="text-gray-600">Sign in to your account to continue</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          {/* <p className="text-xs text-blue-700">
            <strong>Demo Credentials:</strong><br />
            Email: admin@example.com<br />
            Password: password
          </p> */}
        </div>
      </div>

      {/* Google Login Button */}
              <Button
          type="default"
          size="large"
          block
          icon={<GoogleOutlined />}
          onClick={handleGoogleLogin}
          loading={loading}
          className="mb-6 h-12 border-gray-300 hover:border-indigo-400 hover:text-indigo-600"
        >
          Continue with Google
        </Button>

      {/* Divider */}
      <Divider className="my-6">
        <span className="text-gray-500 text-sm">OR CONTINUE WITH EMAIL</span>
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
          label="Email address"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Enter your email"
            className="h-12"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Enter your password"
            className="h-12"
          />
        </Form.Item>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Button
            type="link"
            onClick={() => onSwitchMode('forgot-password')}
            className="p-0 text-indigo-600 hover:text-indigo-700"
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
            className="h-12 bg-gradient-to-r from-indigo-600 to-purple-600 border-0 hover:from-indigo-700 hover:to-purple-700"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>

      {/* Sign Up Link */}
      <div className="text-center mt-6">
        <span className="text-gray-600">Don't have an account? </span>
        <Button
          type="link"
          onClick={() => onSwitchMode('signup')}
          className="p-0 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default LoginForm; 