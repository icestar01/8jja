import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Business,
  TrendingUp,
  People,
  Restaurant,
  LocalHospital,
  School,
  Analytics,
} from '@mui/icons-material';

interface CompanyStats {
  totalEmployees: number;
  activeUsers: number;
  averageHealthScore: number;
  totalCaloriesTracked: number;
  consultationsScheduled: number;
  costSavings: number;
}

interface EmployeeData {
  id: string;
  name: string;
  department: string;
  healthScore: number;
  lastActivity: string;
  status: 'active' | 'inactive' | 'at-risk';
}

const EnterpriseDashboard: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'hospital' | 'company' | 'school'>('company');

  const companyStats: CompanyStats = {
    totalEmployees: 1250,
    activeUsers: 987,
    averageHealthScore: 78,
    totalCaloriesTracked: 45600,
    consultationsScheduled: 156,
    costSavings: 125000
  };

  const employeeData: EmployeeData[] = [
    {
      id: '1',
      name: '김철수',
      department: '개발팀',
      healthScore: 85,
      lastActivity: '2시간 전',
      status: 'active'
    },
    {
      id: '2',
      name: '이영희',
      department: '마케팅팀',
      healthScore: 72,
      lastActivity: '1일 전',
      status: 'active'
    },
    {
      id: '3',
      name: '박민수',
      department: '영업팀',
      healthScore: 45,
      lastActivity: '5일 전',
      status: 'at-risk'
    }
  ];

  const getStatusColor = (status: EmployeeData['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'at-risk': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: EmployeeData['status']) => {
    switch (status) {
      case 'active': return '활성';
      case 'inactive': return '비활성';
      case 'at-risk': return '주의 필요';
      default: return '알 수 없음';
    }
  };

  return (
    <Box>
      {/* Enterprise 플랜 선택 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Business sx={{ mr: 1 }} />
            Enterprise 솔루션
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant={selectedPlan === 'company' ? 'contained' : 'outlined'}
              onClick={() => setSelectedPlan('company')}
              startIcon={<Business />}
            >
              기업 복지
            </Button>
            <Button
              variant={selectedPlan === 'hospital' ? 'contained' : 'outlined'}
              onClick={() => setSelectedPlan('hospital')}
              startIcon={<LocalHospital />}
            >
              병원 시스템
            </Button>
            <Button
              variant={selectedPlan === 'school' ? 'contained' : 'outlined'}
              onClick={() => setSelectedPlan('school')}
              startIcon={<School />}
            >
              교육 기관
            </Button>
          </Box>

          <Typography variant="body1" color="text.secondary">
            Cal.com AI처럼 대규모 조직을 위한 맞춤형 건강 관리 솔루션
          </Typography>
        </CardContent>
      </Card>

      {/* 통계 대시보드 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <People color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" color="primary">
                {companyStats.totalEmployees.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                총 직원 수
              </Typography>
              <Typography variant="caption" color="success.main">
                활성 사용자: {companyStats.activeUsers}명
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" color="success.main">
                {companyStats.averageHealthScore}점
              </Typography>
              <Typography variant="body2" color="text.secondary">
                평균 건강 점수
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={companyStats.averageHealthScore} 
                color="success"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Restaurant color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" color="warning.main">
                {(companyStats.totalCaloriesTracked / 1000).toFixed(1)}K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                분석된 칼로리 (총)
              </Typography>
              <Typography variant="caption" color="text.secondary">
                이번 달: +15%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Analytics color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" color="info.main">
                ₩{(companyStats.costSavings / 1000).toFixed(0)}K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                의료비 절감 효과
              </Typography>
              <Typography variant="caption" color="success.main">
                연간 예상 절감액
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 직원 건강 현황 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              직원 건강 관리 현황
            </Typography>
            <AvatarGroup max={4}>
              <Avatar sx={{ bgcolor: 'success.main' }}>A</Avatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>B</Avatar>
              <Avatar sx={{ bgcolor: 'warning.main' }}>C</Avatar>
              <Avatar sx={{ bgcolor: 'error.main' }}>D</Avatar>
            </AvatarGroup>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>이름</TableCell>
                  <TableCell>부서</TableCell>
                  <TableCell align="center">건강 점수</TableCell>
                  <TableCell align="center">마지막 활동</TableCell>
                  <TableCell align="center">상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeData.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          {employee.healthScore}점
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={employee.healthScore}
                          sx={{ width: 50 }}
                          color={
                            employee.healthScore >= 80 ? 'success' :
                            employee.healthScore >= 60 ? 'warning' : 'error'
                          }
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">{employee.lastActivity}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getStatusText(employee.status)}
                        color={getStatusColor(employee.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* API 통합 정보 */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔌 API 통합 & 자동화
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  HR 시스템 연동
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  직원 정보 자동 동기화
                </Typography>
                <Chip label="연결됨" color="success" size="small" />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  건강검진 데이터
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  의료 기관 데이터 연동
                </Typography>
                <Chip label="설정 중" color="warning" size="small" />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  급식 시스템
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  식당 메뉴 자동 분석
                </Typography>
                <Chip label="대기 중" color="default" size="small" />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
            <Typography variant="body2" color="primary.main">
              💡 Cal.com AI처럼 완전 자동화된 건강 관리 시스템으로 
              직원 복지 비용을 연간 30% 절감할 수 있습니다.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EnterpriseDashboard; 