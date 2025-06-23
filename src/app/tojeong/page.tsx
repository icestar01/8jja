'use client';

import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Calendar, Star, TrendingUp, Heart, Coins, Shield } from 'lucide-react';

export default function TojeongPage() {
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [fortune, setFortune] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateTojeongFortune = () => {
    if (!birthDate || !gender) {
      alert('생년월일과 성별을 모두 선택해 주세요.');
      return;
    }

    setIsLoading(true);
    
    // 시뮬레이션된 토정비결 운세 생성
    setTimeout(() => {
      const fortuneData = {
        year: new Date().getFullYear(),
        overall: {
          score: Math.floor(Math.random() * 40) + 60, // 60-100 사이
          message: [
            '올해는 새로운 시작의 해입니다. 과감한 도전이 길운을 부를 것입니다.',
            '인간관계에 특별히 신경 쓰시기 바랍니다. 좋은 인연이 큰 도움이 될 것입니다.',
            '건강관리에 유의하되, 전체적으로 안정적인 한 해가 될 것입니다.',
            '재물운이 상승하는 시기입니다. 투자나 사업에 좋은 기회가 있을 것입니다.'
          ][Math.floor(Math.random() * 4)]
        },
        monthly: generateMonthlyFortune(),
        categories: {
          health: {
            score: Math.floor(Math.random() * 30) + 70,
            advice: '규칙적인 생활과 적당한 운동이 건강을 지키는 열쇠입니다.'
          },
          wealth: {
            score: Math.floor(Math.random() * 30) + 70,
            advice: '상반기보다 하반기에 재물운이 상승할 것입니다.'
          },
          love: {
            score: Math.floor(Math.random() * 30) + 70,
            advice: '진정성 있는 만남을 통해 좋은 인연을 만날 수 있습니다.'
          },
          career: {
            score: Math.floor(Math.random() * 30) + 70,
            advice: '끈기와 성실함으로 원하는 목표를 달성할 수 있습니다.'
          }
        }
      };
      
      setFortune(fortuneData);
      setIsLoading(false);
    }, 2000);
  };

  const generateMonthlyFortune = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push({
        month: i,
        score: Math.floor(Math.random() * 40) + 60,
        keyword: [
          '새로운 시작', '성장과 발전', '안정과 평화', '도전과 기회',
          '인간관계', '건강주의', '재물운상승', '학업성취',
          '사랑과 만남', '여행과 휴식', '변화와 적응', '결실과 보상'
        ][i - 1]
      });
    }
    return months;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">토정비결</h1>
          <p className="text-center text-gray-600">전통 토정비결로 신년 운세를 확인하세요</p>
        </div>
      </div>
    </Layout>
  );
} 