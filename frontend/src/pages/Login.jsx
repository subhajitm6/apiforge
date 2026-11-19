import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Space, Divider, message, Row, Col } from 'antd';
import { 
  MailOutlined, 
  LockOutlined, 
  GoogleOutlined, 
  GithubOutlined,
  RocketOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/login', values);
      login(res.data.access_token, res.data.user);
      message.success('Login successful! Welcome back.');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      message.error(err.response?.data?.message || 'Invalid credentials. Please try again.');
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
            The all-in-one developer platform for professional API testing. Import specifications, run tests, and monitor reliability.
          </Paragraph>

          <Space direction="vertical" size="large">
            {[
              'Real-time API monitoring & analytics',
              'Automated test suite generation',
              'Comprehensive reliability reports',
              'Enterprise-grade SSRF security protection'
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
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <Title level={3} style={{ fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Welcome Back</Title>
              <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>Enter your credentials to access your account</Text>
            </div>

            <Form
              name="login"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
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

              <Form.Item
                label={<span style={{ color: 'var(--text-primary)' }}>Password</span>}
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: 'var(--text-muted)', marginRight: '8px' }} />} 
                  placeholder="••••••••" 
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox><span style={{ color: 'var(--text-secondary)' }}>Remember me</span></Checkbox>
                </Form.Item>
                <Link to="/forgot-password" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Forgot Password?</Link>
              </div>

              <Form.Item style={{ marginBottom: '24px' }}>
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
                  Login
                </Button>
              </Form.Item>

              <Divider plain><Text type="secondary" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>OR CONTINUE WITH</Text></Divider>

              <Row gutter={16}>
                <Col span={12}>
                  <Button block icon={<GoogleOutlined />} style={{ borderRadius: '8px', height: '42px' }}>Google</Button>
                </Col>
                <Col span={12}>
                  <Button block icon={<GithubOutlined />} style={{ borderRadius: '8px', height: '42px' }}>GitHub</Button>
                </Col>
              </Row>

              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>Don't have an account? </Text>
                <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Create an account</Link>
              </div>
            </Form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
