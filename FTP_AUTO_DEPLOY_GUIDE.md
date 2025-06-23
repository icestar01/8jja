# 🚀 8jja 자동 FTP 배포 가이드

## 🔧 설정 방법

### 1️⃣ FTP 설정 파일 생성

1. `ftp-config.example.js`를 복사하여 `ftp-config.js` 생성
2. 실제 FTP 정보로 수정:

```javascript
module.exports = {
  host: "ftp.cafe24.com",          // 실제 FTP 서버 주소
  user: "your_username",           // 실제 FTP 사용자명  
  password: "your_password",       // 실제 FTP 비밀번호
  port: 21,                        // FTP 포트
  
  localPath: "./out",              // 빌드된 파일 경로
  remotePath: "/public_html",      // 웹 루트 경로
  
  secure: false,                   // FTPS 사용 여부
};
```

### 2️⃣ 호스팅별 설정 예시

#### 🟦 **Cafe24**
```javascript
{
  host: "ftp.cafe24.com",
  remotePath: "/public_html",
  port: 21
}
```

#### 🟩 **가비아**
```javascript
{
  host: "ftp.gabia.com", 
  remotePath: "/public_html/www",
  port: 21
}
```

#### 🟨 **닷홈**
```javascript
{
  host: "ftp.dothome.co.kr",
  remotePath: "/html",
  port: 21
}
```

#### 🟪 **아임웹**
```javascript
{
  host: "ftp.imweb.me",
  remotePath: "/public_html",
  port: 21
}
```

## 🚀 배포 명령어

### ⚡ 원클릭 배포 (추천)
```bash
node deploy.js
```
- 빌드 + FTP 업로드를 한 번에 실행
- 진행률과 상세 정보 표시

### 🔧 단계별 배포

#### 1. 빌드만 하기
```bash
npm run build
```

#### 2. FTP 업로드만 하기  
```bash
npm run ftp-upload
```

#### 3. 빌드 + 업로드
```bash
npm run deploy
```

## 📊 배포 과정

### 1️⃣ **빌드 단계**
- Next.js 정적 사이트 생성
- `/out` 폴더에 HTML/CSS/JS 파일 생성
- 모든 페이지를 정적 파일로 변환

### 2️⃣ **업로드 단계**  
- FTP 서버 연결
- 파일 크기 계산
- 진행률 표시하며 업로드
- 업로드 완료 확인

## 🌐 업로드되는 페이지

### 🎯 **메인 서비스**
- `/` - 메인 페이지
- `/saju/` - 사주팔자
- `/tarot/` - 타로점  
- `/today/` - 오늘의 운세
- `/compatibility/` - 궁합

### 🆕 **추가 서비스**
- `/tojeong/` - 토정비결
- `/lucky-number/` - 행운의 번호
- `/newyear/` - 신년운세
- `/zodiac/` - 띠 운세
- `/horoscope/` - 별자리 운세
- `/bloodtype-compatibility/` - 혈액형 궁합
- `/name-fortune/` - 이름 운세
- `/daily-quote/` - 오늘의 명언
- `/dream/` - 꿈해몽

## 🔍 문제 해결

### ❌ **연결 오류**
```
Error: ENOTFOUND
```
**해결 방법:**
- FTP 서버 주소 확인
- 인터넷 연결 확인

### ❌ **인증 오류**  
```
Error: 530 Login incorrect
```
**해결 방법:**
- 사용자명/비밀번호 확인
- FTP 계정 활성화 확인

### ❌ **권한 오류**
```
Error: 550 Permission denied
```
**해결 방법:**
- 원격 경로 확인 (`/public_html`, `/html` 등)
- 폴더 권한 확인

### ❌ **포트 오류**
```
Error: ECONNREFUSED  
```
**해결 방법:**
- FTP 포트 확인 (보통 21)
- 방화벽 설정 확인

## 📈 배포 후 확인 사항

### ✅ **정상 작동 확인**
1. 메인 페이지 로딩 확인
2. 각 운세 서비스 작동 확인  
3. 모바일 반응형 확인
4. 이미지/CSS 로딩 확인

### 🔧 **성능 최적화**
- 브라우저 캐시 활용
- 이미지 압축 적용
- CSS/JS 최적화 적용

## 💡 팁과 요령

### 🚀 **빠른 배포**
- 코드 수정 후 `node deploy.js` 한 번만 실행
- 변경된 파일만 업로드 (FTP 클라이언트 특성상)

### 🔄 **정기 배포**  
- 새로운 기능 추가 시 배포
- 운세 데이터 업데이트 시 배포
- 버그 수정 후 배포

### 📱 **모바일 최적화**
- 반응형 디자인 자동 적용
- 터치 친화적 인터페이스
- 빠른 로딩 속도

## 🎉 완료!

이제 명령어 한 줄로 8jja 운세 사이트를 자동 배포할 수 있습니다!

```bash
node deploy.js
```

🌟 **행운을 빌어요!** 🌟 