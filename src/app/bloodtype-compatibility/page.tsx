'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Heart, Users, Star, Zap, Shield, TrendingUp } from 'lucide-react';

export default function BloodTypeCompatibilityPage() {
  const [myBloodType, setMyBloodType] = useState('');
  const [partnerBloodType, setPartnerBloodType] = useState('');
  const [result, setResult] = useState<any>(null);

  const bloodTypes = [
    { type: 'A', emoji: '🅰️', color: 'bg-red-500', traits: '완벽주의, 섬세함, 책임감' },
    { type: 'B', emoji: '🅱️', color: 'bg-blue-500', traits: '자유로움, 창의성, 개성' },
    { type: 'AB', emoji: '🆎', color: 'bg-purple-500', traits: '이중성격, 합리성, 특별함' },
    { type: 'O', emoji: '⭕', color: 'bg-green-500', traits: '리더십, 활발함, 사교성' }
  ];

  const getCompatibilityResult = (type1: string, type2: string) => {
    const compatibilityData: Record<string, any> = {
      'A-A': {
        score: 85,
        title: '안정적인 조화',
        description: '서로를 잘 이해하는 안정적인 관계입니다.',
        pros: ['서로의 완벽주의 성향 이해', '세심한 배려', '책임감 있는 관계'],
        cons: ['때로는 지나치게 신중할 수 있음', '변화에 대한 두려움'],
        advice: '가끔은 모험과 변화를 시도해보세요.'
      },
      'A-B': {
        score: 70,
        title: '상호 보완적 관계',
        description: 'A형의 섬세함과 B형의 자유로움이 만나는 흥미로운 관계입니다.',
        pros: ['서로 다른 장점으로 보완', '새로운 경험 제공', '성장하는 관계'],
        cons: ['가치관 차이로 인한 갈등', '이해하기 어려운 부분'],
        advice: '서로의 차이점을 인정하고 존중하는 것이 중요합니다.'
      },
      'A-AB': {
        score: 75,
        title: '신비로운 매력',
        description: 'AB형의 신비로운 매력에 A형이 끌리는 관계입니다.',
        pros: ['지적인 대화', '서로에 대한 호기심', '깊이 있는 관계'],
        cons: ['AB형의 변화무쌍함에 혼란', '예측하기 어려운 면'],
        advice: 'AB형의 복합적인 성격을 이해하려 노력하세요.'
      },
      'A-O': {
        score: 80,
        title: '리더와 서포터',
        description: 'O형의 리더십과 A형의 서포트가 조화를 이루는 관계입니다.',
        pros: ['안정적인 역할 분담', '서로를 신뢰', '목표 지향적'],
        cons: ['때로는 주도권 문제', 'O형의 대담함에 불안'],
        advice: '서로의 강점을 인정하고 역할을 나누어 가지세요.'
      },
      'B-B': {
        score: 65,
        title: '자유로운 영혼들',
        description: '자유로운 영혼끼리 만나 창의적이지만 때로는 충돌할 수 있습니다.',
        pros: ['창의적인 아이디어', '자유로운 관계', '개성 존중'],
        cons: ['일관성 부족', '책임감 회피 가능성'],
        advice: '때로는 현실적인 계획과 책임감이 필요합니다.'
      },
      'B-AB': {
        score: 90,
        title: '최고의 케미',
        description: 'B형과 AB형은 서로를 가장 잘 이해하는 환상의 조합입니다.',
        pros: ['완벽한 이해', '자유로운 소통', '무한한 가능성'],
        cons: ['현실감각 부족 가능성', '계획성 부족'],
        advice: '꿈과 현실의 균형을 맞추는 것이 중요합니다.'
      },
      'B-O': {
        score: 75,
        title: '역동적인 관계',
        description: '둘 다 활발한 성격으로 역동적이고 에너지 넘치는 관계입니다.',
        pros: ['활발한 활동', '모험적인 경험', '긍정적인 에너지'],
        cons: ['충동적인 결정', '세심함 부족'],
        advice: '가끔은 신중하게 생각하고 계획을 세워보세요.'
      },
      'AB-AB': {
        score: 70,
        title: '복잡한 매력',
        description: '서로의 복잡한 내면을 이해할 수 있지만 예측하기 어려운 관계입니다.',
        pros: ['깊은 이해', '지적인 교감', '독특한 관계'],
        cons: ['감정의 기복', '일관성 부족'],
        advice: '서로의 변화하는 모습을 받아들이세요.'
      },
      'AB-O': {
        score: 85,
        title: '균형잡힌 조화',
        description: 'O형의 안정감과 AB형의 창의성이 조화를 이루는 관계입니다.',
        pros: ['균형잡힌 관계', '서로 보완', '안정적인 발전'],
        cons: ['때로는 이해 부족', '접근 방식의 차이'],
        advice: '서로 다른 관점을 존중하며 소통하세요.'
      },
      'O-O': {
        score: 80,
        title: '강력한 에너지',
        description: '둘 다 리더십이 강해 때로는 충돌하지만 강력한 에너지를 가진 관계입니다.',
        pros: ['강한 결속력', '목표 달성력', '리더십'],
        cons: ['주도권 다툼', '고집 부림'],
        advice: '때로는 양보하고 협력하는 자세가 필요합니다.'
      }
    };

    const key1 = `${type1}-${type2}`;
    const key2 = `${type2}-${type1}`;
    
    return compatibilityData[key1] || compatibilityData[key2] || {
      score: 75,
      title: '흥미로운 조합',
      description: '서로 다른 매력을 가진 특별한 관계입니다.',
      pros: ['새로운 경험', '서로 다른 관점', '성장 기회'],
      cons: ['이해하기 어려운 부분', '적응 시간 필요'],
      advice: '서로를 이해하려는 노력이 중요합니다.'
    };
  };

  const analyzeCompatibility = () => {
    if (!myBloodType || !partnerBloodType) {
      alert('두 사람의 혈액형을 모두 선택해주세요.');
      return;
    }

    const compatibility = getCompatibilityResult(myBloodType, partnerBloodType);
    setResult({
      ...compatibility,
      myType: myBloodType,
      partnerType: partnerBloodType
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 75) return 'text-blue-500';
    if (score >= 65) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 65) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-100">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">혈액형 궁합</h1>
          <p className="text-center text-gray-600">같은 혈액형 vs 다른 혈액형, 어떤 조합이 최고일까?</p>
        </div>
      </div>
    </Layout>
  );
} 