'use client';

import { useState } from 'react';
import Layout from '../../../components/layout/Layout';

interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  description: string;
  image: string;
}

interface TarotReading {
  cards: TarotCard[];
  overall: string;
  advice: string;
  caution: string;
}

export default function TarotPage() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [result, setResult] = useState<TarotReading | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [readingType, setReadingType] = useState<'single' | 'three' | 'love'>('three');

  const tarotCards: TarotCard[] = [
    { id: 1, name: '바보', meaning: '새로운 시작', description: '순수하고 자유로운 영혼으로 새로운 모험을 시작하는 카드', image: '🃏' },
    { id: 2, name: '마법사', meaning: '창조와 의지', description: '강한 의지력과 창조적 에너지로 목표를 달성할 수 있는 카드', image: '🎩' },
    { id: 3, name: '여교황', meaning: '직감과 신비', description: '내면의 목소리에 귀 기울이고 직감을 믿으라는 메시지', image: '👸' },
    { id: 4, name: '황후', meaning: '풍요와 창조', description: '풍요로움과 창조적 에너지가 넘치는 시기를 의미', image: '👑' },
    { id: 5, name: '황제', meaning: '권위와 안정', description: '리더십과 안정적인 기반을 바탕으로 한 성공', image: '👨‍💼' },
    { id: 6, name: '교황', meaning: '전통과 지혜', description: '전통적인 지혜와 정신적 가르침을 의미하는 카드', image: '⛪' },
    { id: 7, name: '연인', meaning: '사랑과 선택', description: '중요한 선택의 순간, 특히 사랑과 관련된 결정', image: '💑' },
    { id: 8, name: '전차', meaning: '의지와 승리', description: '강한 의지력으로 어려움을 극복하고 목표를 달성', image: '🏆' },
    { id: 9, name: '힘', meaning: '내적 힘과 용기', description: '내면의 강인함과 용기로 시련을 이겨내는 카드', image: '💪' },
    { id: 10, name: '은둔자', meaning: '성찰과 지혜', description: '혼자만의 시간을 통해 내면의 지혜를 찾는 시기', image: '🕯️' },
    { id: 11, name: '운명의 바퀴', meaning: '변화와 운명', description: '인생의 큰 변화와 새로운 기회의 도래', image: '☸️' },
    { id: 12, name: '정의', meaning: '균형과 공정', description: '공정한 판단과 균형 잡힌 결과를 의미', image: '⚖️' },
    { id: 13, name: '매달린 사람', meaning: '희생과 기다림', description: '현재 상황에서 인내하며 새로운 관점을 얻는 시기', image: '🙃' },
    { id: 14, name: '죽음', meaning: '변화와 재생', description: '끝과 새로운 시작, 근본적인 변화를 의미', image: '💀' },
    { id: 15, name: '절제', meaning: '조화와 균형', description: '절제와 조화를 통해 안정을 찾는 카드', image: '🕊️' },
    { id: 16, name: '악마', meaning: '유혹과 속박', description: '물질적 욕망이나 부정적 에너지에 얽매인 상태', image: '😈' },
    { id: 17, name: '탑', meaning: '파괴와 깨달음', description: '기존 질서의 붕괴를 통한 새로운 깨달음', image: '🏗️' },
    { id: 18, name: '별', meaning: '희망과 영감', description: '밝은 미래에 대한 희망과 영감을 주는 카드', image: '⭐' },
    { id: 19, name: '달', meaning: '환상과 불안', description: '불확실성과 혼란, 숨겨진 진실을 찾아야 하는 시기', image: '🌙' },
    { id: 20, name: '태양', meaning: '성공과 기쁨', description: '성공과 행복, 밝은 에너지가 가득한 카드', image: '☀️' },
    { id: 21, name: '심판', meaning: '재생과 각성', description: '과거를 정리하고 새로운 삶으로 나아가는 시기', image: '📯' },
    { id: 22, name: '세계', meaning: '완성과 성취', description: '목표 달성과 완성, 새로운 사이클의 시작', image: '🌍' },
  ];

  const handleCardSelect = (cardId: number) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else {
      const maxCards = readingType === 'single' ? 1 : readingType === 'three' ? 3 : 3;
      if (selectedCards.length < maxCards) {
        setSelectedCards([...selectedCards, cardId]);
      }
    }
  };

  const generateReading = () => {
    if (selectedCards.length === 0) {
      alert('카드를 선택해주세요.');
      return;
    }

    const requiredCards = readingType === 'single' ? 1 : 3;
    if (selectedCards.length !== requiredCards) {
      alert(`${requiredCards}장의 카드를 선택해주세요.`);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const selectedTarotCards = selectedCards.map(id => 
        tarotCards.find(card => card.id === id)!
      );

      let overall = '';
      let advice = '';
      let caution = '';

      if (readingType === 'single') {
        const card = selectedTarotCards[0];
        overall = `${card.name} 카드가 선택되었습니다. ${card.description} 현재 상황에서 ${card.meaning.toLowerCase()}의 에너지가 강하게 작용하고 있습니다.`;
        advice = getAdviceByCard(card);
        caution = getCautionByCard(card);
      } else if (readingType === 'three') {
        overall = `과거-현재-미래를 나타내는 세 장의 카드가 선택되었습니다. ${selectedTarotCards[0].name}(과거), ${selectedTarotCards[1].name}(현재), ${selectedTarotCards[2].name}(미래)의 흐름을 보여줍니다.`;
        advice = `현재 ${selectedTarotCards[1].name}의 에너지를 잘 활용하여 ${selectedTarotCards[2].name}가 의미하는 미래로 나아가세요.`;
        caution = `과거의 ${selectedTarotCards[0].name} 에너지에 너무 얽매이지 말고, 현재에 집중하는 것이 중요합니다.`;
      } else {
        overall = `연애운을 나타내는 세 장의 카드입니다. 당신의 마음(${selectedTarotCards[0].name}), 상대방의 마음(${selectedTarotCards[1].name}), 관계의 미래(${selectedTarotCards[2].name})를 보여줍니다.`;
        advice = `서로의 감정을 이해하고 ${selectedTarotCards[2].name}가 의미하는 방향으로 관계를 발전시켜 나가세요.`;
        caution = `성급한 판단보다는 시간을 두고 차근차근 관계를 발전시키는 것이 좋겠습니다.`;
      }

      setResult({
        cards: selectedTarotCards,
        overall,
        advice,
        caution
      });
      setIsLoading(false);
    }, 2500);
  };

  const getAdviceByCard = (card: TarotCard): string => {
    const advices: Record<string, string> = {
      '바보': '새로운 시작을 두려워하지 말고 순수한 마음으로 도전해보세요.',
      '마법사': '당신의 능력을 믿고 적극적으로 행동에 옮겨보세요.',
      '여교황': '직감을 믿고 내면의 목소리에 귀 기울여보세요.',
      '황후': '창조적인 에너지를 발휘하여 풍요로운 결과를 만들어보세요.',
      '황제': '체계적인 계획을 세우고 리더십을 발휘해보세요.',
      '교황': '경험자의 조언을 구하고 전통적인 방법을 고려해보세요.',
      '연인': '중요한 선택 앞에서 마음의 소리를 들어보세요.',
      '전차': '목표를 향해 강한 의지로 전진하세요.',
      '힘': '내면의 힘을 믿고 어려움을 극복해 나가세요.',
      '은둔자': '혼자만의 시간을 갖고 깊이 성찰해보세요.',
      '운명의 바퀴': '변화의 흐름에 몸을 맡기고 새로운 기회를 잡으세요.',
      '정의': '공정하고 균형 잡힌 판단을 내리도록 노력하세요.',
      '매달린 사람': '현재 상황을 받아들이고 인내심을 가져보세요.',
      '죽음': '과거를 정리하고 새로운 시작을 준비하세요.',
      '절제': '극단적인 선택보다는 중도를 지키며 조화를 추구하세요.',
      '악마': '부정적인 유혹에서 벗어나 자유로워지려 노력하세요.',
      '탑': '기존의 틀을 깨고 새로운 관점에서 바라보세요.',
      '별': '희망을 잃지 말고 꿈을 향해 나아가세요.',
      '달': '혼란스러운 상황에서 진실을 찾으려 노력하세요.',
      '태양': '긍정적인 에너지로 성공을 향해 나아가세요.',
      '심판': '과거를 돌아보고 새로운 결심을 다져보세요.',
      '세계': '지금까지의 노력이 결실을 맺을 때입니다.'
    };
    return advices[card.name] || '현재 상황에서 최선의 선택을 하려 노력하세요.';
  };

  const getCautionByCard = (card: TarotCard): string => {
    const cautions: Record<string, string> = {
      '바보': '너무 무모하게 행동하지 말고 신중함도 필요합니다.',
      '마법사': '자만심에 빠지지 말고 겸손한 자세를 유지하세요.',
      '여교황': '직감에만 의존하지 말고 현실적인 판단도 고려하세요.',
      '황후': '과도한 욕심은 오히려 독이 될 수 있습니다.',
      '황제': '너무 권위적이 되지 말고 다른 사람의 의견도 들어보세요.',
      '교황': '고정관념에 얽매이지 말고 유연한 사고를 가지세요.',
      '연인': '감정에만 치우쳐 중요한 것을 놓치지 않도록 주의하세요.',
      '전차': '목표에만 집착하여 주변을 돌보지 못하지 않도록 하세요.',
      '힘': '자신만 믿고 다른 사람의 도움을 거부하지 마세요.',
      '은둔자': '너무 오래 혼자 있지 말고 적절한 시점에 세상으로 나오세요.',
      '운명의 바퀴': '운에만 의존하지 말고 스스로의 노력도 기울이세요.',
      '정의': '너무 완벽을 추구하여 결정을 미루지 마세요.',
      '매달린 사람': '수동적인 자세에서 벗어나 적극성도 필요합니다.',
      '죽음': '변화를 두려워하여 기회를 놓치지 마세요.',
      '절제': '지나친 절제로 기회를 놓치지 않도록 주의하세요.',
      '악마': '현실을 회피하지 말고 문제에 직면하세요.',
      '탑': '너무 급진적인 변화는 부작용을 낳을 수 있습니다.',
      '별': '너무 이상만 쫓다가 현실을 잊지 마세요.',
      '달': '불안에 사로잡혀 행동을 주저하지 마세요.',
      '태양': '과도한 자신감은 실수의 원인이 될 수 있습니다.',
      '심판': '과거에 너무 얽매이지 말고 미래를 바라보세요.',
      '세계': '성취에 안주하지 말고 새로운 목표를 세우세요.'
    };
    return cautions[card.name] || '현재 상황을 정확히 파악하고 신중하게 행동하세요.';
  };

  const resetReading = () => {
    setSelectedCards([]);
    setResult(null);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-korean-serif">
              타로 카드
            </h1>
            <p className="text-xl text-gray-600 mb-2">Tarot Card Reading</p>
            <p className="text-gray-500">
              카드를 선택하여 당신의 운명을 알아보세요
            </p>
          </div>

          {!result ? (
            <div className="space-y-8">
              {/* Reading Type Selection */}
              <div className="fortune-card p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  타로 스프레드 선택
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => { setReadingType('single'); setSelectedCards([]); }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      readingType === 'single'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 text-gray-600'
                    }`}
                  >
                    <div className="text-2xl mb-2">🃏</div>
                    <div className="font-semibold">원카드</div>
                    <div className="text-sm text-gray-500">하나의 카드로 현재 상황</div>
                  </button>
                  <button
                    onClick={() => { setReadingType('three'); setSelectedCards([]); }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      readingType === 'three'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 text-gray-600'
                    }`}
                  >
                    <div className="text-2xl mb-2">🃏🃏🃏</div>
                    <div className="font-semibold">쓰리카드</div>
                    <div className="text-sm text-gray-500">과거-현재-미래</div>
                  </button>
                  <button
                    onClick={() => { setReadingType('love'); setSelectedCards([]); }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      readingType === 'love'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 text-gray-600'
                    }`}
                  >
                    <div className="text-2xl mb-2">💑</div>
                    <div className="font-semibold">연애운</div>
                    <div className="text-sm text-gray-500">나-상대방-관계</div>
                  </button>
                </div>
              </div>

              {/* Card Selection */}
              <div className="fortune-card p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  카드 선택 ({selectedCards.length}/{readingType === 'single' ? 1 : 3})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {tarotCards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => handleCardSelect(card.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedCards.includes(card.id)
                          ? 'border-purple-500 bg-purple-50 text-purple-700 transform scale-105'
                          : 'border-gray-200 hover:border-purple-300 text-gray-600 hover:shadow-lg'
                      }`}
                      disabled={!selectedCards.includes(card.id) && selectedCards.length >= (readingType === 'single' ? 1 : 3)}
                    >
                      <div className="text-3xl mb-2">{card.image}</div>
                      <div className="text-sm font-medium">{card.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{card.meaning}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <button
                  onClick={generateReading}
                  disabled={selectedCards.length === 0 || isLoading}
                  className={`btn-primary text-lg px-8 py-4 ${
                    (selectedCards.length === 0 || isLoading)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {isLoading ? '카드를 읽는 중...' : '타로 리딩 시작'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selected Cards */}
              <div className="fortune-card p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  선택된 카드
                </h3>
                <div className="flex justify-center space-x-6">
                  {result.cards.map((card, index) => (
                    <div key={card.id} className="text-center">
                      <div className="text-6xl mb-3">{card.image}</div>
                      <div className="text-lg font-bold text-purple-600 mb-1">{card.name}</div>
                      <div className="text-sm text-gray-600">{card.meaning}</div>
                      {readingType === 'three' && (
                        <div className="text-xs text-gray-500 mt-1">
                          {index === 0 ? '과거' : index === 1 ? '현재' : '미래'}
                        </div>
                      )}
                      {readingType === 'love' && (
                        <div className="text-xs text-gray-500 mt-1">
                          {index === 0 ? '나의 마음' : index === 1 ? '상대방 마음' : '관계의 미래'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reading Result */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">전체적인 의미</h4>
                  <p className="text-gray-700 leading-relaxed">{result.overall}</p>
                </div>
                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">조언</h4>
                  <p className="text-gray-700 leading-relaxed">{result.advice}</p>
                </div>
                <div className="fortune-card p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">주의사항</h4>
                  <p className="text-gray-700 leading-relaxed">{result.caution}</p>
                </div>
              </div>

              {/* Card Descriptions */}
              <div className="fortune-card p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  카드 상세 의미
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.cards.map((card) => (
                    <div key={card.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{card.image}</span>
                        <span className="text-lg font-semibold text-purple-600">{card.name}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <div className="text-center">
                <button
                  onClick={resetReading}
                  className="btn-secondary"
                >
                  다시 보기
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="fortune-card p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">
                신비로운 타로 카드의 메시지를 해석하고 있습니다...<br />
                잠시만 기다려주세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 