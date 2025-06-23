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

// 진행률 표시 함수
function showProgress(transferred, total) {
  const percentage = Math.round((transferred / total) * 100);
  const bar = '█'.repeat(Math.round(percentage / 2)) + '░'.repeat(50 - Math.round(percentage / 2));
  process.stdout.write(`\r📤 업로드 진행률: [${bar}] ${percentage}%`);
}

// 파일 크기 계산
function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  function traverse(currentPath) {
    const stats = fs.statSync(currentPath);
    if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        traverse(path.join(currentPath, file));
      });
    } else {
      totalSize += stats.size;
    }
  }
  
  traverse(dirPath);
  return totalSize;
}

// 파일 크기를 읽기 쉬운 형태로 변환
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function uploadToFTP() {
  const client = new Client();
  let uploadedSize = 0;
  let totalSize = 0;
  
  try {
    console.log('🚀 8jja 운세 사이트 FTP 업로드를 시작합니다...');
    console.log('=' * 60);
    console.log(`📡 서버: ${ftpConfig.host}`);
    console.log(`👤 사용자: ${ftpConfig.user}`);
    console.log(`📁 로컬 경로: ${ftpConfig.localPath}`);
    console.log(`📂 원격 경로: ${ftpConfig.remotePath}`);
    
    // 로컬 폴더 확인
    const localPath = path.resolve(ftpConfig.localPath);
    if (!fs.existsSync(localPath)) {
      throw new Error(`로컬 폴더를 찾을 수 없습니다: ${localPath}`);
    }
    
    // 전체 크기 계산
    console.log('\n📊 업로드할 파일 크기 계산 중...');
    totalSize = getDirectorySize(localPath);
    console.log(`📦 총 업로드 크기: ${formatBytes(totalSize)}`);
    
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
    
    // 서버 정보 표시
    const serverInfo = await client.pwd();
    console.log(`🏠 현재 서버 디렉토리: ${serverInfo}`);
    
    // 원격 디렉토리로 이동
    if (ftpConfig.remotePath) {
      console.log(`📂 원격 디렉토리로 이동: ${ftpConfig.remotePath}`);
      await client.ensureDir(ftpConfig.remotePath);
      await client.cd(ftpConfig.remotePath);
    }
    
    console.log('\n📤 파일 업로드 시작...');
    
    // 파일 업로드 진행률 추적
    client.ftp.verbose = false; // 상세 로그 비활성화
    
    // 업로드 진행률 추적을 위한 이벤트 리스너
    const startTime = Date.now();
    
    // 폴더 전체 업로드
    await uploadDirectory(client, localPath, '', totalSize, uploadedSize);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log('\n\n🎉 업로드 완료!');
    console.log('=' * 60);
    console.log(`⏱️  소요 시간: ${duration.toFixed(2)}초`);
    console.log(`📊 업로드 속도: ${formatBytes(totalSize / duration)}/s`);
    console.log(`📁 업로드된 크기: ${formatBytes(totalSize)}`);
    console.log('\n🌐 웹사이트에서 확인하세요:');
    console.log(`   http://yourdomain.com`);
    console.log('\n📱 페이지 목록:');
    console.log('   • 메인 페이지: /');
    console.log('   • 사주팔자: /saju/');
    console.log('   • 타로점: /tarot/');
    console.log('   • 오늘의 운세: /today/');
    console.log('   • 토정비결: /tojeong/');
    console.log('   • 행운의 번호: /lucky-number/');
    console.log('   • 띠 운세: /zodiac/');
    console.log('   • 별자리 운세: /horoscope/');
    console.log('   • 꿈해몽: /dream/');
    console.log('   • 궁합: /compatibility/');
    console.log('   • 혈액형 궁합: /bloodtype-compatibility/');
    console.log('   • 이름 운세: /name-fortune/');
    console.log('   • 오늘의 명언: /daily-quote/');
    
  } catch (error) {
    console.error('\n❌ 업로드 중 오류 발생:');
    console.error(error.message);
    
    // 일반적인 오류 해결 방법 안내
    console.log('\n💡 오류 해결 방법:');
    if (error.code === 'ENOTFOUND') {
      console.log('   🔍 DNS 오류 - FTP 서버 주소를 확인하세요');
      console.log('   🌐 인터넷 연결을 확인하세요');
    } else if (error.code === 530) {
      console.log('   🔐 인증 실패 - 사용자명과 비밀번호를 확인하세요');
      console.log('   👤 FTP 계정이 활성화되어 있는지 확인하세요');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('   🚫 연결 거부 - FTP 포트 번호를 확인하세요 (보통 21)');
      console.log('   🔥 방화벽 설정을 확인하세요');
    } else if (error.code === 550) {
      console.log('   📁 권한 오류 - 원격 디렉토리 경로와 권한을 확인하세요');
    }
    
    console.log('\n📞 추가 도움이 필요하시면:');
    console.log('   • 호스팅 업체 고객센터에 문의하세요');
    console.log('   • FTP 설정 정보를 다시 확인하세요');
    
    process.exit(1);
  } finally {
    client.close();
  }
}

// 디렉토리 재귀 업로드 함수
async function uploadDirectory(client, localDir, remoteDir, totalSize, uploadedSize) {
  const files = fs.readdirSync(localDir);
  
  for (const file of files) {
    const localFilePath = path.join(localDir, file);
    const remoteFilePath = remoteDir ? `${remoteDir}/${file}` : file;
    const stats = fs.statSync(localFilePath);
    
    if (stats.isDirectory()) {
      // 디렉토리 생성 후 재귀 업로드
      await client.ensureDir(remoteFilePath);
      await uploadDirectory(client, localFilePath, remoteFilePath, totalSize, uploadedSize);
    } else {
      // 파일 업로드
      await client.uploadFrom(localFilePath, remoteFilePath);
      uploadedSize += stats.size;
      showProgress(uploadedSize, totalSize);
    }
  }
}

// 스크립트 실행
if (require.main === module) {
  // 빌드 파일 존재 확인
  if (!fs.existsSync('./out')) {
    console.log('❌ 빌드 파일이 없습니다. 먼저 빌드를 실행하세요:');
    console.log('   npm run build');
    process.exit(1);
  }
  
  uploadToFTP().catch(console.error);
}

module.exports = { uploadToFTP }; 