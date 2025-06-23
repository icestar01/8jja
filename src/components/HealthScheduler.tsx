import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Schedule,
  Restaurant,
  FitnessCenter,
  LocalHospital,
  Notifications,
  Person,
} from '@mui/icons-material';

interface ScheduleItem {
  id: string;
  type: 'meal' | 'workout' | 'consultation' | 'reminder';
  title: string;
  time: string;
  description: string;
  status: 'scheduled' | 'completed' | 'missed';
}

const HealthScheduler: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: '1',
      type: 'consultation',
      title: 'AI 영양사 상담',
      time: '2024-06-24 14:00',
      description: '개인 맞춤 식단 계획 상담',
      status: 'scheduled'
    },
    {
      id: '2',
      type: 'meal',
      title: '점심 식사 기록',
      time: '2024-06-24 12:30',
      description: '칼로리 분석 및 기록',
      status: 'completed'
    },
    {
      id: '3',
      type: 'workout',
      title: '유산소 운동',
      time: '2024-06-24 18:00',
      description: '30분 걷기 (520kcal 소모 목표)',
      status: 'scheduled'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    type: 'consultation' as const,
    title: '',
    time: '',
    description: ''
  });

  const getScheduleIcon = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'meal': return <Restaurant />;
      case 'workout': return <FitnessCenter />;
      case 'consultation': return <Person />;
      case 'reminder': return <Notifications />;
      default: return <Schedule />;
    }
  };

  const getScheduleColor = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'meal': return 'warning';
      case 'workout': return 'success';
      case 'consultation': return 'primary';
      case 'reminder': return 'info';
      default: return 'default';
    }
  };

  const handleAddSchedule = () => {
    const schedule: ScheduleItem = {
      id: Date.now().toString(),
      type: newSchedule.type,
      title: newSchedule.title,
      time: newSchedule.time,
      description: newSchedule.description,
      status: 'scheduled'
    };
    
    setSchedules([...schedules, schedule]);
    setIsDialogOpen(false);
    setNewSchedule({
      type: 'consultation',
      title: '',
      time: '',
      description: ''
    });
  };

  // Cal.com처럼 자동 스케줄링 제안
  const suggestOptimalTimes = () => {
    const suggestions = [
      {
        type: 'meal' as const,
        title: '아침 식사 기록',
        time: '08:00',
        description: '하루 시작 영양 체크'
      },
      {
        type: 'consultation' as const,
        title: '주간 영양사 상담',
        time: '15:00',
        description: '이번 주 식단 리뷰'
      },
      {
        type: 'workout' as const,
        title: '저녁 운동',
        time: '19:00',
        description: '일일 칼로리 목표 달성'
      }
    ];

    return suggestions;
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <Schedule sx={{ mr: 1 }} />
            건강 관리 스케줄
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsDialogOpen(true)}
          >
            일정 추가
          </Button>
        </Box>

        {/* Cal.com처럼 스마트 제안 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            💡 AI 추천 스케줄
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {suggestOptimalTimes().map((suggestion, index) => (
              <Chip
                key={index}
                label={`${suggestion.time} ${suggestion.title}`}
                color={getScheduleColor(suggestion.type)}
                variant="outlined"
                size="small"
                onClick={() => {
                  setNewSchedule({
                    type: suggestion.type,
                    title: suggestion.title,
                    time: `2024-06-24 ${suggestion.time}`,
                    description: suggestion.description
                  });
                  setIsDialogOpen(true);
                }}
              />
            ))}
          </Box>
        </Box>

        {/* 스케줄 목록 */}
        <Grid container spacing={2}>
          {schedules.map((schedule) => (
            <Grid item xs={12} key={schedule.id}>
              <Box
                sx={{
                  p: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  opacity: schedule.status === 'completed' ? 0.7 : 1
                }}
              >
                <Box sx={{ color: `${getScheduleColor(schedule.type)}.main` }}>
                  {getScheduleIcon(schedule.type)}
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {schedule.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {schedule.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(schedule.time).toLocaleString('ko-KR')}
                  </Typography>
                </Box>

                <Chip
                  label={
                    schedule.status === 'scheduled' ? '예정' :
                    schedule.status === 'completed' ? '완료' : '놓침'
                  }
                  color={
                    schedule.status === 'scheduled' ? 'primary' :
                    schedule.status === 'completed' ? 'success' : 'error'
                  }
                  size="small"
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Cal.com처럼 통계 */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            📊 이번 주 건강 관리 현황
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h4" color="success.main" textAlign="center">
                5
              </Typography>
              <Typography variant="caption" display="block" textAlign="center">
                완료된 식사 기록
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" color="primary.main" textAlign="center">
                3
              </Typography>
              <Typography variant="caption" display="block" textAlign="center">
                예정된 상담
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" color="warning.main" textAlign="center">
                85%
              </Typography>
              <Typography variant="caption" display="block" textAlign="center">
                목표 달성률
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>

      {/* 일정 추가 다이얼로그 */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>새 일정 추가</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>일정 유형</InputLabel>
              <Select
                value={newSchedule.type}
                onChange={(e) => setNewSchedule({
                  ...newSchedule,
                  type: e.target.value as ScheduleItem['type']
                })}
              >
                <MenuItem value="consultation">영양사 상담</MenuItem>
                <MenuItem value="meal">식사 기록</MenuItem>
                <MenuItem value="workout">운동</MenuItem>
                <MenuItem value="reminder">알림</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="제목"
              value={newSchedule.title}
              onChange={(e) => setNewSchedule({
                ...newSchedule,
                title: e.target.value
              })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="시간"
              type="datetime-local"
              value={newSchedule.time}
              onChange={(e) => setNewSchedule({
                ...newSchedule,
                time: e.target.value
              })}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              label="설명"
              multiline
              rows={3}
              value={newSchedule.description}
              onChange={(e) => setNewSchedule({
                ...newSchedule,
                description: e.target.value
              })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>
            취소
          </Button>
          <Button onClick={handleAddSchedule} variant="contained">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default HealthScheduler; 