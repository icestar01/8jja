import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import FoodCamera from './components/FoodCamera';
import AnalysisResult from './components/AnalysisResult';
import HealthDashboard from './components/HealthDashboard';
import AInutritionist from './components/AInutritionist';
import HealthScheduler from './components/HealthScheduler';
import EnterpriseDashboard from './components/EnterpriseDashboard';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FF9800',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

export interface FoodAnalysis {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  healthScore: number;
  diabeticFriendly: boolean;
  bloodPressureFriendly: boolean;
  recommendations: string[];
}

function App() {
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePhotoCapture = async (imageData: string) => {
    setIsAnalyzing(true);
    
    try {
      // 실제 AI 서비스를 사용하여 음식 분석
      const { analyzeFoodImage } = await import('./services/foodAnalysisService');
      const analysisResult = await analyzeFoodImage(imageData);
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('음식 분석 실패:', error);
      // 에러 발생 시 기본 데모 데이터 사용
      const mockAnalysis: FoodAnalysis = {
        foodName: "음식 인식 실패",
        calories: 400,
        protein: 15,
        carbs: 50,
        fat: 12,
        fiber: 3,
        sugar: 8,
        sodium: 600,
        healthScore: 70,
        diabeticFriendly: true,
        bloodPressureFriendly: true,
        recommendations: [
          "음식을 정확히 인식하지 못했습니다.",
          "더 선명한 사진으로 다시 시도해보세요.",
          "음식이 잘 보이도록 조명을 조절해주세요."
        ]
      };
      setAnalysis(mockAnalysis);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🍽️ 칼로리 AI 분석기
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom color="primary">
            음식 사진으로 간편한 칼로리 분석
          </Typography>
          <Typography variant="body1" color="text.secondary">
            사진 한 장으로 칼로리, 영양성분, 건강 지수를 확인하세요
          </Typography>
        </Box>

        <FoodCamera 
          onPhotoCapture={handlePhotoCapture}
          isAnalyzing={isAnalyzing}
        />

        {analysis && (
          <Box sx={{ mt: 4 }}>
            <AnalysisResult analysis={analysis} />
            <Box sx={{ mt: 3 }}>
              <HealthDashboard analysis={analysis} />
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App; 