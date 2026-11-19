import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Statistic, Avatar, Tag, Space, Divider, Button, List, Timeline, Modal, Form, Input, message } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  CalendarOutlined, 
  ThunderboltOutlined, 
  CheckCircleOutlined,
  LineChartOutlined,
  EditOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  CheckCircleFilled
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { AVATARS } from '../utils/constants';

const { Title, Text } = Typography;

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({ totalApis: 0, totalRuns: 0, passed: 0, failed: 0, successRate: 0 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '');
  const [form] = Form.useForm();

  const avatars = AVATARS;

  useEffect(() => {
    fetchUserStats();
    if (user) {
      setSelectedAvatar(user.avatar || '');
      form.setFieldsValue({ name: user.name });
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const res = await axios.get('/api/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    } finally {
      setLoading(false);
    }
  };

  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'Joined recently';

  const handleUpdateProfile = async (values) => {
    try {
      const res = await axios.post('/api/update-profile', {
        ...values,
        avatar: selectedAvatar
      });
      
      updateProfile(res.data.user);
      message.success('Profile updated successfully!');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to update profile', err);
      message.error(err.response?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header Card */}
        <Card 
          bordered={false} 
          style={{ 
            borderRadius: '20px', 
            marginBottom: '32px',
          }}
          bodyStyle={{ padding: '36px' }}
        >
          <Row gutter={32} align="middle">
            <Col>
              <div style={{ position: 'relative' }}>
                <Avatar 
                  size={110} 
                  src={user?.avatar ? `/avatars/${user.avatar}` : null}
                  icon={!user?.avatar && <UserOutlined />}
                  style={{ 
                    backgroundColor: 'var(--primary-color)', 
                    border: '4px solid var(--border-color)',
                    boxShadow: 'var(--card-shadow)'
                  }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '4px', 
                  right: '4px', 
                  background: '#22C55E', 
                  width: '22px', 
                  height: '22px', 
                  borderRadius: '50%',
                  border: '3px solid var(--bg-surface)'
                }} />
              </div>
            </Col>
            <Col flex="auto">
              <Space direction="vertical" size={0}>
                <Title level={1} style={{ margin: 0, fontWeight: 800, letterSpacing: '-1px', color: 'var(--text-primary)' }}>
                  {user?.name}
                </Title>
                <Space size="middle" style={{ marginTop: '8px' }}>
                  <Text type="secondary" style={{ color: 'var(--text-secondary)' }}><MailOutlined /> {user?.email}</Text>
                  <Divider type="vertical" />
                  <Text type="secondary" style={{ color: 'var(--text-secondary)' }}><CalendarOutlined /> Member since {memberSince}</Text>
                </Space>
                <div style={{ marginTop: '16px' }}>
                  <Tag color="blue" style={{ borderRadius: '6px', fontWeight: 600 }}>PRO ACCOUNT</Tag>
                  <Tag color="green" style={{ borderRadius: '6px', fontWeight: 600 }}>VERIFIED DEVELOPER</Tag>
                </div>
              </Space>
            </Col>
            <Col>
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                size="large" 
                style={{ borderRadius: '8px' }}
                onClick={() => setIsModalOpen(true)}
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Card>

        <Row gutter={24}>
          <Col lg={16}>
            {/* Statistics Row */}
            <Row gutter={16} style={{ marginBottom: '24px' }}>
              <Col span={8}>
                <Card bordered={false} style={{ borderRadius: '16px', textAlign: 'center' }}>
                  <Statistic 
                    title="Tests Executed" 
                    value={stats.totalRuns} 
                    prefix={<ThunderboltOutlined style={{ color: 'var(--primary-color)' }} />}
                    valueStyle={{ fontWeight: 800, color: 'var(--text-primary)' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{ borderRadius: '16px', textAlign: 'center' }}>
                  <Statistic 
                    title="Total Passed" 
                    value={stats.passed} 
                    prefix={<CheckCircleOutlined style={{ color: '#22C55E' }} />}
                    valueStyle={{ fontWeight: 800, color: 'var(--text-primary)' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{ borderRadius: '16px', textAlign: 'center' }}>
                  <Statistic 
                    title="Reliability" 
                    value={stats.successRate} 
                    suffix="%"
                    prefix={<LineChartOutlined style={{ color: '#38BDF8' }} />}
                    valueStyle={{ fontWeight: 800, color: 'var(--text-primary)' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Performance Chart Placeholder */}
            <Card 
              title={<span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Testing Activity Over Time</span>} 
              bordered={false} 
              style={{ borderRadius: '16px', marginBottom: '24px' }}
            >
              <div style={{ 
                height: '260px', 
                background: 'var(--bg-elevated)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)'
              }}>
                <LineChartOutlined style={{ fontSize: '42px', marginBottom: '14px', color: 'var(--primary-color)' }} />
                <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>Detailed performance metrics will appear here as you run more tests.</Text>
              </div>
            </Card>
          </Col>

          <Col lg={8}>
            {/* Security & Badges */}
            <Card 
              title={<span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Security Status</span>} 
              bordered={false} 
              style={{ borderRadius: '16px', marginBottom: '24px' }}
            >
              <List size="small">
                <List.Item>
                  <Space>
                    <SafetyCertificateOutlined style={{ color: '#22C55E' }} />
                    <Text style={{ color: 'var(--text-primary)' }}>Two-Factor Auth</Text>
                  </Space>
                  <Tag color="success">ENABLED</Tag>
                </List.Item>
                <List.Item>
                  <Space>
                    <ClockCircleOutlined style={{ color: '#38BDF8' }} />
                    <Text style={{ color: 'var(--text-primary)' }}>Session Timeout</Text>
                  </Space>
                  <Text strong style={{ color: 'var(--text-primary)' }}>30 mins</Text>
                </List.Item>
              </List>
              <Button block style={{ marginTop: '16px', borderRadius: '8px' }}>
                Manage Security
              </Button>
            </Card>

            {/* Achievement Timeline */}
            <Card 
              title={<span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Recent Achievements</span>} 
              bordered={false} 
              style={{ borderRadius: '16px' }}
            >
              <Timeline
                items={[
                  {
                    color: 'green',
                    children: <span style={{ color: 'var(--text-primary)' }}>Ran successful API test suite</span>,
                  },
                  {
                    color: 'blue',
                    children: <span style={{ color: 'var(--text-primary)' }}>Imported OpenAPI specification</span>,
                  },
                  {
                    color: 'gray',
                    children: <span style={{ color: 'var(--text-secondary)' }}>Created developer account</span>,
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </motion.div>

      {/* Edit Profile Modal */}
      <Modal
        title={<span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Edit Your Profile</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={500}
        styles={{ body: { padding: '24px' } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          initialValues={{ name: user?.name }}
        >
          <Form.Item 
            label="Display Name" 
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input size="large" placeholder="Your Name" />
          </Form.Item>

          <div style={{ marginBottom: '24px' }}>
            <Text strong style={{ display: 'block', marginBottom: '12px', color: 'var(--text-primary)' }}>Choose your Avatar</Text>
            <Space size="middle" wrap>
              {avatars.map(avatar => (
                <div 
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  style={{ 
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    padding: '3px',
                    border: selectedAvatar === avatar.id ? '2px solid var(--primary-color)' : '2px solid transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  <img 
                    src={avatar.url} 
                    alt="Avatar" 
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  {selectedAvatar === avatar.id && (
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      right: 0, 
                      background: 'var(--primary-color)', 
                      borderRadius: '50%', 
                      width: '18px', 
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      border: '2px solid var(--bg-surface)'
                    }}>
                      <CheckCircleFilled style={{ fontSize: '10px' }} />
                    </div>
                  )}
                </div>
              ))}
              <div 
                onClick={() => setSelectedAvatar('')}
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: selectedAvatar === '' ? '2px solid var(--primary-color)' : '2px solid transparent'
                }}
              >
                <UserOutlined style={{ fontSize: '20px', color: 'var(--text-muted)' }} />
              </div>
            </Space>
          </div>

          <Form.Item style={{ marginTop: '24px', marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              block 
              style={{ 
                height: '44px', 
                borderRadius: '8px',
                fontWeight: 600
              }}
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
