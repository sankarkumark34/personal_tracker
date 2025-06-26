'use client';

import React, { useState } from 'react';
import { Button, Card, Typography, Space } from 'antd';
import { firebaseAuthService } from '@/services/firebaseAuthService';

const { Title, Text } = Typography;

const AuthTest: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setLoading(true);
    setResult('Testing Firebase connection...');
    
    try {
      // Test getting current user
      const currentUser = firebaseAuthService.getCurrentUser();
      setResult(`Firebase connection successful! Current user: ${currentUser ? currentUser.email : 'No user logged in'}`);
    } catch (error) {
        
      setResult(`Firebase connection failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="🔥 Firebase Authentication Test" className="m-4">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Text>Click the button below to test Firebase connection:</Text>
        
        <Button 
          type="primary" 
          onClick={testFirebaseConnection}
          loading={loading}
        >
          Test Firebase Connection
        </Button>
        
        {result && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <Text code>{result}</Text>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default AuthTest; 