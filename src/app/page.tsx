'use client';

import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import {
  Sparkles,
  Calendar,
  Star,
  Moon,
  Heart,
  ChevronRight,
  Gift
} from 'lucide-react';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('인기');

  const serviceCategories = {
    '인기': [
      { name: '신년운세', icon: '✨', href: '/newyear', gradient: 'from-violet-500 to-purple-600', description: '2024년 당신의 운명' },
      { name: '토정비결', icon: '📜', href: '/tojeong', gradient: 'from-blue-500 to-cyan-500', description: '전통 신년 운세' },
      { name: '정통사주', icon: '🔮', href: '/saju', gradient: 'from-purple-500 to-pink-500', description: '정확한 사주 분석' },
      { name: '오늘의 운세', icon: '🌟', href: '/today', gradient: 'from-emerald-500 to-teal-500', description: '지금 확인하세요' },
      { name: '타로점', icon: '🃏', href: '/tarot', gradient: 'from-rose-500 to-pink-500', description: '신비로운 카드 메시지' },
      { name: '꿈해몽', icon: '🌙', href: '/dream', gradient: 'from-indigo-500 to-blue-500', description: '꿈이 전하는 신호' }
    ],
    '궁합': [
      { name: '연인 궁합', icon: '💕', href: '/compatibility', gradient: 'from-rose-400 to-pink-600', description: '사랑의 호환성' },
      { name: '혈액형 궁합', icon: '❤️', href: '/bloodtype-compatibility', gradient: 'from-red-400 to-rose-500', description: 'A B AB O형 분석' },
      { name: '별자리 궁합', icon: '⭐', href: '/horoscope', gradient: 'from-blue-400 to-purple-500', description: '12별자리 매칭' },
      { name: '이름 궁합', icon: '✍️', href: '/name-fortune', gradient: 'from-green-400 to-emerald-500', description: '이름으로 보는 운명' },
      { name: '띠 궁합', icon: '🐉', href: '/zodiac', gradient: 'from-yellow-400 to-orange-500', description: '12간지 분석' },
      { name: '생년월일 궁합', icon: '📅', href: '/compatibility', gradient: 'from-cyan-400 to-blue-500', description: '생일로 보는 인연' }
    ],
    '액운방지': [
      { name: '행운의 번호', icon: '🎲', href: '/lucky-number', gradient: 'from-amber-400 to-yellow-500', description: '인생을 바꿀 숫자' },
      { name: '천생복덕운', icon: '💰', href: '/fortune-luck', gradient: 'from-emerald-400 to-green-500', description: '타고난 복을 확인' },
      { name: '살풀이', icon: '🛡️', href: '/exorcism', gradient: 'from-red-500 to-pink-500', description: '액운을 막아주는 방법' },
      { name: '부적', icon: '🧿', href: '/amulet', gradient: 'from-indigo-400 to-purple-500', description: '영험한 보호의 힘' },
      { name: '이사택일', icon: '🏠', href: '/moving-date', gradient: 'from-teal-400 to-cyan-500', description: '이사하기 좋은 날' },
      { name: '관상', icon: '👁️', href: '/face-reading', gradient: 'from-purple-400 to-violet-500', description: '얼굴에 새겨진 운명' }
    ],
    '오늘': [
      { name: '오늘의 명언', icon: '💭', href: '/daily-quote', gradient: 'from-slate-400 to-gray-600', description: '마음을 울리는 한마디' },
      { name: '오늘의 운세', icon: '📅', href: '/today', gradient: 'from-green-400 to-emerald-600', description: '지금 이 순간의 기운' },
      { name: '오늘의 색상', icon: '🎨', href: '/daily-color', gradient: 'from-pink-400 to-rose-500', description: '행운을 부르는 컬러' },
      { name: '오늘의 음식', icon: '🍀', href: '/daily-food', gradient: 'from-orange-400 to-amber-500', description: '운을 높이는 메뉴' },
      { name: '오늘의 방향', icon: '🧭', href: '/daily-direction', gradient: 'from-blue-400 to-indigo-500', description: '길한 방위 찾기' },
      { name: '오늘의 시간', icon: '⏰', href: '/daily-time', gradient: 'from-violet-400 to-purple-500', description: '좋은 일이 일어날 시간' }
    ]
  };

  const categories = Object.keys(serviceCategories);

  return (
    <Layout>
      {/* 상단 공지 바 */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white text-center py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative flex items-center justify-center space-x-2">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span className="font-medium">🎉 새해 특별 이벤트! 모든 운세 서비스 무료 체험 🎉</span>
          <Sparkles className="h-4 w-4 animate-pulse" />
        </div>
      </div>

      {/* 메인 히어로 섹션 */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0 bg-white/5 bg-repeat" 
              style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, white 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }}
            ></div>
          </div>
        </div>
        
        {/* 떠다니는 별들 */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 animate-bounce">
            <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
          </div>
          <div className="absolute top-32 right-20">
            <Sparkles className="h-5 w-5 text-pink-300 animate-pulse" />
          </div>
          <div className="absolute bottom-40 left-20 animate-bounce">
            <Moon className="h-4 w-4 text-blue-300 animate-pulse" />
          </div>
          <div className="absolute bottom-60 right-10">
            <Star className="h-3 w-3 text-purple-300 animate-pulse" />
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center text-white">
          {/* 메인 타이틀 */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              8jja
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-purple-100">
              당신만을 위한 특별한 운세
            </p>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto leading-relaxed">
              정확한 분석과 아름다운 디자인으로 만나는<br />
              가장 신뢰할 수 있는 운세 플랫폼
            </p>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/saju" 
              className="group bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
            >
              <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
              무료 사주 체험하기
              <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/today" 
              className="group bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              오늘의 운세 보기
            </Link>
          </div>

          {/* 실시간 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white flex items-center justify-center">
                <span className="animate-pulse mr-1">●</span>
                {Math.floor(Math.random() * 500) + 1200}
              </div>
              <div className="text-sm text-purple-200">실시간 접속자</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">156만+</div>
              <div className="text-sm text-purple-200">누적 이용자</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.2%</div>
              <div className="text-sm text-purple-200">정확도</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">15개+</div>
              <div className="text-sm text-purple-200">운세 서비스</div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 카테고리 섹션 */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              당신의 운명을 만나보세요
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              정확하고 신뢰할 수 있는 다양한 운세 서비스를 경험해보세요
            </p>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 mx-1 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 서비스 카드 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories[activeCategory as keyof typeof serviceCategories].map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden"
              >
                {/* 배경 그라데이션 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* 카드 내용 */}
                <div className="relative z-10">
                  {/* 아이콘 */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  
                  {/* 텍스트 */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* 화살표 */}
                  <div className="flex items-center text-purple-600 font-medium text-sm">
                    <span>체험하기</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 호버 효과 */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/50 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 특별 이벤트 섹션 */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-600 text-white relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <Gift className="h-16 w-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-4xl font-bold mb-4">특별한 혜택</h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              지금 가입하시면 모든 운세 서비스를 무료로 체험할 수 있습니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-2">🎁</div>
              <h3 className="text-lg font-semibold mb-2">무료 체험</h3>
              <p className="text-purple-100 text-sm">모든 서비스 7일 무료</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-lg font-semibold mb-2">프리미엄 혜택</h3>
              <p className="text-purple-100 text-sm">정확도 99% 전문 분석</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-2">💝</div>
              <h3 className="text-lg font-semibold mb-2">특별 이벤트</h3>
              <p className="text-purple-100 text-sm">매월 새로운 혜택 제공</p>
            </div>
          </div>
          
          <button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-full hover:bg-purple-50 transition-colors hover:scale-105 transform duration-300">
            지금 시작하기
          </button>
        </div>
      </section>

      {/* 최근 활동 현황 */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🔥 실시간 운세 현황
            </h2>
            <p className="text-lg text-gray-600">
              지금 이 순간 다른 분들이 확인하고 있는 운세들
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">인기 운세 TOP 3</h3>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">HOT</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">1. 사주팔자</span>
                  <span className="text-sm text-red-500 font-medium">2,847명</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">2. 오늘의 운세</span>
                  <span className="text-sm text-orange-500 font-medium">1,923명</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">3. 궁합</span>
                  <span className="text-sm text-yellow-500 font-medium">1,456명</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">실시간 알림</h3>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  방금 전 김**님이 타로 카드를 확인했습니다
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  2분 전 이**님이 궁합을 확인했습니다
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                  5분 전 박**님이 사주를 확인했습니다
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">오늘의 키워드</h3>
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gradient-to-r from-red-100 to-pink-100 text-red-700 px-3 py-1 rounded-full text-xs">#새로운시작</span>
                <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-3 py-1 rounded-full text-xs">#행운</span>
                <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full text-xs">#성공</span>
                <span className="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 px-3 py-1 rounded-full text-xs">#변화</span>
                <span className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 px-3 py-1 rounded-full text-xs">#기회</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 앞 CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            운명을 바꿀 수 있는 순간
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            8jja와 함께 더 나은 내일을 준비하세요.<br />
            당신의 인생에 새로운 전환점이 될 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/saju" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              내 운세 확인하기
            </Link>
            <Link 
              href="/today" 
              className="border-2 border-purple-600 text-purple-600 font-semibold py-4 px-8 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              오늘의 운세 보기
            </Link>
          </div>
    </div>
      </section>
    </Layout>
  );
}