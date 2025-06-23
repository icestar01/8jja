import { FoodAnalysis } from '../App';

// 실제 AI API 연동을 위한 인터페이스
interface AIAnalysisRequest {
  imageBase64: string;
  options?: {
    includeNutrition?: boolean;
    includeHealthScore?: boolean;
    userProfile?: {
      age?: number;
      gender?: 'male' | 'female';
      weight?: number;
      height?: number;
      healthConditions?: string[];
    };
  };
}

// 음식 데이터베이스 (실제 구현에서는 외부 API 또는 데이터베이스 사용)
const FOOD_DATABASE = {
  '김치볶음밥': {
    calories: 520,
    protein: 12,
    carbs: 78,
    fat: 18,
    fiber: 4,
    sugar: 8,
    sodium: 850,
    healthScore: 75,
    diabeticFriendly: false,
    bloodPressureFriendly: false,
    recommendations: [
      '나트륨 함량이 높습니다. 하루 섭취량을 주의하세요.',
      '당분 함량으로 인해 당뇨 환자는 주의가 필요합니다.',
      '단백질 보충을 위해 계란이나 닭가슴살을 추가해보세요.'
    ]
  },
  '샐러드': {
    calories: 120,
    protein: 8,
    carbs: 15,
    fat: 3,
    fiber: 8,
    sugar: 6,
    sodium: 200,
    healthScore: 95,
    diabeticFriendly: true,
    bloodPressureFriendly: true,
    recommendations: [
      '훌륭한 선택입니다! 식이섬유가 풍부해 소화에 좋습니다.',
      '단백질 보충을 위해 닭가슴살이나 견과류를 추가해보세요.',
      '올리브오일 드레싱으로 건강한 지방을 섭취하세요.'
    ]
  },
  '치킨': {
    calories: 750,
    protein: 45,
    carbs: 25,
    fat: 35,
    fiber: 2,
    sugar: 3,
    sodium: 1200,
    healthScore: 60,
    diabeticFriendly: false,
    bloodPressureFriendly: false,
    recommendations: [
      '칼로리가 높습니다. 적당량 섭취를 권장합니다.',
      '나트륨 함량이 높아 혈압 관리가 필요한 분은 주의하세요.',
      '단백질이 풍부하지만 지방 함량도 높으니 균형을 맞추세요.'
    ]
  },
  '과일': {
    calories: 80,
    protein: 1,
    carbs: 20,
    fat: 0.5,
    fiber: 3,
    sugar: 16,
    sodium: 5,
    healthScore: 90,
    diabeticFriendly: true,
    bloodPressureFriendly: true,
    recommendations: [
      '비타민과 미네랄이 풍부한 건강한 간식입니다.',
      '자연 당분이 포함되어 있어 에너지 보충에 좋습니다.',
      '하루 2-3회 적당량 섭취를 권장합니다.'
    ]
  }
};

// 이미지에서 음식을 인식하는 모의 함수 (실제로는 AI API 호출)
const recognizeFoodFromImage = async (imageBase64: string): Promise<string> => {
  // 실제 구현에서는 Google Vision API, OpenAI GPT-4V, 또는 커스텀 AI 모델 사용
  // 여기서는 랜덤하게 음식을 선택하는 데모 로직
  const foods = Object.keys(FOOD_DATABASE);
  const randomFood = foods[Math.floor(Math.random() * foods.length)];
  
  // 이미지 분석 시뮬레이션을 위한 지연
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return randomFood;
};

// 건강 점수 계산 함수
const calculateHealthScore = (nutrition: any): number => {
  let score = 100;
  
  // 칼로리 기준 (500kcal 기준)
  if (nutrition.calories > 600) score -= 20;
  else if (nutrition.calories > 400) score -= 10;
  
  // 나트륨 기준 (일일 권장량의 30% 이상이면 감점)
  if (nutrition.sodium > 600) score -= 15;
  else if (nutrition.sodium > 400) score -= 10;
  
  // 당분 기준
  if (nutrition.sugar > 20) score -= 15;
  else if (nutrition.sugar > 10) score -= 5;
  
  // 식이섬유 기준 (높을수록 가점)
  if (nutrition.fiber > 5) score += 10;
  else if (nutrition.fiber > 3) score += 5;
  
  // 단백질 기준 (적정량이면 가점)
  if (nutrition.protein >= 10 && nutrition.protein <= 30) score += 5;
  
  return Math.max(0, Math.min(100, score));
};

// 건강 상태별 적합성 판단
const assessHealthCompatibility = (nutrition: any) => {
  const diabeticFriendly = nutrition.sugar < 10 && nutrition.carbs < 50;
  const bloodPressureFriendly = nutrition.sodium < 400;
  
  return { diabeticFriendly, bloodPressureFriendly };
};

// 개인 맞춤 추천사항 생성
const generateRecommendations = (foodName: string, nutrition: any): string[] => {
  const recommendations: string[] = [];
  
  if (nutrition.calories > 500) {
    recommendations.push('칼로리가 높습니다. 적당량 섭취하거나 운동량을 늘려보세요.');
  }
  
  if (nutrition.sodium > 500) {
    recommendations.push('나트륨 함량이 높습니다. 하루 섭취량을 주의하세요.');
  }
  
  if (nutrition.sugar > 15) {
    recommendations.push('당분 함량이 높아 당뇨 환자는 주의가 필요합니다.');
  }
  
  if (nutrition.fiber < 3) {
    recommendations.push('식이섬유 보충을 위해 채소나 과일을 추가해보세요.');
  }
  
  if (nutrition.protein < 10) {
    recommendations.push('단백질 보충을 위해 계란, 닭가슴살, 또는 콩류를 추가해보세요.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('균형 잡힌 좋은 선택입니다! 적당량 섭취하세요.');
  }
  
  return recommendations;
};

// 메인 음식 분석 함수
export const analyzeFoodImage = async (
  imageBase64: string,
  options?: AIAnalysisRequest['options']
): Promise<FoodAnalysis> => {
  try {
    // 1. 이미지에서 음식 인식
    const recognizedFood = await recognizeFoodFromImage(imageBase64);
    
    // 2. 데이터베이스에서 영양 정보 조회
    const nutritionData = FOOD_DATABASE[recognizedFood as keyof typeof FOOD_DATABASE];
    
    if (!nutritionData) {
      throw new Error('음식을 인식할 수 없습니다.');
    }
    
    // 3. 건강 점수 계산
    const healthScore = calculateHealthScore(nutritionData);
    
    // 4. 건강 상태별 적합성 판단
    const compatibility = assessHealthCompatibility(nutritionData);
    
    // 5. 개인 맞춤 추천사항 생성
    const recommendations = generateRecommendations(recognizedFood, nutritionData);
    
    // 6. 최종 분석 결과 반환
    const analysis: FoodAnalysis = {
      foodName: recognizedFood,
      calories: nutritionData.calories,
      protein: nutritionData.protein,
      carbs: nutritionData.carbs,
      fat: nutritionData.fat,
      fiber: nutritionData.fiber,
      sugar: nutritionData.sugar,
      sodium: nutritionData.sodium,
      healthScore,
      diabeticFriendly: compatibility.diabeticFriendly,
      bloodPressureFriendly: compatibility.bloodPressureFriendly,
      recommendations
    };
    
    return analysis;
    
  } catch (error) {
    console.error('음식 분석 중 오류 발생:', error);
    throw new Error('음식 분석에 실패했습니다. 다시 시도해주세요.');
  }
};

// 실제 AI API 연동을 위한 함수들 (향후 구현)
export const connectToOpenAI = async (imageBase64: string) => {
  // OpenAI GPT-4V API 연동 로직
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     model: 'gpt-4-vision-preview',
  //     messages: [
  //       {
  //         role: 'user',
  //         content: [
  //           {
  //             type: 'text',
  //             text: '이 음식의 이름과 영양 정보를 분석해주세요.'
  //           },
  //           {
  //             type: 'image_url',
  //             image_url: {
  //               url: imageBase64
  //             }
  //           }
  //         ]
  //       }
  //     ],
  //     max_tokens: 500
  //   })
  // });
};

export const connectToGoogleVision = async (imageBase64: string) => {
  // Google Vision API 연동 로직
  // const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     requests: [
  //       {
  //         image: {
  //           content: imageBase64.split(',')[1]
  //         },
  //         features: [
  //           {
  //             type: 'LABEL_DETECTION',
  //             maxResults: 10
  //           }
  //         ]
  //       }
  //     ]
  //   })
  // });
}; 