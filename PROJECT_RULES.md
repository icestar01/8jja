# 8jja.com 프로젝트 개발 규칙

## 🚨 필수 준수 사항 (MANDATORY)

### 1. 작업 디렉토리 규칙
- **모든 프로젝트 작업은 반드시 `E:\cursor\8jja` 폴더 안에서 실행할 것**
- 터미널 명령어, 파일 생성, 구조 변경 등 모든 작업은 해당 폴더 내에서만 수행
- 다른 디렉토리에서 작업 시 파일 경로 오류 및 프로젝트 구조 손상 위험

```bash
# 올바른 작업 디렉토리 확인
cd E:\cursor\8jja
pwd  # 현재 위치 확인

# 명령어 실행 예시
npm run dev
npm install
```

### 2. 코드 리팩토링 규칙
- **파일이 1000줄을 초과하면 반드시 리팩토링 실시**
- 컴포넌트, 유틸리티, 서비스 등으로 분리하여 코드 관리성 향상
- 단일 파일 최대 권장 라인 수: 800줄 (1000줄 도달 전 미리 분리)

```typescript
// 리팩토링 예시: 큰 컴포넌트 분리
// Before: LargeComponent.tsx (1200 lines)
// After: 
//   - LargeComponent.tsx (main component, ~300 lines)
//   - components/LargeComponentForm.tsx (~400 lines)
//   - components/LargeComponentResults.tsx (~400 lines)
//   - utils/largeComponentUtils.ts (~100 lines)
```

## 📋 추가 개발 규칙

### 3. 파일 구조 규칙
```
8jja/
├── src/
│   ├── app/                 # Next.js App Router 페이지
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── layout/         # 레이아웃 관련 컴포넌트
│   │   ├── ui/             # UI 기본 컴포넌트
│   │   └── [feature]/      # 기능별 컴포넌트
│   ├── utils/              # 유틸리티 함수
│   ├── services/           # API 서비스
│   ├── types/              # TypeScript 타입 정의
│   └── data/               # 정적 데이터
├── components/             # 루트 레벨 컴포넌트 (임시)
├── public/                 # 정적 파일
└── [config files]          # 설정 파일들
```

### 4. 명명 규칙
- **컴포넌트**: PascalCase (예: `FortuneCard.tsx`)
- **파일/폴더**: kebab-case (예: `today-fortune/`)
- **변수/함수**: camelCase (예: `generateFortune`)
- **상수**: UPPER_SNAKE_CASE (예: `MAX_FILE_LINES`)

### 5. 컴포넌트 분리 기준
- **UI 컴포넌트**: 재사용 가능한 기본 컴포넌트
- **Feature 컴포넌트**: 특정 기능에 특화된 컴포넌트
- **Layout 컴포넌트**: 페이지 구조 관련 컴포넌트
- **Page 컴포넌트**: 라우트별 메인 컴포넌트

### 6. 코드 품질 규칙
- TypeScript 타입 정의 필수
- ESLint 규칙 준수
- 컴포넌트별 최대 props 수: 10개
- 함수별 최대 매개변수 수: 5개
- 중복 코드 방지 (DRY 원칙)

### 7. 성능 최적화 규칙
- 이미지 최적화 (Next.js Image 컴포넌트 사용)
- 코드 스플리팅 적용
- 불필요한 리렌더링 방지
- 메모이제이션 적절히 활용

## 🛠️ 개발 도구 및 설정

### 개발 서버 실행
```bash
cd E:\cursor\8jja
npm run dev
```

### 빌드 및 배포
```bash
cd E:\cursor\8jja
npm run build
npm start
```

### 패키지 관리
```bash
cd E:\cursor\8jja
npm install [package-name]
npm uninstall [package-name]
```

## 📝 커밋 규칙
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 코드 리팩토링 (1000줄 초과 시 필수)
- `style`: 스타일 관련 변경
- `docs`: 문서 업데이트
- `test`: 테스트 관련

예시:
```
feat: 오늘의 운세 페이지 구현
refactor: 홈페이지 컴포넌트 1000줄 초과로 분리
fix: 궁합 계산 버그 수정
```

---

**⚠️ 주의사항**: 위 규칙들 중 **1번(작업 디렉토리)**과 **2번(리팩토링)**은 반드시 준수해야 하는 필수 사항입니다. 

# 반드시 E:\cursor\8jja 안에서!
cd E:\cursor\8jja

# 의존성 최신화(처음 한 번)
npm install

# 정적 HTML‧자바스크립트 빌드 & 내보내기
npm run export          # = next build && next export