'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Dices, Star, RefreshCw, Copy, Sparkles, Heart, Briefcase, Home, Gift } from 'lucide-react';

interface LuckyNumberResult {
  numbers: number[];
  meanings: string[];
  specialNumbers: {
    love: number;
    wealth: number;
    health: number;
    career: number;
  };
  personalAnalysis: string;
  usage: string[];
}

export default function LuckyNumberPage() {
  const [result, setResult] = useState<LuckyNumberResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');

  const generateLuckyNumbers = () => {
    if (!birthDate || !name) {
      alert('이름과 생년월일을 입력해 주세요.');
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      // 생년월일과 이름을 기반으로 한 시드 생성
      const birthDigits = birthDate.replace(/-/g, '');
      const nameValue = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const baseSeed = parseInt(birthDigits) + nameValue;
      
      // 메인 행운 번호 6개 생성
      const numbers = new Set<number>();
      let seedValue = baseSeed;
      
      while (numbers.size < 6) {
        seedValue = (seedValue * 16807) % 2147483647;
        const num = (seedValue % 45) + 1;
        numbers.add(num);
      }
      
      const luckyNumbers = Array.from(numbers).sort((a, b) => a - b);
      
      // 특별 번호들 생성 (각 분야별)
      const specialNumbers = {
        love: ((baseSeed * 7) % 99) + 1,
        wealth: ((baseSeed * 11) % 99) + 1,
        health: ((baseSeed * 13) % 99) + 1,
        career: ((baseSeed * 17) % 99) + 1
      };
      
      // 번호별 의미 생성
      const meanings = luckyNumbers.map(num => getNumberMeaning(num));
      
      // 개인 분석
      const personalAnalysis = generatePersonalAnalysis(name, birthDate, luckyNumbers);
      
      // 사용 권장사항
      const usage = [
        "복권 구매 시 이 번호들을 활용해보세요",
        "중요한 결정을 할 때 이 번호가 포함된 날짜를 선택하세요",
        "전화번호나 비밀번호에 이 숫자들을 포함시켜보세요",
        "투자나 거래 시 이 번호들을 참고하세요",
        "새로운 시작을 할 때 이 번호들을 기억하세요"
      ];
      
      setResult({
        numbers: luckyNumbers,
        meanings,
        specialNumbers,
        personalAnalysis,
        usage
      });
      setIsGenerating(false);
    }, 2000);
  };

  const getNumberMeaning = (num: number): string => {
    const meanings: { [key: number]: string } = {
      1: "새로운 시작과 리더십의 에너지",
      2: "조화와 협력의 힘",
      3: "창의성과 소통의 능력",
      4: "안정성과 지속성의 기운",
      5: "자유와 모험의 정신",
      6: "사랑과 책임감의 에너지",
      7: "신비와 지혜의 힘",
      8: "물질적 성공과 성취의 기운",
      9: "완성과 봉사의 정신"
    };
    
    const baseNum = num % 9 || 9;
    return meanings[baseNum] || "특별한 행운의 기운";
  };

  const generatePersonalAnalysis = (name: string, birth: string, numbers: number[]): string => {
    const sum = numbers.reduce((a, b) => a + b, 0);
    const nameLength = name.length;
    const birthYear = parseInt(birth.substring(0, 4));
    
    if (sum > 150) {
      return `${name}님은 강한 에너지를 가진 분입니다. 큰 성공을 이룰 수 있는 잠재력이 있으며, 리더십을 발휘할 기회가 많을 것입니다.`;
    } else if (sum > 100) {
      return `${name}님은 균형잡힌 에너지를 가진 분입니다. 안정적인 성장과 함께 꾸준한 발전을 이룰 수 있을 것입니다.`;
    } else {
      return `${name}님은 차분하고 신중한 에너지를 가진 분입니다. 깊이 있는 사고로 현명한 판단을 내릴 수 있는 능력이 있습니다.`;
    }
  };

  const copyNumbers = () => {
    if (!result) return;
    const numbersText = result.numbers.join(', ');
    navigator.clipboard.writeText(numbersText);
    alert('행운의 번호가 복사되었습니다!');
  };

  const getNumberColor = (num: number) => {
    if (num <= 10) return 'from-yellow-400 to-yellow-600';
    if (num <= 20) return 'from-blue-400 to-blue-600';
    if (num <= 30) return 'from-red-400 to-red-600';
    if (num <= 40) return 'from-green-400 to-green-600';
    return 'from-purple-400 to-purple-600';
  };

  const reset = () => {
    setResult(null);
    setBirthDate('');
    setName('');
  };

  return (
    <Layout>
      <div className="min-h-screen gradient-bg py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl mb-6 shadow-xl">
              <Dices className="h-10 w-10 text-white" />
            </div>
            <h1 className="section-header glow-text mb-6">
              행운의 번호
            </h1>
            <p className="section-subheader">
              당신의 이름과 생년월일로 만들어지는 특별한 숫자들<br />
              인생을 바꿔줄 6개의 행운 번호를 만나보세요
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
                    정확한 분석을 위해 실제 정보를 입력해주세요
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

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">🔮 행운의 번호로 할 수 있는 것들</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 로또나 복권 번호 선택</li>
                    <li>• 중요한 날짜나 시간 결정</li>
                    <li>• 비밀번호나 계좌번호 설정</li>
                    <li>• 투자나 사업 관련 결정</li>
                    <li>• 새로운 시작의 기준점</li>
                  </ul>
                </div>

                <div className="text-center">
                  <button
                    onClick={generateLuckyNumbers}
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
                        <span>행운의 번호를 생성 중...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Dices className="h-6 w-6" />
                        <span>내 행운의 번호 생성</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* 메인 행운 번호 */}
              <div className="fortune-card p-8">
                <h3 className="text-3xl font-bold text-center mb-8 glow-text">
                  {name}님의 행운의 번호
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8 max-w-2xl mx-auto">
                  {result.numbers.map((number, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${getNumberColor(number)} rounded-full flex items-center justify-center shadow-lg mx-auto mb-2`}>
                        <span className="text-white font-bold text-xl md:text-2xl">{number}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center space-y-4">
                  <button
                    onClick={copyNumbers}
                    className="btn-secondary inline-flex items-center space-x-2"
                  >
                    <Copy className="h-5 w-5" />
                    <span>번호 복사하기</span>
                  </button>
                  <p className="text-gray-600">
                    번호 총합: {result.numbers.reduce((a, b) => a + b, 0)}
                  </p>
                </div>
              </div>

              {/* 번호별 의미 */}
              <div className="fortune-card p-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  🌟 각 번호의 의미
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.numbers.map((number, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-4 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getNumberColor(number)} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <span className="text-white font-bold text-lg">{number}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {result.meanings[index]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 분야별 특별 번호 */}
              <div className="fortune-card p-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  🎯 분야별 특별 번호
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Heart className="h-8 w-8 text-pink-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">연애운</h4>
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">{result.specialNumbers.love}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <Gift className="h-8 w-8 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">재물운</h4>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">{result.specialNumbers.wealth}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">건강운</h4>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">{result.specialNumbers.health}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <Briefcase className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">직업운</h4>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">{result.specialNumbers.career}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 개인 분석 */}
              <div className="fortune-card p-8">
                <h3 className="text-2xl font-bold text-center mb-6">
                  💫 개인 분석
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 text-center">
                  {result.personalAnalysis}
                </p>
              </div>

              {/* 활용 방법 */}
              <div className="fortune-card p-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  📋 활용 방법
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.usage.map((usage, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{usage}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 다시하기 버튼 */}
              <div className="text-center">
                <button
                  onClick={reset}
                  className="btn-secondary text-lg px-8 py-4 inline-flex items-center space-x-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>다른 번호 생성하기</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}