// FTP 설정 파일 예시
// 이 파일을 복사해서 ftp-config.js로 만들고 실제 정보를 입력하세요

module.exports = {
  // FTP 서버 정보
  host: "ftp.yourdomain.com",  // FTP 서버 주소
  user: "your_username",       // FTP 사용자명
  password: "your_password",   // FTP 비밀번호
  port: 21,                    // FTP 포트 (기본값: 21)
  
  // 업로드 설정
  localPath: "./out",          // 로컬 업로드할 폴더 (빌드된 파일들)
  remotePath: "/public_html",  // 서버 업로드 경로 (웹 루트)
  
  // 추가 옵션
  secure: false,               // FTPS 사용 여부
  secureOptions: {},          // FTPS 옵션
  
  // 제외할 파일/폴더 (선택사항)
  exclude: [
    "*.log",
    "*.tmp",
    ".DS_Store"
  ]
}; 