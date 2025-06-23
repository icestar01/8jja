'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { ChefHat, Sparkles, Download, Share2, RefreshCw, Clock, Star } from 'lucide-react';

interface FoodFortune {
  name: string;
  category: string;
  description: string;
  benefits: string[];
  recipe: string;
  ingredients: string[];
  timing: string;
  energy: string;
  element: string;
  emoji: string;
}

const foodDatabase: FoodFortune[] = [
  {
    name: '황금 달걀찜',
    category: '메인 요리',
    description: '부드럽고 영양가 높은 달걀찜으로 금전운과 건강운을 동시에 높여주는 행운의 음식입니다.',
    benefits: ['금전운 상승', '건강 증진', '집중력 향상', '가족 화합'],
    recipe: '달걀 4개를 풀어 멸치육수와 섞고, 소금으로 간을 맞춘 후 약불에서 천천히 쪄내세요.',
    ingredients: ['달걀 4개', '멸치육수 1컵', '소금 약간', '대파 1대', '당근 조금'],
    timing: '아침 7-9시',
    energy: '양(陽)',
    element: '금(金)',
    emoji: '🥚'
  },
  {
    name: '연꽃잎 차',
    category: '음료',
    description: '마음을 정화하고 영적 에너지를 높여주는 신성한 차로, 직감력과 통찰력을 향상시킵니다.',
    benefits: ['마음 정화', '직감력 향상', '스트레스 해소', '영적 성장'],
    recipe: '연꽃잎을 깨끗이 씻어 끓는 물에 우려내고, 꿀을 조금 넣어 마시세요.',
    ingredients: ['연꽃잎 5-6장', '물 500ml', '꿀 1큰술'],
    timing: '저녁 6-8시',
    energy: '음(陰)',
    element: '수(水)',
    emoji: '🍵'
  },
  {
    name: '오색 비빔밥',
    category: '메인 요리',
    description: '다섯 가지 색깔의 나물로 만든 비빔밥으로 오행의 기운을 조화롭게 받아들입니다.',
    benefits: ['오행 조화', '영양 균형', '운기 상승', '건강 증진'],
    recipe: '흰밥 위에 다섯 가지 색깔의 나물을 올리고 고추장과 참기름을 넣어 비벼 드세요.',
    ingredients: ['밥 1공기', '시금치', '당근', '도라지', '고사리', '콩나물', '고추장', '참기름'],
    timing: '점심 12-2시',
    energy: '중성',
    element: '토(土)',
    emoji: '🍚'
  },
  {
    name: '대추 생강차',
    category: '음료',
    description: '몸을 따뜻하게 하고 기운을 북돋아주는 차로, 면역력과 활력을 증진시킵니다.',
    benefits: ['면역력 강화', '활력 증진', '소화 개선', '혈액순환 촉진'],
    recipe: '대추와 생강을 물에 넣고 끓인 후 꿀을 넣어 달콤하게 마시세요.',
    ingredients: ['대추 10개', '생강 1쪽', '물 1L', '꿀 2큰술'],
    timing: '오후 3-5시',
    energy: '양(陽)',
    element: '화(火)',
    emoji: '☕'
  },
  {
    name: '연근 조림',
    category: '반찬',
    description: '구멍이 뚫린 연근처럼 막힌 운이 뚫리고 좋은 기운이 흘러들어오게 하는 음식입니다.',
    benefits: ['막힌 운 해소', '인간관계 개선', '소통 능력 향상', '건강 증진'],
    recipe: '연근을 썰어 간장, 설탕, 물엿으로 달콤짭짤하게 조려내세요.',
    ingredients: ['연근 1개', '간장 3큰술', '설탕 2큰술', '물엿 1큰술', '참기름'],
    timing: '저녁 6-8시',
    energy: '음(陰)',
    element: '수(水)',
    emoji: '🥕'
  },
  {
    name: '호두 죽',
    category: '메인 요리',
    description: '두뇌 활동을 촉진하고 지혜를 증진시키는 영양 만점 죽으로 학업운과 사업운을 높입니다.',
    benefits: ['두뇌 활동 촉진', '학업운 상승', '기억력 향상', '집중력 증진'],
    recipe: '불린 쌀과 호두를 함께 갈아 끓이고 소금으로 간을 맞춰 드세요.',
    ingredients: ['쌀 1/2컵', '호두 1/4컵', '물 4컵', '소금 약간'],
    timing: '아침 7-9시',
    energy: '양(陽)',
    element: '금(金)',
    emoji: '🥣'
  },
  {
    name: '석류 주스',
    category: '음료',
    description: '여성의 아름다움과 건강을 지켜주는 석류로 만든 주스로 사랑운과 건강운을 높입니다.',
    benefits: ['사랑운 상승', '여성 건강', '피부 미용', '항산화 효과'],
    recipe: '석류 알맹이를 짜서 주스를 만들고 꿀을 넣어 달콤하게 마시세요.',
    ingredients: ['석류 2개', '꿀 1큰술', '얼음 약간'],
    timing: '오후 2-4시',
    energy: '음(陰)',
    element: '화(火)',
    emoji: '🧃'
  },
  {
    name: '잣죽',
    category: '메인 요리',
    description: '고급스러운 잣으로 만든 죽으로 귀한 인연과 좋은 기회를 끌어당기는 음식입니다.',
    benefits: ['귀인운 상승', '기회 창출', '영양 공급', '기력 회복'],
    recipe: '잣을 곱게 갈아 쌀과 함께 끓이고 소금으로 간을 맞춰 드세요.',
    ingredients: ['잣 1/2컵', '쌀 1/3컵', '물 3컵', '소금 약간'],
    timing: '저녁 7-9시',
    energy: '양(陽)',
    element: '금(金)',
    emoji: '🍲'
  }
];

export default function DailyFoodPage() {
  const [birthDate, setBirthDate] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodFortune | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateDailyFood = () => {
    if (!birthDate) return;
    
    setIsLoading(true);
    
    // 생년월일과 오늘 날짜를 조합하여 음식 결정
    const today = new Date();
    const birth = new Date(birthDate);
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const birthSum = birth.getDate() + birth.getMonth() + 1;
    const foodIndex = (dayOfYear + birthSum) % foodDatabase.length;
    
    setTimeout(() => {
      setSelectedFood(foodDatabase[foodIndex]);
      setIsLoading(false);
    }, 1500);
  };

  const getRandomFood = () => {
    const randomIndex = Math.floor(Math.random() * foodDatabase.length);
    setSelectedFood(foodDatabase[randomIndex]);
  };

  const shareFood = async () => {
    if (!selectedFood) return;
    
    const text = `오늘의 행운 음식: ${selectedFood.name}\n${selectedFood.description}\n\n8jja에서 확인하세요!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '오늘의 행운 음식',
          text: text,
          url: window.location.href
        });
      } catch (error) {
        console.log('공유 취소됨');
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다!');
    }
  };

  const downloadRecipe = () => {
    if (!selectedFood) return;
    
    const recipeText = `
오늘의 행운 음식: ${selectedFood.name}

📝 설명:
${selectedFood.description}

🌟 효과:
${selectedFood.benefits.join(', ')}

🥘 재료:
${selectedFood.ingredients.join('\n')}

👩‍🍳 조리법:
${selectedFood.recipe}

⏰ 최적 섭취 시간: ${selectedFood.timing}
🔥 에너지: ${selectedFood.energy}
🌍 오행: ${selectedFood.element}

8jja에서 제공하는 행운 음식 레시피입니다.
    `;
    
    const blob = new Blob([recipeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `오늘의_행운_음식_${selectedFood.name}_레시피.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <ChefHat className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">오늘의 행운 음식</h1>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              당신의 운을 높여주는 특별한 음식과 레시피를 만나보세요
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* 입력 섹션 */}
          {!selectedFood && (
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">생년월일을 입력해주세요</h2>
                <p className="text-gray-600">당신만을 위한 특별한 행운 음식을 추천해드립니다</p>
              </div>
              
              <div className="max-w-md mx-auto">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-4 border-2 border-orange-200 rounded-xl text-lg text-center focus:border-orange-500 focus:outline-none transition-colors"
                />
                
                <button
                  onClick={calculateDailyFood}
                  disabled={!birthDate || isLoading}
                  className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      음식 분석 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      오늘의 행운 음식 확인하기
                    </>
                  )}
                </button>
                
                <button
                  onClick={getRandomFood}
                  className="w-full mt-3 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  랜덤 음식 추천받기
                </button>
              </div>
            </div>
          )}

          {/* 결과 섹션 */}
          {selectedFood && (
            <div className="space-y-8">
              {/* 음식 카드 */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedFood.name}</h2>
                      <p className="text-lg opacity-90">{selectedFood.category}</p>
                    </div>
                    <div className="text-6xl">{selectedFood.emoji}</div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">음식 설명</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{selectedFood.description}</p>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">기대 효과</h3>
                      <div className="space-y-2 mb-6">
                        {selectedFood.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-2" />
                            <span className="text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-orange-50 rounded-xl p-4 text-center">
                          <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 mb-1">최적 시간</p>
                          <p className="font-semibold text-gray-800">{selectedFood.timing}</p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-4 text-center">
                          <Sparkles className="h-6 w-6 text-red-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 mb-1">에너지</p>
                          <p className="font-semibold text-gray-800">{selectedFood.energy}</p>
                        </div>
                        <div className="bg-yellow-50 rounded-xl p-4 text-center">
                          <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 mb-1">오행</p>
                          <p className="font-semibold text-gray-800">{selectedFood.element}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">재료</h3>
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <ul className="space-y-2">
                          {selectedFood.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                              <span className="text-gray-700">{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">조리법</h3>
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                        <p className="text-gray-700 leading-relaxed">{selectedFood.recipe}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={shareFood}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  공유하기
                </button>
                
                <button
                  onClick={downloadRecipe}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  레시피 저장
                </button>
                
                <button
                  onClick={() => setSelectedFood(null)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  다시 하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 