const { Client } = require('basic-ftp');
const path = require('path');
const fs = require('fs');

// FTP 설정 파일 로드
let ftpConfig;
try {
  ftpConfig = require('../ftp-config.js');
} catch (error) {
  console.error('❌ ftp-config.js 파일을 찾을 수 없습니다.');
  console.log('📝 ftp-config.example.js를 복사해서 ftp-config.js로 만들고 설정을 입력하세요.');
  process.exit(1);
}

async function uploadToFTP() {
  const client = new Client();
  
  try {
    console.log('🚀 FTP 업로드를 시작합니다...');
    console.log(`📡 서버: ${ftpConfig.host}`);
    console.log(`👤 사용자: ${ftpConfig.user}`);
    console.log(`📁 로컬 경로: ${ftpConfig.localPath}`);
    console.log(`📂 원격 경로: ${ftpConfig.remotePath}`);
    
    // FTP 서버 연결
    console.log('\n🔌 FTP 서버에 연결 중...');
    await client.access({
      host: ftpConfig.host,
      user: ftpConfig.user,
      password: ftpConfig.password,
      port: ftpConfig.port,
      secure: ftpConfig.secure,
      secureOptions: ftpConfig.secureOptions
    });
    
    console.log('✅ FTP 서버 연결 성공!');
    
    // 원격 디렉토리로 이동
    if (ftpConfig.remotePath) {
      console.log(`📂 원격 디렉토리로 이동: ${ftpConfig.remotePath}`);
      await client.ensureDir(ftpConfig.remotePath);
      await client.cd(ftpConfig.remotePath);
    }
    
    // 로컬 폴더 확인
    const localPath = path.resolve(ftpConfig.localPath);
    if (!fs.existsSync(localPath)) {
      throw new Error(`로컬 폴더를 찾을 수 없습니다: ${localPath}`);
    }
    
    console.log('\n📤 파일 업로드 중...');
    
    // 진행률 표시
    client.ftp.verbose = true;
    
    // 폴더 전체 업로드
    await client.uploadFromDir(localPath);
    
    console.log('\n🎉 업로드 완료!');
    console.log('🌐 웹사이트 확인: http://yourdomain.com');
    
  } catch (error) {
    console.error('\n❌ 업로드 중 오류 발생:');
    console.error(error.message);
    
    // 일반적인 오류 해결 방법 안내
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 해결 방법:');
      console.log('   - FTP 서버 주소를 확인하세요');
      console.log('   - 인터넷 연결을 확인하세요');
    } else if (error.code === 530) {
      console.log('\n💡 해결 방법:');
      console.log('   - 사용자명과 비밀번호를 확인하세요');
      console.log('   - FTP 계정이 활성화되어 있는지 확인하세요');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 해결 방법:');
      console.log('   - FTP 포트 번호를 확인하세요 (보통 21)');
      console.log('   - 방화벽 설정을 확인하세요');
    }
    
    process.exit(1);
  } finally {
    client.close();
  }
}

// 스크립트 실행
if (require.main === module) {
  uploadToFTP().catch(console.error);
}

module.exports = { uploadToFTP }; 