import React, { useState } from 'react';
import { Button, Form, Input, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import type { AuthMode, SignUpCredentials } from '../../types/auth';
import { authService } from '../../services/authService';

interface SignUpFormProps {
  onSwitchMode: (mode: AuthMode) => void;
}

// Using SignUpCredentials type from auth types
type SignUpFormValues = SignUpCredentials;

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchMode }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SignUpFormValues) => {
    setLoading(true);
    try {
      const result = await authService.signUp(values);
      if (result.success) {
        message.success(result.message);
        console.log('Created user:', result.user);
        // TODO: Redirect to dashboard or update global auth state
        setTimeout(() => onSwitchMode('login'), 1500);
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

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const result = await authService.googleAuth();
      if (result.success) {
        message.success(result.message);
        console.log('Google sign up user:', result.user);
        // TODO: Redirect to dashboard or update global auth state
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('Google sign up failed. Please try again.');
      console.error('Google sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header with Icon */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
          <UserOutlined className="text-2xl text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create your account</h1>
        <p className="text-gray-600">Sign up to get started with your account</p>
      </div>

      {/* Google Sign Up Button */}
              <Button
          type="default"
          size="large"
          block
          icon={<GoogleOutlined />}
          onClick={handleGoogleSignUp}
          loading={loading}
          className="mb-6 h-12 border-gray-300 hover:border-green-400 hover:text-green-600"
        >
          Continue with Google
        </Button>

      {/* Divider */}
      <Divider className="my-6">
        <span className="text-gray-500 text-sm">OR CONTINUE WITH EMAIL</span>
      </Divider>

      {/* Sign Up Form */}
      <Form
        form={form}
        name="signup"
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
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Create a password"
            className="h-12"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
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
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Confirm your password"
            className="h-12"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="mt-6">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="h-12 bg-gradient-to-r from-green-600 to-blue-600 border-0 hover:from-green-700 hover:to-blue-700"
          >
            Create account
          </Button>
        </Form.Item>
      </Form>

      {/* Sign In Link */}
      <div className="text-center mt-6">
        <span className="text-gray-600">Already have an account? </span>
        <Button
          type="link"
          onClick={() => onSwitchMode('login')}
          className="p-0 text-green-600 hover:text-green-700 font-medium"
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm; 