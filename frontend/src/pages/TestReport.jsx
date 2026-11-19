import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, Row, Col, Statistic, Table, Button, Tag, 
  Typography, Space, Tabs, Input, Drawer, Descriptions,
  message, Spin, Badge, Empty
} from 'antd';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined,
  EyeOutlined,
  CopyOutlined,
  SearchOutlined,
  BugOutlined,
  CodeOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const TestReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/test-report/${id}`);
      const data = res.data;
      
      setReport({
        id: data.id,
        fileName: data.file?.name || 'Unknown File',
        total: data.total || 0,
        passed: data.passed || 0,
        failed: data.failed || 0,
        successRate: data.total > 0 ? Math.round((data.passed / data.total) * 100) : 0,
        results: (data.results || []).map(r => ({
          id: r.id,
          key: r.id,
          method: r.api_test?.method || 'GET',
          endpoint: r.api_test?.endpoint || 'N/A',
          expectedStatus: r.api_test?.expected_status || 200,
          actualStatus: r.actual_status,
          result: r.result,
          responseTime: r.response_time,
          error_message: r.error_message,
          responseBody: r.response_body
        }))
      });
    } catch (err) {
      console.error('Failed to fetch test report', err);
      message.error('Failed to fetch test report');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2));
    message.success('Copied to clipboard');
  };

  const handleDownloadPdf = () => {
    const baseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://apiforge-backend-d8py.onrender.com' : '');
    window.open(`${baseUrl}/api/test-report/${id}/download`, '_blank');
  };

  const columns = [
    {
      title: 'METHOD',
      dataIndex: 'method',
      key: 'method',
      width: 100,
      render: (method) => {
        const colors = {
          GET: 'blue',
          POST: 'green',
          PUT: 'orange',
          DELETE: 'red',
          PATCH: 'cyan'
        };
        return (
          <Tag color={colors[method] || 'default'} style={{ 
            fontWeight: 700, 
            borderRadius: '6px', 
            padding: '2px 10px',
            border: 'none'
          }}>
            {method}
          </Tag>
        );
      },
    },
    {
      title: 'ENDPOINT',
      dataIndex: 'endpoint',
      key: 'endpoint',
      render: (text) => (
        <Text code style={{ 
          background: isDark ? '#0B0F19' : '#F3F4F6', 
          color: isDark ? '#38BDF8' : '#374151',
          border: '1px solid var(--border-color)',
          padding: '2px 8px',
          borderRadius: '4px'
        }}>
          {text}
        </Text>
      )
    },
    {
      title: 'EXPECTED',
      dataIndex: 'expectedStatus',
      key: 'expectedStatus',
      align: 'center',
      render: (s) => <Text strong style={{ color: 'var(--text-primary)' }}>{s}</Text>
    },
    {
      title: 'ACTUAL',
      dataIndex: 'actualStatus',
      key: 'actualStatus',
      align: 'center',
      render: (status, record) => (
        <Text type={status === record.expectedStatus ? 'success' : 'danger'} strong>
          {status || 'N/A'}
        </Text>
      ),
    },
    {
      title: 'RESULT',
      dataIndex: 'result',
      key: 'result',
      render: (result) => (
        <Tag 
          color={result === 'pass' ? 'success' : 'error'} 
          style={{ 
            borderRadius: '20px', 
            border: 'none', 
            padding: '2px 12px',
            fontWeight: 600
          }}
        >
          {result === 'pass' ? 'PASSED' : 'FAILED'}
        </Tag>
      ),
    },
    {
      title: 'TIME',
      dataIndex: 'responseTime',
      key: 'responseTime',
      render: (time) => (
        <Space style={{ color: 'var(--text-secondary)' }}>
          <ClockCircleOutlined style={{ fontSize: '12px' }} />
          <span>{time}ms</span>
        </Space>
      )
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<EyeOutlined />} 
          style={{ color: 'var(--primary-color)' }}
          onClick={() => {
            setSelectedResult(record);
            setDrawerVisible(true);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" tip={<Text type="secondary" style={{ marginTop: '12px' }}>Analyzing results...</Text>} />
      </div>
    );
  }

  const filteredResults = (report?.results || []).filter(r => {
    const matchesSearch = (r.endpoint || '').toLowerCase().includes(searchText.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'passed' && r.result === 'pass') || 
                      (activeTab === 'failed' && r.result === 'fail');
    return matchesSearch && matchesTab;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <Button 
              type="text"
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/dashboard')}
              style={{ color: 'var(--text-secondary)', padding: 0, marginBottom: '8px' }}
            >
              Back to Dashboard
            </Button>
            <Title level={2} style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>Test Report: {report.fileName}</Title>
          </div>
          <Space>
            <Button icon={<DownloadOutlined />} onClick={handleDownloadPdf}>Download PDF</Button>
            <Button type="primary" onClick={() => navigate('/upload')}>New Test Run</Button>
          </Space>
        </div>

        <Row gutter={[20, 20]}>
          <Col xs={24} md={6}>
            <Card bordered={false} style={{ borderBottom: '4px solid var(--border-color)' }}>
              <Statistic title="TOTAL APIS" value={report.total} prefix={<CodeOutlined />} />
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card bordered={false} style={{ borderBottom: '4px solid #22C55E' }}>
              <Statistic title="PASSED" value={report.passed} valueStyle={{ color: '#22C55E' }} prefix={<CheckCircleOutlined />} />
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card bordered={false} style={{ borderBottom: '4px solid #EF4444' }}>
              <Statistic title="FAILED" value={report.failed} valueStyle={{ color: '#EF4444' }} prefix={<CloseCircleOutlined />} />
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card bordered={false} style={{ borderBottom: '4px solid var(--primary-color)' }}>
              <Statistic title="SUCCESS RATE" value={report.successRate} suffix="%" valueStyle={{ color: 'var(--primary-color)' }} />
            </Card>
          </Col>

          <Col span={24}>
            <Card bordered={false} bodyStyle={{ padding: '0' }}>
              <div style={{ 
                padding: '16px 24px', 
                borderBottom: '1px solid var(--border-color)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <Tabs 
                  activeKey={activeTab} 
                  onChange={setActiveTab} 
                  style={{ marginBottom: '-17px' }}
                  tabBarStyle={{ border: 'none' }}
                >
                  <TabPane 
                    tab={
                      <Space size={6}>
                        <span>All Tests</span>
                        <Badge 
                          count={report.total} 
                          style={{ backgroundColor: '#64748B', color: '#fff' }} 
                        />
                      </Space>
                    } 
                    key="all" 
                  />
                  <TabPane 
                    tab={
                      <Space size={6}>
                        <span>Passed</span>
                        <Badge 
                          count={report.passed} 
                          style={{ backgroundColor: '#22C55E', color: '#fff' }} 
                        />
                      </Space>
                    } 
                    key="passed" 
                  />
                  <TabPane 
                    tab={
                      <Space size={6}>
                        <span>Failed</span>
                        <Badge 
                          count={report.failed} 
                          showZero
                          style={{ backgroundColor: report.failed > 0 ? '#EF4444' : '#64748B', color: '#fff' }} 
                        />
                      </Space>
                    } 
                    key="failed" 
                  />
                </Tabs>
                <Input 
                  placeholder="Filter by endpoint..." 
                  prefix={<SearchOutlined style={{ color: 'var(--text-muted)' }} />} 
                  style={{ width: 280, borderRadius: '8px' }}
                  onChange={e => setSearchText(e.target.value)}
                />
              </div>
              
              {report.total > 0 ? (
                <Table 
                  columns={columns} 
                  dataSource={filteredResults} 
                  pagination={{ pageSize: 10 }}
                  rowClassName={(record) => record.result === 'fail' ? 'failed-row' : ''}
                  expandable={{
                    expandedRowRender: (record) => (
                      <div style={{ 
                        padding: '16px', 
                        background: 'var(--bg-elevated)', 
                        borderRadius: '8px', 
                        border: '1px solid var(--border-color)' 
                      }}>
                        <Row gutter={24}>
                          <Col span={12}>
                            <Text strong style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)' }}>
                              <BugOutlined style={{ color: '#EF4444', marginRight: '8px' }} />
                              Error Analysis
                            </Text>
                            {record.error_message ? (
                              <div style={{ 
                                color: isDark ? '#FCA5A5' : '#991B1B', 
                                padding: '12px', 
                                background: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2', 
                                borderRadius: '6px',
                                border: '1px solid rgba(239, 68, 68, 0.3)'
                              }}>
                                {record.error_message}
                              </div>
                            ) : (
                              <Text type="secondary" style={{ color: 'var(--text-secondary)' }}>No errors reported for this endpoint.</Text>
                            )}
                          </Col>
                          <Col span={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <Text strong style={{ color: 'var(--text-primary)' }}>Response Body</Text>
                              <Button size="small" type="link" onClick={() => copyToClipboard(record.responseBody)}>Copy JSON</Button>
                            </div>
                            <pre style={{ 
                              background: 'var(--code-bg)', 
                              color: 'var(--code-text)',
                              padding: '12px', 
                              borderRadius: '6px', 
                              maxHeight: '200px',
                              overflow: 'auto',
                              fontSize: '12px',
                              margin: 0,
                              border: '1px solid var(--border-color)',
                              fontFamily: 'Consolas, Monaco, monospace'
                            }}>
                              {JSON.stringify(record.responseBody, null, 2)}
                            </pre>
                          </Col>
                        </Row>
                      </div>
                    ),
                    rowExpandable: (record) => !!record.responseBody || !!record.error_message,
                  }}
                />
              ) : (
                <div style={{ padding: '100px 0', textAlign: 'center' }}>
                  <Empty 
                    description={
                      <span>
                        <Text type="secondary">No test results available for this run.</Text>
                        <br />
                        <Text type="secondary" size="small">Check if the API specification was parsed correctly.</Text>
                      </span>
                    }
                  />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </motion.div>

      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              background: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-color)'
            }}>
              <CodeOutlined />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Request Details</div>
              <div style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)' }}>ID: {selectedResult?.id}</div>
            </div>
          </div>
        }
        placement="right"
        width={650}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ background: 'var(--bg-main)' }}
        extra={
          <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(selectedResult?.responseBody)}>
            Copy JSON
          </Button>
        }
      >
        <AnimatePresence>
          {selectedResult && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card bordered={false} size="small" title={<strong style={{ color: 'var(--text-primary)' }}>API Info</strong>}>
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Method"><Tag color="blue">{selectedResult.method}</Tag></Descriptions.Item>
                    <Descriptions.Item label="Endpoint"><Text code>{selectedResult.endpoint}</Text></Descriptions.Item>
                    <Descriptions.Item label="Expected Status"><Text strong style={{ color: 'var(--text-primary)' }}>{selectedResult.expectedStatus}</Text></Descriptions.Item>
                    <Descriptions.Item label="Actual Status">
                      <Text type={selectedResult.actualStatus === selectedResult.expectedStatus ? 'success' : 'danger'} strong>
                        {selectedResult.actualStatus || 'N/A'}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Time"><ClockCircleOutlined /> {selectedResult.responseTime}ms</Descriptions.Item>
                  </Descriptions>
                </Card>

                {selectedResult.error_message && (
                  <Card bordered={false} style={{ borderLeft: '4px solid #EF4444' }}>
                    <Space>
                      <BugOutlined style={{ color: '#EF4444' }} />
                      <Text type="danger" strong>Error Message</Text>
                    </Space>
                    <div style={{ marginTop: '8px', color: isDark ? '#FCA5A5' : '#991B1B' }}>{selectedResult.error_message}</div>
                  </Card>
                )}

                <Card bordered={false} size="small" title={<strong style={{ color: 'var(--text-primary)' }}>Response Body</strong>} bodyStyle={{ padding: 0 }}>
                  <pre style={{ 
                    background: 'var(--code-bg)', 
                    color: 'var(--code-text)',
                    padding: '16px', 
                    borderRadius: '0 0 8px 8px', 
                    overflow: 'auto',
                    fontSize: '12px',
                    margin: 0,
                    fontFamily: 'Consolas, Monaco, monospace'
                  }}>
                    {JSON.stringify(selectedResult.responseBody, null, 2)}
                  </pre>
                </Card>
              </Space>
            </motion.div>
          )}
        </AnimatePresence>
      </Drawer>
    </div>
  );
};

export default TestReport;
