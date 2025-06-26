import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import type { SignUpCredentials, User } from '../../types/auth';
import { FirebaseAuthService } from '../../services/firebaseAuthService';

interface SignUpFormProps {
  onLogin: (user: User) => void;
  onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onLogin, onSwitchToLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SignUpCredentials) => {
    setLoading(true);
    try {
      const response = await FirebaseAuthService.signUp(values);
      
      if (response.success && response.user) {
        message.success('Account created successfully!');
        onLogin(response.user);
      } else {
        message.error(response.error || 'Sign up failed');
      }
    } catch {
      message.error('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-600">Please fill in the details to create your account</p>
      </div>

      <Form
        name="signup"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Full Name"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Email"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Password"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Confirm Password"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-lg h-12 text-base font-medium"
          >
            Create Account
          </Button>
        </Form.Item>

        <div className="text-center mt-6">
          <span className="text-gray-600">Already have an account? </span>
          <Button 
            type="link" 
            onClick={onSwitchToLogin}
            className="p-0 text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign in
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm; 