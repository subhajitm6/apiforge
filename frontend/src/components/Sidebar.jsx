import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  UploadOutlined, 
  FileTextOutlined, 
  SettingOutlined,
  ThunderboltOutlined,
  LogoutOutlined 
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      logout();
      navigate('/login');
    }
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/upload',
      icon: <UploadOutlined />,
      label: 'Upload API Spec',
    },
    {
      key: '/reports',
      icon: <FileTextOutlined />,
      label: 'Test Reports',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={260}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ padding: '20px 18px', marginBottom: '8px' }}>
        <div 
          onClick={() => navigate('/dashboard')}
          style={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '4px 0'
          }}
        >
          <img 
            src="/logo.png" 
            alt="APIForge Logo" 
            style={{ 
              height: '36px', 
              maxWidth: '100%', 
              objectFit: 'contain',
              display: 'block'
            }} 
          />
        </div>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
      
      <div style={{ 
        position: 'absolute', 
        bottom: '24px', 
        left: '24px', 
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ 
          padding: '16px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>Free Plan</div>
          <div style={{ fontSize: '14px', color: 'white', fontWeight: 500 }}>Upgrade to Pro</div>
        </div>
        
        <div 
          onClick={handleLogout}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 16px', 
            cursor: 'pointer',
            borderRadius: '12px',
            color: 'rgba(255,255,255,0.6)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
        >
          <LogoutOutlined />
          <span style={{ fontWeight: 500 }}>Logout</span>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
