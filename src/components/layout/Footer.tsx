import Link from 'next/link';
import {
  Sparkles,
  Swords,
  Calendar,
  HeartHandshake,
  Moon,
  Copyright,
} from 'lucide-react';

export default function Footer() {
  const services = [
    { name: '사주팔자', href: '/saju', icon: Sparkles },
    { name: '타로카드', href: '/tarot', icon: Swords },
    { name: '오늘의 운세', href: '/today', icon: Calendar },
    { name: '궁합보기', href: '/compatibility', icon: HeartHandshake },
    { name: '꿈해몽', href: '/dream', icon: Moon },
  ];

  const legal = [
    { name: '회사소개', href: '/about' },
    { name: '이용약관', href: '/terms' },
    { name: '개인정보처리방침', href: '/privacy' },
    { name: '고객센터', href: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl font-bold font-korean-serif bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                팔자
              </span>
              <span className="text-sm font-light text-gray-500 mt-1">
                8jja.com
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              전통 사주명리학과 현대적 해석이 만나 당신의 삶에 깊이 있는 통찰을
              제공합니다.
            </p>
          </div>

          <div className="md:col-start-2 lg:col-start-3">
            <h3 className="font-semibold text-gray-200 tracking-wider uppercase">
              서비스
            </h3>
            <ul className="mt-4 space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center text-sm hover:text-white transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4 mr-2 text-purple-400" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-200 tracking-wider uppercase">
              회사정보
            </h3>
            <ul className="mt-4 space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm text-gray-500 col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="font-semibold text-gray-200 tracking-wider uppercase mb-4">
              안내
            </h3>
            <p>
              본 사이트의 운세 정보는 오락 목적으로 제공되며, 개인의 중요한
              의사결정에 대한 책임은 이용자 본인에게 있습니다.
            </p>
            <p className="mt-4">
              사업자등록번호: 123-45-67890 <br />
              고객센터: 1588-0000
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="flex items-center">
            <Copyright className="w-4 h-4 mr-2" />
            2025 8jja.com (팔자닷컴). All rights reserved.
          </p>
          <p className="mt-4 sm:mt-0">
            디자인 및 개발 by AI Assistant
          </p>
        </div>
      </div>
    </footer>
  );
} 