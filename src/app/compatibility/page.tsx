'use client';

import { useState } from 'react';
import Layout from '../../../components/layout/Layout';

interface CompatibilityResult {
  score: number;
  title?: string;
  message?: string;
  advice?: string;
  details: {
    communication: number;
    emotional: number;
    values: number;
    future: number;
  };
}

export default function CompatibilityPage() {
  const [compatibilityType, setCompatibilityType] = useState('love');
  const [person1, setPerson1] = useState({
    name: '',
    birth: '',
    gender: '',
  });
  const [person2, setPerson2] = useState({
    name: '',
    birth: '',
    gender: '',
  });
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const compatibilityTypes = [
    { id: 'love', name: '연애 궁합', icon: '💕', color: 'pink' },
    { id: 'friendship', name: '친구 궁합', icon: '👥', color: 'blue' },
    { id: 'business', name: '사업 궁합', icon: '💼', color: 'green' },
  ];

  const calculateCompatibility = () => {
    if (!person1.name || !person1.birth || !person2.name || !person2.birth) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    // 시뮬레이션 - 실제로는 API 호출
    setTimeout(() => {
      const score = Math.floor(Math.random() * 41) + 60; // 60-100 사이
      
      const getCompatibilityMessage = (score: number, type: string) => {
        if (score >= 90) {
          switch (type) {
            case 'love':
              return {
                title: '천생연분 💖',
                message: '정말 완벽한 궁합입니다! 서로를 깊이 이해하고 지지해주는 최고의 파트너가 될 수 있어요.',
                advice: '서로의 다름을 인정하고 존중한다면 행복한 관계를 유지할 수 있을 것입니다.'
              };
            case 'friendship':
              return {
                title: '평생 친구 👭',
                message: '서로를 진심으로 이해하고 믿을 수 있는 친구입니다. 어떤 어려움도 함께 극복할 수 있어요.',
                advice: '서로에게 솔직하고 진실된 마음으로 대한다면 평생을 함께할 수 있는 우정을 쌓을 수 있습니다.'
              };
            case 'business':
              return {
                title: '완벽한 파트너십 🤝',
                message: '서로의 능력을 완벽하게 보완해주는 최고의 비즈니스 파트너입니다.',
                advice: '명확한 역할 분담과 투명한 의사소통으로 큰 성공을 이룰 수 있을 것입니다.'
              };
          }
        } else if (score >= 80) {
          switch (type) {
            case 'love':
              return {
                title: '좋은 궁합 💝',
                message: '서로에게 끌리는 부분이 많아 좋은 관계를 만들어갈 수 있습니다.',
                advice: '서로의 차이점을 이해하려 노력한다면 더욱 발전된 관계가 될 수 있어요.'
              };
            case 'friendship':
              return {
                title: '든든한 친구 🤗',
                message: '서로를 믿고 의지할 수 있는 좋은 친구 관계입니다.',
                advice: '가끔 의견 차이가 있을 수 있지만, 대화로 충분히 해결할 수 있을 것입니다.'
              };
            case 'business':
              return {
                title: '좋은 동반자 💪',
                message: '서로의 장점을 잘 활용할 수 있는 좋은 비즈니스 관계입니다.',
                advice: '정기적인 소통과 명확한 목표 설정으로 성공적인 사업을 이룰 수 있습니다.'
              };
          }
        } else if (score >= 70) {
          switch (type) {
            case 'love':
              return {
                title: '보통 궁합 💛',
                message: '노력하면 좋은 관계를 만들 수 있지만, 서로를 이해하는 시간이 필요합니다.',
                advice: '인내심을 갖고 서로를 알아가는 시간을 충분히 가져보세요.'
              };
            case 'friendship':
              return {
                title: '무난한 친구 😊',
                message: '특별한 갈등은 없지만, 깊은 우정을 쌓으려면 시간이 필요합니다.',
                advice: '공통 관심사를 찾아 함께 활동하면 더 가까워질 수 있을 것입니다.'
              };
            case 'business':
              return {
                title: '신중한 협력 🤔',
                message: '협력이 가능하지만 신중한 접근이 필요한 관계입니다.',
                advice: '작은 프로젝트부터 시작해서 서로의 업무 스타일을 파악해보세요.'
              };
          }
        } else {
          switch (type) {
            case 'love':
              return {
                title: '도전적인 관계 💪',
                message: '많은 노력과 이해가 필요한 관계입니다. 서로의 차이를 인정하는 것이 중요해요.',
                advice: '급하게 결정하지 말고, 충분한 시간을 두고 서로를 알아가보세요.'
              };
            case 'friendship':
              return {
                title: '조심스러운 친구 😐',
                message: '친구로 지내는 것은 가능하지만, 깊은 신뢰 관계를 쌓기까지는 시간이 걸릴 수 있습니다.',
                advice: '서로의 다름을 존중하고, 강요하지 않는 자연스러운 관계를 유지해보세요.'
              };
            case 'business':
              return {
                title: '주의 깊은 협력 ⚠️',
                message: '비즈니스 협력 시 신중한 검토와 명확한 계약이 필요합니다.',
                advice: '모든 조건을 명확히 하고, 정기적인 점검을 통해 문제를 예방하세요.'
              };
          }
        }
      };

      const compatibilityData = getCompatibilityMessage(score, compatibilityType);
      
      setResult({
        score,
        ...compatibilityData,
        details: {
          communication: Math.floor(Math.random() * 31) + 70,
          emotional: Math.floor(Math.random() * 31) + 70,
          values: Math.floor(Math.random() * 31) + 70,
          future: Math.floor(Math.random() * 31) + 70,
        }
      });
      setIsLoading(false);
    }, 3000);
  };

  const ScoreCircle = ({ score, size = 120 }: { score: number; size?: number }) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const getScoreColor = (score: number) => {
      if (score >= 90) return '#10B981'; // green
      if (score >= 80) return '#3B82F6'; // blue
      if (score >= 70) return '#F59E0B'; // yellow
      return '#EF4444'; // red
    };

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getScoreColor(score)}
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              score >= 90 ? 'text-green-600' :
              score >= 80 ? 'text-blue-600' :
              score >= 70 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {score}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  const resetForm = () => {
    setPerson1({ name: '', birth: '', gender: '' });
    setPerson2({ name: '', birth: '', gender: '' });
    setResult(null);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-korean-serif">
              궁합 보기
            </h1>
            <p className="text-xl text-gray-600">
              두 사람의 궁합을 정확하게 분석해드립니다
            </p>
          </div>

          {/* Compatibility Type Selection */}
          <div className="fortune-card p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              궁합 유형 선택
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compatibilityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setCompatibilityType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                    compatibilityType === type.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-600'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Person 1 */}
            <div className="fortune-card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                첫 번째 사람
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    value={person1.name}
                    onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                    className="input-field"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    생년월일
                  </label>
                  <input
                    type="date"
                    value={person1.birth}
                    onChange={(e) => setPerson1({ ...person1, birth: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    성별
                  </label>
                  <select
                    value={person1.gender}
                    onChange={(e) => setPerson1({ ...person1, gender: e.target.value })}
                    className="input-field"
                  >
                    <option value="">성별을 선택하세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Person 2 */}
            <div className="fortune-card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                두 번째 사람
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    value={person2.name}
                    onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                    className="input-field"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    생년월일
                  </label>
                  <input
                    type="date"
                    value={person2.birth}
                    onChange={(e) => setPerson2({ ...person2, birth: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    성별
                  </label>
                  <select
                    value={person2.gender}
                    onChange={(e) => setPerson2({ ...person2, gender: e.target.value })}
                    className="input-field"
                  >
                    <option value="">성별을 선택하세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="text-center mb-8">
            <button
              onClick={calculateCompatibility}
              disabled={isLoading}
              className={`btn-primary text-lg px-8 py-4 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? '궁합 분석 중...' : '궁합 확인하기'}
            </button>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="fortune-card p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">
                {person1.name}님과 {person2.name}님의 궁합을 분석하고 있습니다...
              </p>
            </div>
          )}

          {/* Results */}
          {result && !isLoading && (
            <div className="space-y-6">
              {/* Main Score */}
              <div className="fortune-card p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {compatibilityTypes.find(t => t.id === compatibilityType)?.name} 결과
                </h3>
                <div className="flex justify-center mb-6">
                  <ScoreCircle score={result.score} size={150} />
                </div>
                <h4 className="text-2xl font-bold text-purple-600 mb-4">
                  {result.title}
                </h4>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {result.message}
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-800 mb-2">💡 조언</h5>
                  <p className="text-gray-700 text-sm">
                    {result.advice}
                  </p>
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="fortune-card p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  세부 분석
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <ScoreCircle score={result.details.communication} size={100} />
                    <p className="mt-2 font-medium text-gray-700">의사소통</p>
                  </div>
                  <div className="text-center">
                    <ScoreCircle score={result.details.emotional} size={100} />
                    <p className="mt-2 font-medium text-gray-700">감정적 연결</p>
                  </div>
                  <div className="text-center">
                    <ScoreCircle score={result.details.values} size={100} />
                    <p className="mt-2 font-medium text-gray-700">가치관</p>
                  </div>
                  <div className="text-center">
                    <ScoreCircle score={result.details.future} size={100} />
                    <p className="mt-2 font-medium text-gray-700">미래 전망</p>
                  </div>
                </div>
              </div>

              {/* Retry Button */}
              <div className="text-center">
                <button
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  다른 궁합 보기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 