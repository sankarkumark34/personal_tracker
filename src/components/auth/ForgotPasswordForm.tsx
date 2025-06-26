import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { ForgotPasswordData } from '../../types/auth';
import { FirebaseAuthService } from '../../services/firebaseAuthService';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchToLogin }) => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (values: ForgotPasswordData) => {
    setLoading(true);
    try {
      const response = await FirebaseAuthService.resetPassword(values.email);
      
      if (response.success) {
        message.success('Password reset email sent successfully!');
        setEmailSent(true);
      } else {
        message.error(response.error || 'Failed to send reset email');
      }
    } catch {
      message.error('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <MailOutlined className="text-2xl text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Check Your Email</h2>
          <p className="text-gray-600">
            We've sent a password reset link to your email address. 
            Please check your inbox and follow the instructions to reset your password.
          </p>
        </div>

        <Button
          type="primary"
          onClick={onSwitchToLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-lg h-12 text-base font-medium"
        >
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Forgot Password</h2>
        <p className="text-gray-600">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <Form
        name="forgot-password"
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
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Email"
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
            Send Reset Link
          </Button>
        </Form.Item>

        <div className="text-center mt-6">
          <Button 
            type="link" 
            onClick={onSwitchToLogin}
            icon={<ArrowLeftOutlined />}
            className="p-0 text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm; 