'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { User, Sparkles, Heart, Briefcase, DollarSign, Shield } from 'lucide-react';

export default function NameFortunePage() {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState<any>(null);

  // 한글 자음/모음 분리 함수
  const separateKorean = (str: string) => {
    const cho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const jung = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const jong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i) - 44032;
      if (code >= 0 && code <= 11171) {
        const choIndex = Math.floor(code / 588);
        const jungIndex = Math.floor((code % 588) / 28);
        const jongIndex = code % 28;
        result += cho[choIndex] + jung[jungIndex] + jong[jongIndex];
      } else {
        result += str[i];
      }
    }
    return result;
  };

  // 획수 계산 (간단한 버전)
  const calculateStrokes = (char: string) => {
    const strokeMap: Record<string, number> = {
      'ㄱ': 2, 'ㄲ': 4, 'ㄴ': 2, 'ㄷ': 3, 'ㄸ': 6, 'ㄹ': 5, 'ㅁ': 4, 'ㅂ': 4, 'ㅃ': 8,
      'ㅅ': 2, 'ㅆ': 4, 'ㅇ': 1, 'ㅈ': 3, 'ㅉ': 6, 'ㅊ': 4, 'ㅋ': 3, 'ㅌ': 4, 'ㅍ': 4, 'ㅎ': 3,
      'ㅏ': 2, 'ㅐ': 3, 'ㅑ': 3, 'ㅒ': 4, 'ㅓ': 2, 'ㅔ': 3, 'ㅕ': 3, 'ㅖ': 4, 'ㅗ': 2, 'ㅘ': 4,
      'ㅙ': 5, 'ㅚ': 3, 'ㅛ': 3, 'ㅜ': 2, 'ㅝ': 4, 'ㅞ': 5, 'ㅟ': 3, 'ㅠ': 3, 'ㅡ': 1, 'ㅢ': 2, 'ㅣ': 1
    };

    return char.split('').reduce((sum, c) => sum + (strokeMap[c] || 1), 0);
  };

  const analyzeName = () => {
    if (!name || !birthYear || !gender) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    // 이름 분석
    const separated = separateKorean(name);
    const totalStrokes = calculateStrokes(separated);
    const nameLength = name.length;

    // 운세 계산 (간단한 알고리즘)
    const seed = totalStrokes + parseInt(birthYear) + (gender === 'male' ? 1 : 2);
    
    const fortuneCategories = {
      personality: {
        score: (seed * 7) % 100 + 1,
        traits: getPersonalityTraits(totalStrokes % 8),
        description: getPersonalityDescription(totalStrokes % 8)
      },
      love: {
        score: (seed * 3) % 100 + 1,
        message: getLoveMessage((seed * 3) % 5),
        compatibility: getCompatibility(nameLength % 4)
      },
      career: {
        score: (seed * 5) % 100 + 1,
        field: getCareerField(totalStrokes % 6),
        advice: getCareerAdvice(totalStrokes % 6)
      },
      wealth: {
        score: (seed * 11) % 100 + 1,
        trend: getWealthTrend((seed * 11) % 3),
        advice: getWealthAdvice((seed * 11) % 3)
      },
      health: {
        score: (seed * 13) % 100 + 1,
        weakness: getHealthWeakness(totalStrokes % 5),
        advice: getHealthAdvice(totalStrokes % 5)
      }
    };

    setResult({
      name,
      totalStrokes,
      nameNumber: totalStrokes % 9 + 1,
      fortune: fortuneCategories
    });
  };

  const getPersonalityTraits = (type: number) => {
    const traits = [
      ['리더십', '결단력', '추진력'],
      ['섬세함', '감수성', '배려심'],
      ['창의성', '예술성', '상상력'],
      ['안정성', '신뢰성', '책임감'],
      ['사교성', '친화력', '유머'],
      ['지성', '분석력', '논리성'],
      ['자유로움', '모험심', '독립성'],
      ['따뜻함', '포용력', '치유력']
    ];
    return traits[type] || traits[0];
  };

  const getPersonalityDescription = (type: number) => {
    const descriptions = [
      '타고난 리더로서 사람들을 이끄는 능력이 뛰어납니다.',
      '섬세하고 감수성이 풍부한 당신은 예술적 재능이 있습니다.',
      '창의적이고 독창적인 아이디어로 주변을 놀라게 합니다.',
      '안정적이고 신뢰할 수 있는 성격으로 많은 이들의 의지가 됩니다.',
      '밝고 사교적인 성격으로 어디서든 인기가 많습니다.',
      '논리적이고 체계적인 사고로 문제 해결 능력이 뛰어납니다.',
      '자유롭고 모험을 좋아하는 당신은 새로운 경험을 추구합니다.',
      '따뜻하고 포용력이 넓어 사람들에게 위로를 주는 존재입니다.'
    ];
    return descriptions[type] || descriptions[0];
  };

  const getLoveMessage = (type: number) => {
    const messages = [
      '진실한 사랑을 만날 운명입니다. 서두르지 말고 기다리세요.',
      '활발한 연애운을 가지고 있어 많은 사람들에게 인기가 있을 것입니다.',
      '깊고 진한 사랑을 경험할 가능성이 높습니다.',
      '안정적이고 오래가는 관계를 선호하는 타입입니다.',
      '로맨틱하고 드라마틱한 사랑을 꿈꾸는 당신입니다.'
    ];
    return messages[type] || messages[0];
  };

  const getCompatibility = (type: number) => {
    const compatibilities = [
      '이름 글자 수가 비슷한 사람',
      '성격이 반대인 사람',
      '같은 취미를 가진 사람',
      '나이 차이가 있는 사람'
    ];
    return compatibilities[type] || compatibilities[0];
  };

  const getCareerField = (type: number) => {
    const fields = [
      '경영/리더십 분야',
      '예술/창작 분야',
      '교육/상담 분야',
      '금융/경제 분야',
      '미디어/엔터테인먼트',
      '연구/개발 분야'
    ];
    return fields[type] || fields[0];
  };

  const getCareerAdvice = (type: number) => {
    const advice = [
      '목표를 설정하고 끝까지 추진하는 것이 성공의 열쇠입니다.',
      '창의성을 발휘할 수 있는 환경을 찾아보세요.',
      '사람들과의 소통을 중시하는 직업이 잘 맞습니다.',
      '계획적이고 체계적으로 접근하면 큰 성과를 거둘 것입니다.',
      '다양한 경험을 쌓고 네트워킹을 활용하세요.',
      '전문성을 기르고 끊임없이 학습하는 자세가 중요합니다.'
    ];
    return advice[type] || advice[0];
  };

  const getWealthTrend = (type: number) => {
    const trends = ['상승세', '안정세', '변동세'];
    return trends[type] || trends[0];
  };

  const getWealthAdvice = (type: number) => {
    const advice = [
      '적극적인 투자보다는 안정적인 저축이 좋습니다.',
      '다양한 수입원을 개발하는 것이 도움이 될 것입니다.',
      '충동적인 소비를 피하고 계획적으로 관리하세요.'
    ];
    return advice[type] || advice[0];
  };

  const getHealthWeakness = (type: number) => {
    const weaknesses = ['스트레스', '소화기관', '호흡기', '관절', '순환기'];
    return weaknesses[type] || weaknesses[0];
  };

  const getHealthAdvice = (type: number) => {
    const advice = [
      '규칙적인 운동과 충분한 휴식이 중요합니다.',
      '균형 잡힌 식단을 유지하세요.',
      '정기적인 건강검진을 받는 것이 좋습니다.',
      '스트레스 관리에 신경 쓰세요.',
      '적절한 수분 섭취와 금연을 권합니다.'
    ];
    return advice[type] || advice[0];
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        {/* 헤더 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <User className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">이름 운세</h1>
            <p className="text-xl opacity-90">이름에 숨겨진 운명과 성격을 알아보세요</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {!result ? (
            /* 정보 입력 */
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                정보 입력
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    출생년도
                  </label>
                  <input
                    type="number"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    placeholder="예: 1990"
                    min="1900"
                    max="2024"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    성별
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setGender('male')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                        gender === 'male' 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      남성
                    </button>
                    <button
                      onClick={() => setGender('female')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                        gender === 'female' 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      여성
                    </button>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={analyzeName}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-lg"
                  >
                    이름 운세 보기
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* 결과 표시 */
            <div className="space-y-8">
              {/* 기본 정보 */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{result.name}님의 운세</h2>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-700">총 획수</h3>
                    <p className="text-2xl font-bold text-blue-600">{result.totalStrokes}획</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-700">이름 수</h3>
                    <p className="text-2xl font-bold text-purple-600">{result.nameNumber}</p>
                  </div>
                </div>
              </div>

              {/* 성격 분석 */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Sparkles className="h-6 w-6 text-yellow-500 mr-2" />
                  성격 분석
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-3xl font-bold ${getScoreColor(result.fortune.personality.score)}`}>
                    {result.fortune.personality.score}점
                  </span>
                  <div className="flex-1 ml-4 h-3 bg-gray-200 rounded-full">
                    <div 
                      className={`h-3 rounded-full ${getScoreBg(result.fortune.personality.score)}`}
                      style={{ width: `${result.fortune.personality.score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-700 mb-2">주요 특징</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.fortune.personality.traits.map((trait: string, index: number) => (
                        <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{result.fortune.personality.description}</p>
                </div>
              </div>

              {/* 운세 카테고리 */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* 연애운 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Heart className="h-5 w-5 text-pink-500 mr-2" />
                    연애운
                  </h3>
                  <div className="flex items-center mb-3">
                    <span className={`text-2xl font-bold ${getScoreColor(result.fortune.love.score)}`}>
                      {result.fortune.love.score}점
                    </span>
                    <div className="flex-1 ml-3 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${getScoreBg(result.fortune.love.score)}`}
                        style={{ width: `${result.fortune.love.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{result.fortune.love.message}</p>
                  <p className="text-xs text-gray-500">
                    <strong>궁합:</strong> {result.fortune.love.compatibility}
                  </p>
                </div>

                {/* 직업운 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                    직업운
                  </h3>
                  <div className="flex items-center mb-3">
                    <span className={`text-2xl font-bold ${getScoreColor(result.fortune.career.score)}`}>
                      {result.fortune.career.score}점
                    </span>
                    <div className="flex-1 ml-3 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${getScoreBg(result.fortune.career.score)}`}
                        style={{ width: `${result.fortune.career.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    <strong>적성 분야:</strong> {result.fortune.career.field}
                  </p>
                  <p className="text-gray-700 text-sm">{result.fortune.career.advice}</p>
                </div>

                {/* 재물운 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                    재물운
                  </h3>
                  <div className="flex items-center mb-3">
                    <span className={`text-2xl font-bold ${getScoreColor(result.fortune.wealth.score)}`}>
                      {result.fortune.wealth.score}점
                    </span>
                    <div className="flex-1 ml-3 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${getScoreBg(result.fortune.wealth.score)}`}
                        style={{ width: `${result.fortune.wealth.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    <strong>재물 흐름:</strong> {result.fortune.wealth.trend}
                  </p>
                  <p className="text-gray-700 text-sm">{result.fortune.wealth.advice}</p>
                </div>

                {/* 건강운 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-red-500 mr-2" />
                    건강운
                  </h3>
                  <div className="flex items-center mb-3">
                    <span className={`text-2xl font-bold ${getScoreColor(result.fortune.health.score)}`}>
                      {result.fortune.health.score}점
                    </span>
                    <div className="flex-1 ml-3 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${getScoreBg(result.fortune.health.score)}`}
                        style={{ width: `${result.fortune.health.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    <strong>주의할 부분:</strong> {result.fortune.health.weakness}
                  </p>
                  <p className="text-gray-700 text-sm">{result.fortune.health.advice}</p>
                </div>
              </div>

              {/* 다시 하기 버튼 */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setResult(null);
                    setName('');
                    setBirthYear('');
                    setGender('');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  다시 분석하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 