import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout, ConfigProvider, theme as antdTheme } from 'antd';
import { useTheme } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TestReport from './pages/TestReport';
import UploadSpec from './pages/UploadSpec';
import ReportList from './pages/ReportList';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';

const { Content } = Layout;

// Main Layout component for authenticated pages
const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--bg-app)' }}>
      <Sidebar />
      <Layout style={{ marginLeft: 260, background: 'var(--bg-app)', transition: 'background 0.25s ease' }}>
        <Navbar />
        <Content style={{ padding: '36px', minHeight: 280, background: 'var(--bg-main)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

function App() {
  const { isDark } = useTheme();
  const { token } = useAuth();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#8B83FF',
          colorSuccess: '#35C98A',
          colorError: '#F16F78',
          colorWarning: '#E8B65C',
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          ...(isDark
            ? {
                colorBgBase: '#0B0D12',
                colorBgContainer: '#121722',
                colorBgElevated: '#171D29',
                colorBgLayout: '#0B0D12',
                colorText: '#E6EAF2',
                colorTextSecondary: '#929BAA',
                colorTextTertiary: '#626D7E',
                colorBorder: '#252D3A',
                colorBorderSecondary: '#1A212D',
              }
            : {
                colorBgBase: '#FFFFFF',
                colorBgContainer: '#FFFFFF',
                colorBgElevated: '#FFFFFF',
                colorBgLayout: '#F8FAFC',
                colorText: '#0F172A',
                colorTextSecondary: '#64748B',
                colorTextTertiary: '#94A3B8',
                colorBorder: '#E2E8F0',
                colorBorderSecondary: '#F1F5F9',
              }),
        },
        components: {
          Card: {
            colorBgContainer: isDark ? '#121722' : '#FFFFFF',
            colorBorderSecondary: isDark ? '#252D3A' : '#E2E8F0',
          },
          Table: {
            colorBgContainer: isDark ? '#121722' : '#FFFFFF',
            headerBg: isDark ? '#171D29' : '#F9FAFB',
            rowHoverBg: isDark ? '#1C2432' : '#F8FAFC',
          },
          Dropdown: {
            colorBgElevated: isDark ? '#171D29' : '#FFFFFF',
          },
          Modal: {
            contentBg: isDark ? '#121722' : '#FFFFFF',
            headerBg: isDark ? '#121722' : '#FFFFFF',
          },
          Drawer: {
            colorBgElevated: isDark ? '#121722' : '#FFFFFF',
          },
          Input: {
            colorBgContainer: isDark ? '#111827' : '#FFFFFF',
            colorBorder: isDark ? '#273449' : '#D9D9D9',
          },
        },
      }}
    >
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Main App Routes */}
        <Route 
          path="/dashboard" 
          element={<MainLayout><Dashboard /></MainLayout>} 
        />
        <Route 
          path="/upload" 
          element={<MainLayout><UploadSpec /></MainLayout>} 
        />
        <Route 
          path="/reports" 
          element={<MainLayout><ReportList /></MainLayout>} 
        />
        <Route 
          path="/report/:id" 
          element={<MainLayout><TestReport /></MainLayout>} 
        />
        <Route 
          path="/settings" 
          element={<MainLayout><Settings /></MainLayout>} 
        />
        <Route 
          path="/profile" 
          element={<MainLayout><Profile /></MainLayout>} 
        />

        {/* Root Route: Dashboard if authenticated, else Login */}
        <Route path="/" element={token ? <MainLayout><Dashboard /></MainLayout> : <Login />} />

        {/* Error / 404 Pages: captures all wrong / unmatched URLs */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
