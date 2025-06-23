'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Calendar, Star, Heart, Coins, Shield, TrendingUp } from 'lucide-react';

export default function ZodiacPage() {
  const [selectedZodiac, setSelectedZodiac] = useState('');

  const zodiacAnimals = [
    { name: '쥐', year: '1972, 1984, 1996, 2008, 2020', emoji: '🐭', color: 'bg-gray-500' },
    { name: '소', year: '1973, 1985, 1997, 2009, 2021', emoji: '🐂', color: 'bg-brown-500' },
    { name: '호랑이', year: '1974, 1986, 1998, 2010, 2022', emoji: '🐅', color: 'bg-orange-500' },
    { name: '토끼', year: '1975, 1987, 1999, 2011, 2023', emoji: '🐰', color: 'bg-pink-500' },
    { name: '용', year: '1976, 1988, 2000, 2012, 2024', emoji: '🐲', color: 'bg-blue-500' },
    { name: '뱀', year: '1977, 1989, 2001, 2013, 2025', emoji: '🐍', color: 'bg-green-500' },
    { name: '말', year: '1978, 1990, 2002, 2014, 2026', emoji: '🐴', color: 'bg-red-500' },
    { name: '양', year: '1979, 1991, 2003, 2015, 2027', emoji: '🐑', color: 'bg-purple-500' },
    { name: '원숭이', year: '1980, 1992, 2004, 2016, 2028', emoji: '🐵', color: 'bg-yellow-500' },
    { name: '닭', year: '1981, 1993, 2005, 2017, 2029', emoji: '🐓', color: 'bg-amber-500' },
    { name: '개', year: '1982, 1994, 2006, 2018, 2030', emoji: '🐕', color: 'bg-indigo-500' },
    { name: '돼지', year: '1983, 1995, 2007, 2019, 2031', emoji: '🐷', color: 'bg-rose-500' }
  ];

  const getZodiacFortune = (zodiac: string) => {
    const fortunes = {
      '쥐': {
        overall: '올해는 새로운 기회가 많이 찾아오는 해입니다. 적극적인 자세로 도전하세요.',
        love: '진정한 사랑을 만날 가능성이 높습니다. 열린 마음으로 새로운 인연을 받아들이세요.',
        money: '투자나 부업에서 좋은 성과를 거둘 수 있습니다. 신중한 판단이 필요합니다.',
        health: '규칙적인 생활 패턴을 유지하면 건강한 한 해를 보낼 수 있습니다.',
        career: '승진이나 이직의 기회가 있을 수 있습니다. 준비된 자에게 기회가 옵니다.',
        lucky: { color: '파란색', number: '3, 7', direction: '북쪽' }
      },
      '소': {
        overall: '꾸준함과 성실함이 빛을 발하는 해입니다. 차근차근 목표를 향해 나아가세요.',
        love: '안정적인 관계를 유지할 수 있습니다. 서로에 대한 이해와 배려가 중요합니다.',
        money: '착실한 저축과 투자로 재물을 불릴 수 있습니다. 무리한 투자는 피하세요.',
        health: '과로에 주의하고 충분한 휴식을 취하세요. 정기 건강검진을 받으시기 바랍니다.',
        career: '성실한 업무 태도로 인정받을 수 있습니다. 새로운 기술 습득에 투자하세요.',
        lucky: { color: '노란색', number: '2, 8', direction: '동쪽' }
      },
      '호랑이': {
        overall: '역동적이고 활기찬 한 해가 될 것입니다. 리더십을 발휘할 기회가 많습니다.',
        love: '열정적인 사랑을 경험할 수 있습니다. 감정 표현을 솔직하게 하세요.',
        money: '대담한 투자로 큰 수익을 얻을 가능성이 있습니다. 리스크 관리는 필수입니다.',
        health: '활동적인 운동으로 체력을 기르세요. 스트레스 관리에 신경 쓰시기 바랍니다.',
        career: '새로운 프로젝트나 사업에서 성공할 가능성이 높습니다. 도전 정신을 발휘하세요.',
        lucky: { color: '빨간색', number: '1, 9', direction: '남쪽' }
      },
      '토끼': {
        overall: '평화롭고 안정적인 한 해가 예상됩니다. 인간관계에서 좋은 운이 따릅니다.',
        love: '따뜻하고 포근한 사랑을 만날 수 있습니다. 가족과의 시간을 소중히 하세요.',
        money: '안정적인 수입원을 확보할 수 있습니다. 계획적인 소비가 중요합니다.',
        health: '전반적으로 건강한 상태를 유지할 수 있습니다. 정신적 안정이 중요합니다.',
        career: '협력과 팀워크로 좋은 성과를 거둘 수 있습니다. 소통 능력을 기르세요.',
        lucky: { color: '초록색', number: '4, 6', direction: '서쪽' }
      },
      '용': {
        overall: '큰 성취와 발전이 기대되는 해입니다. 자신감을 가지고 도전하세요.',
        love: '운명적인 만남이 있을 수 있습니다. 직감을 믿고 행동하세요.',
        money: '큰 돈을 벌 기회가 있습니다. 장기적인 관점에서 투자하세요.',
        health: '에너지가 넘치는 한 해입니다. 과도한 활동으로 인한 부상에 주의하세요.',
        career: '승진이나 큰 성과를 이룰 가능성이 높습니다. 리더십을 발휘할 때입니다.',
        lucky: { color: '금색', number: '5, 7', direction: '동남쪽' }
      },
      '뱀': {
        overall: '지혜와 직감이 빛나는 해입니다. 신중한 판단으로 성공을 이루세요.',
        love: '깊이 있는 관계를 형성할 수 있습니다. 진정성 있는 소통이 중요합니다.',
        money: '투자 감각이 뛰어난 시기입니다. 정보 수집과 분석에 집중하세요.',
        health: '스트레스 관리가 중요합니다. 명상이나 요가 등으로 마음의 평안을 찾으세요.',
        career: '전문성을 인정받을 수 있습니다. 꾸준한 학습과 연구가 필요합니다.',
        lucky: { color: '보라색', number: '2, 9', direction: '남서쪽' }
      },
      '말': {
        overall: '자유롭고 활동적인 한 해가 될 것입니다. 새로운 경험을 두려워하지 마세요.',
        love: '활발한 만남과 즐거운 연애를 할 수 있습니다. 솔직한 마음을 표현하세요.',
        money: '다양한 수입원을 개발할 수 있습니다. 부지런함이 재물을 부릅니다.',
        health: '활동적인 생활로 건강을 유지할 수 있습니다. 규칙적인 운동이 도움됩니다.',
        career: '새로운 분야에 도전할 기회가 있습니다. 변화를 두려워하지 마세요.',
        lucky: { color: '주황색', number: '3, 8', direction: '북서쪽' }
      },
      '양': {
        overall: '예술적 감성과 창의력이 발휘되는 해입니다. 아름다운 것들을 추구하세요.',
        love: '로맨틱하고 감성적인 사랑을 경험할 수 있습니다. 감정 표현을 풍부하게 하세요.',
        money: '예술이나 창작 활동으로 수익을 얻을 수 있습니다. 재능을 활용하세요.',
        health: '감정 기복에 주의하세요. 충분한 휴식과 취미 활동이 도움됩니다.',
        career: '창의적인 업무에서 두각을 나타낼 수 있습니다. 예술적 감각을 살리세요.',
        lucky: { color: '분홍색', number: '1, 6', direction: '동북쪽' }
      },
      '원숭이': {
        overall: '재치와 유머로 인기를 끌 수 있는 해입니다. 사교성을 발휘하세요.',
        love: '재미있고 유쾌한 연애를 할 수 있습니다. 상대방을 즐겁게 해주세요.',
        money: '아이디어로 돈을 벌 수 있습니다. 창의적인 사업 아이템을 찾아보세요.',
        health: '활발한 활동으로 건강을 유지할 수 있습니다. 과도한 음주는 피하세요.',
        career: '아이디어와 창의력으로 성과를 거둘 수 있습니다. 네트워킹이 중요합니다.',
        lucky: { color: '하얀색', number: '4, 9', direction: '서남쪽' }
      },
      '닭': {
        overall: '계획적이고 체계적인 접근으로 성공할 수 있는 해입니다. 꼼꼼함이 장점입니다.',
        love: '진실한 마음으로 사랑을 표현하세요. 성실함이 좋은 결과를 가져옵니다.',
        money: '계획적인 재정 관리로 안정적인 수익을 얻을 수 있습니다. 절약 정신이 중요합니다.',
        health: '규칙적인 생활 패턴을 유지하세요. 조기 발견과 예방이 중요합니다.',
        career: '성실함과 책임감으로 인정받을 수 있습니다. 전문성을 기르는 데 집중하세요.',
        lucky: { color: '갈색', number: '5, 8', direction: '중앙' }
      },
      '개': {
        overall: '충실함과 의리로 많은 사람들의 신뢰를 얻을 수 있는 해입니다.',
        love: '진정한 우정과 사랑을 바탕으로 한 관계를 만들 수 있습니다. 신뢰가 중요합니다.',
        money: '성실한 노력으로 안정적인 수입을 얻을 수 있습니다. 투기는 피하세요.',
        health: '꾸준한 운동과 건강한 식습관으로 체력을 유지하세요. 스트레스 관리가 필요합니다.',
        career: '팀워크와 협력으로 좋은 성과를 거둘 수 있습니다. 신뢰 관계 구축이 중요합니다.',
        lucky: { color: '검은색', number: '1, 7', direction: '북동쪽' }
      },
      '돼지': {
        overall: '풍요롭고 행복한 한 해가 될 것입니다. 관대함과 포용력을 발휘하세요.',
        love: '따뜻하고 포근한 사랑을 만날 수 있습니다. 가족과의 화목이 중요합니다.',
        money: '재물운이 좋은 시기입니다. 투자나 사업에서 좋은 성과를 기대할 수 있습니다.',
        health: '전반적으로 건강한 상태를 유지할 수 있습니다. 과식에 주의하세요.',
        career: '인간관계를 통해 좋은 기회를 얻을 수 있습니다. 네트워킹에 신경 쓰세요.',
        lucky: { color: '회색', number: '2, 6', direction: '서북쪽' }
      }
    };
    
    return fortunes[zodiac as keyof typeof fortunes] || fortunes['쥐'];
  };

  const fortune = selectedZodiac ? getZodiacFortune(selectedZodiac) : null;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        {/* 헤더 섹션 */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">띠 운세</h1>
            <p className="text-xl opacity-90">12간지 동물로 보는 올해의 운세</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {!selectedZodiac ? (
            /* 띠 선택 */
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                당신의 띠를 선택하세요
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {zodiacAnimals.map((animal) => (
                  <button
                    key={animal.name}
                    onClick={() => setSelectedZodiac(animal.name)}
                    className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-center"
                  >
                    <div className="text-4xl mb-2">{animal.emoji}</div>
                    <h3 className="font-bold text-gray-800 mb-1">{animal.name}</h3>
                    <p className="text-xs text-gray-600">{animal.year}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* 운세 결과 */
            <div className="space-y-8">
              {/* 선택된 띠 정보 */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">
                  {zodiacAnimals.find(a => a.name === selectedZodiac)?.emoji}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedZodiac}띠 운세
                </h2>
                <p className="text-gray-600">
                  {zodiacAnimals.find(a => a.name === selectedZodiac)?.year}
                </p>
              </div>

              {/* 전체 운세 */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
                  총운
                </h3>
                <p className="text-gray-700 leading-relaxed">{fortune?.overall}</p>
              </div>

              {/* 분야별 운세 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    애정운
                  </h4>
                  <p className="text-gray-700">{fortune?.love}</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <Coins className="h-5 w-5 text-yellow-500 mr-2" />
                    재물운
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
                    사업운
                  </h4>
                  <p className="text-gray-700">{fortune?.career}</p>
                </div>
              </div>

              {/* 행운의 아이템 */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">행운의 아이템</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">행운의 색상</h4>
                    <p className="text-lg text-purple-600">{fortune?.lucky.color}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">행운의 숫자</h4>
                    <p className="text-lg text-purple-600">{fortune?.lucky.number}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">행운의 방향</h4>
                    <p className="text-lg text-purple-600">{fortune?.lucky.direction}</p>
                  </div>
                </div>
              </div>

              {/* 다시 보기 버튼 */}
              <div className="text-center">
                <button
                  onClick={() => setSelectedZodiac('')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  다른 띠 보기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 