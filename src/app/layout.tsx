import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "8jja.com - 사주팔자, 타로, 운세 전문 사이트",
  description: "전문적인 사주팔자 분석, 타로카드, 오늘의 운세, 궁합 등 다양한 운세 서비스를 제공합니다.",
  keywords: "사주팔자, 타로, 운세, 궁합, 오늘의운세, 명리학",
  openGraph: {
    title: "8jja.com - 사주팔자, 타로, 운세 전문 사이트",
    description: "전문적인 운세 서비스를 제공하는 8jja.com",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} ${notoSerifKR.variable} font-korean antialiased bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
