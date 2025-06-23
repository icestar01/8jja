'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Star, Heart, Coins, Shield, TrendingUp } from 'lucide-react';

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState('');

  const zodiacSigns = [
    { name: '양자리', period: '3.21 - 4.19', emoji: '♈', color: 'bg-red-500', element: '불' },
    { name: '황소자리', period: '4.20 - 5.20', emoji: '♉', color: 'bg-green-500', element: '땅' },
    { name: '쌍둥이자리', period: '5.21 - 6.21', emoji: '♊', color: 'bg-yellow-500', element: '공기' },
    { name: '게자리', period: '6.22 - 7.22', emoji: '♋', color: 'bg-blue-500', element: '물' },
    { name: '사자자리', period: '7.23 - 8.22', emoji: '♌', color: 'bg-orange-500', element: '불' },
    { name: '처녀자리', period: '8.23 - 9.22', emoji: '♍', color: 'bg-purple-500', element: '땅' },
    { name: '천칭자리', period: '9.23 - 10.22', emoji: '♎', color: 'bg-pink-500', element: '공기' },
    { name: '전갈자리', period: '10.23 - 11.21', emoji: '♏', color: 'bg-red-600', element: '물' },
    { name: '사수자리', period: '11.22 - 12.21', emoji: '♐', color: 'bg-indigo-500', element: '불' },
    { name: '염소자리', period: '12.22 - 1.19', emoji: '♑', color: 'bg-gray-600', element: '땅' },
    { name: '물병자리', period: '1.20 - 2.18', emoji: '♒', color: 'bg-cyan-500', element: '공기' },
    { name: '물고기자리', period: '2.19 - 3.20', emoji: '♓', color: 'bg-teal-500', element: '물' }
  ];

  const getHoroscopeFortune = (sign: string) => {
    const fortunes = {
      '양자리': {
        overall: '에너지가 넘치는 시기입니다. 새로운 도전을 두려워하지 말고 적극적으로 나서세요.',
        love: '열정적인 사랑이 기다리고 있습니다. 먼저 다가가는 용기를 가져보세요.',
        money: '투자나 새로운 사업에 좋은 기회가 있습니다. 신중하되 과감하게 결정하세요.',
        health: '활동적인 운동으로 체력을 기르세요. 무리하지 않는 선에서 도전해보세요.',
        career: '리더십을 발휘할 기회가 많습니다. 자신감을 가지고 앞장서세요.',
        lucky: { color: '빨간색', stone: '다이아몬드', day: '화요일' }
      },
      '황소자리': {
        overall: '안정과 평화를 추구하는 시기입니다. 꾸준함이 성공의 열쇠가 될 것입니다.',
        love: '진실하고 안정적인 관계를 만들어갈 수 있습니다. 인내심을 가지고 기다려보세요.',
        money: '착실한 저축과 투자로 재물을 불릴 수 있습니다. 장기적인 관점을 가지세요.',
        health: '규칙적인 생활 패턴이 건강의 비결입니다. 스트레스 관리에 신경 쓰세요.',
        career: '성실함과 책임감으로 인정받을 수 있습니다. 전문성을 기르는 데 집중하세요.',
        lucky: { color: '초록색', stone: '에메랄드', day: '금요일' }
      },
      '쌍둥이자리': {
        overall: '다양한 경험과 새로운 만남이 기다리고 있습니다. 호기심을 가지고 탐험해보세요.',
        love: '재미있고 지적인 대화를 나눌 수 있는 상대를 만날 수 있습니다.',
        money: '다양한 수입원을 개발할 수 있는 시기입니다. 정보 수집이 중요합니다.',
        health: '정신적 스트레스에 주의하세요. 충분한 휴식과 취미 활동이 도움됩니다.',
        career: '커뮤니케이션 능력을 활용할 기회가 많습니다. 네트워킹에 신경 쓰세요.',
        lucky: { color: '노란색', stone: '아가타', day: '수요일' }
      },
      '게자리': {
        overall: '가족과 집에 대한 관심이 높아지는 시기입니다. 감정적 안정을 찾으세요.',
        love: '따뜻하고 포근한 사랑을 경험할 수 있습니다. 감정 표현을 솔직하게 하세요.',
        money: '부동산이나 가정용품에 투자하기 좋은 시기입니다. 신중한 판단이 필요합니다.',
        health: '소화기 건강에 특히 신경 쓰세요. 규칙적인 식사가 중요합니다.',
        career: '팀워크와 협력으로 좋은 성과를 거둘 수 있습니다. 배려심을 발휘하세요.',
        lucky: { color: '은색', stone: '진주', day: '월요일' }
      },
      '사자자리': {
        overall: '자신감과 카리스마가 빛나는 시기입니다. 무대의 중심에 서는 것을 두려워하지 마세요.',
        love: '드라마틱하고 로맨틱한 사랑을 경험할 수 있습니다. 당당하게 어필하세요.',
        money: '창의적인 아이디어로 수익을 창출할 수 있습니다. 예술 분야에 투자해보세요.',
        health: '심장 건강에 주의하세요. 적당한 운동과 스트레스 관리가 중요합니다.',
        career: '창의성과 리더십으로 주목받을 수 있습니다. 자신의 재능을 마음껏 발휘하세요.',
        lucky: { color: '금색', stone: '루비', day: '일요일' }
      },
      '처녀자리': {
        overall: '완벽을 추구하는 성향이 강해지는 시기입니다. 세심함이 성공을 가져다줄 것입니다.',
        love: '진실하고 성실한 관계를 원합니다. 상대방의 작은 배려에도 감사함을 표현하세요.',
        money: '계획적인 재정 관리로 안정적인 수익을 얻을 수 있습니다. 분석적 접근이 도움됩니다.',
        health: '건강 관리에 특별히 신경 쓰는 시기입니다. 정기 검진을 받아보세요.',
        career: '꼼꼼함과 전문성으로 인정받을 수 있습니다. 디테일에 집중하세요.',
        lucky: { color: '갈색', stone: '사파이어', day: '수요일' }
      },
      '천칭자리': {
        overall: '균형과 조화를 추구하는 시기입니다. 아름다운 것들에 둘러싸여 행복을 느끼세요.',
        love: '우아하고 세련된 사랑을 경험할 수 있습니다. 상대방과의 조화를 중시하세요.',
        money: '파트너십이나 공동 투자에서 좋은 결과를 얻을 수 있습니다. 협력이 중요합니다.',
        health: '신장과 허리 건강에 주의하세요. 균형 잡힌 식단을 유지하세요.',
        career: '협상과 중재 능력을 발휘할 기회가 많습니다. 공정함을 유지하세요.',
        lucky: { color: '파스텔 블루', stone: '오팔', day: '금요일' }
      },
      '전갈자리': {
        overall: '강렬하고 깊이 있는 경험을 하게 되는 시기입니다. 직감을 믿고 행동하세요.',
        love: '운명적이고 열정적인 사랑을 만날 수 있습니다. 진정성 있는 관계를 추구하세요.',
        money: '투자나 재정 관리에서 뛰어난 감각을 발휘할 수 있습니다. 장기적 관점을 가지세요.',
        health: '생식기와 배설기 건강에 주의하세요. 정기적인 건강 검진이 중요합니다.',
        career: '연구나 조사 분야에서 두각을 나타낼 수 있습니다. 집중력을 발휘하세요.',
        lucky: { color: '진홍색', stone: '토파즈', day: '화요일' }
      },
      '사수자리': {
        overall: '자유롭고 모험적인 정신이 발휘되는 시기입니다. 새로운 경험을 두려워하지 마세요.',
        love: '자유로운 영혼과 통하는 상대를 만날 수 있습니다. 솔직한 마음을 표현하세요.',
        money: '해외 투자나 교육 분야에서 좋은 기회가 있습니다. 시야를 넓혀보세요.',
        health: '다리와 허벅지 건강에 주의하세요. 활동적인 운동이 도움됩니다.',
        career: '교육이나 출판 분야에서 성과를 거둘 수 있습니다. 지식을 나누는 것을 두려워하지 마세요.',
        lucky: { color: '보라색', stone: '터키석', day: '목요일' }
      },
      '염소자리': {
        overall: '목표 달성을 위해 꾸준히 노력하는 시기입니다. 인내심을 가지고 계속 전진하세요.',
        love: '진지하고 안정적인 관계를 원합니다. 책임감 있는 모습을 보여주세요.',
        money: '장기적인 투자와 저축으로 안정적인 재정을 구축할 수 있습니다.',
        health: '뼈와 관절 건강에 주의하세요. 칼슘 섭취와 적당한 운동이 중요합니다.',
        career: '성실함과 책임감으로 승진이나 인정을 받을 수 있습니다. 목표를 향해 꾸준히 나아가세요.',
        lucky: { color: '검은색', stone: '가넷', day: '토요일' }
      },
      '물병자리': {
        overall: '독창적이고 혁신적인 아이디어가 빛나는 시기입니다. 남들과 다른 길을 걸어보세요.',
        love: '독특하고 개성 있는 상대에게 끌릴 수 있습니다. 우정에서 시작되는 사랑을 기대해보세요.',
        money: '기술이나 혁신 분야에 투자하기 좋은 시기입니다. 미래 지향적 사고가 도움됩니다.',
        health: '순환기와 신경계 건강에 주의하세요. 스트레스 관리가 중요합니다.',
        career: '창의적이고 혁신적인 프로젝트에서 두각을 나타낼 수 있습니다. 독창성을 발휘하세요.',
        lucky: { color: '전기 블루', stone: '아메시스트', day: '토요일' }
      },
      '물고기자리': {
        overall: '직감과 영감이 뛰어난 시기입니다. 예술적 감성을 마음껏 발휘해보세요.',
        love: '로맨틱하고 감성적인 사랑을 경험할 수 있습니다. 감정에 솔직해지세요.',
        money: '예술이나 창작 활동으로 수익을 얻을 수 있습니다. 직감을 믿고 투자해보세요.',
        health: '발과 면역 시스템에 주의하세요. 충분한 휴식과 명상이 도움됩니다.',
        career: '예술, 치료, 봉사 분야에서 재능을 발휘할 수 있습니다. 공감 능력을 활용하세요.',
        lucky: { color: '바다색', stone: '아쿠아마린', day: '목요일' }
      }
    };
    
    return fortunes[sign as keyof typeof fortunes] || fortunes['양자리'];
  };

  const fortune = selectedSign ? getHoroscopeFortune(selectedSign) : null;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        {/* 헤더 섹션 */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Star className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">별자리 운세</h1>
            <p className="text-xl opacity-90">12별자리로 보는 오늘의 운세</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {!selectedSign ? (
            /* 별자리 선택 */
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                당신의 별자리를 선택하세요
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {zodiacSigns.map((sign) => (
                  <button
                    key={sign.name}
                    onClick={() => setSelectedSign(sign.name)}
                    className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-center"
                  >
                    <div className="text-4xl mb-2">{sign.emoji}</div>
                    <h3 className="font-bold text-gray-800 mb-1">{sign.name}</h3>
                    <p className="text-xs text-gray-600 mb-1">{sign.period}</p>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{sign.element}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* 운세 결과 */
            <div className="space-y-8">
              {/* 선택된 별자리 정보 */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">
                  {zodiacSigns.find(s => s.name === selectedSign)?.emoji}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedSign} 운세
                </h2>
                <p className="text-gray-600 mb-2">
                  {zodiacSigns.find(s => s.name === selectedSign)?.period}
                </p>
                <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  {zodiacSigns.find(s => s.name === selectedSign)?.element} 원소
                </span>
              </div>

              {/* 전체 운세 */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
                  오늘의 전체운
                </h3>
                <p className="text-gray-700 leading-relaxed">{fortune?.overall}</p>
              </div>

              {/* 분야별 운세 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    사랑운
                  </h4>
                  <p className="text-gray-700">{fortune?.love}</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <Coins className="h-5 w-5 text-yellow-500 mr-2" />
                    금전운
                  </h4>
                  <p className="text-gray-700">{fortune?.money}</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    건강운
                  </h4>
                  <p className="text-gray-700">{fortune?.health}</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                    직업운
                  </h4>
                  <p className="text-gray-700">{fortune?.career}</p>
                </div>
              </div>

              {/* 행운의 아이템 */}
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">오늘의 행운 아이템</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">럭키 컬러</h4>
                    <p className="text-lg text-indigo-600">{fortune?.lucky.color}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">행운의 보석</h4>
                    <p className="text-lg text-indigo-600">{fortune?.lucky.stone}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">럭키 데이</h4>
                    <p className="text-lg text-indigo-600">{fortune?.lucky.day}</p>
                  </div>
                </div>
              </div>

              {/* 다시 보기 버튼 */}
              <div className="text-center">
                <button
                  onClick={() => setSelectedSign('')}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                >
                  다른 별자리 보기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 