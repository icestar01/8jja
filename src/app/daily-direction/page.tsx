'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Compass, Sparkles, Download, Share2, RefreshCw, Navigation, MapPin } from 'lucide-react';

interface DirectionFortune {
  direction: string;
  angle: string;
  meaning: string;
  advice: string;
  activities: string[];
  avoid: string[];
  element: string;
  energy: string;
  color: string;
  emoji: string;
}

const directionDatabase: DirectionFortune[] = [
  {
    direction: '동쪽',
    angle: '90°',
    meaning: '새로운 시작과 희망을 상징하는 방향으로, 오늘 당신에게 새로운 기회와 활력을 가져다줍니다.',
    advice: '새로운 프로젝트를 시작하거나 중요한 결정을 내릴 때 동쪽을 향해 앉아보세요. 아침 햇살과 함께 긍정적인 에너지를 받을 수 있습니다.',
    activities: ['새로운 계획 세우기', '운동하기', '공부하기', '미팅 참석'],
    avoid: ['과거에 얽매이기', '부정적 생각', '게으름'],
    element: '목(木)',
    energy: '성장, 발전',
    color: '초록색',
    emoji: '🌅'
  },
  {
    direction: '서쪽',
    angle: '270°',
    meaning: '완성과 성취를 의미하는 방향으로, 진행 중인 일들을 마무리하고 결실을 맺기에 좋은 방향입니다.',
    advice: '중요한 계약이나 협상을 할 때 서쪽을 향해 앉으면 좋은 결과를 얻을 수 있습니다. 저녁 시간에 서쪽 하늘을 바라보며 감사의 마음을 가져보세요.',
    activities: ['계약 체결', '협상하기', '결정 내리기', '마무리 작업'],
    avoid: ['새로운 시작', '성급한 판단', '미완성 상태 방치'],
    element: '금(金)',
    energy: '완성, 성취',
    color: '흰색',
    emoji: '🌇'
  },
  {
    direction: '남쪽',
    angle: '180°',
    meaning: '열정과 명예를 상징하는 방향으로, 당신의 재능과 능력을 세상에 드러내기에 최적의 방향입니다.',
    advice: '발표나 프레젠테이션을 할 때 남쪽을 향해 서면 자신감이 넘치고 좋은 인상을 남길 수 있습니다. 정오의 태양 에너지를 받아보세요.',
    activities: ['발표하기', '창작 활동', '리더십 발휘', '사교 활동'],
    avoid: ['소극적 태도', '숨어있기', '자신감 부족'],
    element: '화(火)',
    energy: '열정, 명예',
    color: '빨간색',
    emoji: '☀️'
  },
  {
    direction: '북쪽',
    angle: '0°',
    meaning: '지혜와 깊이를 나타내는 방향으로, 깊은 사고와 내면의 성찰이 필요한 일에 도움을 줍니다.',
    advice: '중요한 공부나 연구를 할 때 북쪽을 향해 앉으면 집중력이 높아집니다. 조용한 시간에 북쪽을 바라보며 명상해보세요.',
    activities: ['공부하기', '연구하기', '명상하기', '계획 세우기'],
    avoid: ['성급한 행동', '감정적 결정', '산만함'],
    element: '수(水)',
    energy: '지혜, 깊이',
    color: '검은색',
    emoji: '🌌'
  },
  {
    direction: '동북쪽',
    angle: '45°',
    meaning: '변화와 전환을 의미하는 방향으로, 인생의 중요한 변곡점에서 올바른 선택을 도와줍니다.',
    advice: '인생의 중요한 결정을 내려야 할 때 동북쪽을 향해 깊이 생각해보세요. 새벽 시간에 이 방향을 바라보며 직감을 믿어보세요.',
    activities: ['인생 계획 세우기', '진로 결정', '이사 준비', '새로운 도전'],
    avoid: ['현상 유지', '안주하기', '변화 거부'],
    element: '토(土)',
    energy: '변화, 전환',
    color: '노란색',
    emoji: '🔄'
  },
  {
    direction: '동남쪽',
    angle: '135°',
    meaning: '풍요와 번영을 상징하는 방향으로, 재물운과 인간관계 운을 높여주는 길한 방향입니다.',
    advice: '비즈니스 미팅이나 투자 상담을 할 때 동남쪽을 향해 앉으면 좋은 기회를 잡을 수 있습니다. 이른 오후에 이 방향의 바람을 맞아보세요.',
    activities: ['투자하기', '사업 계획', '네트워킹', '쇼핑하기'],
    avoid: ['무분별한 지출', '인간관계 소홀', '기회 놓치기'],
    element: '목(木)',
    energy: '풍요, 번영',
    color: '연두색',
    emoji: '💰'
  },
  {
    direction: '서남쪽',
    angle: '225°',
    meaning: '안정과 조화를 나타내는 방향으로, 가족과 연인 관계를 돈독하게 하고 마음의 평화를 가져다줍니다.',
    advice: '가족이나 연인과 중요한 대화를 나눌 때 서남쪽을 향해 앉으면 서로의 마음이 통합니다. 오후 늦은 시간에 이 방향을 바라보며 감사함을 느껴보세요.',
    activities: ['가족 시간', '연인과 데이트', '화해하기', '휴식 취하기'],
    avoid: ['갈등 조장', '스트레스', '과로'],
    element: '토(土)',
    energy: '안정, 조화',
    color: '갈색',
    emoji: '🏠'
  },
  {
    direction: '서북쪽',
    angle: '315°',
    meaning: '권위와 리더십을 상징하는 방향으로, 중요한 결정권자나 상급자와의 만남에서 도움을 줍니다.',
    advice: '상사와의 면담이나 중요한 회의에 참석할 때 서북쪽을 의식하면 좋은 인상을 남길 수 있습니다. 저녁 시간에 이 방향을 바라보며 목표를 다짐해보세요.',
    activities: ['면접 보기', '승진 면담', '리더십 발휘', '목표 설정'],
    avoid: ['권위에 도전', '무례한 행동', '목표 없는 행동'],
    element: '금(金)',
    energy: '권위, 리더십',
    color: '회색',
    emoji: '👑'
  }
];

export default function DailyDirectionPage() {
  const [birthDate, setBirthDate] = useState('');
  const [selectedDirection, setSelectedDirection] = useState<DirectionFortune | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateDailyDirection = () => {
    if (!birthDate) return;
    
    setIsLoading(true);
    
    // 생년월일과 오늘 날짜를 조합하여 방향 결정
    const today = new Date();
    const birth = new Date(birthDate);
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const birthSum = birth.getDate() + birth.getMonth() + 1;
    const directionIndex = (dayOfYear + birthSum) % directionDatabase.length;
    
    setTimeout(() => {
      setSelectedDirection(directionDatabase[directionIndex]);
      setIsLoading(false);
    }, 1500);
  };

  const getRandomDirection = () => {
    const randomIndex = Math.floor(Math.random() * directionDatabase.length);
    setSelectedDirection(directionDatabase[randomIndex]);
  };

  const shareDirection = async () => {
    if (!selectedDirection) return;
    
    const text = `오늘의 행운 방향: ${selectedDirection.direction}\n${selectedDirection.meaning}\n\n8jja에서 확인하세요!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '오늘의 행운 방향',
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

  const downloadDirectionGuide = () => {
    if (!selectedDirection) return;
    
    const guideText = `
오늘의 행운 방향: ${selectedDirection.direction} (${selectedDirection.angle})

📍 방향의 의미:
${selectedDirection.meaning}

💡 활용 조언:
${selectedDirection.advice}

✅ 추천 활동:
${selectedDirection.activities.join('\n')}

❌ 피해야 할 것:
${selectedDirection.avoid.join('\n')}

🌍 오행: ${selectedDirection.element}
⚡ 에너지: ${selectedDirection.energy}
🎨 상징 색상: ${selectedDirection.color}

8jja에서 제공하는 행운 방향 가이드입니다.
    `;
    
    const blob = new Blob([guideText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `오늘의_행운_방향_${selectedDirection.direction}_가이드.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <Compass className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">오늘의 행운 방향</h1>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              당신에게 행운을 가져다줄 특별한 방향을 찾아보세요
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* 입력 섹션 */}
          {!selectedDirection && (
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">생년월일을 입력해주세요</h2>
                <p className="text-gray-600">당신만의 특별한 행운 방향을 찾아드립니다</p>
              </div>
              
              <div className="max-w-md mx-auto">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-4 border-2 border-indigo-200 rounded-xl text-lg text-center focus:border-indigo-500 focus:outline-none transition-colors"
                />
                
                <button
                  onClick={calculateDailyDirection}
                  disabled={!birthDate || isLoading}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      방향 분석 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      오늘의 행운 방향 확인하기
                    </>
                  )}
                </button>
                
                <button
                  onClick={getRandomDirection}
                  className="w-full mt-3 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  랜덤 방향 보기
                </button>
              </div>
            </div>
          )}

          {/* 결과 섹션 */}
          {selectedDirection && (
            <div className="space-y-8">
              {/* 방향 카드 */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedDirection.direction}</h2>
                      <p className="text-lg opacity-90">{selectedDirection.angle}</p>
                    </div>
                    <div className="text-6xl">{selectedDirection.emoji}</div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">방향의 의미</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{selectedDirection.meaning}</p>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">활용 조언</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{selectedDirection.advice}</p>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-xl p-4 text-center">
                          <Navigation className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 mb-1">오행</p>
                          <p className="font-semibold text-gray-800">{selectedDirection.element}</p>
                        </div>
                        <div className="bg-indigo-50 rounded-xl p-4 text-center">
                          <Sparkles className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 mb-1">에너지</p>
                          <p className="font-semibold text-gray-800">{selectedDirection.energy}</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 text-center">
                          <MapPin className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 mb-1">상징 색상</p>
                          <p className="font-semibold text-gray-800">{selectedDirection.color}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">추천 활동</h3>
                      <div className="bg-green-50 rounded-xl p-4 mb-6">
                        <ul className="space-y-2">
                          {selectedDirection.activities.map((activity, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                              <span className="text-gray-700">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">피해야 할 것</h3>
                      <div className="bg-red-50 rounded-xl p-4">
                        <ul className="space-y-2">
                          {selectedDirection.avoid.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 나침반 시각화 */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">방향 나침반</h3>
                <div className="flex justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50"></div>
                    <div className="absolute inset-4 rounded-full border-2 border-gray-300"></div>
                    
                    {/* 방향 표시 */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-600">N</div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-600">S</div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-bold text-gray-600">E</div>
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm font-bold text-gray-600">W</div>
                    
                    {/* 행운 방향 표시 */}
                    <div 
                      className="absolute w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${selectedDirection.angle}) translateY(-80px) rotate(-${selectedDirection.angle})`
                      }}
                    >
                      ★
                    </div>
                    
                    {/* 중심점 */}
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-indigo-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
                <p className="text-center text-gray-600 mt-4">
                  ★ 표시가 오늘의 행운 방향 <strong>{selectedDirection.direction}</strong>입니다
                </p>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={shareDirection}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  공유하기
                </button>
                
                <button
                  onClick={downloadDirectionGuide}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  가이드 저장
                </button>
                
                <button
                  onClick={() => setSelectedDirection(null)}
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