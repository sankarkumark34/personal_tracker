'use client';

import React from 'react';
import { Button, Card, Progress, Statistic, Row, Col, Typography, Avatar, Dropdown, type MenuProps } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  TrophyOutlined,
  FireOutlined,
  CheckCircleOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import type { User } from '@/types/auth';
import { firebaseAuthService } from '@/services/firebaseAuthService';

const { Title, Text } = Typography;

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const handleLogout = async () => {
    try {
      await firebaseAuthService.logout();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Title level={2} className="mb-1">Personal Tracker</Title>
          <Text type="secondary">Track your progress across all areas of life</Text>
        </div>
        
        {/* Time Period Selector */}
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <Button type="text" size="small">Day</Button>
            <Button type="text" size="small">Week</Button>
            <Button type="primary" size="small">Month</Button>
          </div>
          
          {/* User Menu */}
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors">
              <Avatar 
                src={user.avatar} 
                icon={<UserOutlined />}
                size="small"
              />
              <Text strong>{user.name}</Text>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title="Overall Progress"
              value={72}
              suffix="%"
              prefix={<TrophyOutlined className="text-blue-500" />}
            />
            <Text type="secondary" className="text-xs">+5% from last week</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title="Active Goals"
              value={12}
              prefix={<FireOutlined className="text-orange-500" />}
            />
            <Text type="secondary" className="text-xs">Across all categories</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title="Completed Today"
              value={8}
              prefix={<CheckCircleOutlined className="text-green-500" />}
            />
            <Text type="secondary" className="text-xs">Tasks & activities</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title="Streak"
              value={15}
              prefix={<CalendarOutlined className="text-purple-500" />}
            />
            <Text type="secondary" className="text-xs">Days consistent</Text>
          </Card>
        </Col>
      </Row>

      {/* Progress Categories */}
      <Row gutter={[24, 24]} className="mb-8">
        {/* Professional */}
        <Col xs={24} lg={8}>
          <Card title="📊 Professional" className="h-full">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Projects Completed</Text>
                  <Text strong>3/5</Text>
                </div>
                <Progress percent={60} size="small" strokeColor="#1890ff" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Skills Learned</Text>
                  <Text strong>1/2</Text>
                </div>
                <Progress percent={50} size="small" strokeColor="#52c41a" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Meetings Attended</Text>
                  <Text strong>12/15</Text>
                </div>
                <Progress percent={80} size="small" strokeColor="#faad14" />
              </div>
            </div>
          </Card>
        </Col>

        {/* Physical */}
        <Col xs={24} lg={8}>
          <Card title="💪 Physical" className="h-full">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Workout Sessions</Text>
                  <Text strong>4/5</Text>
                </div>
                <Progress percent={80} size="small" strokeColor="#f5222d" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Steps (10k)</Text>
                  <Text strong>5/7</Text>
                </div>
                <Progress percent={71} size="small" strokeColor="#722ed1" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Water Intake (L)</Text>
                  <Text strong>10/14</Text>
                </div>
                <Progress percent={71} size="small" strokeColor="#13c2c2" />
              </div>
            </div>
          </Card>
        </Col>

        {/* Personal */}
        <Col xs={24} lg={8}>
          <Card title="❤️ Personal" className="h-full">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Books Read</Text>
                  <Text strong>1/2</Text>
                </div>
                <Progress percent={50} size="small" strokeColor="#eb2f96" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Family Time (hrs)</Text>
                  <Text strong>15/20</Text>
                </div>
                <Progress percent={75} size="small" strokeColor="#fa8c16" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Hobbies (hrs)</Text>
                  <Text strong>8/10</Text>
                </div>
                <Progress percent={80} size="small" strokeColor="#a0d911" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="📈 Progress Overview" className="h-80">
            <div className="h-full flex items-center justify-center">
              <Text type="secondary">Chart visualization would go here</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="📊 Weekly Progress" className="h-80">
            <div className="h-full flex items-center justify-center">
              <Text type="secondary">Weekly chart would go here</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 