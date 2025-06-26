import React, { useState } from 'react';
import { Button, Form, Input, Divider, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import type { AuthMode, SignUpCredentials, User } from '../../types/auth';
import { firebaseAuthService } from '../../services/firebaseAuthService';
import GoogleSignInButton from './GoogleSignInButton';

interface SignUpFormProps {
  onSwitchMode: (mode: AuthMode) => void;
  onLogin: (user: User) => void;
}

// Using SignUpCredentials type from auth types
type SignUpFormValues = SignUpCredentials;

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchMode, onLogin }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SignUpFormValues) => {
    setLoading(true);
    try {
      const result = await firebaseAuthService.signUp(values);
      if (result.success && result.user) {
        message.success(result.message);
        console.log('Created user:', result.user);
        // Auto login after successful signup
        onLogin(result.user);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('Sign up failed. Please try again.');
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600">Sign up to get started with your account</p>
      </div>

      {/* Sign Up Form */}
      <Form
        form={form}
        name="signup"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        requiredMark={false}
        className="space-y-4"
      >
        {/* Name Field */}
        <Form.Item
          label={<span className="text-gray-700 font-medium text-sm">Full Name</span>}
          name="name"
          rules={[
            { required: true, message: 'Please input your name!' },
            { min: 2, message: 'Name must be at least 2 characters!' }
          ]}
          className="mb-4"
        >
          <Input
            placeholder="Enter your full name"
            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
            style={{ 
              fontSize: '14px',
              backgroundColor: '#ffffff'
            }}
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label={<span className="text-gray-700 font-medium text-sm">Email address</span>}
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
          className="mb-4"
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
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]}
          className="mb-4"
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400 mr-2" />}
            placeholder="Create a password"
            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
            style={{ 
              fontSize: '14px',
              backgroundColor: '#ffffff'
            }}
          />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          label={<span className="text-gray-700 font-medium text-sm">Confirm Password</span>}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
          className="mb-6"
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400 mr-2" />}
            placeholder="Confirm your password"
            className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
            style={{ 
              fontSize: '14px',
              backgroundColor: '#ffffff'
            }}
          />
        </Form.Item>

        {/* Create Account Button */}
        <Form.Item className="mb-6">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="h-12 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
            style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)',
              border: 'none',
              boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)'
            }}
          >
            Create account
          </Button>
        </Form.Item>
      </Form>

      {/* Divider */}
      <Divider className="my-8">
        <span className="text-gray-400 text-sm font-medium px-4">OR</span>
      </Divider>

      {/* Google Sign Up Button */}
      <GoogleSignInButton onLogin={onLogin} loading={loading} />

      {/* Sign In Link */}
      <div className="text-center">
        <span className="text-gray-600 text-sm">Already have an account? </span>
        <Button
          type="link"
          onClick={() => onSwitchMode('login')}
          className="p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold text-sm"
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm; 