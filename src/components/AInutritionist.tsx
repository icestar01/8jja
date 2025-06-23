import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import {
  Mic,
  MicOff,
  Phone,
  PhoneDisabled,
  Chat,
  Schedule,
  Close,
} from '@mui/icons-material';

interface AInutritionistProps {
  onScheduleConsultation?: () => void;
}

const AInutritionist: React.FC<AInutritionistProps> = ({ onScheduleConsultation }) => {
  const [isListening, setIsListening] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    speaker: 'user' | 'ai';
    message: string;
    timestamp: Date;
  }>>([]);

  // 음성 인식 시작/중지
  const toggleVoiceRecording = () => {
    if (isListening) {
      setIsListening(false);
      // 음성 인식 중지 로직
    } else {
      setIsListening(true);
      // 음성 인식 시작 로직
      simulateVoiceInput();
    }
  };

  // 음성 입력 시뮬레이션 (실제로는 Web Speech API 사용)
  const simulateVoiceInput = () => {
    setTimeout(() => {
      const userMessage = "오늘 점심에 김치볶음밥을 먹었는데 괜찮을까요?";
      setConversation(prev => [...prev, {
        speaker: 'user',
        message: userMessage,
        timestamp: new Date()
      }]);
      
      // AI 응답 시뮬레이션
      setTimeout(() => {
        const aiResponse = "김치볶음밥은 520칼로리 정도입니다. 나트륨이 다소 높으니 저녁에는 채소 위주의 가벼운 식사를 권장드려요. 운동 계획이 있으시다면 30분 정도 걷기 운동을 해보시는 것도 좋겠습니다.";
        setConversation(prev => [...prev, {
          speaker: 'ai',
          message: aiResponse,
          timestamp: new Date()
        }]);
        setIsListening(false);
      }, 2000);
    }, 1500);
  };

  // 전화 상담 시작
  const startPhoneCall = () => {
    setIsCalling(true);
    setIsCallDialogOpen(true);
    
    // 전화 연결 시뮬레이션
    setTimeout(() => {
      setConversation([{
        speaker: 'ai',
        message: "안녕하세요! 칼로리 AI 영양사입니다. 오늘 식단에 대해 상담받고 싶으시다고 하셨는데, 어떤 도움이 필요하신가요?",
        timestamp: new Date()
      }]);
    }, 1000);
  };

  // 전화 상담 종료
  const endPhoneCall = () => {
    setIsCalling(false);
    setIsCallDialogOpen(false);
    setConversation([]);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar 
            sx={{ 
              width: 60, 
              height: 60, 
              bgcolor: 'primary.main',
              mr: 2 
            }}
          >
            🤖
          </Avatar>
          <Box>
            <Typography variant="h6">
              AI 영양사 상담
            </Typography>
            <Typography variant="body2" color="text.secondary">
              24시간 언제든지 영양 상담을 받아보세요
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip 
                label="온라인" 
                color="success" 
                size="small" 
                sx={{ mr: 1 }}
              />
              <Chip 
                label="즉시 응답" 
                color="primary" 
                size="small" 
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={isListening ? <MicOff /> : <Mic />}
            onClick={toggleVoiceRecording}
            color={isListening ? "secondary" : "primary"}
            disabled={isCalling}
          >
            {isListening ? "음성 인식 중..." : "음성으로 질문하기"}
          </Button>

          <Button
            variant="outlined"
            startIcon={<Phone />}
            onClick={startPhoneCall}
            disabled={isCalling}
          >
            전화 상담 시작
          </Button>

          <Button
            variant="outlined"
            startIcon={<Schedule />}
            onClick={onScheduleConsultation}
          >
            상담 예약하기
          </Button>
        </Box>

        {/* 대화 내역 */}
        {conversation.length > 0 && (
          <Box sx={{ mt: 3, maxHeight: 300, overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              상담 내역
            </Typography>
            {conversation.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.speaker === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: msg.speaker === 'user' ? 'primary.main' : 'grey.100',
                    color: msg.speaker === 'user' ? 'white' : 'text.primary'
                  }}
                >
                  <Typography variant="body2">
                    {msg.message}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      opacity: 0.7,
                      display: 'block',
                      mt: 0.5 
                    }}
                  >
                    {msg.timestamp.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>

      {/* 전화 상담 다이얼로그 */}
      <Dialog
        open={isCallDialogOpen}
        onClose={endPhoneCall}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <IconButton
            onClick={endPhoneCall}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <Close />
          </IconButton>

          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              bgcolor: 'primary.main',
              mx: 'auto',
              mb: 2
            }}
          >
            🤖
          </Avatar>

          <Typography variant="h5" gutterBottom>
            AI 영양사와 통화 중
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            전화: +82 (02) 1234-5678
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Chip 
              label={isCalling ? "통화 중" : "연결 중"} 
              color="success"
              sx={{ fontSize: '1.1rem', py: 2 }}
            />
          </Box>

          <Button
            variant="contained"
            color="error"
            startIcon={<PhoneDisabled />}
            onClick={endPhoneCall}
            size="large"
            sx={{ borderRadius: '50px' }}
          >
            통화 종료
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            💡 Cal.com AI처럼 자연스러운 AI 음성 상담
          </Typography>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AInutritionist; 