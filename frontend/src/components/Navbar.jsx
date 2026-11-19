import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Badge, Space, Typography, Dropdown, Segmented, Tooltip, Empty } from 'antd';
import { 
  BellOutlined, 
  UserOutlined, 
  SearchOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined,
  DownOutlined,
  SunOutlined,
  MoonOutlined,
  DesktopOutlined,
  WarningOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const { user, logout } = useAuth();
  const { themeMode, setThemeMode, isDark } = useTheme();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/api/notifications');
      setNotifications(res.data.items || []);
      setNotificationCount(res.data.count || 0);
    } catch (err) {
      // Quiet fail if not logged in or backend booting
      console.warn('Could not fetch notifications', err);
    }
  };

  const notificationMenuItems = [
    {
      key: 'notif-header',
      label: (
        <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong style={{ color: 'var(--text-primary)' }}>Notifications</Text>
          <Badge count={notificationCount} style={{ backgroundColor: notificationCount > 0 ? '#EF4444' : '#64748B' }} />
        </div>
      ),
      disabled: true,
    },
    ...(notifications.length === 0 ? [{
      key: 'empty',
      label: (
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No notifications" />
        </div>
      ),
      disabled: true,
    }] : notifications.map((n) => ({
      key: n.id,
      label: (
        <div 
          onClick={() => navigate(n.link)}
          style={{ 
            padding: '8px 12px', 
            maxWidth: '300px', 
            cursor: 'pointer',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            {n.type === 'error' ? (
              <CloseCircleOutlined style={{ color: '#EF4444' }} />
            ) : (
              <WarningOutlined style={{ color: '#F59E0B' }} />
            )}
            <Text strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{n.title}</Text>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.3 }}>{n.description}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{n.time}</div>
        </div>
      )
    })))
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'user-info',
      label: (
        <div style={{ padding: '8px 12px', minWidth: '180px' }}>
          <Text strong style={{ display: 'block', fontSize: '14px', color: 'var(--text-primary)' }}>
            {user?.name || 'Guest User'}
          </Text>
          <Text type="secondary" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {user?.email || 'guest@example.com'}
          </Text>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'profile',
      label: 'My Profile',
      icon: <ProfileOutlined />,
      onClick: () => navigate('/profile')
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => navigate('/settings')
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout
    },
  ];

  return (
    <Header style={{ 
      background: 'var(--bg-surface)', 
      padding: '0 32px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--card-shadow)',
      height: '70px',
      position: 'sticky',
      top: 0,
      zIndex: 999,
      transition: 'background 0.25s ease, border-color 0.25s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Space size="large">
          <SearchOutlined style={{ fontSize: '18px', color: 'var(--text-muted)', cursor: 'pointer' }} />
        </Space>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Theme Mode Toggle (Section 3 of plan.md) */}
        <Tooltip title={`Current Theme: ${themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}`}>
          <Segmented
            value={themeMode}
            onChange={(val) => setThemeMode(val)}
            options={[
              { value: 'light', icon: <SunOutlined /> },
              { value: 'dark', icon: <MoonOutlined /> },
              { value: 'system', icon: <DesktopOutlined /> },
            ]}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
            }}
          />
        </Tooltip>

        <Dropdown 
          menu={{ items: notificationMenuItems }} 
          placement="bottomRight" 
          trigger={['click']}
          overlayStyle={{ minWidth: '320px' }}
        >
          <Badge count={notificationCount} size="small" offset={[2, 0]} overflowCount={99}>
            <BellOutlined style={{ fontSize: '18px', color: 'var(--text-secondary)', cursor: 'pointer' }} />
          </Badge>
        </Dropdown>
        
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-elevated)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
          >
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-end', 
              justifyContent: 'center',
              marginRight: '2px'
            }}>
              <span style={{ 
                fontWeight: 600, 
                color: 'var(--text-primary)', 
                fontSize: '14px', 
                lineHeight: '1.2',
                display: 'block'
              }}>
                {user?.name || 'Test User'}
              </span>
              <span style={{ 
                fontSize: '11px', 
                color: 'var(--text-muted)', 
                fontWeight: 400, 
                lineHeight: '1.2',
                display: 'block',
                marginTop: '1px'
              }}>
                {user?.role || 'Developer'}
              </span>
            </div>
            
            <DownOutlined style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: '0 4px' }} />
            
            <Avatar 
              size={36}
              src={user?.avatar ? `/avatars/${user.avatar}` : null}
              icon={!user?.avatar && <UserOutlined />} 
              style={{ 
                backgroundColor: '#6366F1', 
                color: '#FFFFFF', 
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                flexShrink: 0
              }} 
            />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
