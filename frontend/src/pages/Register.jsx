import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Divider, message, Row, Col, Progress } from 'antd';
import { 
  MailOutlined, 
  LockOutlined, 
  UserOutlined, 
  RocketOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const { Title, Text, Paragraph } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/register', {
        ...values,
        password_confirmation: values.confirm
      });
      login(res.data.access_token, res.data.user);
      message.success('Account created successfully! Welcome to APIFlow.');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed', err);
      if (err.response?.data?.errors) {
        Object.values(err.response.data.errors).forEach(errs => {
          errs.forEach(msg => message.error(msg));
        });
      } else {
        message.error(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length > 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const strengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 25) return '#EF4444';
    if (strength <= 50) return '#F59E0B';
    if (strength <= 75) return '#38BDF8';
    return '#22C55E';
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
        <div style={{ 
          position: 'absolute', 
          bottom: '-5%', 
          left: '-5%', 
          width: '300px', 
          height: '300px', 
          background: 'rgba(255, 255, 255, 0.02)', 
          borderRadius: '50%',
          filter: 'blur(40px)'
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
            Automate. Test.<br />Deploy with confidence.
          </Title>
          
          <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '17px', maxWidth: '480px', marginBottom: '48px' }}>
            Join thousands of developers using automated API testing to ensure flawless performance.
          </Paragraph>

          <Space direction="vertical" size="large">
            {[
              'Unlimited API specifications & endpoints',
              'Collaborative test execution',
              'Advanced SSRF security scanning',
              'Instant PDF & CSV report exports'
            ].map((text, i) => (
              <Space key={i} size="middle">
                <CheckCircleOutlined style={{ color: '#22C55E', fontSize: '18px' }} />
                <Text style={{ color: '#ffffff', fontSize: '15px' }}>{text}</Text>
              </Space>
            ))}
          </Space>
        </motion.div>
      </div>

      {/* Right Side: Auth Form */}
      <div style={{ 
        width: '600px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '40px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ width: '100%', maxWidth: '440px' }}
        >
          <Card 
            bordered={false} 
            style={{ 
              borderRadius: '20px', 
              boxShadow: 'var(--card-shadow)',
              padding: '20px'
            }}
          >
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <Title level={3} style={{ fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Create Account</Title>
              <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>Get started with your developer test workspace</Text>
            </div>

            <Form
              name="register"
              layout="vertical"
              onFinish={onFinish}
              size="large"
            >
              <Form.Item
                label={<span style={{ color: 'var(--text-primary)' }}>Full Name</span>}
                name="name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
              >
                <Input 
                  prefix={<UserOutlined style={{ color: 'var(--text-muted)', marginRight: '8px' }} />} 
                  placeholder="John Doe" 
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

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

              <Form.Item
                label={<span style={{ color: 'var(--text-primary)' }}>Password</span>}
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }, { min: 8, message: 'Password must be at least 8 characters!' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: 'var(--text-muted)', marginRight: '8px' }} />} 
                  placeholder="••••••••" 
                  style={{ borderRadius: '8px' }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              {password && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <Text type="secondary" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Password Strength</Text>
                    <Text style={{ fontSize: '12px', fontWeight: 600, color: strengthColor() }}>
                      {getPasswordStrength() <= 25 ? 'Weak' : getPasswordStrength() <= 50 ? 'Fair' : getPasswordStrength() <= 75 ? 'Good' : 'Strong'}
                    </Text>
                  </div>
                  <Progress 
                    percent={getPasswordStrength()} 
                    showInfo={false} 
                    strokeColor={strengthColor()}
                    trailColor={isDark ? '#273449' : '#F1F5F9'}
                    size="small"
                  />
                </div>
              )}

              <Form.Item
                label={<span style={{ color: 'var(--text-primary)' }}>Confirm Password</span>}
                name="confirm"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: 'var(--text-muted)', marginRight: '8px' }} />} 
                  placeholder="••••••••" 
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: '24px', marginTop: '28px' }}>
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
                  Create Account
                </Button>
              </Form.Item>

              <div style={{ textAlign: 'center' }}>
                <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>Already have an account? </Text>
                <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Login</Link>
              </div>
            </Form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
