'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Palette, Sparkles, Download, Share2, RefreshCw } from 'lucide-react';

interface ColorFortune {
  name: string;
  hex: string;
  rgb: string;
  meaning: string;
  advice: string;
  compatibility: string[];
  avoid: string[];
  energy: string;
  chakra: string;
}

const colorDatabase: ColorFortune[] = [
  {
    name: '로열 퍼플',
    hex: '#6B46C1',
    rgb: 'rgb(107, 70, 193)',
    meaning: '고귀함과 영성을 상징하는 색상으로, 오늘 당신에게 특별한 직감과 통찰력을 가져다줍니다.',
    advice: '중요한 결정을 내려야 할 때 이 색상을 활용하세요. 보라색 액세서리나 의류를 착용하면 운이 상승합니다.',
    compatibility: ['화이트', '실버', '골드'],
    avoid: ['네온 그린', '오렌지'],
    energy: '영적 성장, 직감력 향상',
    chakra: '크라운 차크라'
  },
  {
    name: '에메랄드 그린',
    hex: '#10B981',
    rgb: 'rgb(16, 185, 129)',
    meaning: '성장과 번영을 의미하는 색상으로, 새로운 기회와 풍요로움을 끌어당깁니다.',
    advice: '새로운 프로젝트를 시작하거나 투자 결정을 할 때 이 색상의 힘을 빌려보세요.',
    compatibility: ['골드', '브라운', '크림'],
    avoid: ['레드', '핑크'],
    energy: '풍요, 성장, 치유',
    chakra: '하트 차크라'
  },
  {
    name: '선셋 오렌지',
    hex: '#F97316',
    rgb: 'rgb(249, 115, 22)',
    meaning: '열정과 창의성을 상징하며, 오늘 당신의 에너지와 활력을 극대화시켜줍니다.',
    advice: '창작 활동이나 새로운 도전에 나서기 좋은 날입니다. 오렌지색 소품을 활용해보세요.',
    compatibility: ['옐로우', '레드', '브라운'],
    avoid: ['블루', '퍼플'],
    energy: '창의성, 열정, 활력',
    chakra: '사크랄 차크라'
  },
  {
    name: '딥 블루',
    hex: '#1E40AF',
    rgb: 'rgb(30, 64, 175)',
    meaning: '평온과 지혜를 나타내는 색상으로, 마음의 안정과 명확한 사고를 도와줍니다.',
    advice: '중요한 회의나 학습에 집중해야 할 때 파란색 환경을 조성하면 효과적입니다.',
    compatibility: ['화이트', '실버', '그레이'],
    avoid: ['오렌지', '레드'],
    energy: '평온, 집중력, 소통',
    chakra: '스로트 차크라'
  },
  {
    name: '골든 옐로우',
    hex: '#F59E0B',
    rgb: 'rgb(245, 158, 11)',
    meaning: '행운과 풍요를 상징하는 색상으로, 금전운과 성공운을 높여줍니다.',
    advice: '중요한 계약이나 비즈니스 미팅이 있다면 노란색 포인트를 활용해보세요.',
    compatibility: ['골드', '브라운', '오렌지'],
    avoid: ['퍼플', '블랙'],
    energy: '풍요, 성공, 자신감',
    chakra: '솔라 플렉서스 차크라'
  },
  {
    name: '로즈 핑크',
    hex: '#EC4899',
    rgb: 'rgb(236, 72, 153)',
    meaning: '사랑과 조화를 의미하는 색상으로, 인간관계와 로맨스 운을 향상시킵니다.',
    advice: '소중한 사람과의 만남이나 데이트에서 핑크색을 활용하면 좋은 결과를 얻을 수 있습니다.',
    compatibility: ['화이트', '실버', '라벤더'],
    avoid: ['블랙', '다크 그린'],
    energy: '사랑, 조화, 감성',
    chakra: '하트 차크라'
  },
  {
    name: '미스틱 실버',
    hex: '#6B7280',
    rgb: 'rgb(107, 114, 128)',
    meaning: '직감과 신비로운 힘을 상징하며, 숨겨진 기회를 발견하게 도와줍니다.',
    advice: '새로운 정보를 얻거나 네트워킹을 할 때 실버 액세서리를 착용해보세요.',
    compatibility: ['블루', '퍼플', '화이트'],
    avoid: ['브라운', '옐로우'],
    energy: '직감, 신비, 변화',
    chakra: '서드아이 차크라'
  }
];

export default function DailyColorPage() {
  const [birthDate, setBirthDate] = useState('');
  const [selectedColor, setSelectedColor] = useState<ColorFortune | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateDailyColor = () => {
    if (!birthDate) return;
    
    setIsLoading(true);
    
    // 생년월일과 오늘 날짜를 조합하여 색상 결정
    const today = new Date();
    const birth = new Date(birthDate);
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const birthSum = birth.getDate() + birth.getMonth() + 1;
    const colorIndex = (dayOfYear + birthSum) % colorDatabase.length;
    
    setTimeout(() => {
      setSelectedColor(colorDatabase[colorIndex]);
      setIsLoading(false);
    }, 1500);
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorDatabase.length);
    setSelectedColor(colorDatabase[randomIndex]);
  };

  const shareColor = async () => {
    if (!selectedColor) return;
    
    const text = `오늘의 행운 색상: ${selectedColor.name}\n${selectedColor.meaning}\n\n8jja에서 확인하세요!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '오늘의 행운 색상',
          text: text,
          url: window.location.href
        });
      } catch (error) {
        console.log('공유 취소됨');
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다!');
    }
  };

  const downloadColorCard = () => {
    if (!selectedColor) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 600;
    
    // 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, selectedColor.hex);
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // 텍스트 추가
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('오늘의 행운 색상', 400, 100);
    
    ctx.font = 'bold 36px Arial';
    ctx.fillText(selectedColor.name, 400, 180);
    
    ctx.font = '24px Arial';
    ctx.fillStyle = '#f8f9fa';
    const lines = selectedColor.meaning.match(/.{1,30}/g) || [];
    lines.forEach((line, index) => {
      ctx.fillText(line, 400, 250 + (index * 35));
    });
    
    // 다운로드
    const link = document.createElement('a');
    link.download = `오늘의_행운_색상_${selectedColor.name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <Palette className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">오늘의 행운 색상</h1>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              당신의 생년월일과 오늘의 에너지가 만나 탄생한 특별한 색상을 만나보세요
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* 입력 섹션 */}
          {!selectedColor && (
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">생년월일을 입력해주세요</h2>
                <p className="text-gray-600">당신만의 특별한 행운 색상을 찾아드립니다</p>
              </div>
              
              <div className="max-w-md mx-auto">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-4 border-2 border-purple-200 rounded-xl text-lg text-center focus:border-purple-500 focus:outline-none transition-colors"
                />
                
                <button
                  onClick={calculateDailyColor}
                  disabled={!birthDate || isLoading}
                  className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      색상 분석 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      오늘의 행운 색상 확인하기
                    </>
                  )}
                </button>
                
                <button
                  onClick={getRandomColor}
                  className="w-full mt-3 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  랜덤 색상 보기
                </button>
              </div>
            </div>
          )}

          {/* 결과 섹션 */}
          {selectedColor && (
            <div className="space-y-8">
              {/* 색상 카드 */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div 
                  className="h-48 relative"
                  style={{ backgroundColor: selectedColor.hex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">{selectedColor.name}</h2>
                    <p className="text-lg opacity-90">{selectedColor.hex}</p>
                    <p className="text-sm opacity-75">{selectedColor.rgb}</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">색상의 의미</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{selectedColor.meaning}</p>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">활용 조언</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedColor.advice}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">에너지 & 차크라</h3>
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <p className="text-sm text-gray-500 mb-1">에너지</p>
                        <p className="font-semibold text-gray-800">{selectedColor.energy}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-500 mb-1">연결 차크라</p>
                        <p className="font-semibold text-gray-800">{selectedColor.chakra}</p>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">조화로운 색상</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedColor.compatibility.map((color, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {color}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">피해야 할 색상</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedColor.avoid.map((color, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={shareColor}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  공유하기
                </button>
                
                <button
                  onClick={downloadColorCard}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  이미지 저장
                </button>
                
                <button
                  onClick={() => setSelectedColor(null)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  다시 하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 