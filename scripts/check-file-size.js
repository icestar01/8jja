#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MAX_LINES = 1000;
const WARNING_LINES = 800;

const excludedDirs = ['node_modules', '.git', '.next', 'dist', 'build'];
const excludedFiles = ['.gitignore', 'package-lock.json', 'yarn.lock'];

function checkFileLines(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').length;
    return lines;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return 0;
  }
}

function scanDirectory(dirPath, results = []) {
  const entries = fs.readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!excludedDirs.includes(entry)) {
        scanDirectory(fullPath, results);
      }
    } else if (stat.isFile()) {
      if (!excludedFiles.includes(entry) && 
          (entry.endsWith('.js') || entry.endsWith('.jsx') || 
           entry.endsWith('.ts') || entry.endsWith('.tsx') ||
           entry.endsWith('.css') || entry.endsWith('.scss'))) {
        
        const lines = checkFileLines(fullPath);
        if (lines >= WARNING_LINES) {
          results.push({
            file: path.relative(process.cwd(), fullPath),
            lines: lines,
            status: lines >= MAX_LINES ? 'CRITICAL' : 'WARNING'
          });
        }
      }
    }
  }

  return results;
}

function main() {
  console.log('🔍 파일 크기 검사 중...\n');
  
  const results = scanDirectory(process.cwd());
  
  if (results.length === 0) {
    console.log('✅ 모든 파일이 권장 크기 이내입니다!');
    return;
  }

  const critical = results.filter(r => r.status === 'CRITICAL');
  const warnings = results.filter(r => r.status === 'WARNING');

  if (critical.length > 0) {
    console.log('🚨 **긴급: 1000줄 초과 파일들** (리팩토링 필수!)\n');
    critical.forEach(item => {
      console.log(`  ❌ ${item.file} (${item.lines} lines)`);
    });
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('⚠️  **주의: 800줄 초과 파일들** (미리 분리 권장)\n');
    warnings.forEach(item => {
      console.log(`  ⚠️  ${item.file} (${item.lines} lines)`);
    });
    console.log('');
  }

  console.log('📝 리팩토링 가이드:');
  console.log('  1. 컴포넌트를 작은 단위로 분리');
  console.log('  2. 유틸리티 함수를 별도 파일로 추출');
  console.log('  3. 타입 정의를 별도 파일로 분리');
  console.log('  4. 상수를 별도 파일로 관리');
  
  if (critical.length > 0) {
    process.exit(1); // 1000줄 초과 시 에러 코드로 종료
  }
}

if (require.main === module) {
  main();
} 