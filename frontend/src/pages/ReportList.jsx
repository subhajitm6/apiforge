import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Tag, Button, Space, Input, Row, Col, Popconfirm, message, Select } from 'antd';
import { 
  SearchOutlined, 
  ArrowRightOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const { Title, Text } = Typography;
const { Option } = Select;

const ReportList = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/test-runs');
      setReports(res.data);
    } catch (err) {
      console.error('Failed to fetch reports', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (runId) => {
    try {
      await axios.delete(`/api/test-report/${runId}`);
      message.success('Test report deleted successfully');
      fetchReports();
    } catch (err) {
      console.error('Failed to delete report', err);
      message.error('Failed to delete report');
    }
  };

  const columns = [
    {
      title: 'SPECIFICATION',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (text) => (
        <Space size={12}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: isDark ? 'rgba(139, 131, 255, 0.12)' : '#F1F0FF', 
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-color)'
          }}>
            <FileTextOutlined style={{ fontSize: '16px' }} />
          </div>
          <div>
            <Text strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '13px' }}>
              {text}
            </Text>
            <Text style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              OpenAPI / REST Spec
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'EXECUTED AT',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <Space size={6} style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
          <ClockCircleOutlined style={{ fontSize: '12px' }} />
          <span>{date}</span>
        </Space>
      )
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      render: (val) => (
        <span style={{ 
          fontFamily: "'JetBrains Mono', monospace", 
          fontWeight: 600, 
          color: 'var(--text-primary)' 
        }}>
          {val}
        </span>
      )
    },
    {
      title: 'PASSED',
      dataIndex: 'passed',
      key: 'passed',
      align: 'center',
      render: (val) => (
        <Tag 
          style={{ 
            borderRadius: '4px', 
            fontWeight: 600, 
            fontFamily: "'JetBrains Mono', monospace",
            backgroundColor: isDark ? 'rgba(53, 201, 138, 0.12)' : '#E6F8F0',
            color: '#35C98A',
            border: 'none',
            padding: '1px 8px'
          }}
        >
          {val}
        </Tag>
      ),
    },
    {
      title: 'FAILED',
      dataIndex: 'failed',
      key: 'failed',
      align: 'center',
      render: (val) => (
        <Tag 
          style={{ 
            borderRadius: '4px', 
            fontWeight: 600, 
            fontFamily: "'JetBrains Mono', monospace",
            backgroundColor: val > 0 
              ? (isDark ? 'rgba(241, 111, 120, 0.12)' : '#FDE8E9')
              : 'transparent',
            color: val > 0 ? '#F16F78' : 'var(--text-muted)',
            border: 'none',
            padding: '1px 8px'
          }}
        >
          {val}
        </Tag>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const isSuccess = status === 'Success';
        return (
          <Tag 
            icon={isSuccess ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            style={{ 
              borderRadius: '6px', 
              padding: '2px 8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '11px',
              letterSpacing: '0.3px',
              backgroundColor: isSuccess 
                ? (isDark ? 'rgba(53, 201, 138, 0.15)' : '#DCFCE7') 
                : (isDark ? 'rgba(241, 111, 120, 0.15)' : '#FEE2E2'),
              color: isSuccess ? '#35C98A' : '#F16F78'
            }}
          >
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Space size={8}>
          <Button 
            type="primary" 
            size="small"
            icon={<ArrowRightOutlined />} 
            style={{ 
              borderRadius: '6px', 
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: 'var(--primary-color)',
              color: '#FFFFFF',
              border: 'none',
              padding: '0 12px',
              height: '28px',
              display: 'inline-flex',
              alignItems: 'center',
              boxShadow: 'none'
            }}
            onClick={() => navigate(`/report/${record.id}`)}
          >
            View Report
          </Button>
          <Popconfirm
            title="Delete test report?"
            description="Are you sure you want to delete this report?"
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true, size: 'small' }}
            cancelButtonProps={{ size: 'small' }}
          >
            <Button 
              type="text" 
              danger 
              size="small"
              icon={<DeleteOutlined />} 
              style={{ borderRadius: '6px', height: '28px' }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredReports = reports.filter(item => {
    const matchesSearch = (item.fileName || '').toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status.toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: '1280px', margin: '0 auto' }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '24px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div>
          <Title level={3} style={{ fontWeight: 700, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            Test Reports
          </Title>
          <Text style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Complete audit trail of automated API test runs and execution logs.
          </Text>
        </div>
        <Space size={10}>
          <Input 
            placeholder="Search specifications..." 
            prefix={<SearchOutlined style={{ color: 'var(--text-muted)' }} />} 
            style={{ width: '220px', borderRadius: '6px', fontSize: '13px' }}
            onChange={e => setSearchText(e.target.value)}
            allowClear
          />
          <Select 
            value={statusFilter} 
            onChange={setStatusFilter} 
            style={{ width: '130px' }}
          >
            <Option value="ALL">All Status</Option>
            <Option value="SUCCESS">Passed</Option>
            <Option value="FAILED">Failed</Option>
          </Select>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={fetchReports}
            style={{ borderRadius: '6px' }}
          />
        </Space>
      </div>

      <Card 
        bordered={false} 
        bodyStyle={{ padding: 0 }}
        style={{ 
          borderRadius: '8px', 
          border: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}
      >
        <Table 
          columns={columns} 
          dataSource={filteredReports} 
          loading={loading}
          pagination={{ 
            pageSize: 10, 
            showSizeChanger: false,
            style: { padding: '16px 20px', margin: 0 }
          }}
          rowKey="id"
          size="middle"
        />
      </Card>
    </motion.div>
  );
};

export default ReportList;
