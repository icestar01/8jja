'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/saju', text: '사주팔자' },
  { href: '/tarot', text: '타로' },
  { href: '/today', text: '오늘의 운세' },
  { href: '/compatibility', text: '궁합' },
  { href: '/dream', text: '꿈해몽' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Logo = () => (
    <Link href="/" className="flex items-center space-x-2">
      <span className="text-3xl font-bold font-korean-serif gradient-text">
        팔자
      </span>
      <span className="text-sm font-light text-gray-500 mt-1">8jja.com</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar-link ${
                  pathname === link.href ? 'active' : ''
                }`}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-purple-600 focus:outline-none"
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg absolute top-full left-0 w-full shadow-lg border-t border-gray-200/80">
          <nav className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`navbar-link text-xl ${
                  pathname === link.href ? 'active' : ''
                }`}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
} 