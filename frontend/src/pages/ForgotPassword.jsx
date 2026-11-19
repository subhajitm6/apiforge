import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, message, Result } from 'antd';
import { 
  MailOutlined, 
  ArrowLeftOutlined, 
  RocketOutlined, 
  KeyOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const { Title, Text, Paragraph } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post('/api/forgot-password', values);
      setSubmitted(true);
    } catch (err) {
      console.error('Forgot password failed', err);
      message.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)' }}>
      {/* Left Side: Branding */}
      <div style={{ 
        flex: 1, 
        background: isDark 
          ? 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)' 
          : 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        borderRight: '1px solid var(--border-color)'
      }}>
        {/* Abstract Background Decoration */}
        <div style={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '-10%', 
          width: '400px', 
          height: '400px', 
          background: 'rgba(255, 255, 255, 0.04)', 
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ marginBottom: '32px' }}>
            <img 
              src="/logo.png" 
              alt="APIForge Logo" 
              style={{ 
                height: '48px', 
                objectFit: 'contain', 
                display: 'block' 
              }} 
            />
          </div>

          <Title style={{ color: '#ffffff', fontSize: '44px', fontWeight: 800, marginBottom: '24px', lineHeight: 1.15 }}>
            Recover your<br />access.
          </Title>
          
          <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '17px', maxWidth: '480px', marginBottom: '48px' }}>
            Don't worry, it happens. We will send you a link to reset your password and restore access to your workspace.
          </Paragraph>
        </motion.div>
      </div>

      {/* Right Side: Auth Form */}
      <div style={{ 
        width: '550px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '40px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <Card 
            bordered={false} 
            style={{ 
              borderRadius: '20px', 
              boxShadow: 'var(--card-shadow)',
              padding: '20px'
            }}
          >
            {submitted ? (
              <Result
                status="success"
                title={<span style={{ color: 'var(--text-primary)' }}>Reset Link Sent</span>}
                subTitle={<span style={{ color: 'var(--text-secondary)' }}>We have sent a password reset link to your email address. Please check your inbox.</span>}
                extra={[
                  <Button 
                    type="primary" 
                    key="login" 
                    onClick={() => navigate('/login')}
                    style={{ height: '44px', borderRadius: '8px' }}
                  >
                    Back to Login
                  </Button>
                ]}
              />
            ) : (
              <>
                <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF', 
                    color: 'var(--primary-color)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <KeyOutlined style={{ fontSize: '28px' }} />
                  </div>
                  <Title level={3} style={{ fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Forgot Password?</Title>
                  <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>Enter your email and we'll send you a reset link</Text>
                </div>

                <Form
                  name="forgot_password"
                  layout="vertical"
                  onFinish={onFinish}
                  size="large"
                >
                  <Form.Item
                    label={<span style={{ color: 'var(--text-primary)' }}>Email Address</span>}
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Enter a valid email!' }]}
                  >
                    <Input 
                      prefix={<MailOutlined style={{ color: 'var(--text-muted)', marginRight: '8px' }} />} 
                      placeholder="name@company.com" 
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>

                  <Form.Item style={{ marginBottom: '24px', marginTop: '32px' }}>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      block 
                      loading={loading}
                      style={{ 
                        height: '46px', 
                        borderRadius: '8px', 
                        fontWeight: 600
                      }}
                    >
                      Send Reset Link
                    </Button>
                  </Form.Item>

                  <div style={{ textAlign: 'center' }}>
                    <Link to="/login" style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <ArrowLeftOutlined /> Back to Login
                    </Link>
                  </div>
                </Form>
              </>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
