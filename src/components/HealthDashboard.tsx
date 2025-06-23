import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  LocalDining,
  DirectionsRun,
} from '@mui/icons-material';
import { FoodAnalysis } from '../App';

interface HealthDashboardProps {
  analysis: FoodAnalysis;
}

const HealthDashboard: React.FC<HealthDashboardProps> = ({ analysis }) => {
  const getDailyProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'error';
    if (percentage < 80) return 'warning';
    return 'success';
  };

  // 일일 권장량 기준
  const dailyTargets = {
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 65,
    sodium: 2000,
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalDining sx={{ mr: 1 }} />
          일일 영양 목표 달성률
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                칼로리
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {analysis.calories}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                / {dailyTargets.calories} kcal
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getDailyProgress(analysis.calories, dailyTargets.calories)}
                color={getProgressColor(getDailyProgress(analysis.calories, dailyTargets.calories))}
                sx={{ mt: 1 }}
              />
            </Box>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                단백질
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {analysis.protein}g
              </Typography>
              <Typography variant="caption" color="text.secondary">
                / {dailyTargets.protein}g
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getDailyProgress(analysis.protein, dailyTargets.protein)}
                color={getProgressColor(getDailyProgress(analysis.protein, dailyTargets.protein))}
                sx={{ mt: 1 }}
              />
            </Box>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                탄수화물
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {analysis.carbs}g
              </Typography>
              <Typography variant="caption" color="text.secondary">
                / {dailyTargets.carbs}g
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getDailyProgress(analysis.carbs, dailyTargets.carbs)}
                color={getProgressColor(getDailyProgress(analysis.carbs, dailyTargets.carbs))}
                sx={{ mt: 1 }}
              />
            </Box>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                지방
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {analysis.fat}g
              </Typography>
              <Typography variant="caption" color="text.secondary">
                / {dailyTargets.fat}g
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getDailyProgress(analysis.fat, dailyTargets.fat)}
                color={getProgressColor(getDailyProgress(analysis.fat, dailyTargets.fat))}
                sx={{ mt: 1 }}
              />
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <DirectionsRun sx={{ mr: 1 }} />
          운동 권장사항
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {analysis.calories > 500 && (
            <Chip
              label={`걷기 ${Math.round(analysis.calories / 5)}분`}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          {analysis.calories > 300 && (
            <Chip
              label={`조깅 ${Math.round(analysis.calories / 10)}분`}
              color="secondary"
              variant="outlined"
              size="small"
            />
          )}
          {analysis.calories > 400 && (
            <Chip
              label={`자전거 ${Math.round(analysis.calories / 8)}분`}
              color="info"
              variant="outlined"
              size="small"
            />
          )}
        </Box>

        <Typography variant="body2" color="text.secondary">
          💡 이 음식의 칼로리를 소모하기 위한 예상 운동량입니다
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HealthDashboard; 