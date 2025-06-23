# 8jja.com - 운세 전문 사이트

전통 사주명리학을 바탕으로 한 정확하고 신뢰할 수 있는 운세 서비스를 제공하는 웹사이트입니다.

## 🚨 중요: 프로젝트 규칙

**반드시 준수해야 하는 필수 규칙이 있습니다!**

1. **모든 작업은 `E:\cursor\8jja` 폴더 안에서만 실행**
2. **파일이 1000줄 초과 시 즉시 리팩토링**

📋 자세한 규칙은 [PROJECT_RULES.md](./PROJECT_RULES.md)를 참고하세요.

## 🚀 빠른 시작

```bash
# 1. 올바른 디렉토리로 이동
cd E:\cursor\8jja

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
# http://localhost:3000
```

## 🛠️ 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 파일 크기 체크 (1000줄 초과 확인)
npm run check-size

# 전체 프로젝트 룰 체크
npm run check-rules

# 린트 체크
npm run lint
```

## 📁 프로젝트 구조

```
8jja/
├── src/
│   ├── app/                 # Next.js 페이지 (App Router)
│   │   ├── page.tsx        # 홈페이지
│   │   ├── today/          # 오늘의 운세
│   │   ├── compatibility/  # 궁합 보기
│   │   └── layout.tsx      # 루트 레이아웃
│   └── components/          # 재사용 컴포넌트
├── components/              # 루트 레벨 컴포넌트
│   └── layout/             # 레이아웃 컴포넌트
├── scripts/                # 프로젝트 관리 스크립트
├── public/                 # 정적 파일
├── PROJECT_RULES.md        # 📋 프로젝트 개발 규칙
└── README.md              # 이 파일
```

## 🎯 주요 기능

### ✅ 구현 완료
- 🏠 **홈페이지**: 서비스 소개, 고객 후기, 필터링
- 📅 **오늘의 운세**: 별자리/띠별 운세 분석
- 💕 **궁합 보기**: 연애/친구/사업 궁합 분석
- 📱 **반응형 디자인**: 모바일 최적화
- 🎨 **한국어 지원**: Noto Sans/Serif KR 폰트

### 🚧 개발 예정
- 🌟 **사주팔자**: 생년월일시 기반 상세 분석
- 🔮 **타로카드**: 카드 뽑기 및 해석
- 🌙 **꿈해몽**: 꿈 분석 서비스
- 📜 **토정비결**: 연간 운세 서비스

## 🎨 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Noto Sans KR, Noto Serif KR
- **Development**: ESLint, Turbopack

## 📝 개발 가이드

### 컴포넌트 작성 시 주의사항
- 파일당 최대 800줄 권장 (1000줄 초과 금지)
- TypeScript 타입 정의 필수
- 재사용 가능한 컴포넌트 작성
- 성능 최적화 고려

### 파일 크기 체크
```bash
# 파일 크기 자동 체크
npm run check-size

# 결과 예시:
# 🔍 파일 크기 검사 중...
# 
# 🚨 **긴급: 1000줄 초과 파일들** (리팩토링 필수!)
#   ❌ src/app/page.tsx (1200 lines)
# 
# ⚠️  **주의: 800줄 초과 파일들** (미리 분리 권장)
#   ⚠️  src/app/compatibility/page.tsx (850 lines)
```

## 🚀 배포

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📞 문의

프로젝트 관련 문의사항이 있으시면 언제든 연락주세요.

---

**⚠️ 중요**: 개발 전 반드시 [PROJECT_RULES.md](./PROJECT_RULES.md)를 읽어주세요!
