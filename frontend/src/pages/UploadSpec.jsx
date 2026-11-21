import React, { useState } from 'react';
import { 
  Card, Typography, Upload, message, Button, Space, Steps, 
  Table, Tag, Input, Select, Modal, Form, Tooltip, Row, Col, Alert, Divider
} from 'antd';
import { 
  CloudUploadOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined,
  LoadingOutlined,
  ArrowRightOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  CheckCircleFilled,
  ExclamationCircleOutlined,
  KeyOutlined,
  LockOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const UploadSpec = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [uploadedFileId, setUploadedFileId] = useState(null);
  const [testRunId, setTestRunId] = useState(null);

  // Dynamic Preview state
  const [previewSpec, setPreviewSpec] = useState(null);
  const [editingBaseUrl, setEditingBaseUrl] = useState('');
  const [endpoints, setEndpoints] = useState([]);
  const [sampleId, setSampleId] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditingEndpoint, setCurrentEditingEndpoint] = useState(null);
  const [editForm] = Form.useForm();

  const uploadProps = {
    name: 'file',
    multiple: false,
    action: `${import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://apiforge-backend-d8py.onrender.com' : '')}/api/upload`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    onChange(info) {
      const { status } = info.file;
      setFileList(info.fileList);
      
      if (status === 'done') {
        const response = info.file.response;
        if (response && response.preview) {
          const prev = response.preview;
          setPreviewSpec(prev);
          setEditingBaseUrl(prev.base_url || '');
          setEndpoints((prev.endpoints || []).map((ep, idx) => ({
            ...ep,
            key: ep.id || `ep_${idx}`,
            idx
          })));
          setUploadedFileId(response.file.id);
          message.success(`${info.file.name} uploaded and dynamically analyzed.`);
          setCurrentStep(1); // Move to Preview & Edit step
        } else {
          message.error('Parsing failed to extract API information.');
          setCurrentStep(0);
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove() {
      setCurrentStep(0);
      setPreviewSpec(null);
      setEndpoints([]);
    }
  };

  const handleEditEndpoint = (record) => {
    setCurrentEditingEndpoint(record);
    editForm.setFieldsValue({
      method: record.method,
      path: record.path,
      summary: record.summary,
      expected_status: record.expected_status,
      request_body: record.request_body?.example_body ? JSON.stringify(record.request_body.example_body, null, 2) : ''
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEndpoint = (values) => {
    let parsedBody = null;
    if (values.request_body && values.request_body.trim()) {
      try {
        parsedBody = JSON.parse(values.request_body);
      } catch (e) {
        message.error('Invalid JSON for request body');
        return;
      }
    }

    setEndpoints(prev => prev.map(ep => {
      if (ep.key === currentEditingEndpoint.key) {
        return {
          ...ep,
          method: values.method,
          path: values.path,
          summary: values.summary,
          expected_status: parseInt(values.expected_status, 10),
          request_body: parsedBody ? { example_body: parsedBody, content_type: 'application/json' } : null
        };
      }
      return ep;
    }));

    setIsEditModalOpen(false);
    message.success('Endpoint updated');
  };

  const handleDeleteEndpoint = (recordKey) => {
    setEndpoints(prev => prev.filter(ep => ep.key !== recordKey));
    message.success('Endpoint removed from suite');
  };

  const handleAddEndpoint = () => {
    const newEp = {
      key: `ep_new_${Date.now()}`,
      method: 'GET',
      path: '/api/v1/new-endpoint',
      summary: 'New Custom Endpoint',
      expected_status: 200,
      request_body: null
    };
    setEndpoints(prev => [...prev, newEp]);
    handleEditEndpoint(newEp);
  };

  const handleApplyIdToAll = () => {
    if (!sampleId.trim()) {
      message.warning('Please enter an ID to apply to endpoints.');
      return;
    }
    setEndpoints(prev => prev.map(ep => ({
      ...ep,
      path: ep.path.replace(/\{[a-zA-Z0-9_]+\}/g, sampleId.trim())
    })));
    message.success(`Applied ID "${sampleId.trim()}" to matching endpoint paths.`);
  };

  const handleConfirmAndRun = async () => {
    if (!uploadedFileId) return;
    setProcessing(true);
    try {
      // 1. Confirm and persist any user edits to base URL / endpoints
      await axios.post(`/api/upload/${uploadedFileId}/confirm`, {
        base_url: editingBaseUrl,
        endpoints: endpoints.map(ep => ({
          method: ep.method,
          path: ep.path,
          summary: ep.summary,
          expected_status: ep.expected_status,
          request_body: ep.request_body?.example_body || null
        }))
      });

      // 2. Execute tests with custom sample ID and Bearer token
      const res = await axios.post(`/api/run-test/${uploadedFileId}`, {
        test_id: sampleId.trim() || undefined,
        auth_token: bearerToken.trim() || undefined
      });
      setTestRunId(res.data.run.id);
      setProcessing(false);
      setCurrentStep(2);
      message.success('Specification confirmed and tests executed!');
    } catch (err) {
      console.error('Execution failed', err);
      message.error('Failed to confirm specification and run tests.');
      setProcessing(false);
    }
  };

  const endpointColumns = [
    {
      title: 'METHOD',
      dataIndex: 'method',
      key: 'method',
      width: 100,
      render: (m) => {
        const colors = { GET: 'blue', POST: 'green', PUT: 'orange', DELETE: 'red', PATCH: 'cyan' };
        return <Tag color={colors[m] || 'default'} style={{ fontWeight: 700 }}>{m}</Tag>;
      }
    },
    {
      title: 'ENDPOINT PATH',
      dataIndex: 'path',
      key: 'path',
      render: (p) => (
        <Text code style={{ 
          background: isDark ? '#0B0F19' : '#F8FAFC', 
          color: isDark ? '#38BDF8' : '#334155',
          border: '1px solid var(--border-color)',
          padding: '2px 8px',
          borderRadius: '4px'
        }}>
          {p}
        </Text>
      )
    },
    {
      title: 'OPERATION / SUMMARY',
      dataIndex: 'summary',
      key: 'summary',
      render: (s) => <span style={{ color: 'var(--text-primary)', fontSize: '13px' }}>{s}</span>
    },
    {
      title: 'EXPECTED',
      dataIndex: 'expected_status',
      key: 'expected_status',
      align: 'center',
      width: 90,
      render: (st) => <Tag color={st < 300 ? 'success' : 'warning'}>{st}</Tag>
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      align: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEditEndpoint(record)} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteEndpoint(record.key)} />
        </Space>
      )
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', paddingBottom: '40px' }}>
      <header style={{ textAlign: 'center', marginBottom: '36px' }}>
        <Title level={2} style={{ fontWeight: 800, marginBottom: '8px', letterSpacing: '-1px', color: 'var(--text-primary)' }}>
          Universal API Documentation Importer
        </Title>
        <Text type="secondary" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          Upload PDF, DOCX, Markdown, Text, or OpenAPI/Swagger. The engine extracts Base URLs, Auth, and Endpoints dynamically.
        </Text>
      </header>

      <Steps
        current={currentStep}
        style={{ marginBottom: '36px' }}
        items={[
          { title: 'Upload Document' },
          { title: 'Dynamic Preview & Edit' },
          { title: 'Execution Complete' }
        ]}
      />

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {/* STEP 0: Upload */}
        {currentStep === 0 && (
          <Card bordered={false} style={{ padding: '24px' }}>
            <Dragger {...uploadProps} style={{ 
              background: isDark ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.02)', 
              border: '2px dashed var(--border-color)', 
              borderRadius: '16px',
              padding: '48px'
            }}>
              <div style={{ padding: '20px' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: isDark ? 'rgba(99, 102, 241, 0.15)' : '#EEF2FF', 
                  borderRadius: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: 'var(--primary-color)'
                }}>
                  <CloudUploadOutlined style={{ fontSize: '40px' }} />
                </div>
                <Title level={3} style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>Drag & drop API documentation here</Title>
                <Paragraph type="secondary" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                  Universal support for PDF, DOCX, Markdown, TXT, OpenAPI 3.x, and Swagger 2.0.
                </Paragraph>
                <Button type="primary" size="large" style={{ marginTop: '12px' }}>
                  Browse Files
                </Button>
              </div>
            </Dragger>
          </Card>
        )}

        {/* STEP 1: Dynamic Import Preview & Customization (Section 9 of plan.md) */}
        {currentStep === 1 && previewSpec && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Alert
              message="Dynamic Extraction Successful"
              description={`Extracted ${endpoints.length} endpoints with ${Math.round((previewSpec.confidence_score || 0.9) * 100)}% confidence score. Review, adjust the Base URL or endpoints below, and proceed.`}
              type="info"
              showIcon
              icon={<CheckCircleFilled />}
              style={{ borderRadius: '8px' }}
            />

            {/* API Metadata & Server Environments */}
            <Card bordered={false} title={<span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>1. Discovered API Environment</span>}>
              <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>API TITLE & VERSION</Text>
                  <Title level={4} style={{ margin: 0, color: 'var(--text-primary)' }}>
                    {previewSpec.title} <Tag color="blue">{previewSpec.version}</Tag>
                  </Title>
                  <Text type="secondary" style={{ fontSize: '13px' }}>{previewSpec.description}</Text>
                </Col>
                <Col xs={24} md={12}>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>AUTHENTICATION</Text>
                  <Space align="center">
                    <SafetyCertificateOutlined style={{ color: '#22C55E', fontSize: '18px' }} />
                    <Text strong style={{ color: 'var(--text-primary)' }}>
                      {previewSpec.global_auth?.type?.toUpperCase() || 'NONE / NOT REQUIRED'}
                    </Text>
                    {previewSpec.global_auth?.header_name && (
                      <Tag>{previewSpec.global_auth.header_name}</Tag>
                    )}
                  </Space>
                </Col>

                <Col span={24}>
                  <Divider style={{ margin: '12px 0', borderColor: 'var(--border-color)' }} />
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                    TARGET BASE URL (Choose from discovered servers or edit directly)
                  </Text>
                  <Input
                    prefix={<GlobalOutlined style={{ color: 'var(--primary-color)' }} />}
                    value={editingBaseUrl}
                    onChange={(e) => setEditingBaseUrl(e.target.value)}
                    placeholder="https://api.example.com/v1"
                    size="large"
                    style={{ borderRadius: '8px' }}
                  />
                  {previewSpec.servers && previewSpec.servers.length > 1 && (
                    <div style={{ marginTop: '8px' }}>
                      <Text type="secondary" style={{ fontSize: '12px', marginRight: '8px' }}>Detected Environments:</Text>
                      <Space size="small" wrap>
                        {previewSpec.servers.map((s, idx) => (
                          <Button key={idx} size="small" onClick={() => setEditingBaseUrl(s.url)}>
                            {s.name}: {s.url}
                          </Button>
                        ))}
                      </Space>
                    </div>
                  )}
                </Col>

                {/* Resource ID / Path Parameter & Auth Token */}
                <Col xs={24} md={12}>
                  <Divider style={{ margin: '14px 0 10px 0', borderColor: 'var(--border-color)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <Text type="secondary" style={{ fontSize: '12px', fontWeight: 600 }}>
                      TEST ID / PATH PARAMETER (Replaces {`{id}`})
                    </Text>
                    {sampleId && (
                      <Button size="small" type="link" onClick={handleApplyIdToAll} style={{ padding: 0, height: 'auto', fontSize: '12px' }}>
                        Apply to {`{id}`} paths
                      </Button>
                    )}
                  </div>
                  <Input
                    prefix={<KeyOutlined style={{ color: 'var(--primary-color)' }} />}
                    value={sampleId}
                    onChange={(e) => setSampleId(e.target.value)}
                    placeholder="e.g. 019e37fd-2ec0-712c-92fc-a5c970f7f257 or 1"
                    size="large"
                    style={{ borderRadius: '8px' }}
                  />
                  <Text type="secondary" style={{ fontSize: '11px', display: 'block', marginTop: '4px', color: 'var(--text-muted)' }}>
                    Replaces route path variables like {`{id}`} during automated testing.
                  </Text>
                </Col>

                <Col xs={24} md={12}>
                  <Divider style={{ margin: '14px 0 10px 0', borderColor: 'var(--border-color)' }} />
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                    BEARER TOKEN (Optional, for write operations)
                  </Text>
                  <Input.Password
                    prefix={<LockOutlined style={{ color: 'var(--primary-color)' }} />}
                    value={bearerToken}
                    onChange={(e) => setBearerToken(e.target.value)}
                    placeholder="Enter API token for authenticated requests"
                    size="large"
                    style={{ borderRadius: '8px' }}
                  />
                  <Text type="secondary" style={{ fontSize: '11px', display: 'block', marginTop: '4px', color: 'var(--text-muted)' }}>
                    Sent in Authorization: Bearer &lt;token&gt; header for POST/PATCH/DELETE tests.
                  </Text>
                </Col>
              </Row>
            </Card>

            {/* Endpoints Table */}
            <Card 
              bordered={false} 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    2. Discovered Operations ({endpoints.length})
                  </span>
                  <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddEndpoint}>
                    Add Endpoint
                  </Button>
                </div>
              }
              bodyStyle={{ padding: 0 }}
            >
              <Table
                columns={endpointColumns}
                dataSource={endpoints}
                pagination={false}
                size="middle"
              />
            </Card>

            {/* Actions footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <Button size="large" onClick={() => setCurrentStep(0)}>
                Upload Different File
              </Button>
              <Button 
                type="primary" 
                size="large" 
                icon={<ArrowRightOutlined />} 
                loading={processing}
                onClick={handleConfirmAndRun}
                style={{ minWidth: '220px', height: '46px', fontWeight: 600 }}
              >
                Confirm & Run Tests
              </Button>
            </div>
          </Space>
        )}

        {/* STEP 2: Execution complete */}
        {currentStep === 2 && (
          <Card bordered={false} style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: isDark ? 'rgba(34, 197, 94, 0.15)' : '#ECFDF5', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 24px',
              color: '#22C55E'
            }}>
              <CheckCircleOutlined style={{ fontSize: '48px' }} />
            </div>
            <Title level={3} style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Test Execution Complete!</Title>
            <Paragraph type="secondary" style={{ fontSize: '15px', maxWidth: '420px', margin: '0 auto 32px', color: 'var(--text-secondary)' }}>
              All imported endpoints were executed and verified against your server.
            </Paragraph>
            <Space size="middle">
              <Button size="large" onClick={() => setCurrentStep(0)}>
                Import Another API
              </Button>
              <Button 
                type="primary" 
                size="large" 
                icon={<ArrowRightOutlined />} 
                onClick={() => navigate(`/report/${testRunId}`)}
              >
                View Full Test Report
              </Button>
            </Space>
          </Card>
        )}
      </motion.div>

      {/* Edit Endpoint Modal */}
      <Modal
        title="Edit Extracted Endpoint"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        centered
        width={560}
      >
        <Form form={editForm} layout="vertical" onFinish={handleSaveEndpoint}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="HTTP Method" name="method" rules={[{ required: true }]}>
                <Select size="large">
                  <Option value="GET">GET</Option>
                  <Option value="POST">POST</Option>
                  <Option value="PUT">PUT</Option>
                  <Option value="DELETE">DELETE</Option>
                  <Option value="PATCH">PATCH</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Endpoint Path" name="path" rules={[{ required: true }]}>
                <Input size="large" placeholder="/tasks/{id}" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={16}>
              <Form.Item label="Summary" name="summary">
                <Input placeholder="Short summary" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Expected Status" name="expected_status">
                <Input type="number" placeholder="200" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Request Body (JSON)" name="request_body">
            <Input.TextArea rows={4} placeholder='{"title": "Sample title"}' style={{ fontFamily: 'Consolas, monospace' }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save Changes</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UploadSpec;
