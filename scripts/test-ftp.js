const { Client } = require('basic-ftp');

// FTP 설정 파일 로드
let ftpConfig;
try {
  ftpConfig = require('../ftp-config.js');
} catch (error) {
  console.error('❌ ftp-config.js 파일을 찾을 수 없습니다.');
  console.log('📝 ftp-config.example.js를 복사해서 ftp-config.js로 만들고 설정을 입력하세요.');
  process.exit(1);
}

async function testFTPConnection() {
  const client = new Client();
  
  try {
    console.log('🔍 FTP 연결 테스트를 시작합니다...');
    console.log('=' * 50);
    console.log(`📡 서버: ${ftpConfig.host}`);
    console.log(`👤 사용자: ${ftpConfig.user}`);
    console.log(`🔌 포트: ${ftpConfig.port}`);
    
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
    
    // 현재 디렉토리 확인
    const currentDir = await client.pwd();
    console.log(`📁 현재 디렉토리: ${currentDir}`);
    
    // 원격 디렉토리 테스트
    if (ftpConfig.remotePath) {
      console.log(`\n📂 원격 디렉토리 테스트: ${ftpConfig.remotePath}`);
      try {
        await client.cd(ftpConfig.remotePath);
        console.log('✅ 원격 디렉토리 접근 성공!');
        
        // 디렉토리 내용 확인
        const list = await client.list();
        console.log(`📋 디렉토리 내용: ${list.length}개 항목`);
        
      } catch (error) {
        console.log('❌ 원격 디렉토리 접근 실패:');
        console.log(`   ${error.message}`);
        console.log('💡 remotePath 설정을 확인하세요.');
      }
    }
    
    console.log('\n🎉 FTP 연결 테스트 완료!');
    console.log('✅ 자동 배포가 정상적으로 작동할 것입니다.');
    
  } catch (error) {
    console.error('\n❌ FTP 연결 테스트 실패:');
    console.error(`   ${error.message}`);
    
    // 구체적인 해결 방법 제시
    console.log('\n💡 해결 방법:');
    
    if (error.code === 'ENOTFOUND') {
      console.log('🔍 DNS 오류:');
      console.log('   • FTP 서버 주소(host)를 다시 확인하세요');
      console.log('   • 인터넷 연결을 확인하세요');
      console.log('   • 호스팅 업체에서 제공한 정확한 FTP 주소를 사용하세요');
    } 
    else if (error.code === 530) {
      console.log('🔐 인증 실패:');
      console.log('   • 사용자명(user)과 비밀번호(password)를 확인하세요');
      console.log('   • FTP 계정이 활성화되어 있는지 확인하세요');
      console.log('   • 호스팅 업체 관리 페이지에서 FTP 설정을 확인하세요');
    }
    else if (error.code === 'ECONNREFUSED') {
      console.log('🚫 연결 거부:');
      console.log('   • FTP 포트(port) 번호를 확인하세요 (보통 21)');
      console.log('   • 방화벽이나 보안 프로그램을 확인하세요');
      console.log('   • 호스팅 업체에서 FTP 접속을 허용하는지 확인하세요');
    }
    else if (error.code === 'ETIMEDOUT') {
      console.log('⏰ 연결 시간 초과:');
      console.log('   • 네트워크 연결을 확인하세요');
      console.log('   • VPN 사용 시 비활성화 후 재시도하세요');
      console.log('   • 호스팅 업체 서버 상태를 확인하세요');
    }
    else {
      console.log('🔧 일반적인 해결 방법:');
      console.log('   • ftp-config.js 파일의 모든 설정을 다시 확인하세요');
      console.log('   • 호스팅 업체 고객센터에 문의하세요');
      console.log('   • FTP 클라이언트(FileZilla 등)로 먼저 수동 연결을 테스트하세요');
    }
    
    console.log('\n📞 추가 도움:');
    console.log('   • 호스팅 업체에서 제공한 FTP 설정 가이드를 참조하세요');
    console.log('   • FTP 대신 SFTP나 FTPS가 필요한지 확인하세요');
    
    process.exit(1);
    
  } finally {
    client.close();
  }
}

// 스크립트 실행
if (require.main === module) {
  testFTPConnection();
}

module.exports = { testFTPConnection }; 