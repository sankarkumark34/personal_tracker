import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { AuthMode, ForgotPasswordData } from '../../types/auth';
import { firebaseAuthService } from '../../services/firebaseAuthService';

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
      const result = await firebaseAuthService.forgotPassword(values);
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
    <div>
      {/* Header with Icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-4">
          <MailOutlined className="text-lg text-orange-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Reset your password</h1>
        <p className="text-gray-500 text-sm">Enter your email address and we'll send you a reset link</p>
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

        {/* Submit Button */}
        <Form.Item className="mt-6">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="h-12 font-medium"
            style={{ 
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              border: 'none'
            }}
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
          className="p-0 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Back to sign in
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 