import React from 'react';
import { Button, Typography, Space } from 'antd';
import { 
  ArrowLeftOutlined, 
  HomeOutlined, 
  FileSearchOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const { Title, Text, Paragraph } = Typography;

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const { token } = useAuth();

  const handlePrimaryAction = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'var(--bg-app)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        background: isDark ? 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)' : 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '560px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Large 404 Visual */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
          <span style={{
            fontSize: '120px',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-4px',
            background: isDark
              ? 'linear-gradient(135deg, #818CF8 0%, #C084FC 50%, #E879F9 100%)'
              : 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #A855F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'block',
            textShadow: isDark ? '0 10px 40px rgba(129,140,248,0.3)' : 'none'
          }}>
            404
          </span>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            borderRadius: '20px',
            background: isDark ? 'rgba(99,102,241,0.15)' : '#EEF2FF',
            border: '1px solid var(--border-color)',
            color: 'var(--primary-color)',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginTop: '8px'
          }}>
            <FileSearchOutlined /> Page Not Found
          </div>
        </div>

        {/* Heading & Description */}
        <Title level={2} style={{ 
          color: 'var(--text-primary)', 
          fontWeight: 700, 
          margin: '0 0 12px 0' 
        }}>
          Lost in Cyberspace?
        </Title>
        <Paragraph style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '15px', 
          lineHeight: 1.6,
          marginBottom: '28px',
          maxWidth: '460px',
          marginInline: 'auto'
        }}>
          The page or endpoint you are looking for doesn't exist, has been relocated, or the URL entered is incorrect.
        </Paragraph>

        {/* URL Inspector Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: isDark ? '#171D29' : '#F1F5F9',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '8px 16px',
          marginBottom: '32px',
          fontFamily: 'Consolas, Monaco, monospace',
          fontSize: '13px',
          color: 'var(--text-muted)'
        }}>
          <span style={{ color: '#EF4444', fontWeight: 700 }}>404</span>
          <span>GET</span>
          <Text code style={{ 
            color: 'var(--text-primary)', 
            background: 'transparent', 
            border: 'none',
            padding: 0
          }}>
            {location.pathname || '/unknown'}
          </Text>
        </div>

        {/* Action Buttons */}
        <div>
          <Space size="middle">
            <Button
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              style={{
                borderRadius: '8px',
                paddingInline: '20px',
                height: '44px'
              }}
            >
              Go Back
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              onClick={handlePrimaryAction}
              style={{
                borderRadius: '8px',
                paddingInline: '24px',
                height: '44px',
                fontWeight: 600
              }}
            >
              {token ? 'Back to Dashboard' : 'Go to Login'}
            </Button>
          </Space>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
