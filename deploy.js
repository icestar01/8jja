#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 8jja 운세 사이트 자동 배포 시작!');
console.log('=' * 50);

// FTP 설정 파일 확인
if (!fs.existsSync('./ftp-config.js')) {
  console.log('❌ FTP 설정 파일이 없습니다.');
  console.log('📝 다음 단계를 따라주세요:');
  console.log('   1. ftp-config.example.js를 복사하여 ftp-config.js 생성');
  console.log('   2. ftp-config.js에서 실제 FTP 정보 입력');
  console.log('   3. 다시 배포 실행');
  process.exit(1);
}

try {
  // 1단계: 프로젝트 빌드
  console.log('📦 1단계: 프로젝트 빌드 중...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 빌드 완료!');
  
  // 2단계: FTP 업로드
  console.log('\n📤 2단계: FTP 업로드 시작...');
  execSync('node scripts/ftp-upload-advanced.js', { stdio: 'inherit' });
  
  console.log('\n🎉 배포 완료!');
  console.log('🌐 웹사이트를 확인하세요: http://yourdomain.com');
  
} catch (error) {
  console.error('\n❌ 배포 중 오류 발생:', error.message);
  process.exit(1);
} 