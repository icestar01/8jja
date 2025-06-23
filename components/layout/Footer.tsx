import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: '사주팔자', href: '/saju' },
    { name: '타로카드', href: '/tarot' },
    { name: '오늘의 운세', href: '/today' },
    { name: '궁합보기', href: '/compatibility' },
    { name: '꿈해몽', href: '/dream' },
  ];

  const company = [
    { name: '회사소개', href: '/about' },
    { name: '이용약관', href: '/terms' },
    { name: '개인정보처리방침', href: '/privacy' },
    { name: '고객센터', href: '/support' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="text-2xl font-bold text-purple-400 font-korean-serif">
                8jja.com
              </div>
              <div className="ml-2 text-sm text-gray-400">
                팔자닷컴
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              전통 사주명리학을 바탕으로 한 정확하고 신뢰할 수 있는 운세 서비스를 제공합니다. 
              당신의 인생에 도움이 되는 지혜를 전해드립니다.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.72 13.78 3.72 12.5s.478-2.395 1.406-3.191c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.796 1.406 1.911 1.406 3.191s-.478 2.395-1.406 3.191c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">서비스</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">회사정보</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} 8jja.com (팔자닷컴). All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              <span className="mr-4">사업자등록번호: 123-45-67890</span>
              <span>고객센터: 1588-0000</span>
            </div>
          </div>
          <div className="text-gray-500 text-xs mt-4 text-center md:text-left">
            * 본 사이트의 운세 서비스는 오락 목적으로 제공되며, 개인의 의사결정에 대한 책임은 이용자 본인에게 있습니다.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 