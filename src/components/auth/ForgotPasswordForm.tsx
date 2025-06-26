import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { AuthMode, ForgotPasswordData } from '../../types/auth';
import { authService } from '../../services/authService';

interface ForgotPasswordFormProps {
  onSwitchMode: (mode: AuthMode) => void;
}

// Using ForgotPasswordData type from auth types
type ForgotPasswordFormValues = ForgotPasswordData;

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchMode }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    setLoading(true);
    try {
      const result = await authService.forgotPassword(values);
      if (result.success) {
        message.success(result.message);
        setTimeout(() => onSwitchMode('login'), 2000);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('Failed to send reset email. Please try again.');
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header with Icon */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
          <MailOutlined className="text-2xl text-orange-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Reset your password</h1>
        <p className="text-gray-600">Enter your email address and we'll send you a reset link</p>
      </div>

      {/* Forgot Password Form */}
      <Form
        form={form}
        name="forgot-password"
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

        {/* Submit Button */}
        <Form.Item className="mt-6">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="h-12 bg-gradient-to-r from-orange-600 to-red-600 border-0 hover:from-orange-700 hover:to-red-700"
          >
            Send reset email
          </Button>
        </Form.Item>
      </Form>

      {/* Back to Sign In Link */}
      <div className="text-center mt-6">
        <Button
          type="link"
          onClick={() => onSwitchMode('login')}
          icon={<ArrowLeftOutlined />}
          className="p-0 text-orange-600 hover:text-orange-700 font-medium"
        >
          Back to sign in
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 