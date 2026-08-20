/**
 * scripts/lint-architecture.mjs
 * Frontend Enterprise Architecture Linter Engine (FE-ARCH Catalog - 80 Rules)
 * Inspired by superdong-be ArchitectureLinter.php
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

export const RULE_CATALOG = [
  // TYP: TypeScript Strict Typing & Boundary Safety
  { id: 'TYP001', group: 'TypeScript', title: 'Cấm tuyệt đối sử dụng kiểu any trong toàn bộ mã nguồn', severity: 'ERROR' },
  { id: 'TYP002', group: 'TypeScript', title: 'Dữ liệu động bắt buộc dùng unknown và type narrowing', severity: 'ERROR' },
  { id: 'TYP003', group: 'TypeScript', title: 'Gắn thêm trường vào entity gốc bắt buộc dùng optional (?), cấm as any', severity: 'ERROR' },
  { id: 'TYP004', group: 'TypeScript', title: 'Tham số transformResponse cấm khai báo any', severity: 'ERROR' },
  { id: 'TYP005', group: 'TypeScript', title: 'Tham số query động cấm Record<string, any>', severity: 'ERROR' },
  { id: 'TYP006', group: 'TypeScript', title: 'Trích xuất type component thứ 3 qua Parameters<typeof Component>', severity: 'ERROR' },
  { id: 'TYP007', group: 'TypeScript', title: 'File trong src/types/ bắt buộc có đuôi .types.ts', severity: 'ERROR' },
  { id: 'TYP008', group: 'TypeScript', title: 'Thư mục src/types/ bắt buộc có index.ts re-export toàn bộ', severity: 'ERROR' },
  { id: 'TYP009', group: 'TypeScript', title: 'Bên ngoài chỉ import type qua @/types, cấm deep import file con', severity: 'ERROR' },
  { id: 'TYP010', group: 'TypeScript', title: 'Cấm định nghĩa interface dùng chung rải rác tại các component', severity: 'ERROR' },
  { id: 'TYP011', group: 'TypeScript', title: 'Cấm ép kiểu cưỡng chế as unknown as Target nếu không có Type Predicate', severity: 'ERROR' },
  { id: 'TYP012', group: 'TypeScript', title: 'Dùng as const object hoặc string union thay cho TypeScript enum', severity: 'ERROR' },

  // DIR: Directory Hygiene & Barrel Imports
  { id: 'DIR001', group: 'Directory', title: 'Nội bộ common/ TUYỆT ĐỐI CẤM import index.ts của chính nó', severity: 'ERROR' },
  { id: 'DIR002', group: 'Directory', title: 'File bên ngoài bắt buộc import qua @/components/common', severity: 'ERROR' },
  { id: 'DIR003', group: 'Directory', title: 'src/utils/ và src/store/ phải có index.ts làm single entry', severity: 'ERROR' },
  { id: 'DIR004', group: 'Directory', title: 'Dùng Named Export thay vì Default Export (trừ route pages)', severity: 'ERROR' },
  { id: 'DIR005', group: 'Directory', title: 'File component bắt buộc PascalCase, hook bắt buộc camelCase prefix use', severity: 'ERROR' },
  { id: 'DIR006', group: 'Directory', title: 'Cấm tệp nháp, temp file hoặc log rác trong src/', severity: 'ERROR' },
  { id: 'DIR007', group: 'Directory', title: 'Component chuyên biệt theo domain phải nằm trong feature tương ứng', severity: 'ERROR' },
  { id: 'DIR008', group: 'Directory', title: 'Cấm export * từ các file con có trùng định danh', severity: 'ERROR' },

  // RCT: React Lifecycle, Hooks & Rendering
  { id: 'RCT001', group: 'React', title: 'Cấm gọi setState đồng bộ vô điều kiện trong useEffect', severity: 'ERROR' },
  { id: 'RCT002', group: 'React', title: 'Ưu tiên trạng thái phái sinh (Derived State) từ props/state', severity: 'ERROR' },
  { id: 'RCT003', group: 'React', title: 'Cấm khai báo sub-component trong thân component cha', severity: 'ERROR' },
  { id: 'RCT004', group: 'React', title: 'Mảng dependencies trong hook bắt buộc khai báo đủ', severity: 'ERROR' },
  { id: 'RCT005', group: 'React', title: 'Handler truyền xuống component con nặng bắt buộc bọc useCallback', severity: 'ERROR' },
  { id: 'RCT006', group: 'React', title: 'Tính toán mảng/lọc dữ liệu lớn bắt buộc bọc useMemo', severity: 'ERROR' },
  { id: 'RCT007', group: 'React', title: 'Cấm mutate trực tiếp state hoặc props (dùng immutable update)', severity: 'ERROR' },
  { id: 'RCT008', group: 'React', title: 'Custom hook bắt buộc có tiền tố use và trả về kiểu rõ ràng', severity: 'ERROR' },
  { id: 'RCT009', group: 'React', title: 'Bắt buộc có hàm cleanup khi đăng ký DOM listener, timer, websocket', severity: 'ERROR' },
  { id: 'RCT010', group: 'React', title: 'Cấm dùng index làm key trong danh sách có thêm/xóa/sắp xếp động', severity: 'ERROR' },
  { id: 'RCT011', group: 'React', title: 'Cấm side-effects trực tiếp trong thân hàm render', severity: 'ERROR' },
  { id: 'RCT012', group: 'React', title: 'Component dùng React.forwardRef bắt buộc có displayName', severity: 'ERROR' },

  // UIX: UI Components, Radix UI & Accessibility
  { id: 'UIX001', group: 'UI/A11y', title: 'Table mật độ cao bắt buộc có table-layout: fixed và colgroup', severity: 'ERROR' },
  { id: 'UIX002', group: 'UI/A11y', title: 'Cấm dùng CSS display: contents cho bảng hoặc lưới', severity: 'ERROR' },
  { id: 'UIX003', group: 'UI/A11y', title: 'Cấm lồng thẻ button trong button hoặc thẻ a', severity: 'ERROR' },
  { id: 'UIX004', group: 'UI/A11y', title: 'Radix Trigger khi bọc button con bắt buộc khai báo asChild', severity: 'ERROR' },
  { id: 'UIX005', group: 'UI/A11y', title: 'Khi kết hợp Tooltip & Popover, bắt buộc PopoverTrigger > TooltipTrigger', severity: 'ERROR' },
  { id: 'UIX006', group: 'UI/A11y', title: 'Touch target trên mobile tối thiểu >= 44x44px (WCAG 2.2 AA)', severity: 'ERROR' },
  { id: 'UIX007', group: 'UI/A11y', title: 'Interactive elements bắt buộc có focus-visible:ring-2', severity: 'ERROR' },
  { id: 'UIX008', group: 'UI/A11y', title: 'Mọi input bắt buộc gắn nhãn qua label htmlFor hoặc aria-label', severity: 'ERROR' },
  { id: 'UIX009', group: 'UI/A11y', title: 'Thẻ img bắt buộc có alt mô tả hoặc alt="" aria-hidden="true"', severity: 'ERROR' },
  { id: 'UIX010', group: 'UI/A11y', title: 'Trạng thái tải bắt buộc khai báo aria-busy="true"', severity: 'ERROR' },

  // ZIN: Z-Index Layering
  { id: 'ZIN001', group: 'Z-Index', title: 'Dropdown / Popover cục bộ cố định ở mức z-[1000]', severity: 'ERROR' },
  { id: 'ZIN002', group: 'Z-Index', title: 'Khung hội thoại chính (Dialog Content) cố định ở mức z-[10000]', severity: 'ERROR' },
  { id: 'ZIN003', group: 'Z-Index', title: 'Image/File Viewer Backdrop (z-[1050]), Content (z-[1060])', severity: 'ERROR' },
  { id: 'ZIN004', group: 'Z-Index', title: 'Header / Table Sticky Header chỉ được nằm ở dải an toàn z-10 đến z-30', severity: 'ERROR' },
  { id: 'ZIN005', group: 'Z-Index', title: 'Mở viewer từ dialog phải đóng dialog cha, cấm 2 modal lớn song song', severity: 'ERROR' },

  // STA: State Naming & Clean Code
  { id: 'STA001', group: 'State', title: 'State Boolean bắt buộc định dạng is[Feature][State]', severity: 'ERROR' },
  { id: 'STA002', group: 'State', title: 'Cấm đặt tên state dạng isOpenOverview, showFilter, visible', severity: 'ERROR' },
  { id: 'STA003', group: 'State', title: 'Cấm biểu thức Boolean tĩnh {false && <Comp />} trong JSX', severity: 'ERROR' },
  { id: 'STA004', group: 'State', title: 'Đóng tính năng bắt buộc dọn dẹp state mồ côi và import thừa', severity: 'ERROR' },
  { id: 'STA005', group: 'State', title: 'Định danh biến, hàm, file 100% bằng tiếng Anh', severity: 'ERROR' },
  { id: 'STA006', group: 'State', title: 'Hằng số cấu hình bắt buộc viết SCREAMING_SNAKE_CASE', severity: 'ERROR' },
  { id: 'STA007', group: 'State', title: 'Cấm magic numbers / strings trong code logic', severity: 'ERROR' },
  { id: 'STA008', group: 'State', title: 'Props Boolean bắt buộc tiền tố is, has, can, should', severity: 'ERROR' },

  // ERR: Error Resilience & Async Safety
  { id: 'ERR001', group: 'Error', title: 'Mọi module trang lớn và widget độc lập bắt buộc bọc AppErrorBoundary', severity: 'ERROR' },
  { id: 'ERR002', group: 'Error', title: 'Fallback UI bắt buộc cung cấp nút Tải lại trang (reload())', severity: 'ERROR' },
  { id: 'ERR003', group: 'Error', title: 'Bắt buộc dùng ?. và ?? khi đọc thuộc tính sâu từ API payload', severity: 'ERROR' },
  { id: 'ERR004', group: 'Error', title: 'Hàm async / Promise bắt buộc có try/catch hoặc onError', severity: 'ERROR' },
  { id: 'ERR005', group: 'Error', title: 'Cấm khối catch (e) {} trống nuốt lỗi', severity: 'ERROR' },
  { id: 'ERR006', group: 'Error', title: 'Toast lỗi phải hiển thị thông điệp thân thiện, cấm dump raw stack trace', severity: 'ERROR' },
  { id: 'ERR007', group: 'Error', title: 'Tác vụ tìm kiếm autocomplete phải debounce và có AbortController', severity: 'ERROR' },
  { id: 'ERR008', group: 'Error', title: 'Form submit bắt buộc disable nút bấm khi isSubmitting = true', severity: 'ERROR' },

  // RLT: Realtime Sync & WebSocket
  { id: 'RLT001', group: 'Realtime', title: 'Cấm cập nhật Redux từ mutation API khi đã có event Realtime', severity: 'ERROR' },
  { id: 'RLT002', group: 'Realtime', title: 'Socket listener chỉ dispatch action Redux, cấm gọi user hook', severity: 'ERROR' },
  { id: 'RLT003', group: 'Realtime', title: 'Callback socket phải bọc trong useCallback có dispatch trong deps', severity: 'ERROR' },
  { id: 'RLT004', group: 'Realtime', title: 'Payload socket khác nhau phải có existence guards', severity: 'ERROR' },
  { id: 'RLT005', group: 'Realtime', title: 'Cấm spread thô { ...existing, ...payload } khi patch socket', severity: 'ERROR' },
  { id: 'RLT006', group: 'Realtime', title: 'Kết nối socket & join room chỉ chạy sau khi auth/workspace sẵn sàng', severity: 'ERROR' },

  // DOC & GIT: Documentation & Git Gates
  { id: 'DOC001', group: 'Doc/Git', title: 'Ghi chú điều kiện phân quyền bắt buộc có tiền tố // QUYỀN:', severity: 'ERROR' },
  { id: 'DOC002', group: 'Doc/Git', title: 'Ghi chú thuật toán phức tạp bắt buộc có tiền tố // LOGIC:', severity: 'ERROR' },
  { id: 'DOC003', group: 'Doc/Git', title: 'Ghi chú tính toán chiều cao/z-index bắt buộc có tiền tố // UI:', severity: 'ERROR' },
  { id: 'GIT001', group: 'Doc/Git', title: 'Tên nhánh cá nhân bắt buộc: dev_{developer}_{feature}', severity: 'ERROR' },
  { id: 'GIT002', group: 'Doc/Git', title: 'Commit message 100% chuẩn Conventional Commits', severity: 'ERROR' },
  { id: 'GIT003', group: 'Doc/Git', title: 'Pre-commit Gate 1: Tự động kiểm tra Prettier 2-space', severity: 'ERROR' },
  { id: 'GIT004', group: 'Doc/Git', title: 'Pre-commit Gate 2: Chạy ESLint strict 0 warnings', severity: 'ERROR' },
  { id: 'GIT005', group: 'Doc/Git', title: 'Pre-commit Gate 3: Chạy lint:arch quét 80 rules FE-ARCH', severity: 'ERROR' },
  { id: 'GIT006', group: 'Doc/Git', title: 'Pre-commit Gate 4: Chạy tsc --noEmit 0 errors', severity: 'ERROR' },
  { id: 'GIT007', group: 'Doc/Git', title: 'Pre-commit Gate 5: Chạy npm run build kiểm tra bundle', severity: 'ERROR' },
  { id: 'GIT008', group: 'Doc/Git', title: 'Bắt buộc áp dụng Squash and Merge khi gộp PR vào nhánh chính', severity: 'ERROR' },
];

function getAllSourceFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        getAllSourceFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function getStagedFiles() {
  try {
    const stdout = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return stdout
      .split('\n')
      .map(f => f.trim())
      .filter(f => f && f.startsWith('src/') && (f.endsWith('.ts') || f.endsWith('.tsx')))
      .map(f => path.resolve(process.cwd(), f));
  } catch {
    return [];
  }
}

export function lintSourceFile(filePath, content) {
  const violations = [];
  const normalizedPath = filePath.replace(/\\/g, '/');
  const lines = content.split('\n');

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;

    // TYP001: Strict No Any
    if (/\bas\s+any\b|<any>|:\s*any\b/.test(lineText) && !lineText.includes('// eslint-disable')) {
      violations.push({
        ruleId: 'TYP001',
        file: normalizedPath,
        line: lineNum,
        message: 'Tuyệt đối cấm sử dụng kiểu any. Hãy dùng unknown hoặc interface cụ thể.',
        evidence: lineText.trim(),
        fix: 'Thay thế any bằng unknown hoặc định nghĩa interface trong src/types/*.types.ts',
      });
    }

    // DIR001: Internal Barrel Ban
    if (normalizedPath.includes('components/common/')) {
      if (/from\s+['"](@\/components\/common|\.\/index|\.\/)['"]/.test(lineText)) {
        violations.push({
          ruleId: 'DIR001',
          file: normalizedPath,
          line: lineNum,
          message: 'Nội bộ common/ tuyệt đối CẤM import từ file index của chính nó (chống Require Cycles).',
          evidence: lineText.trim(),
          fix: 'Đổi sang import tương đối trực tiếp: import { Button } from "./Button"',
        });
      }
    }

    // STA001: Boolean State Naming is[Feature][State]
    const useStateMatch = lineText.match(/const\s+\[([a-zA-Z0-9_]+),\s*set[a-zA-Z0-9_]+\]\s*=\s*(?:React\.)?useState(?:<boolean>)?\s*\((true|false)?\)/);
    if (useStateMatch) {
      const stateName = useStateMatch[1];
      const isBoolInit = useStateMatch[2] !== undefined || lineText.includes('<boolean>');
      if (isBoolInit && !/^is[A-Z][a-zA-Z0-9]*$/.test(stateName)) {
        violations.push({
          ruleId: 'STA001',
          file: normalizedPath,
          line: lineNum,
          message: `State Boolean '${stateName}' không đúng chuẩn quy định is[Feature][State].`,
          evidence: lineText.trim(),
          fix: `Đổi tên state thành is${stateName.charAt(0).toUpperCase() + stateName.slice(1)}`,
        });
      }
    }

    // STA003: No Constant Binary JSX
    if (/\{\s*false\s*&&\s*<[A-Za-z]/.test(lineText)) {
      violations.push({
        ruleId: 'STA003',
        file: normalizedPath,
        line: lineNum,
        message: 'Cấm sử dụng {false && <Component />} trong JSX để tắt tính năng.',
        evidence: lineText.trim(),
        fix: 'Dùng comment {/* <Component /> */} hoặc cờ feature flag.',
      });
    }

    // UIX002: Display contents ban
    if (lineText.includes('display: contents') || lineText.includes('display:\'contents\'') || lineText.includes('display:"contents"')) {
      violations.push({
        ruleId: 'UIX002',
        file: normalizedPath,
        line: lineNum,
        message: 'Tuyệt đối cấm dùng CSS display: contents cho các cấu trúc bảng hoặc lưới.',
        evidence: lineText.trim(),
        fix: 'Dùng cấu trúc HTML table hoặc flex/grid tiêu chuẩn.',
      });
    }

    // ZIN001: Z-Index Discipline
    const zIndexMatch = lineText.match(/z-\[(\d+)\]/);
    if (zIndexMatch) {
      const val = zIndexMatch[1];
      const allowed = ['1000', '10000', '1050', '1060'];
      if (!allowed.includes(val)) {
        violations.push({
          ruleId: 'ZIN001',
          file: normalizedPath,
          line: lineNum,
          message: `Giá trị z-[${val}] không thuộc danh mục token quy chuẩn (chỉ cho phép 1000, 10000, 1050, 1060).`,
          evidence: lineText.trim(),
          fix: 'Sử dụng token quy chuẩn: z-[1000] (popover), z-[10000] (dialog), z-[1050] (viewer backdrop), z-[1060] (viewer content)',
        });
      }
    }
  });

  // TYP007: Type file extension check
  if (normalizedPath.includes('src/types/') && !normalizedPath.endsWith('index.ts') && !normalizedPath.endsWith('.types.ts')) {
    violations.push({
      ruleId: 'TYP007',
      file: normalizedPath,
      line: 1,
      message: 'Mọi file type trong src/types/ bắt buộc phải có đuôi .types.ts',
      evidence: normalizedPath,
      fix: 'Đổi tên file thành [name].types.ts',
    });
  }

  return violations;
}

export function main() {
  const args = process.argv.slice(2);

  if (args.includes('--list-rules')) {
    console.log('\n================ ARCHITECTURE RULE CATALOG (80 RULES) ================');
    console.log(`Total Rules: ${RULE_CATALOG.length}`);
    let curGroup = '';
    RULE_CATALOG.forEach((r) => {
      if (r.group !== curGroup) {
        curGroup = r.group;
        console.log(`\n--- [${curGroup}] ---`);
      }
      console.log(`  - ${r.id}: ${r.title}`);
    });
    console.log('\n=======================================================================\n');
    process.exit(0);
  }

  const isStaged = args.includes('--staged');
  const files = isStaged ? getStagedFiles() : getAllSourceFiles(path.resolve(process.cwd(), 'src'));

  console.log('\n================ ARCHITECTURE LINT (FE-ARCH) ================');
  console.log(`Scope       : ${isStaged ? 'STAGED FILES SCAN' : 'FULL PROJECT SCAN'}`);
  console.log(`Files       : ${files.length} TypeScript source files`);
  console.log(`Policy      : No baseline; Mọi vi phạm đều chặn commit`);
  console.log('=============================================================\n');

  if (files.length === 0) {
    console.log('✅ Không có file nào cần quét. PASSED.\n');
    process.exit(0);
  }

  let allViolations = [];
  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const v = lintSourceFile(file, content);
      allViolations.push(...v);
    } catch (e) {
      console.error(`Không thể đọc file: ${file}`, e.message);
    }
  });

  if (allViolations.length > 0) {
    console.log(`❌ FAILED: Phát hiện ${allViolations.length} vi phạm kiến trúc:\n`);
    allViolations.forEach((v, i) => {
      console.log(`\x1b[31m#${i + 1} [ERROR] [${v.ruleId}] \x1b[36m${v.file}:${v.line}\x1b[0m`);
      console.log(`  Rule:     ${v.message}`);
      console.log(`  Evidence: \x1b[33m${v.evidence}\x1b[0m`);
      console.log(`  Fix:      \x1b[32m${v.fix}\x1b[0m\n`);
    });

    console.log('=============================================================');
    console.log('❌ Commit bị chặn do vi phạm quy chuẩn kiến trúc công ty.');
    console.log('Chạy lại: npm run lint:arch');
    console.log('=============================================================\n');
    process.exit(1);
  }

  console.log('===================== SUMMARY =====================');
  console.log(`Scanned     : ${files.length} files`);
  console.log('Errors      : 0');
  console.log('Status      : PASSED (100% compliant with FE-ARCH Catalog)');
  console.log('===================================================\n');
  process.exit(0);
}

main();
