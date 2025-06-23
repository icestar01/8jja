'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Coins, Sparkles, Download, Share2, RefreshCw, Star, TrendingUp, Heart } from 'lucide-react';

interface FortuneLuck {
  title: string;
  level: number;
  description: string;
  strengths: string[];
  challenges: string[];
  advice: string[];
  luckyPeriods: string[];
  careerLuck: {
    score: number;
    description: string;
  };
  wealthLuck: {
    score: number;
    description: string;
  };
  loveLuck: {
    score: number;
    description: string;
  };
  healthLuck: {
    score: number;
    description: string;
  };
  overallFortune: string;
  emoji: string;
}

const fortuneDatabase: FortuneLuck[] = [
  {
    title: '황금 용의 기운',
    level: 95,
    description: '매우 강력한 복덕운을 타고난 당신은 인생에서 큰 성취를 이룰 운명입니다. 특히 리더십과 사업 분야에서 뛰어난 재능을 발휘할 것입니다.',
    strengths: ['강한 리더십', '뛰어난 직감력', '사업 수완', '인맥 관리 능력', '위기 극복 능력'],
    challenges: ['과도한 자신감', '독단적 성향', '스트레스 관리', '세심함 부족'],
    advice: ['겸손함을 잃지 마세요', '주변 사람들의 조언을 들어보세요', '건강 관리에 신경 쓰세요', '꾸준한 노력을 게을리하지 마세요'],
    luckyPeriods: ['30대 후반', '40대 전반', '50대 중반'],
    careerLuck: {
      score: 92,
      description: '경영, 정치, 법조계에서 큰 성공을 거둘 가능성이 높습니다.'
    },
    wealthLuck: {
      score: 88,
      description: '부동산과 주식 투자에서 좋은 성과를 얻을 것입니다.'
    },
    loveLuck: {
      score: 75,
      description: '진실한 사랑을 만나지만 일과 사랑의 균형이 중요합니다.'
    },
    healthLuck: {
      score: 70,
      description: '스트레스 관리와 규칙적인 운동이 필요합니다.'
    },
    overallFortune: '인생 전반에 걸쳐 큰 성공과 부를 누릴 운명이지만, 겸손함과 건강 관리가 중요합니다.',
    emoji: '🐉'
  },
  {
    title: '봉황의 날개',
    level: 88,
    description: '예술적 재능과 창의성이 뛰어난 당신은 문화예술 분야에서 큰 성취를 이룰 것입니다. 아름다움을 추구하는 성향이 강합니다.',
    strengths: ['뛰어난 창의성', '예술적 감각', '섬세한 감성', '소통 능력', '매력적인 성격'],
    challenges: ['감정 기복', '현실성 부족', '우유부단함', '경제 관념 부족'],
    advice: ['현실적인 계획을 세우세요', '감정 관리를 잘하세요', '경제 교육을 받아보세요', '꾸준한 노력이 중요합니다'],
    luckyPeriods: ['20대 후반', '35세 전후', '45세 이후'],
    careerLuck: {
      score: 85,
      description: '예술, 디자인, 미디어 분야에서 인정받을 것입니다.'
    },
    wealthLuck: {
      score: 72,
      description: '창작 활동을 통한 수익이 점진적으로 증가할 것입니다.'
    },
    loveLuck: {
      score: 90,
      description: '로맨틱한 사랑과 행복한 결혼 생활을 누릴 것입니다.'
    },
    healthLuck: {
      score: 78,
      description: '정신 건강 관리와 규칙적인 생활이 중요합니다.'
    },
    overallFortune: '예술적 재능을 통해 명성과 사랑을 얻지만, 현실적인 계획과 꾸준함이 필요합니다.',
    emoji: '🦅'
  },
  {
    title: '거북이의 지혜',
    level: 82,
    description: '깊은 지혜와 인내력을 가진 당신은 학문과 연구 분야에서 큰 성과를 이룰 것입니다. 늦게 피는 꽃과 같은 운명입니다.',
    strengths: ['깊은 사고력', '뛰어난 인내력', '학습 능력', '신중함', '도덕성'],
    challenges: ['소극적 성향', '결정 지연', '사교성 부족', '변화 적응력'],
    advice: ['적극적으로 행동하세요', '사람들과 더 많이 소통하세요', '변화를 두려워하지 마세요', '자신감을 가지세요'],
    luckyPeriods: ['40대 이후', '50대 전반', '60대 중반'],
    careerLuck: {
      score: 88,
      description: '교육, 연구, 공무원 분야에서 안정적인 성공을 거둘 것입니다.'
    },
    wealthLuck: {
      score: 85,
      description: '꾸준한 저축과 안전한 투자로 부를 축적할 것입니다.'
    },
    loveLuck: {
      score: 70,
      description: '늦은 나이에 만나는 진실한 사랑이 평생을 함께할 것입니다.'
    },
    healthLuck: {
      score: 92,
      description: '건강한 생활 습관으로 장수할 운명입니다.'
    },
    overallFortune: '늦게 시작하지만 꾸준히 성장하여 안정적이고 풍요로운 노년을 보낼 것입니다.',
    emoji: '🐢'
  },
  {
    title: '호랑이의 용맹',
    level: 79,
    description: '강인한 의지력과 추진력을 가진 당신은 도전적인 분야에서 성공을 거둘 것입니다. 역경을 이겨내는 힘이 강합니다.',
    strengths: ['강한 의지력', '추진력', '용기', '정의감', '리더십'],
    challenges: ['성급함', '고집', '감정 조절', '협력 부족'],
    advice: ['인내심을 기르세요', '다른 사람의 의견도 들어보세요', '감정을 조절하세요', '팀워크를 중시하세요'],
    luckyPeriods: ['25-35세', '42-47세', '55세 이후'],
    careerLuck: {
      score: 83,
      description: '군인, 경찰, 스포츠, 건설업 분야에서 성공할 것입니다.'
    },
    wealthLuck: {
      score: 76,
      description: '적극적인 투자와 사업으로 부를 쌓을 수 있습니다.'
    },
    loveLuck: {
      score: 68,
      description: '열정적인 사랑을 하지만 감정 조절이 중요합니다.'
    },
    healthLuck: {
      score: 85,
      description: '강한 체력을 가지고 있지만 과로를 주의해야 합니다.'
    },
    overallFortune: '강인한 정신력으로 어려움을 극복하고 성공하지만, 인내심과 협력이 필요합니다.',
    emoji: '🐅'
  },
  {
    title: '학의 우아함',
    level: 86,
    description: '고귀한 품성과 우아함을 가진 당신은 사회적으로 존경받는 위치에 오를 것입니다. 정신적 가치를 중시하는 성향이 강합니다.',
    strengths: ['고귀한 품성', '우아함', '도덕성', '사회성', '균형감'],
    challenges: ['현실성 부족', '완벽주의', '스트레스 민감', '결정력 부족'],
    advice: ['현실적인 목표를 세우세요', '완벽을 추구하지 마세요', '스트레스 관리를 하세요', '결단력을 기르세요'],
    luckyPeriods: ['30대 초반', '40대 중반', '50대 후반'],
    careerLuck: {
      score: 87,
      description: '교육, 문화, 사회복지 분야에서 인정받을 것입니다.'
    },
    wealthLuck: {
      score: 74,
      description: '안정적인 수입과 꾸준한 저축으로 부를 축적할 것입니다.'
    },
    loveLuck: {
      score: 89,
      description: '이상적인 사랑과 행복한 가정을 이룰 것입니다.'
    },
    healthLuck: {
      score: 80,
      description: '정신 건강에 신경 쓰고 균형 잡힌 생활이 중요합니다.'
    },
    overallFortune: '고귀한 품성으로 사회적 존경을 받으며 안정적이고 품격 있는 삶을 살 것입니다.',
    emoji: '🕊️'
  }
];

export default function FortuneLuckPage() {
  const [birthDate, setBirthDate] = useState('');
  const [selectedFortune, setSelectedFortune] = useState<FortuneLuck | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateFortuneLuck = () => {
    if (!birthDate) return;
    
    setIsLoading(true);
    
    // 생년월일을 기반으로 복덕운 결정
    const birth = new Date(birthDate);
    const year = birth.getFullYear();
    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    
    const fortuneIndex = (year + month * 31 + day * 7) % fortuneDatabase.length;
    
    setTimeout(() => {
      setSelectedFortune(fortuneDatabase[fortuneIndex]);
      setIsLoading(false);
    }, 2000);
  };

  const getRandomFortune = () => {
    const randomIndex = Math.floor(Math.random() * fortuneDatabase.length);
    setSelectedFortune(fortuneDatabase[randomIndex]);
  };

  const shareFortune = async () => {
    if (!selectedFortune) return;
    
    const text = `천생복덕운: ${selectedFortune.title}\n${selectedFortune.description}\n\n8jja에서 확인하세요!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '천생복덕운',
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

  const downloadFortuneReport = () => {
    if (!selectedFortune) return;
    
    const reportText = `
천생복덕운 분석 보고서

🌟 운명의 이름: ${selectedFortune.title}
📊 복덕운 지수: ${selectedFortune.level}/100

📝 전체 운세:
${selectedFortune.description}

💪 타고난 강점:
${selectedFortune.strengths.join('\n')}

⚠️ 주의할 점:
${selectedFortune.challenges.join('\n')}

💡 인생 조언:
${selectedFortune.advice.join('\n')}

🍀 행운의 시기:
${selectedFortune.luckyPeriods.join(', ')}

📈 세부 운세:
• 사업/직업운: ${selectedFortune.careerLuck.score}점 - ${selectedFortune.careerLuck.description}
• 재물운: ${selectedFortune.wealthLuck.score}점 - ${selectedFortune.wealthLuck.description}
• 사랑운: ${selectedFortune.loveLuck.score}점 - ${selectedFortune.loveLuck.description}
• 건강운: ${selectedFortune.healthLuck.score}점 - ${selectedFortune.healthLuck.description}

🔮 종합 운세:
${selectedFortune.overallFortune}

8jja에서 제공하는 천생복덕운 분석입니다.
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `천생복덕운_${selectedFortune.title}_분석보고서.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 55) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return <TrendingUp className="h-5 w-5" />;
    if (score >= 70) return <Star className="h-5 w-5" />;
    if (score >= 55) return <Heart className="h-5 w-5" />;
    return <Sparkles className="h-5 w-5" />;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <Coins className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">천생복덕운</h1>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              태어날 때부터 타고난 당신의 복과 덕을 분석해드립니다
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* 입력 섹션 */}
          {!selectedFortune && (
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">생년월일을 입력해주세요</h2>
                <p className="text-gray-600">당신의 타고난 복덕운을 자세히 분석해드립니다</p>
              </div>
              
              <div className="max-w-md mx-auto">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-4 border-2 border-orange-200 rounded-xl text-lg text-center focus:border-orange-500 focus:outline-none transition-colors"
                />
                
                <button
                  onClick={calculateFortuneLuck}
                  disabled={!birthDate || isLoading}
                  className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-4 px-8 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      복덕운 분석 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      천생복덕운 확인하기
                    </>
                  )}
                </button>
                
                <button
                  onClick={getRandomFortune}
                  className="w-full mt-3 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  샘플 복덕운 보기
                </button>
              </div>
            </div>
          )}

          {/* 결과 섹션 */}
          {selectedFortune && (
            <div className="space-y-8">
              {/* 메인 복덕운 카드 */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedFortune.title}</h2>
                      <div className="flex items-center">
                        <span className="text-lg opacity-90 mr-2">복덕운 지수:</span>
                        <span className="text-2xl font-bold">{selectedFortune.level}/100</span>
                      </div>
                    </div>
                    <div className="text-6xl">{selectedFortune.emoji}</div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">전체 운세</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedFortune.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">타고난 강점</h3>
                      <div className="space-y-2 mb-6">
                        {selectedFortune.strengths.map((strength, index) => (
                          <div key={index} className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-2" />
                            <span className="text-gray-600">{strength}</span>
                          </div>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">주의할 점</h3>
                      <div className="space-y-2">
                        {selectedFortune.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                            <span className="text-gray-600">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">인생 조언</h3>
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-6">
                        <ul className="space-y-2">
                          {selectedFortune.advice.map((advice, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2"></div>
                              <span className="text-gray-700">{advice}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">행운의 시기</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedFortune.luckyPeriods.map((period, index) => (
                          <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                            {period}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 세부 운세 카드 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">사업/직업운</h3>
                    <div className={`flex items-center px-3 py-1 rounded-full ${getScoreColor(selectedFortune.careerLuck.score)}`}>
                      {getScoreIcon(selectedFortune.careerLuck.score)}
                      <span className="ml-1 font-bold">{selectedFortune.careerLuck.score}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{selectedFortune.careerLuck.description}</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">재물운</h3>
                    <div className={`flex items-center px-3 py-1 rounded-full ${getScoreColor(selectedFortune.wealthLuck.score)}`}>
                      {getScoreIcon(selectedFortune.wealthLuck.score)}
                      <span className="ml-1 font-bold">{selectedFortune.wealthLuck.score}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{selectedFortune.wealthLuck.description}</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">사랑운</h3>
                    <div className={`flex items-center px-3 py-1 rounded-full ${getScoreColor(selectedFortune.loveLuck.score)}`}>
                      {getScoreIcon(selectedFortune.loveLuck.score)}
                      <span className="ml-1 font-bold">{selectedFortune.loveLuck.score}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{selectedFortune.loveLuck.description}</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">건강운</h3>
                    <div className={`flex items-center px-3 py-1 rounded-full ${getScoreColor(selectedFortune.healthLuck.score)}`}>
                      {getScoreIcon(selectedFortune.healthLuck.score)}
                      <span className="ml-1 font-bold">{selectedFortune.healthLuck.score}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{selectedFortune.healthLuck.description}</p>
                </div>
              </div>

              {/* 종합 운세 */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">종합 운세</h3>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed text-center">{selectedFortune.overallFortune}</p>
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={shareFortune}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  공유하기
                </button>
                
                <button
                  onClick={downloadFortuneReport}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  보고서 저장
                </button>
                
                <button
                  onClick={() => setSelectedFortune(null)}
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