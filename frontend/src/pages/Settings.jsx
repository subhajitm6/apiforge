import React, { useState } from 'react';
import { Card, Typography, Form, Input, Button, Switch, Divider, Space, message, Segmented } from 'antd';
import { 
  SettingOutlined, 
  GlobalOutlined, 
  LockOutlined,
  SaveOutlined,
  BellOutlined,
  CloudServerOutlined,
  UserOutlined,
  CheckCircleFilled,
  BgColorsOutlined,
  SunOutlined,
  MoonOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { AVATARS } from '../utils/constants';

const { Title, Text } = Typography;

const Settings = () => {
  const [form] = Form.useForm();
  const { user, updateProfile } = useAuth();
  const { themeMode, setThemeMode, isDark } = useTheme();
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '');

  const avatars = AVATARS;

  const onFinish = async (values) => {
    try {
      const res = await axios.post('/api/update-profile', {
        ...values,
        avatar: selectedAvatar
      });
      updateProfile(res.data.user);
      message.success('Settings updated successfully!');
    } catch (err) {
      console.error('Failed to update settings', err);
      message.error(err.response?.data?.message || 'Failed to update settings. Please try again.');
    }
  };

  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: '800px' }}
    >
      <header style={{ marginBottom: '40px' }}>
        <Title level={2} style={{ fontWeight: 800, margin: 0, letterSpacing: '-1px', color: 'var(--text-primary)' }}>
          Platform Settings
        </Title>
        <Text type="secondary" style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
          Configure your global test environment, appearance, and API credentials.
        </Text>
      </header>

      {/* Theme Appearance Card */}
      <Card bordered={false} style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <BgColorsOutlined style={{ fontSize: '20px', color: 'var(--primary-color)' }} />
          <Title level={4} style={{ margin: 0, color: 'var(--text-primary)' }}>Appearance & Theme</Title>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>Interface Theme</div>
            <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>
              Select your preferred appearance or sync with system preferences.
            </Text>
          </div>
          <Segmented
            value={themeMode}
            onChange={(val) => setThemeMode(val)}
            options={[
              { label: 'Light', value: 'light', icon: <SunOutlined /> },
              { label: 'Dark', value: 'dark', icon: <MoonOutlined /> },
              { label: 'System', value: 'system', icon: <DesktopOutlined /> },
            ]}
            size="large"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
            }}
          />
        </div>
      </Card>

      <Card bordered={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: user?.name,
            baseUrl: 'https://petstore.swagger.io/v2',
            timeout: 5000,
            notifications: true,
            autoRetry: false
          }}
        >
          {/* Profile Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <UserOutlined style={{ fontSize: '20px', color: 'var(--primary-color)' }} />
            <Title level={4} style={{ margin: 0, color: 'var(--text-primary)' }}>Profile Settings</Title>
          </div>

          <Form.Item 
            label="Display Name" 
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input size="large" placeholder="Your Name" />
          </Form.Item>

          <div style={{ marginBottom: '24px' }}>
            <Text strong style={{ display: 'block', marginBottom: '12px', color: 'var(--text-primary)' }}>Choose your Avatar</Text>
            <Space size="large" wrap>
              {avatars.map(avatar => (
                <div 
                  key={avatar.id}
                  onClick={() => handleAvatarSelect(avatar.id)}
                  style={{ 
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    padding: '4px',
                    border: selectedAvatar === avatar.id ? '2px solid var(--primary-color)' : '2px solid transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  <img 
                    src={avatar.url} 
                    alt="Avatar" 
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  {selectedAvatar === avatar.id && (
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      right: 0, 
                      background: 'var(--primary-color)', 
                      borderRadius: '50%', 
                      width: '20px', 
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      border: '2px solid var(--bg-surface)'
                    }}>
                      <CheckCircleFilled style={{ fontSize: '12px' }} />
                    </div>
                  )}
                </div>
              ))}
              <div 
                onClick={() => handleAvatarSelect('')}
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: selectedAvatar === '' ? '2px solid var(--primary-color)' : '2px solid transparent'
                }}
              >
                <UserOutlined style={{ fontSize: '24px', color: 'var(--text-muted)' }} />
              </div>
            </Space>
          </div>

          <Divider style={{ margin: '32px 0', borderColor: 'var(--border-color)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <GlobalOutlined style={{ fontSize: '20px', color: 'var(--primary-color)' }} />
            <Title level={4} style={{ margin: 0, color: 'var(--text-primary)' }}>API Environment</Title>
          </div>
          
          <Form.Item 
            label="Base API URL" 
            name="baseUrl"
            rules={[{ required: true, message: 'Please enter a base URL' }]}
            extra="This URL will be used as the prefix for all tests unless specified in the spec."
          >
            <Input prefix={<CloudServerOutlined style={{ color: 'var(--text-muted)' }} />} size="large" placeholder="https://api.example.com" />
          </Form.Item>

          <Form.Item 
            label="Global Auth Token (Bearer)" 
            name="authToken"
          >
            <Input.Password prefix={<LockOutlined style={{ color: 'var(--text-muted)' }} />} size="large" placeholder="Enter API Token" />
          </Form.Item>

          <Divider style={{ margin: '32px 0', borderColor: 'var(--border-color)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <BellOutlined style={{ fontSize: '20px', color: 'var(--primary-color)' }} />
            <Title level={4} style={{ margin: 0, color: 'var(--text-primary)' }}>Notifications & Behavior</Title>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>Email Notifications</div>
              <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>Receive a summary report after each automated run.</Text>
            </div>
            <Form.Item name="notifications" valuePropName="checked" style={{ margin: 0 }}>
              <Switch />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>Auto-Retry Failed Tests</div>
              <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>Automatically retry failed tests once before reporting.</Text>
            </div>
            <Form.Item name="autoRetry" valuePropName="checked" style={{ margin: 0 }}>
              <Switch />
            </Form.Item>
          </div>

          <Divider style={{ margin: '32px 0', borderColor: 'var(--border-color)' }} />

          <Form.Item style={{ margin: 0 }}>
            <Button type="primary" size="large" icon={<SaveOutlined />} htmlType="submit" style={{ minWidth: '160px' }}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
      
      <div style={{ marginTop: '40px' }}>
        <Card style={{ 
          background: isDark ? 'rgba(239, 68, 68, 0.1)' : '#FEF2F2', 
          border: '1px solid rgba(239, 68, 68, 0.25)' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, color: '#EF4444' }}>Danger Zone</div>
              <Text style={{ color: isDark ? '#FCA5A5' : '#B91C1C' }}>Irreversibly delete all test data and reports.</Text>
            </div>
            <Button danger>Clear All Data</Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Settings;
