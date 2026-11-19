import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Button, Tag, Upload, message, Typography, Space, Tooltip, Popconfirm, Progress } from 'antd';
import { 
  CloudUploadOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  FileTextOutlined,
  PlayCircleOutlined,
  ArrowRightOutlined,
  DatabaseOutlined,
  CalendarOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LineChartOutlined,
  RocketOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({ totalApis: 0, totalRuns: 0, passed: 0, failed: 0, successRate: 0, newApis: 0, runTrend: 0 });
  const [recentRuns, setRecentRuns] = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchRecentRuns();
    fetchPendingFiles();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch statistics', err);
    }
  };

  const fetchRecentRuns = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/test-runs');
      setRecentRuns(res.data);
    } catch (err) {
      console.error('Failed to fetch recent runs', err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchPendingFiles = async () => {
    try {
      const res = await axios.get('/api/recent-files');
      setPendingFiles(res.data.filter(f => f.test_runs_count === 0));
    } catch (err) {
      console.error('Failed to fetch pending files', err);
    }
  };

  const handleRunTest = async (fileId) => {
    if (!fileId) {
      message.warning('No file selected to run tests.');
      return;
    }

    setLoading(true);
    const hide = message.loading('Executing API tests...', 0);
    
    try {
      const res = await axios.post(`/api/run-test/${fileId}`);
      hide();
      message.success('Test run completed successfully!');
      fetchStats();
      fetchRecentRuns();
      fetchPendingFiles();
      navigate(`/report/${res.data.run.id}`);
    } catch (err) {
      hide();
      console.error('Test execution failed', err);
      message.error('Failed to execute tests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRun = async (runId) => {
    try {
      await axios.delete(`/api/test-report/${runId}`);
      message.success('Test run deleted successfully');
      fetchStats();
      fetchRecentRuns();
    } catch (err) {
      console.error('Failed to delete test run', err);
      message.error('Failed to delete test run');
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await axios.delete(`/api/upload/${fileId}`);
      message.success('File deleted successfully');
      fetchPendingFiles();
      fetchStats();
    } catch (err) {
      console.error('Failed to delete file', err);
      message.error('Failed to delete file');
    }
  };

  const columns = [
    {
      title: 'SPEC FILE',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (text) => (
        <Space size="middle">
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--primary-color)'
          }}>
            <FileTextOutlined style={{ fontSize: '20px' }} />
          </div>
          <div>
            <Text strong style={{ fontSize: '15px', display: 'block', color: 'var(--text-primary)' }}>{text || 'Specification File'}</Text>
            <Text type="secondary" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Swagger / OpenAPI</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      render: (val) => <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{val}</span>
    },
    {
      title: 'DATE & TIME',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>{date}</Text>
    },
    {
      title: 'PASSED',
      dataIndex: 'passed',
      key: 'passed',
      align: 'center',
      render: (val) => <Tag color="success" style={{ borderRadius: '6px', fontWeight: 600, border: 'none' }}>{val}</Tag>,
    },
    {
      title: 'FAILED',
      dataIndex: 'failed',
      key: 'failed',
      align: 'center',
      render: (val) => <Tag color="error" style={{ borderRadius: '6px', fontWeight: 600, border: 'none' }}>{val}</Tag>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag 
          color={status === 'Success' ? 'green' : 'red'} 
          style={{ 
            borderRadius: '20px', 
            padding: '2px 12px',
            border: 'none',
            fontWeight: 500,
            fontSize: '11px'
          }}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Re-run tests">
            <Button 
              type="text" 
              icon={<PlayCircleOutlined />} 
              style={{ color: '#22C55E' }}
              onClick={() => handleRunTest(record.file_id)}
            />
          </Tooltip>
          <Button 
            type="primary" 
            size="small"
            icon={<ArrowRightOutlined />} 
            style={{ 
              backgroundColor: 'var(--primary-color)',
              color: '#FFFFFF',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 500,
              border: 'none',
              height: '28px',
              padding: '0 10px',
              display: 'inline-flex',
              alignItems: 'center',
              boxShadow: 'none'
            }}
            onClick={() => navigate(`/report/${record.id}`)}
          >
            View
          </Button>
          <Popconfirm
            title="Delete test run?"
            description="Are you sure you want to delete this test run?"
            onConfirm={() => handleDeleteRun(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Header */}
      <header style={{ 
        marginBottom: '40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0 8px'
      }}>
        <div>
          <Title level={2} style={{ fontWeight: 800, margin: 0, letterSpacing: '-1px', fontSize: '30px', color: 'var(--text-primary)' }}>
            Dashboard Overview
          </Title>
          <Text type="secondary" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
            Monitor your API reliability and test performance in real-time.
          </Text>
        </div>
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<PlusCircleOutlined />} 
            size="large" 
            style={{ 
              borderRadius: '8px', 
              height: '44px', 
              padding: '0 20px', 
              fontWeight: 600,
            }}
            onClick={() => navigate('/upload')}
          >
            New Test
          </Button>
        </Space>
      </header>

      {/* 5-Column Stats Grid */}
      <Row gutter={[20, 20]} style={{ marginBottom: '40px' }}>
        <Col xs={24} sm={12} lg={4} style={{ flex: '0 0 20%', maxWidth: '20%' }}>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card bordered={false} style={{ 
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', 
              color: 'white', 
              borderRadius: '16px',
            }}>
              <Statistic 
                title={<span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '12px', textTransform: 'uppercase' }}>Total Runs</span>}
                value={stats.totalRuns} 
                prefix={<ThunderboltOutlined style={{ marginRight: '8px', color: '#FDE047' }} />}
                valueStyle={{ color: 'white', fontWeight: 800, fontSize: '30px' }}
              />
              <div style={{ marginTop: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {stats.runTrend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} 
                <span style={{ fontWeight: 600 }}>{Math.abs(stats.runTrend || 0)}%</span> vs last week
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} sm={12} lg={4} style={{ flex: '0 0 20%', maxWidth: '20%' }}>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card bordered={false} style={{ borderRadius: '16px', borderBottom: '4px solid #22C55E' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Passed Tests</Text>}
                value={stats.passed} 
                prefix={<CheckCircleOutlined style={{ color: '#22C55E', marginRight: '8px' }} />}
                valueStyle={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '30px' }}
              />
              <div style={{ marginTop: '12px' }}>
                <Tag color="success" style={{ borderRadius: '6px', border: 'none', fontWeight: 600 }}>{stats.successRate}% SUCCESS</Tag>
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} sm={12} lg={4} style={{ flex: '0 0 20%', maxWidth: '20%' }}>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card bordered={false} style={{ borderRadius: '16px', borderBottom: '4px solid #EF4444' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Failed Tests</Text>}
                value={stats.failed} 
                prefix={<CloseCircleOutlined style={{ color: '#EF4444', marginRight: '8px' }} />}
                valueStyle={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '30px' }}
              />
              <div style={{ marginTop: '12px' }}>
                <Tag color="error" style={{ borderRadius: '6px', border: 'none', fontWeight: 600 }}>
                  {stats.failed > 0 ? `${stats.failed} ISSUES` : 'CLEAR'}
                </Tag>
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} sm={12} lg={4} style={{ flex: '0 0 20%', maxWidth: '20%' }}>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card bordered={false} style={{ borderRadius: '16px', borderBottom: '4px solid #38BDF8' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Reliability</Text>}
                value={stats.successRate} 
                suffix="%"
                prefix={<LineChartOutlined style={{ color: '#38BDF8', marginRight: '8px' }} />}
                valueStyle={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '30px' }}
              />
              <div style={{ marginTop: '16px' }}>
                <Progress percent={stats.successRate} size="small" showInfo={false} strokeColor="#38BDF8" strokeWidth={6} />
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} sm={12} lg={4} style={{ flex: '0 0 20%', maxWidth: '20%' }}>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card bordered={false} style={{ borderRadius: '16px', borderBottom: '4px solid #F59E0B' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Total APIs</Text>}
                value={stats.totalApis} 
                prefix={<RocketOutlined style={{ color: '#F59E0B', marginRight: '8px' }} />}
                valueStyle={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '30px' }}
              />
              <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                <span style={{ color: '#F59E0B' }}>+{stats.newApis}</span> added this week
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {/* Pending Files Section */}
            {pendingFiles.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <Space size="middle">
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      background: isDark ? 'rgba(245, 158, 11, 0.15)' : '#FFF7ED', 
                      borderRadius: '10px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#F59E0B'
                    }}>
                      <DatabaseOutlined style={{ fontSize: '18px' }} />
                    </div>
                    <Title level={4} style={{ margin: 0, fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>Files Ready for Testing</Title>
                  </Space>
                  <Tag color="warning" style={{ borderRadius: '8px', padding: '2px 12px', fontWeight: 600 }}>{pendingFiles.length} PENDING</Tag>
                </div>
                
                <Row gutter={[20, 20]}>
                  {pendingFiles.map(file => (
                    <Col xs={24} sm={12} lg={8} key={file.id}>
                      <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <Card 
                          bordered={false} 
                          style={{ borderRadius: '16px' }}
                          bodyStyle={{ padding: '20px' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', gap: '14px' }}>
                              <div style={{ 
                                width: '48px', 
                                height: '48px', 
                                background: 'var(--bg-elevated)', 
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border-color)'
                              }}>
                                <FileTextOutlined style={{ fontSize: '24px' }} />
                              </div>
                              <div>
                                <Text strong style={{ fontSize: '15px', display: 'block', color: 'var(--text-primary)' }} ellipsis={{ tooltip: file.name }}>
                                  {file.name}
                                </Text>
                                <Space size={4} style={{ marginTop: '4px' }}>
                                  <CalendarOutlined style={{ fontSize: '12px', color: 'var(--text-muted)' }} />
                                  <Text type="secondary" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    {new Date(file.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                  </Text>
                                </Space>
                              </div>
                            </div>
                            <Space size="small" style={{ alignItems: 'center', flexShrink: 0 }}>
                              <Tooltip title="Start Testing">
                                <Button 
                                  type="primary" 
                                  shape="circle"
                                  icon={<PlayCircleOutlined style={{ fontSize: '16px' }} />} 
                                  style={{
                                    width: '36px',
                                    height: '36px',
                                    minWidth: '36px',
                                    maxWidth: '36px',
                                    minHeight: '36px',
                                    maxHeight: '36px',
                                    aspectRatio: '1 / 1',
                                    borderRadius: '50%',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0,
                                    paddingBlock: 0,
                                    paddingInline: 0,
                                    flex: '0 0 36px',
                                    flexShrink: 0,
                                    lineHeight: 1,
                                    boxSizing: 'border-box'
                                  }}
                                  onClick={() => handleRunTest(file.id)}
                                />
                              </Tooltip>
                              <Popconfirm
                                title="Delete file?"
                                onConfirm={() => handleDeleteFile(file.id)}
                                okText="Delete"
                                okButtonProps={{ danger: true }}
                              >
                                <Button type="text" danger icon={<DeleteOutlined />} style={{ opacity: 0.7 }} />
                              </Popconfirm>
                            </Space>
                          </div>
                          <div style={{ 
                            marginTop: '16px', 
                            paddingTop: '16px', 
                            borderTop: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <Text type="secondary" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>Auto-generated suite</Text>
                            <Tag style={{ borderRadius: '6px', fontSize: '10px', border: 'none', background: 'var(--bg-elevated)', color: 'var(--text-secondary)', fontWeight: 600 }}>
                              {file.type?.toUpperCase() || 'SPEC'}
                            </Tag>
                          </div>
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {/* Recent Activity Table */}
            <Card 
              title={
                <Space size="middle">
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--primary-color)'
                  }}>
                    <CalendarOutlined style={{ fontSize: '16px' }} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)' }}>Recent Activity</span>
                </Space>
              } 
              bordered={false}
              style={{ borderRadius: '16px' }}
              extra={<Button type="link" onClick={() => navigate('/reports')} style={{ fontWeight: 600 }}>View all reports</Button>}
            >
              <Table 
                columns={columns} 
                dataSource={recentRuns} 
                loading={loading} 
                pagination={false}
                rowKey="id"
                style={{ marginTop: '8px' }}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
