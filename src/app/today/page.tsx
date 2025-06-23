'use client';

import { useState } from 'react';
import Layout from '../../../components/layout/Layout';

interface FortuneData {
  overall: {
    score: number;
    message: string;
  };
  love: {
    score: number;
    message: string;
  };
  work: {
    score: number;
    message: string;
  };
  money: {
    score: number;
    message: string;
  };
  health: {
    score: number;
    message: string;
  };
  lucky: {
    color: string;
    number: number;
    direction: string;
    item: string;
  };
}

export default function TodayFortunePage() {
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [selectedAnimalSign, setSelectedAnimalSign] = useState('');
  const [fortune, setFortune] = useState<FortuneData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const zodiacSigns = [
    { id: 'aries', name: '양자리', symbol: '♈', period: '3.21~4.19' },
    { id: 'taurus', name: '황소자리', symbol: '♉', period: '4.20~5.20' },
    { id: 'gemini', name: '쌍둥이자리', symbol: '♊', period: '5.21~6.21' },
    { id: 'cancer', name: '게자리', symbol: '♋', period: '6.22~7.22' },
    { id: 'leo', name: '사자자리', symbol: '♌', period: '7.23~8.22' },
    { id: 'virgo', name: '처녀자리', symbol: '♍', period: '8.23~9.22' },
    { id: 'libra', name: '천칭자리', symbol: '♎', period: '9.23~10.23' },
    { id: 'scorpio', name: '전갈자리', symbol: '♏', period: '10.24~11.22' },
    { id: 'sagittarius', name: '사수자리', symbol: '♐', period: '11.23~12.21' },
    { id: 'capricorn', name: '염소자리', symbol: '♑', period: '12.22~1.19' },
    { id: 'aquarius', name: '물병자리', symbol: '♒', period: '1.20~2.18' },
    { id: 'pisces', name: '물고기자리', symbol: '♓', period: '2.19~3.20' },
  ];

  const animalSigns = [
    { id: 'rat', name: '쥐띠', emoji: '🐭' },
    { id: 'ox', name: '소띠', emoji: '🐮' },
    { id: 'tiger', name: '호랑이띠', emoji: '🐯' },
    { id: 'rabbit', name: '토끼띠', emoji: '🐰' },
    { id: 'dragon', name: '용띠', emoji: '🐲' },
    { id: 'snake', name: '뱀띠', emoji: '🐍' },
    { id: 'horse', name: '말띠', emoji: '🐴' },
    { id: 'goat', name: '양띠', emoji: '🐐' },
    { id: 'monkey', name: '원숭이띠', emoji: '🐵' },
    { id: 'rooster', name: '닭띠', emoji: '🐔' },
    { id: 'dog', name: '개띠', emoji: '🐕' },
    { id: 'pig', name: '돼지띠', emoji: '🐷' },
  ];

  const generateFortune = () => {
    if (!selectedZodiac || !selectedAnimalSign) return;

    setIsLoading(true);
    
    // 시뮬레이션 - 실제로는 API 호출
    setTimeout(() => {
      const fortuneData: FortuneData = {
        overall: {
          score: Math.floor(Math.random() * 5) + 1,
          message: "오늘은 전반적으로 좋은 기운이 감돌고 있습니다. 새로운 기회가 찾아올 수 있으니 긍정적인 마음으로 하루를 시작하세요."
        },
        love: {
          score: Math.floor(Math.random() * 5) + 1,
          message: "연인이 있다면 달콤한 시간을 보낼 수 있을 것 같습니다. 솔로라면 새로운 만남의 기회가 있을 수 있어요."
        },
        work: {
          score: Math.floor(Math.random() * 5) + 1,
          message: "업무에서 좋은 성과를 거둘 수 있는 날입니다. 동료들과의 협력이 특히 중요할 것 같아요."
        },
        money: {
          score: Math.floor(Math.random() * 5) + 1,
          message: "금전적으로는 안정적인 하루가 될 것 같습니다. 투자보다는 저축을 권해드립니다."
        },
        health: {
          score: Math.floor(Math.random() * 5) + 1,
          message: "건강 상태는 양호합니다. 다만 규칙적인 생활 패턴을 유지하는 것이 중요해요."
        },
        lucky: {
          color: ['보라색', '파란색', '금색'][Math.floor(Math.random() * 3)],
          number: Math.floor(Math.random() * 99) + 1,
          direction: ['동쪽', '서쪽', '남쪽', '북쪽'][Math.floor(Math.random() * 4)],
          item: ['반지', '목걸이', '향수', '지갑'][Math.floor(Math.random() * 4)]
        }
      };
      
      setFortune(fortuneData);
      setIsLoading(false);
    }, 2000);
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`text-2xl ${index < score ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-korean-serif">
              오늘의 운세
            </h1>
            <p className="text-xl text-gray-600 mb-2">{today}</p>
            <p className="text-gray-500">
              별자리와 띠를 선택해서 오늘의 운세를 확인해보세요
            </p>
          </div>

          {/* Zodiac Selection */}
          <div className="fortune-card p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              별자리 선택
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {zodiacSigns.map((sign) => (
                <button
                  key={sign.id}
                  onClick={() => setSelectedZodiac(sign.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    selectedZodiac === sign.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{sign.symbol}</div>
                  <div className="text-sm font-medium">{sign.name}</div>
                  <div className="text-xs text-gray-500">{sign.period}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Animal Sign Selection */}
          <div className="fortune-card p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              띠 선택
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-3">
              {animalSigns.map((animal) => (
                <button
                  key={animal.id}
                  onClick={() => setSelectedAnimalSign(animal.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    selectedAnimalSign === animal.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{animal.emoji}</div>
                  <div className="text-sm font-medium">{animal.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={generateFortune}
              disabled={!selectedZodiac || !selectedAnimalSign || isLoading}
              className={`btn-primary text-lg px-8 py-4 ${
                (!selectedZodiac || !selectedAnimalSign || isLoading)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {isLoading ? '운세를 분석 중...' : '오늘의 운세 보기'}
            </button>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="fortune-card p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">
                {zodiacSigns.find(z => z.id === selectedZodiac)?.name}와{' '}
                {animalSigns.find(a => a.id === selectedAnimalSign)?.name}의 
                오늘 운세를 분석하고 있습니다...
              </p>
            </div>
          )}

          {/* Fortune Results */}
          {fortune && !isLoading && (
            <div className="space-y-6">
              {/* Overall Fortune */}
              <div className="fortune-card p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  종합 운세
                </h3>
                <div className="text-center mb-4">
                  {renderStars(fortune.overall.score)}
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  {fortune.overall.message}
                </p>
              </div>

              {/* Detailed Fortune */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold text-pink-600 mb-3 text-center">
                    💕 애정운
                  </h4>
                  <div className="text-center mb-3">
                    {renderStars(fortune.love.score)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {fortune.love.message}
                  </p>
                </div>

                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold text-blue-600 mb-3 text-center">
                    💼 직장운
                  </h4>
                  <div className="text-center mb-3">
                    {renderStars(fortune.work.score)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {fortune.work.message}
                  </p>
                </div>

                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold text-green-600 mb-3 text-center">
                    💰 금전운
                  </h4>
                  <div className="text-center mb-3">
                    {renderStars(fortune.money.score)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {fortune.money.message}
                  </p>
                </div>

                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold text-red-600 mb-3 text-center">
                    🏥 건강운
                  </h4>
                  <div className="text-center mb-3">
                    {renderStars(fortune.health.score)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {fortune.health.message}
                  </p>
                </div>
              </div>

              {/* Lucky Items */}
              <div className="fortune-card p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  오늘의 행운 아이템
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🎨</div>
                    <div className="font-medium text-gray-700">행운의 색깔</div>
                    <div className="text-purple-600 font-bold">{fortune.lucky.color}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🔢</div>
                    <div className="font-medium text-gray-700">행운의 숫자</div>
                    <div className="text-blue-600 font-bold">{fortune.lucky.number}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🧭</div>
                    <div className="font-medium text-gray-700">행운의 방향</div>
                    <div className="text-green-600 font-bold">{fortune.lucky.direction}</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-lg">
                    <div className="text-2xl mb-2">✨</div>
                    <div className="font-medium text-gray-700">행운의 아이템</div>
                    <div className="text-yellow-600 font-bold">{fortune.lucky.item}</div>
                  </div>
                </div>
              </div>

              {/* Retry Button */}
              <div className="text-center">
                <button
                  onClick={() => setFortune(null)}
                  className="btn-secondary"
                >
                  다시 선택하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 