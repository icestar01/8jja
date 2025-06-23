'use client';

import { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import { Share2, Download, Copy, Heart } from 'lucide-react';

interface SajuResult {
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
  element: string;
  personality: string;
  fortune: {
    career: string;
    love: string;
    wealth: string;
    health: string;
  };
  luckyColors: string[];
  luckyNumbers: number[];
  advice: string;
}

export default function SajuPage() {
  const [birthInfo, setBirthInfo] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    gender: 'male'
  });
  const [result, setResult] = useState<SajuResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const hours = [
    { value: '23-01', label: '자시 (23:00~01:00)' },
    { value: '01-03', label: '축시 (01:00~03:00)' },
    { value: '03-05', label: '인시 (03:00~05:00)' },
    { value: '05-07', label: '묘시 (05:00~07:00)' },
    { value: '07-09', label: '진시 (07:00~09:00)' },
    { value: '09-11', label: '사시 (09:00~11:00)' },
    { value: '11-13', label: '오시 (11:00~13:00)' },
    { value: '13-15', label: '미시 (13:00~15:00)' },
    { value: '15-17', label: '신시 (15:00~17:00)' },
    { value: '17-19', label: '유시 (17:00~19:00)' },
    { value: '19-21', label: '술시 (19:00~21:00)' },
    { value: '21-23', label: '해시 (21:00~23:00)' },
  ];

  const generateSaju = () => {
    if (!birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.hour) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const stems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
      const branches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
      const elements = ['목', '화', '토', '금', '수'] as const;
      
      const randomStem = () => stems[Math.floor(Math.random() * stems.length)];
      const randomBranch = () => branches[Math.floor(Math.random() * branches.length)];
      const randomElement = () => elements[Math.floor(Math.random() * elements.length)];

      const selectedElement = randomElement();
      const sajuData: SajuResult = {
        yearPillar: `${randomStem()}${randomBranch()}`,
        monthPillar: `${randomStem()}${randomBranch()}`,
        dayPillar: `${randomStem()}${randomBranch()}`,
        hourPillar: `${randomStem()}${randomBranch()}`,
        element: selectedElement,
        personality: getPersonalityByElement(selectedElement),
        fortune: {
          career: '직장에서 안정적인 성장을 이룰 수 있는 사주입니다. 꾸준한 노력이 좋은 결과를 가져올 것입니다.',
          love: '진실한 사랑을 만날 운이 좋습니다. 서둘지 말고 차근차근 관계를 발전시켜 나가세요.',
          wealth: '재물운이 점진적으로 상승하는 추세입니다. 투자보다는 저축에 집중하는 것이 좋겠습니다.',
          health: '전반적으로 건강한 편이나, 규칙적인 운동과 식습관 관리가 중요합니다.'
        },
        luckyColors: getLuckyColors(selectedElement),
        luckyNumbers: [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1],
        advice: '인내심을 갖고 꾸준히 노력한다면 원하는 목표를 달성할 수 있을 것입니다. 주변 사람들과의 관계를 소중히 여기세요.'
      };

      setResult(sajuData);
      setIsLoading(false);
    }, 3000);
  };

  const getPersonalityByElement = (element: '목' | '화' | '토' | '금' | '수'): string => {
    const personalities: Record<'목' | '화' | '토' | '금' | '수', string> = {
      '목': '성장과 발전을 추구하는 성격으로, 창의적이고 진취적입니다. 새로운 것을 배우는 것을 좋아하며 리더십이 뛰어납니다.',
      '화': '열정적이고 활동적인 성격입니다. 사교적이며 타인과의 소통을 중요하게 생각합니다. 감정 표현이 풍부합니다.',
      '토': '안정적이고 신중한 성격입니다. 책임감이 강하며 신뢰할 수 있는 사람입니다. 현실적이고 실용적인 면이 강합니다.',
      '금': '완벽주의적 성향이 있으며 정의감이 강합니다. 원칙을 중시하고 체계적으로 일을 처리하는 능력이 뛰어납니다.',
      '수': '지혜롭고 유연한 성격입니다. 적응력이 뛰어나며 깊이 있는 사고를 합니다. 직관력이 발달되어 있습니다.'
    };
    return personalities[element];
  };

  const getLuckyColors = (element: '목' | '화' | '토' | '금' | '수'): string[] => {
    const colors: Record<'목' | '화' | '토' | '금' | '수', string[]> = {
      '목': ['초록색', '연두색', '청록색'],
      '화': ['빨간색', '주황색', '분홍색'],
      '토': ['노란색', '갈색', '베이지색'],
      '금': ['흰색', '은색', '회색'],
      '수': ['검은색', '파란색', '남색']
    };
    return colors[element];
  };

  const resetForm = () => {
    setBirthInfo({
      year: '',
      month: '',
      day: '',
      hour: '',
      gender: 'male'
    });
    setResult(null);
  };

  const shareResult = async () => {
    if (!result) return;
    
    const shareText = `🔮 내 사주팔자 결과\n\n` +
      `사주: ${result.yearPillar} ${result.monthPillar} ${result.dayPillar} ${result.hourPillar}\n` +
      `오행: ${result.element}\n` +
      `조언: ${result.advice}\n\n` +
      `8jja에서 확인하세요! ✨`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '내 사주팔자 결과',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('사주 결과가 복사되었습니다!');
  };

  const saveResult = () => {
    if (!result) return;
    
    const savedResults = localStorage.getItem('savedSajuResults');
    const results = savedResults ? JSON.parse(savedResults) : [];
    const newResult = {
      ...result,
      birthInfo,
      date: new Date().toISOString()
    };
    
    const updated = [newResult, ...results.filter((r: any) => 
      !(r.birthInfo.year === birthInfo.year && 
        r.birthInfo.month === birthInfo.month && 
        r.birthInfo.day === birthInfo.day)
    )].slice(0, 5);
    
    localStorage.setItem('savedSajuResults', JSON.stringify(updated));
    alert('사주 결과가 저장되었습니다!');
  };

  return (
    <Layout>
      <div className="min-h-screen gradient-bg py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Beautiful Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl mb-6 shadow-xl">
              <span className="text-3xl">🔮</span>
            </div>
            <h1 className="section-header glow-text mb-6">
              정통 사주팔자
            </h1>
            <p className="section-subheader">
              천간지지의 오묘한 원리로 당신의 운명을 풀어드립니다<br />
              정확한 생년월일시를 입력해주세요
            </p>
          </div>

          {!result ? (
            <div className="fortune-card p-8 md:p-12 max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* 생년월일 입력 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    생년월일 정보
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        출생년도
                      </label>
                      <input
                        type="number"
                        min="1900"
                        max="2024"
                        value={birthInfo.year}
                        onChange={(e) => setBirthInfo({...birthInfo, year: e.target.value})}
                        className="input-field text-lg"
                        placeholder="예: 1990"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        월
                      </label>
                      <select
                        value={birthInfo.month}
                        onChange={(e) => setBirthInfo({...birthInfo, month: e.target.value})}
                        className="select-field text-lg"
                      >
                        <option value="">월을 선택하세요</option>
                        {Array.from({length: 12}, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}월
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        일
                      </label>
                      <select
                        value={birthInfo.day}
                        onChange={(e) => setBirthInfo({...birthInfo, day: e.target.value})}
                        className="select-field text-lg"
                      >
                        <option value="">일을 선택하세요</option>
                        {Array.from({length: 31}, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}일
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 출생시간과 성별 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      출생시간 (중요!)
                    </label>
                    <select
                      value={birthInfo.hour}
                      onChange={(e) => setBirthInfo({...birthInfo, hour: e.target.value})}
                      className="select-field text-lg"
                    >
                      <option value="">시간을 선택하세요</option>
                      {hours.map((hour) => (
                        <option key={hour.value} value={hour.value}>
                          {hour.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-2">
                      💡 정확한 시간을 모르면 오시(11-13시)를 선택하세요
                    </p>
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      성별
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setBirthInfo({...birthInfo, gender: 'male'})}
                        className={`py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                          birthInfo.gender === 'male'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                            : 'bg-white/50 border-2 border-gray-200 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        👨 남성
                      </button>
                      <button
                        type="button"
                        onClick={() => setBirthInfo({...birthInfo, gender: 'female'})}
                        className={`py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                          birthInfo.gender === 'female'
                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg scale-105'
                            : 'bg-white/50 border-2 border-gray-200 text-gray-700 hover:border-pink-300'
                        }`}
                      >
                        👩 여성
                      </button>
                    </div>
                  </div>
                </div>

                {/* 분석 버튼 */}
                <div className="text-center pt-8">
                  <button
                    onClick={generateSaju}
                    disabled={!birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.hour || isLoading}
                    className={`btn-primary text-xl px-12 py-5 ${
                      (!birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.hour || isLoading)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'animate-pulse-glow'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-3">
                        <div className="loading-spinner"></div>
                        <span>사주를 분석하고 있습니다...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <span>🔮</span>
                        <span>내 사주 분석하기</span>
                      </div>
                    )}
                  </button>
                  <p className="text-gray-500 mt-4">
                    분석까지 약 3초 정도 소요됩니다
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* 결과 화면 - 아름답게 리디자인 */
            <div className="space-y-8">
              {/* 사주팔자 차트 */}
              <div className="fortune-card p-8">
                <h3 className="text-3xl font-bold text-center mb-8 glow-text">
                  당신의 사주팔자
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
                      <div className="text-xs mb-2 opacity-80">년주</div>
                      <div className="text-2xl font-bold">{result.yearPillar}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg">
                      <div className="text-xs mb-2 opacity-80">월주</div>
                      <div className="text-2xl font-bold">{result.monthPillar}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
                      <div className="text-xs mb-2 opacity-80">일주</div>
                      <div className="text-2xl font-bold">{result.dayPillar}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-6 rounded-2xl shadow-lg">
                      <div className="text-xs mb-2 opacity-80">시주</div>
                      <div className="text-2xl font-bold">{result.hourPillar}</div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                    주원소: {result.element}
                  </div>
                </div>
              </div>

              {/* 성격 분석 */}
              <div className="fortune-card p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  💫 성격 분석
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 text-center">
                  {result.personality}
                </p>
              </div>

              {/* 분야별 운세 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold mb-4 text-center text-blue-600">
                    💼 직업운
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{result.fortune.career}</p>
                </div>
                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold mb-4 text-center text-pink-600">
                    💕 연애운
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{result.fortune.love}</p>
                </div>
                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold mb-4 text-center text-green-600">
                    💰 재물운
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{result.fortune.wealth}</p>
                </div>
                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold mb-4 text-center text-red-600">
                    🏥 건강운
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{result.fortune.health}</p>
                </div>
              </div>

              {/* 행운 요소 */}
              <div className="fortune-card p-8">
                <h3 className="text-2xl font-bold mb-8 text-center">
                  🍀 당신의 행운 아이템
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <h4 className="text-xl font-semibold mb-4 text-purple-600">행운의 색상</h4>
                    <div className="flex justify-center space-x-3">
                      {result.luckyColors.map((color, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-medium"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-semibold mb-4 text-purple-600">행운의 숫자</h4>
                    <div className="flex justify-center space-x-3">
                      {result.luckyNumbers.map((number, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg"
                        >
                          {number}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 인생 조언 */}
              <div className="fortune-card p-8 text-center">
                <h3 className="text-2xl font-bold mb-6">
                  🌟 당신을 위한 조언
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 italic">
                  "{result.advice}"
                </p>
              </div>

              {/* 다시하기 버튼 */}
              <div className="text-center">
                <button
                  onClick={resetForm}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  🔄 다른 사주 보기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 