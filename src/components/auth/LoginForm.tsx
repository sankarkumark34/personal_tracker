import React, { useState } from 'react';
import { Button, Form, Input, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import type { LoginCredentials, User } from '../../types/auth';
import { FirebaseAuthService } from '../../services/firebaseAuthService';

interface LoginFormProps {
  onLogin: (user: User) => void;
  onSwitchToSignUp: () => void;
  onSwitchToForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onLogin, 
  onSwitchToSignUp, 
  onSwitchToForgotPassword 
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await FirebaseAuthService.login(values);
      
      if (response.success && response.user) {
        message.success('Login successful!');
        onLogin(response.user);
      } else {
        message.error(response.error || 'Login failed');
      }
    } catch {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Please sign in to your account</p>
      </div>

      <Form
        name="login"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Email"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Password"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item>
          <div className="flex items-center justify-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-600">Remember me</Checkbox>
            </Form.Item>
            <Button 
              type="link" 
              onClick={onSwitchToForgotPassword}
              className="p-0 text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-lg h-12 text-base font-medium"
          >
            Sign In
          </Button>
        </Form.Item>

        <div className="text-center mt-6">
          <span className="text-gray-600">Don't have an account? </span>
          <Button 
            type="link" 
            onClick={onSwitchToSignUp}
            className="p-0 text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up
          </Button>
        </div>
      </Form>

      {/* Demo credentials hint */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg border">
        <p className="text-xs text-gray-500 text-center">
          Create an account to test Firebase authentication
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 