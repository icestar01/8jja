'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Quote, RefreshCw, Heart, Share2, Download, Star, Copy, Calendar } from 'lucide-react';

interface DailyQuote {
  text: string;
  author: string;
  category: string;
  backgroundColor: string;
  textColor: string;
  meaning: string;
  advice: string;
  reflection: string;
}

export default function DailyQuotePage() {
  const [todayQuote, setTodayQuote] = useState<DailyQuote | null>(null);
  const [savedQuotes, setSavedQuotes] = useState<DailyQuote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const quotes: DailyQuote[] = [
    {
      text: "성공의 비밀은 시작하는 것이다.",
      author: "마크 트웨인",
      category: "성공",
      backgroundColor: "from-blue-500 to-cyan-500",
      textColor: "text-white",
      meaning: "모든 위대한 성취는 작은 첫 걸음에서 시작됩니다.",
      advice: "완벽한 계획을 기다리지 말고, 지금 당장 시작해보세요.",
      reflection: "오늘 당신이 미뤄두었던 일 중 하나를 시작해보는 것은 어떨까요?"
    },
    {
      text: "행복은 습관이다. 그것을 몸에 지니라.",
      author: "허버트",
      category: "행복",
      backgroundColor: "from-pink-500 to-rose-500",
      textColor: "text-white",
      meaning: "행복은 운이 아닌 선택이며, 매일의 작은 습관에서 만들어집니다.",
      advice: "매일 작은 행복을 찾는 습관을 만들어보세요.",
      reflection: "오늘 당신을 행복하게 만든 작은 순간이 무엇이었나요?"
    },
    {
      text: "꿈을 꾸는 것은 계획의 시작이다.",
      author: "랑스턴 휴즈",
      category: "꿈",
      backgroundColor: "from-purple-500 to-indigo-500",
      textColor: "text-white",
      meaning: "꿈은 단순한 상상이 아니라 미래를 만들어가는 첫 번째 단계입니다.",
      advice: "꿈을 구체적인 계획으로 바꾸는 시간을 가져보세요.",
      reflection: "당신의 가장 큰 꿈을 실현하기 위한 첫 번째 단계는 무엇일까요?"
    },
    {
      text: "어제를 후회하지 말고, 내일을 두려워하지 말고, 오늘을 최선을 다해 살아라.",
      author: "로빈 S. 샤르마",
      category: "현재",
      backgroundColor: "from-green-500 to-emerald-500",
      textColor: "text-white",
      meaning: "과거와 미래에 얽매이지 말고 현재에 집중하는 것이 가장 중요합니다.",
      advice: "오늘 하루를 의미 있게 보내는 것에 집중해보세요.",
      reflection: "지금 이 순간, 당신이 가장 집중해야 할 일은 무엇인가요?"
    },
    {
      text: "시간은 우리가 가진 가장 값진 재산이다.",
      author: "테오프라스토스",
      category: "시간",
      backgroundColor: "from-orange-500 to-red-500",
      textColor: "text-white",
      meaning: "시간은 돈으로 살 수 없는 유일한 자원이며, 현명하게 사용해야 합니다.",
      advice: "오늘 하루의 시간을 의미 있는 일에 투자해보세요.",
      reflection: "시간을 가장 가치 있게 사용했던 순간은 언제였나요?"
    },
    {
      text: "자신을 믿어라. 당신은 생각보다 강하다.",
      author: "익명",
      category: "자신감",
      backgroundColor: "from-yellow-500 to-orange-500",
      textColor: "text-white",
      meaning: "우리는 스스로를 과소평가하는 경우가 많습니다. 자신의 잠재력을 믿으세요.",
      advice: "작은 성공 경험들을 기억하며 자신감을 키워나가세요.",
      reflection: "지금까지 극복한 어려움들을 생각해보면, 당신은 얼마나 강한 사람인가요?"
    },
    {
      text: "실패는 성공으로 가는 길의 이정표다.",
      author: "CS 루이스",
      category: "실패",
      backgroundColor: "from-indigo-500 to-purple-500",
      textColor: "text-white",
      meaning: "실패는 끝이 아니라 성공을 위한 소중한 경험이자 배움의 기회입니다.",
      advice: "실패를 두려워하지 말고 그것에서 배우는 자세를 가지세요.",
      reflection: "과거의 실패가 지금의 당신을 더 강하게 만든 경험이 있나요?"
    },
    {
      text: "감사는 마음의 기억이다.",
      author: "라오타이",
      category: "감사",
      backgroundColor: "from-teal-500 to-green-500",
      textColor: "text-white",
      meaning: "감사하는 마음은 우리가 받은 좋은 것들을 더욱 소중하게 만듭니다.",
      advice: "매일 감사할 일 세 가지를 찾아보는 습관을 만들어보세요.",
      reflection: "지금 당신이 가장 감사하게 생각하는 것은 무엇인가요?"
    },
    {
      text: "지혜로운 사람은 매일 무언가를 배운다.",
      author: "소크라테스",
      category: "학습",
      backgroundColor: "from-violet-500 to-purple-500",
      textColor: "text-white",
      meaning: "배움은 평생에 걸친 여정이며, 매일이 새로운 성장의 기회입니다.",
      advice: "오늘 하나라도 새로운 것을 배우려고 노력해보세요.",
      reflection: "최근에 배운 것 중 가장 의미 있었던 것은 무엇인가요?"
    },
    {
      text: "친절한 말 한마디는 세상을 바꿀 수 있다.",
      author: "익명",
      category: "친절",
      backgroundColor: "from-rose-500 to-pink-500",
      textColor: "text-white",
      meaning: "작은 친절이 다른 사람에게 큰 힘이 되고, 결국 세상을 더 따뜻하게 만듭니다.",
      advice: "오늘 누군가에게 따뜻한 말을 건네보세요.",
      reflection: "누군가의 친절한 말이 당신에게 큰 힘이 되었던 경험이 있나요?"
    }
  ];

  const categories = ["전체", "성공", "행복", "꿈", "현재", "시간", "자신감", "실패", "감사", "학습", "친절"];

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }));

    generateTodayQuote();
    loadSavedQuotes();
  }, []);

  const generateTodayQuote = () => {
    // 날짜 기반으로 일관된 명언 선택
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;
    setTodayQuote(quotes[quoteIndex]);
  };

  const getRandomQuote = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setTodayQuote(quotes[randomIndex]);
      setIsLoading(false);
    }, 1000);
  };

  const saveQuote = (quote: DailyQuote) => {
    const updated = [quote, ...savedQuotes.filter(q => q.text !== quote.text)].slice(0, 10);
    setSavedQuotes(updated);
    localStorage.setItem('savedQuotes', JSON.stringify(updated));
    alert('명언이 저장되었습니다!');
  };

  const loadSavedQuotes = () => {
    const saved = localStorage.getItem('savedQuotes');
    if (saved) {
      setSavedQuotes(JSON.parse(saved));
    }
  };

  const shareQuote = async (quote: DailyQuote) => {
    const shareText = `"${quote.text}" - ${quote.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '오늘의 명언',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('명언이 복사되었습니다!');
  };

  const downloadQuoteImage = (quote: DailyQuote) => {
    // Canvas를 사용해 이미지 생성
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // 텍스트 스타일
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    // 명언 텍스트
    ctx.font = 'bold 36px Arial';
    const lines = wrapText(ctx, `"${quote.text}"`, 750);
    lines.forEach((line, index) => {
      ctx.fillText(line, 400, 250 + (index * 50));
    });

    // 저자
    ctx.font = '24px Arial';
    ctx.fillText(`- ${quote.author}`, 400, 450);

    // 다운로드
    const link = document.createElement('a');
    link.download = `명언_${quote.author}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  if (!todayQuote) {
    return (
      <Layout>
        <div className="min-h-screen gradient-bg flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen gradient-bg py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl mb-6 shadow-xl">
              <Quote className="h-10 w-10 text-white" />
            </div>
            <h1 className="section-header glow-text mb-6">
              오늘의 명언
            </h1>
            <p className="section-subheader">
              {currentDate}<br />
              마음에 울림을 주는 지혜로운 말들을 만나보세요
            </p>
          </div>

          {/* 오늘의 명언 카드 */}
          <div className={`fortune-card p-0 mb-12 overflow-hidden bg-gradient-to-br ${todayQuote.backgroundColor}`}>
            <div className="p-12 text-center relative">
              {/* 장식 요소 */}
              <div className="absolute top-6 left-6 text-white/20">
                <Quote className="h-12 w-12" />
              </div>
              <div className="absolute bottom-6 right-6 text-white/20 rotate-180">
                <Quote className="h-12 w-12" />
              </div>

              {/* 명언 텍스트 */}
              <div className="relative z-10">
                <div className="inline-block bg-black/10 px-4 py-2 rounded-full text-white/80 text-sm mb-6">
                  오늘의 명언 · {todayQuote.category}
                </div>
                
                <h2 className={`text-3xl md:text-4xl font-bold mb-8 leading-relaxed ${todayQuote.textColor}`}>
                  "{todayQuote.text}"
                </h2>
                
                <p className={`text-xl mb-8 ${todayQuote.textColor} opacity-90`}>
                  - {todayQuote.author}
                </p>

                {/* 액션 버튼들 */}
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => saveQuote(todayQuote)}
                    className="btn-secondary bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    저장하기
                  </button>
                  <button
                    onClick={() => shareQuote(todayQuote)}
                    className="btn-secondary bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    공유하기
                  </button>
                  <button
                    onClick={() => downloadQuoteImage(todayQuote)}
                    className="btn-secondary bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    이미지 저장
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 명언 해석 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="fortune-card p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">의미</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-center">
                {todayQuote.meaning}
              </p>
            </div>

            <div className="fortune-card p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Quote className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">조언</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-center">
                {todayQuote.advice}
              </p>
            </div>

            <div className="fortune-card p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">성찰</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-center">
                {todayQuote.reflection}
              </p>
            </div>
          </div>

          {/* 새로운 명언 버튼 */}
          <div className="text-center mb-12">
            <button
              onClick={getRandomQuote}
              disabled={isLoading}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center space-x-3"
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>새로운 명언을 가져오는 중...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-6 w-6" />
                  <span>다른 명언 보기</span>
                </>
              )}
            </button>
          </div>

          {/* 저장된 명언들 */}
          {savedQuotes.length > 0 && (
            <div className="fortune-card p-8">
              <h3 className="text-2xl font-bold text-center mb-8 glow-text">
                💝 저장된 명언들
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedQuotes.slice(0, 6).map((quote, index) => (
                  <div key={index} className={`p-6 rounded-xl bg-gradient-to-br ${quote.backgroundColor} text-white`}>
                    <p className="text-lg font-medium mb-3 leading-relaxed">
                      "{quote.text}"
                    </p>
                    <p className="text-sm opacity-90 mb-4">
                      - {quote.author}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {quote.category}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => shareQuote(quote)}
                          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(`"${quote.text}" - ${quote.author}`)}
                          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 명언 카테고리 */}
          <div className="fortune-card p-8">
            <h3 className="text-2xl font-bold text-center mb-8 glow-text">
              📚 카테고리별 명언
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.slice(1).map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const categoryQuotes = quotes.filter(q => q.category === category);
                    if (categoryQuotes.length > 0) {
                      const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
                      setTodayQuote(randomQuote);
                    }
                  }}
                  className="bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-700 font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 