import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  PhotoCamera,
  FileUpload,
  Close,
  Refresh,
} from '@mui/icons-material';

interface FoodCameraProps {
  onPhotoCapture: (imageData: string) => void;
  isAnalyzing: boolean;
}

const FoodCamera: React.FC<FoodCameraProps> = ({ onPhotoCapture, isAnalyzing }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // 후면 카메라 선호
        } 
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      alert('카메라에 접근할 수 없습니다. 파일 업로드를 사용해주세요.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
    setCapturedImage(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
      }
    }
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onPhotoCapture(capturedImage);
      stopCamera();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        onPhotoCapture(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress size={60} color="primary" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            AI가 음식을 분석하고 있습니다...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            잠시만 기다려주세요
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📸 음식 사진 촬영
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            음식 사진을 촬영하거나 갤러리에서 선택해주세요
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<PhotoCamera />}
              onClick={startCamera}
              size="large"
            >
              카메라 촬영
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<FileUpload />}
              onClick={() => fileInputRef.current?.click()}
              size="large"
            >
              파일 업로드
            </Button>
          </Box>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </CardContent>
      </Card>

      {/* 카메라 다이얼로그 */}
      <Dialog 
        open={isCameraOpen} 
        onClose={stopCamera}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={stopCamera}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              zIndex: 1,
            }}
          >
            <Close />
          </IconButton>
          
          {!capturedImage ? (
            <Box sx={{ position: 'relative' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={capturePhoto}
                  size="large"
                  sx={{
                    borderRadius: '50%',
                    width: 64,
                    height: 64,
                    minWidth: 'unset',
                  }}
                >
                  📷
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <img
                src={capturedImage}
                alt="촬영된 음식"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => setCapturedImage(null)}
                >
                  다시 촬영
                </Button>
                <Button
                  variant="contained"
                  onClick={confirmPhoto}
                >
                  분석하기
                </Button>
              </Box>
            </Box>
          )}
          
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FoodCamera; 