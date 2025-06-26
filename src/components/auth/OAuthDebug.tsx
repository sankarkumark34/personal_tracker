import React from 'react';
import { Card, Button, Typography, Alert } from 'antd';
import { InfoCircleOutlined, CopyOutlined } from '@ant-design/icons';
import { getDebugInfo } from '../../config/auth';

const { Title, Text } = Typography;

const OAuthDebug: React.FC = () => {
  const debugInfo = getDebugInfo();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const requiredRedirectURIs = [
    'http://localhost:5173',
    'http://localhost:5173/',
    'http://localhost:5174',
    'http://localhost:5174/',
    'http://localhost:5175',
    'http://localhost:5175/',
  ];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card>
        <Title level={4}>
          <InfoCircleOutlined className="mr-2" />
          OAuth Configuration Debug
        </Title>

        <Alert
          message="OAuth Setup Required"
          description="To fix the 404 error, add these redirect URIs to your Google Cloud Console."
          type="warning"
          showIcon
          className="mb-4"
        />

        <div className="space-y-4">
          <div>
            <Text strong>Current Configuration:</Text>
            <div className="bg-gray-50 p-3 rounded mt-2">
              <Text code>Client ID: {debugInfo.clientId}</Text><br />
              <Text code>Current Origin: {debugInfo.currentOrigin}</Text><br />
              <Text code>Redirect URI: {debugInfo.redirectUri}</Text>
            </div>
          </div>

          <div>
            <Text strong>Add these Redirect URIs to Google Console:</Text>
            <div className="bg-gray-50 p-3 rounded mt-2">
              {requiredRedirectURIs.map((uri, index) => (
                <div key={index} className="flex items-center justify-between mb-1">
                  <Text code>{uri}</Text>
                  <Button 
                    size="small" 
                    icon={<CopyOutlined />}
                    onClick={() => copyToClipboard(uri)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Text strong>Steps to Fix:</Text>
            <ol className="mt-2 ml-4">
              <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
              <li>Navigate to APIs & Services → Credentials</li>
              <li>Find your OAuth 2.0 Client and click edit</li>
              <li>Add all the redirect URIs listed above</li>
              <li>Add JavaScript origins: http://localhost:5173, http://localhost:5174, http://localhost:5175</li>
              <li>Save and try OAuth again</li>
            </ol>
          </div>

          <Alert
            message="Development Note"
            description="Vite development server uses different ports (5173, 5174, 5175) when previous ports are occupied. Add all these URIs to handle port conflicts."
            type="info"
            showIcon
          />
        </div>
      </Card>
    </div>
  );
};

export default OAuthDebug; 