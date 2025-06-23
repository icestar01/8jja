'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Calendar, Star, Gift, Sparkles, TrendingUp, Heart, Briefcase, Home, Crown, Globe } from 'lucide-react';

interface NewYearFortuneResult {
  totalFortune: {
    score: number;
    title: string;
    description: string;
    advice: string;
  };
  detailedFortunes: {
    wealth: { score: number; description: string; advice: string };
    love: { score: number; description: string; advice: string };
    career: { score: number; description: string; advice: string };
    health: { score: number; description: string; advice: string };
    family: { score: number; description: string; advice: string };
    study: { score: number; description: string; advice: string };
  };
  monthlyHighlights: Array<{
    month: number;
    title: string;
    description: string;
  }>;
  luckyItems: {
    color: string;
    number: number;
    direction: string;
    item: string;
  };
  yearKeyword: string;
}

export default function NewYearPage() {
  const [result, setResult] = useState<NewYearFortuneResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');

  const generateNewYearFortune = () => {
    if (!birthDate || !name) {
      alert('이름과 생년월일을 입력해 주세요.');
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const birthYear = parseInt(birthDate.substring(0, 4));
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
      const nameValue = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const seed = birthYear + nameValue + currentYear;
      
      // 총운 계산
      const totalScore = (seed % 40) + 60; // 60-100점
      const totalFortune = {
        score: totalScore,
        title: getTotalFortuneTitle(totalScore),
        description: getTotalFortuneDescription(totalScore, name),
        advice: getTotalFortuneAdvice(totalScore)
      };
      
      // 분야별 운세 계산
      const detailedFortunes = {
        wealth: calculateDetailedFortune(seed * 2, '재물운'),
        love: calculateDetailedFortune(seed * 3, '애정운'),
        career: calculateDetailedFortune(seed * 5, '직업운'),
        health: calculateDetailedFortune(seed * 7, '건강운'),
        family: calculateDetailedFortune(seed * 11, '가족운'),
        study: calculateDetailedFortune(seed * 13, '학업운')
      };
      
      // 월별 하이라이트
      const monthlyHighlights = generateMonthlyHighlights(seed);
      
      // 행운 아이템
      const luckyItems = {
        color: getLuckyColor(seed),
        number: (seed % 9) + 1,
        direction: getLuckyDirection(seed),
        item: getLuckyItem(seed)
      };
      
      // 올해의 키워드
      const yearKeyword = getYearKeyword(seed, age);
      
      setResult({
        totalFortune,
        detailedFortunes,
        monthlyHighlights,
        luckyItems,
        yearKeyword
      });
      setIsGenerating(false);
    }, 2500);
  };

  const getTotalFortuneTitle = (score: number): string => {
    if (score >= 90) return "🌟 최고의 해";
    if (score >= 80) return "🎯 발전의 해";
    if (score >= 70) return "🌱 성장의 해";
    return "🔄 변화의 해";
  };

  const getTotalFortuneDescription = (score: number, name: string): string => {
    if (score >= 90) {
      return `${name}님에게 2024년은 그동안의 노력이 빛을 발하는 최고의 한 해가 될 것입니다. 모든 일이 순조롭게 풀리며, 새로운 기회들이 연이어 찾아올 것입니다.`;
    } else if (score >= 80) {
      return `${name}님의 2024년은 꾸준한 발전과 성과를 이루는 해가 될 것입니다. 목표를 향해 한 걸음씩 나아가며 의미 있는 성취를 얻을 수 있을 것입니다.`;
    } else if (score >= 70) {
      return `${name}님에게 2024년은 새로운 것을 배우고 성장하는 값진 한 해가 될 것입니다. 도전을 통해 더욱 강해지는 자신을 발견하게 될 것입니다.`;
    } else {
      return `${name}님의 2024년은 변화와 적응의 해가 될 것입니다. 어려움이 있더라도 이를 통해 더욱 단단해지고 지혜로워질 것입니다.`;
    }
  };

  const getTotalFortuneAdvice = (score: number): string => {
    if (score >= 90) return "현재의 좋은 흐름을 유지하며, 감사하는 마음을 잊지 마세요.";
    if (score >= 80) return "목표를 명확히 하고 꾸준히 노력한다면 더 큰 성과를 얻을 수 있습니다.";
    if (score >= 70) return "새로운 도전을 두려워하지 말고, 배움의 자세를 유지하세요.";
    return "어려운 상황도 성장의 기회로 받아들이며, 긍정적인 마음가짐을 유지하세요.";
  };

  const calculateDetailedFortune = (seed: number, category: string) => {
    const score = (seed % 35) + 65; // 65-100점
    return {
      score,
      description: getDetailedDescription(score, category),
      advice: getDetailedAdvice(score, category)
    };
  };

  const getDetailedDescription = (score: number, category: string): string => {
    const descriptions = {
      재물운: {
        high: "투자와 부업에서 좋은 결과를 얻을 수 있는 시기입니다. 금전 관리에 신중하다면 재정 상황이 크게 개선될 것입니다.",
        medium: "꾸준한 노력으로 안정적인 수입을 유지할 수 있습니다. 무리한 투자보다는 안전한 저축을 우선하세요.",
        low: "지출을 조절하고 계획적인 소비가 필요한 시기입니다. 급한 투자나 큰 지출은 피하는 것이 좋겠습니다."
      },
      애정운: {
        high: "새로운 인연을 만나거나 기존 관계가 한층 깊어질 수 있는 시기입니다. 진실한 마음으로 다가가면 좋은 결과가 있을 것입니다.",
        medium: "안정적인 관계를 유지할 수 있습니다. 상대방에 대한 이해와 배려가 관계 발전의 열쇠가 될 것입니다.",
        low: "오해나 갈등이 생길 수 있으니 대화를 통해 문제를 해결하려 노력하세요. 급하게 결정하지 말고 시간을 두고 생각해보세요."
      },
      직업운: {
        high: "승진이나 이직의 기회가 찾아올 수 있습니다. 평소 실력을 발휘할 수 있는 좋은 기회들이 연이어 나타날 것입니다.",
        medium: "현재 업무에서 인정받을 수 있는 성과를 낼 수 있습니다. 꾸준한 노력이 좋은 평가로 이어질 것입니다.",
        low: "업무에서 스트레스를 받을 수 있지만, 이를 통해 더욱 성장할 수 있는 기회로 삼으세요. 동료들과의 협력이 중요합니다."
      },
      건강운: {
        high: "전반적으로 건강한 상태를 유지할 수 있습니다. 꾸준한 운동과 규칙적인 생활로 더욱 활력 넘치는 한 해가 될 것입니다.",
        medium: "큰 건강상의 문제는 없지만, 스트레스 관리와 충분한 휴식이 필요합니다. 정기 검진도 잊지 마세요.",
        low: "작은 몸의 신호도 놓치지 말고 관리해야 합니다. 무리하지 말고 충분한 휴식을 취하며 건강을 우선시하세요."
      },
      가족운: {
        high: "가족 간의 화목함이 더욱 깊어지고, 서로에게 큰 힘이 되는 시간을 보낼 수 있습니다. 가족 여행이나 모임이 특히 의미 있을 것입니다.",
        medium: "평온한 가정 분위기를 유지할 수 있습니다. 가족들과 더 많은 시간을 보내려 노력한다면 더욱 좋은 관계가 될 것입니다.",
        low: "가족 간에 작은 갈등이 있을 수 있지만, 대화와 이해를 통해 해결할 수 있습니다. 먼저 다가가는 따뜻한 마음이 필요합니다."
      },
      학업운: {
        high: "집중력이 높아져 학습 효과가 매우 좋을 것입니다. 새로운 분야의 공부나 자격증 취득에도 좋은 결과를 얻을 수 있습니다.",
        medium: "꾸준한 노력으로 원하는 성과를 얻을 수 있습니다. 계획적인 학습과 복습을 통해 실력을 쌓아가세요.",
        low: "집중력이 떨어질 수 있으니 학습 환경을 정비하고 체계적인 계획을 세우는 것이 중요합니다. 조급해하지 말고 차근차근 진행하세요."
      }
    };
    
    const level = score >= 85 ? 'high' : score >= 75 ? 'medium' : 'low';
    return descriptions[category as keyof typeof descriptions][level];
  };

  const getDetailedAdvice = (score: number, category: string): string => {
    const advices = {
      재물운: ["계획적인 소비와 저축", "신중한 투자 검토", "가계부 작성 습관"],
      애정운: ["진솔한 대화 시간 늘리기", "상대방 입장에서 생각하기", "작은 관심과 배려 표현"],
      직업운: ["업무 역량 강화", "네트워킹 확대", "새로운 기술 습득"],
      건강운: ["규칙적인 운동", "균형 잡힌 식단", "충분한 수면"],
      가족운: ["가족과의 시간 늘리기", "서로의 의견 존중", "함께하는 활동 계획"],
      학업운: ["집중력 향상 훈련", "체계적인 학습 계획", "꾸준한 복습"]
    };
    
    const categoryAdvices = advices[category as keyof typeof advices];
    const randomIndex = Math.abs(score) % categoryAdvices.length;
    return categoryAdvices[randomIndex];
  };

  const generateMonthlyHighlights = (seed: number) => {
    const highlights = [
      { month: 2, title: "새로운 시작", description: "봄의 시작과 함께 새로운 계획을 세우기 좋은 시기" },
      { month: 4, title: "관계 발전", description: "주변 사람들과의 관계가 더욱 깊어지는 시간" },
      { month: 6, title: "성과 수확", description: "그동안의 노력이 결실을 맺는 의미 있는 달" },
      { month: 8, title: "휴식과 재충전", description: "여름휴가와 함께 에너지를 재충전하는 시기" },
      { month: 10, title: "도전과 성장", description: "새로운 도전에 나서기 좋은 가을의 시작" },
      { month: 12, title: "마무리와 감사", description: "한 해를 정리하며 감사한 마음을 갖는 시간" }
    ];
    
    // 시드 기반으로 3개의 하이라이트 선택
    const selected = [];
    let tempSeed = seed;
    while (selected.length < 3) {
      const index = tempSeed % highlights.length;
      if (!selected.find(h => h.month === highlights[index].month)) {
        selected.push(highlights[index]);
      }
      tempSeed = Math.floor(tempSeed / 2);
    }
    
    return selected.sort((a, b) => a.month - b.month);
  };

  const getLuckyColor = (seed: number): string => {
    const colors = ["빨간색", "파란색", "노란색", "초록색", "보라색", "분홍색", "주황색", "하늘색"];
    return colors[seed % colors.length];
  };

  const getLuckyDirection = (seed: number): string => {
    const directions = ["동쪽", "서쪽", "남쪽", "북쪽", "동남쪽", "서남쪽", "동북쪽", "서북쪽"];
    return directions[seed % directions.length];
  };

  const getLuckyItem = (seed: number): string => {
    const items = ["수정", "식물", "책", "음악", "향초", "거울", "시계", "그림"];
    return items[seed % items.length];
  };

  const getYearKeyword = (seed: number, age: number): string => {
    const keywords = ["성장", "도전", "화합", "발전", "변화", "안정", "창조", "소통"];
    return keywords[(seed + age) % keywords.length];
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return "text-red-600";
    if (score >= 80) return "text-orange-600";
    if (score >= 75) return "text-yellow-600";
    return "text-blue-600";
  };

  const getScoreBg = (score: number): string => {
    if (score >= 90) return "from-red-100 to-red-200";
    if (score >= 80) return "from-orange-100 to-orange-200";
    if (score >= 75) return "from-yellow-100 to-yellow-200";
    return "from-blue-100 to-blue-200";
  };

  return (
    <Layout>
      <div className="min-h-screen gradient-bg py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl mb-6 shadow-xl">
              <Gift className="h-10 w-10 text-white" />
            </div>
            <h1 className="section-header glow-text mb-6">
              🎊 2024년 신년운세 🎊
            </h1>
            <p className="section-subheader">
              갑진년 청룡의 해, 당신에게 찾아올 특별한 운명<br />
              새로운 한 해의 전체적인 운세를 확인해보세요
            </p>
          </div>

          {!result ? (
            <div className="fortune-card p-8 md:p-12 max-w-3xl mx-auto">
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    개인 정보 입력
                  </h3>
                  <p className="text-gray-600">
                    정확한 신년운세를 위해 정보를 입력해주세요
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      이름
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field text-lg"
                      placeholder="실명을 입력하세요"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      생년월일
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="input-field text-lg"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl text-center">
                    <Star className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <h3 className="font-bold text-gray-800 mb-2">총운</h3>
                    <p className="text-sm text-gray-600">전체적인 운세 흐름</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl text-center">
                    <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-bold text-gray-800 mb-2">분야별 운세</h3>
                    <p className="text-sm text-gray-600">6가지 분야 상세 분석</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl text-center">
                    <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <h3 className="font-bold text-gray-800 mb-2">월별 포인트</h3>
                    <p className="text-sm text-gray-600">중요한 시기 안내</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={generateNewYearFortune}
                    disabled={!name || !birthDate || isGenerating}
                    className={`btn-primary text-xl px-12 py-5 ${
                      (!name || !birthDate || isGenerating)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'animate-pulse-glow'
                    }`}
                  >
                    {isGenerating ? (
                      <div className="flex items-center space-x-3">
                        <div className="loading-spinner"></div>
                        <span>2024년 운세를 분석 중...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Gift className="h-6 w-6" />
                        <span>내 신년운세 보기</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* 올해의 키워드 */}
              <div className="fortune-card p-8 text-center">
                <h3 className="text-2xl font-bold mb-6 glow-text">
                  🎯 {name}님의 2024년 키워드
                </h3>
                <div className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full text-3xl font-bold shadow-lg">
                  {result.yearKeyword}
                </div>
              </div>

              {/* 총운 */}
              <div className="fortune-card p-8">
                <h3 className="text-3xl font-bold text-center mb-8 glow-text">
                  총운
                </h3>
                <div className="text-center mb-8">
                  <div className={`inline-block bg-gradient-to-br ${getScoreBg(result.totalFortune.score)} px-8 py-4 rounded-xl mb-4`}>
                    <div className={`text-4xl font-bold ${getScoreColor(result.totalFortune.score)} mb-2`}>
                      {result.totalFortune.score}점
                    </div>
                    <div className="text-xl font-semibold text-gray-800">
                      {result.totalFortune.title}
                    </div>
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-gray-700 text-center mb-6">
                  {result.totalFortune.description}
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
                  <p className="text-gray-700 font-medium">
                    💡 <strong>조언:</strong> {result.totalFortune.advice}
                  </p>
                </div>
              </div>

              {/* 분야별 운세 */}
              <div className="fortune-card p-8">
                <h3 className="text-3xl font-bold text-center mb-8 glow-text">
                  분야별 상세 운세
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Gift className="h-6 w-6 text-green-500" />
                        <h4 className="text-lg font-bold text-gray-800">재물운</h4>
                      </div>
                      <span className={`text-xl font-bold ${getScoreColor(result.detailedFortunes.wealth.score)}`}>
                        {result.detailedFortunes.wealth.score}점
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {result.detailedFortunes.wealth.description}
                    </p>
                    <p className="text-xs text-green-700 bg-green-100 rounded-lg px-3 py-2">
                      💡 {result.detailedFortunes.wealth.advice}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-6 w-6 text-pink-500" />
                        <h4 className="text-lg font-bold text-gray-800">애정운</h4>
                      </div>
                      <span className={`text-xl font-bold ${getScoreColor(result.detailedFortunes.love.score)}`}>
                        {result.detailedFortunes.love.score}점
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {result.detailedFortunes.love.description}
                    </p>
                    <p className="text-xs text-pink-700 bg-pink-100 rounded-lg px-3 py-2">
                      💡 {result.detailedFortunes.love.advice}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-6 w-6 text-blue-500" />
                        <h4 className="text-lg font-bold text-gray-800">직업운</h4>
                      </div>
                      <span className={`text-xl font-bold ${getScoreColor(result.detailedFortunes.career.score)}`}>
                        {result.detailedFortunes.career.score}점
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {result.detailedFortunes.career.description}
                    </p>
                    <p className="text-xs text-blue-700 bg-blue-100 rounded-lg px-3 py-2">
                      💡 {result.detailedFortunes.career.advice}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-6 w-6 text-purple-500" />
                        <h4 className="text-lg font-bold text-gray-800">건강운</h4>
                      </div>
                      <span className={`text-xl font-bold ${getScoreColor(result.detailedFortunes.health.score)}`}>
                        {result.detailedFortunes.health.score}점
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {result.detailedFortunes.health.description}
                    </p>
                    <p className="text-xs text-purple-700 bg-purple-100 rounded-lg px-3 py-2">
                      💡 {result.detailedFortunes.health.advice}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Home className="h-6 w-6 text-orange-500" />
                        <h4 className="text-lg font-bold text-gray-800">가족운</h4>
                      </div>
                      <span className={`text-xl font-bold ${getScoreColor(result.detailedFortunes.family.score)}`}>
                        {result.detailedFortunes.family.score}점
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {result.detailedFortunes.family.description}
                    </p>
                    <p className="text-xs text-orange-700 bg-orange-100 rounded-lg px-3 py-2">
                      💡 {result.detailedFortunes.family.advice}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Crown className="h-6 w-6 text-indigo-500" />
                        <h4 className="text-lg font-bold text-gray-800">학업운</h4>
                      </div>
                      <span className={`text-xl font-bold ${getScoreColor(result.detailedFortunes.study.score)}`}>
                        {result.detailedFortunes.study.score}점
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {result.detailedFortunes.study.description}
                    </p>
                    <p className="text-xs text-indigo-700 bg-indigo-100 rounded-lg px-3 py-2">
                      💡 {result.detailedFortunes.study.advice}
                    </p>
                  </div>
                </div>
              </div>

              {/* 월별 하이라이트 */}
              <div className="fortune-card p-8">
                <h3 className="text-3xl font-bold text-center mb-8 glow-text">
                  📅 월별 중요 포인트
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {result.monthlyHighlights.map((highlight, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {highlight.month}월
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 행운 아이템 */}
              <div className="fortune-card p-8">
                <h3 className="text-3xl font-bold text-center mb-8 glow-text">
                  🍀 2024년 행운 아이템
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-2xl">🎨</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">행운의 색</h4>
                    <p className="text-lg font-bold text-red-600">{result.luckyItems.color}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-2xl">🔢</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">행운의 숫자</h4>
                    <p className="text-lg font-bold text-blue-600">{result.luckyItems.number}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-2xl">🧭</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">행운의 방향</h4>
                    <p className="text-lg font-bold text-green-600">{result.luckyItems.direction}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-2xl">✨</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">행운의 아이템</h4>
                    <p className="text-lg font-bold text-purple-600">{result.luckyItems.item}</p>
                  </div>
                </div>
              </div>

              {/* 마무리 메시지 */}
              <div className="fortune-card p-8 text-center">
                <h3 className="text-2xl font-bold mb-6 glow-text">
                  🌟 새해 복 많이 받으세요!
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  2024년 갑진년, {name}님에게 건강과 행복이 가득한 한 해가 되시길 바랍니다.<br />
                  모든 꿈과 소망이 이루어지는 뜻깊은 해가 되세요! 🎊
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 