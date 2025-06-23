'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Moon, Search, Sparkles, RefreshCw, Star, Brain, Eye } from 'lucide-react';

interface DreamInterpretation {
  category: string;
  title: string;
  meaning: string;
  symbolism: string;
  advice: string;
  relatedKeywords: string[];
  luckyNumbers: number[];
  significance: 'good' | 'neutral' | 'caution';
}

export default function DreamPage() {
  const [dreamText, setDreamText] = useState('');
  const [interpretation, setInterpretation] = useState<DreamInterpretation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const dreamDatabase: Record<string, DreamInterpretation> = {
    '뱀': {
      category: '동물',
      title: '뱀꿈 해몽',
      meaning: '뱀은 지혜, 변화, 재생을 상징합니다. 새로운 기회나 변화의 전조일 수 있습니다.',
      symbolism: '지혜, 변화, 재생, 치유, 신비한 힘',
      advice: '변화를 두려워하지 말고 새로운 기회를 잡으세요. 직감을 믿고 행동하는 것이 좋겠습니다.',
      relatedKeywords: ['동물', '파충류', '변화', '지혜', '신비'],
      luckyNumbers: [7, 15, 23, 31, 39],
      significance: 'good' as const
    },
    '물': {
      category: '자연',
      title: '물꿈 해몽',
      meaning: '물은 감정, 정화, 흐름을 나타냅니다. 맑은 물은 길조, 탁한 물은 주의가 필요합니다.',
      symbolism: '감정, 정화, 흐름, 생명력, 무의식',
      advice: '감정의 흐름에 따라 자연스럽게 행동하세요. 정화와 새로운 시작의 시기입니다.',
      relatedKeywords: ['자연', '강', '바다', '비', '눈물'],
      luckyNumbers: [3, 12, 21, 30, 42],
      significance: 'good'
    },
    '돈': {
      category: '재물',
      title: '돈꿈 해몽',
      meaning: '돈을 얻는 꿈은 실제 재물운의 상승을 의미할 수 있습니다. 노력의 결실을 맺을 시기입니다.',
      symbolism: '재물, 성공, 가치, 풍요, 안정',
      advice: '재정관리에 신경쓰시고, 투자나 사업에 좋은 기회가 올 수 있습니다.',
      relatedKeywords: ['재물', '성공', '돈', '금', '보석'],
      luckyNumbers: [8, 16, 24, 32, 40],
      significance: 'good'
    },
    '새': {
      category: '동물',
      title: '새꿈 해몽',
      meaning: '새는 자유, 희망, 메시지를 상징합니다. 좋은 소식이나 기회가 올 수 있습니다.',
      symbolism: '자유, 희망, 메시지, 영혼, 초월',
      advice: '새로운 가능성에 열린 마음을 가지세요. 좋은 소식을 기대해도 좋겠습니다.',
      relatedKeywords: ['동물', '하늘', '자유', '날개', '노래'],
      luckyNumbers: [5, 14, 22, 35, 41],
      significance: 'good'
    },
    '불': {
      category: '자연',
      title: '불꿈 해몽',
      meaning: '불은 열정, 변화, 에너지를 나타냅니다. 강한 의지력으로 목표를 달성할 수 있습니다.',
      symbolism: '열정, 변화, 에너지, 정화, 창조',
      advice: '목표를 향한 열정을 불태우세요. 강한 의지력으로 어려움을 극복할 수 있습니다.',
      relatedKeywords: ['자연', '열정', '에너지', '빛', '따뜻함'],
      luckyNumbers: [9, 18, 27, 36, 45],
      significance: 'good'
    },
    '죽음': {
      category: '상황',
      title: '죽음꿈 해몽',
      meaning: '죽음은 끝과 새로운 시작을 의미합니다. 변화와 재생의 상징일 수 있습니다.',
      symbolism: '끝, 새로운 시작, 변화, 재생, 순환',
      advice: '과거에 얽매이지 말고 새로운 시작을 준비하세요. 변화를 긍정적으로 받아들이는 것이 중요합니다.',
      relatedKeywords: ['변화', '끝', '시작', '재생', '전환'],
      luckyNumbers: [4, 13, 26, 34, 43],
      significance: 'neutral'
    },
    '집': {
      category: '장소',
      title: '집꿈 해몽',
      meaning: '집은 안정, 가족, 자아를 나타냅니다. 내적 평화와 안정을 찾을 수 있는 시기입니다.',
      symbolism: '안정, 가족, 자아, 보호, 터전',
      advice: '가족과의 시간을 소중히 하고, 안정적인 기반을 다지는데 집중하세요.',
      relatedKeywords: ['장소', '가족', '안정', '보금자리', '터전'],
      luckyNumbers: [6, 17, 25, 33, 38],
      significance: 'good'
    },
    '차': {
      category: '교통',
      title: '차꿈 해몽',
      meaning: '차는 목표 달성, 진전, 인생의 방향을 의미합니다. 계획한 일이 순조롭게 진행될 것입니다.',
      symbolism: '목표, 진전, 방향, 여행, 발전',
      advice: '목표를 향해 꾸준히 나아가세요. 계획을 세워 체계적으로 진행하는 것이 좋겠습니다.',
      relatedKeywords: ['교통', '여행', '목표', '진전', '방향'],
      luckyNumbers: [11, 19, 28, 37, 44],
      significance: 'good'
    }
  };

  const popularKeywords = ['뱀', '물', '돈', '새', '불', '집', '차', '죽음', '임신', '결혼', '시험', '여행'];

  const analyzeDream = () => {
    if (!dreamText.trim()) {
      alert('꿈 내용을 입력해 주세요.');
      return;
    }

    setIsAnalyzing(true);
    
    setTimeout(() => {
      // 키워드 매칭 로직
      let bestMatch: DreamInterpretation | null = null;
      let highestScore = 0;

      for (const [keyword, data] of Object.entries(dreamDatabase)) {
        let score = 0;
        
        // 직접 키워드 매칭
        if (dreamText.includes(keyword)) {
          score += 10;
        }
        
        // 관련 키워드 매칭
        data.relatedKeywords.forEach(relatedKeyword => {
          if (dreamText.includes(relatedKeyword)) {
            score += 5;
          }
        });
        
        // 부분 매칭
        if (dreamText.includes(keyword.substring(0, 1))) {
          score += 1;
        }
        
        if (score > highestScore) {
          highestScore = score;
          bestMatch = data;
        }
      }
      
      // 매칭되는 키워드가 없으면 랜덤 해석
      if (!bestMatch || highestScore === 0) {
        const randomKey = Object.keys(dreamDatabase)[Math.floor(Math.random() * Object.keys(dreamDatabase).length)];
        bestMatch = {
          ...dreamDatabase[randomKey as keyof typeof dreamDatabase],
          title: '일반 꿈 해몽',
          meaning: '꿈은 무의식의 메시지입니다. 이 꿈을 통해 내면의 목소리에 귀 기울여보세요.',
        };
      }
      
      setInterpretation(bestMatch);
      
      // 최근 검색에 추가
      const searchKeyword = dreamText.length > 20 ? dreamText.substring(0, 20) + '...' : dreamText;
      setRecentSearches(prev => {
        const updated = [searchKeyword, ...prev.filter(item => item !== searchKeyword)].slice(0, 5);
        return updated;
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const searchKeyword = (keyword: string) => {
    setDreamText(keyword);
    setTimeout(() => analyzeDream(), 100);
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'good': return 'text-green-600';
      case 'caution': return 'text-yellow-600';
      default: return 'text-blue-600';
    }
  };

  const getSignificanceBg = (significance: string) => {
    switch (significance) {
      case 'good': return 'from-green-50 to-emerald-50';
      case 'caution': return 'from-yellow-50 to-amber-50';
      default: return 'from-blue-50 to-cyan-50';
    }
  };

  const getSignificanceIcon = (significance: string) => {
    switch (significance) {
      case 'good': return '🌟';
      case 'caution': return '⚠️';
      default: return '🔮';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen gradient-bg py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl mb-6 shadow-xl">
              <Moon className="h-10 w-10 text-white" />
            </div>
            <h1 className="section-header glow-text mb-6">
              꿈해몽
            </h1>
            <p className="section-subheader">
              당신의 꿈이 전하는 메시지를 찾아보세요<br />
              무의식이 보내는 신호와 상징을 해석해드립니다
            </p>
          </div>

          {!interpretation ? (
            <div className="space-y-8">
              {/* 꿈 입력 폼 */}
              <div className="fortune-card p-8 md:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    꿈 내용을 입력하세요
                  </h3>
                  <p className="text-gray-600">
                    기억나는 꿈의 내용을 자세히 적어주세요
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      꿈 내용
                    </label>
                    <textarea
                      value={dreamText}
                      onChange={(e) => setDreamText(e.target.value)}
                      className="input-field min-h-[120px] text-lg resize-none"
                      placeholder="예: 하늘을 나는 꿈을 꾸었는데, 새처럼 자유롭게 날아다녔어요..."
                      rows={5}
                      maxLength={500}
                    />
                    <div className="text-right text-sm text-gray-500 mt-2">
                      {dreamText.length}/500
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={analyzeDream}
                      disabled={!dreamText.trim() || isAnalyzing}
                      className={`btn-primary text-xl px-12 py-5 ${
                        (!dreamText.trim() || isAnalyzing)
                          ? 'opacity-50 cursor-not-allowed'
                          : 'animate-pulse-glow'
                      }`}
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center space-x-3">
                          <div className="loading-spinner"></div>
                          <span>꿈을 해석하는 중...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <Brain className="h-6 w-6" />
                          <span>꿈 해몽하기</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 인기 키워드 */}
              <div className="fortune-card p-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  🔥 인기 꿈 키워드
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {popularKeywords.map((keyword, index) => (
                    <button
                      key={index}
                      onClick={() => searchKeyword(keyword)}
                      className="bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>

              {/* 최근 검색 */}
              {recentSearches.length > 0 && (
                <div className="fortune-card p-8">
                  <h3 className="text-xl font-bold text-center mb-6">
                    🕒 최근 검색한 꿈
                  </h3>
                  <div className="space-y-3">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setDreamText(search.replace('...', ''))}
                        className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl hover:from-gray-100 hover:to-purple-100 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <Search className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{search}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 꿈해몽 가이드 */}
              <div className="fortune-card p-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  📖 꿈해몽 가이드
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">🌟 좋은 꿈의 상징</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 맑은 물: 정화와 새로운 시작</li>
                      <li>• 높이 날기: 자유와 성취</li>
                      <li>• 금이나 보석: 재물운과 성공</li>
                      <li>• 무지개: 희망과 행운</li>
                      <li>• 꽃과 나무: 성장과 발전</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">⚠️ 주의해야 할 꿈</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 탁한 물: 감정의 혼란</li>
                      <li>• 추락하는 꿈: 불안감</li>
                      <li>• 어둠: 미지의 두려움</li>
                      <li>• 쫓기는 꿈: 스트레스</li>
                      <li>• 부서지는 것: 변화에 대한 저항</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* 해몽 결과 */}
              <div className="fortune-card p-8">
                <div className="text-center mb-8">
                  <div className={`inline-block bg-gradient-to-r ${getSignificanceBg(interpretation.significance)} px-6 py-3 rounded-2xl mb-4`}>
                    <span className="text-2xl mr-2">{getSignificanceIcon(interpretation.significance)}</span>
                    <span className={`text-xl font-bold ${getSignificanceColor(interpretation.significance)}`}>
                      {interpretation.title}
                    </span>
                  </div>
                  <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                    {interpretation.category}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">🔮 해몽</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {interpretation.meaning}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      🌟 상징 의미
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {interpretation.symbolism}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      💡 조언
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {interpretation.advice}
                    </p>
                  </div>
                </div>

                {/* 관련 키워드 */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">🏷️ 관련 키워드</h4>
                  <div className="flex flex-wrap gap-2">
                    {interpretation.relatedKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 행운 번호 */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    🎯 꿈에서 나온 행운 번호
                  </h4>
                  <div className="flex justify-center space-x-4">
                    {interpretation.luckyNumbers.map((number, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white font-bold">{number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 다시하기 버튼 */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setInterpretation(null);
                    setDreamText('');
                  }}
                  className="btn-secondary text-lg px-8 py-4 inline-flex items-center space-x-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>다른 꿈 해몽하기</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 