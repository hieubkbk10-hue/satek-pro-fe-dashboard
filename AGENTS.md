# AGENTS.md

## 1. Core Principles

- Trả lời bằng Tiếng Việt có dấu khi làm việc với repository này.
- Tuân thủ KISS, YAGNI, DRY. Ưu tiên giải pháp đơn giản, ngắn gọn, dễ đọc và dễ rollback.
- Áp dụng Surgical Changes nghiêm ngặt: chỉ sửa đúng tệp và đúng phần liên quan trực tiếp đến tác vụ. Tuyệt đối không tự ý định dạng lại (formatting), sửa comment hoặc refactor code lân cận nếu chúng không bị lỗi và không thuộc phạm vi được yêu cầu.
- Think & Push back: khi phát hiện giả định ngầm, rủi ro mất dữ liệu, sai thẩm quyền hoặc phương án đơn giản hơn, luôn dừng lại giải thích ngắn bằng evidence và xin ý kiến người dùng trước khi triển khai.
- Tách bạch Observation (quan sát), Inference (suy luận), Decision (quyết định) và luôn dẫn chứng bằng đường dẫn tệp, dòng code hoặc kết quả lệnh cụ thể.

## 2. Source-of-Truth Hierarchy

Khi có sự khác biệt giữa các nguồn hướng dẫn, áp dụng thứ tự ưu tiên từ cao xuống thấp:

1. Yêu cầu trực tiếp của người dùng trong phiên làm việc hiện tại.
2. `AGENTS.md` (source of truth duy nhất của repository).
3. Tài liệu tiêu chuẩn trong `.factory/standards/` (chỉ đọc khi scope tác vụ chạm tới).
4. Project Skill trong `.factory/skills/` (chỉ kích hoạt khi trigger thực sự khớp).
5. Mã nguồn và cấu hình hiện có của dự án.
6. Tài liệu công khai của thư viện/framework.

## 3. Stack Boundaries

- Project: Vite 6, React 19, TypeScript 5.7+ Strict, Tailwind CSS v3.4, Radix UI, Lucide Icons, TanStack Query.
- Phân hệ: Gồm 2 phân hệ độc lập `Admin - root.` (/admin/*) và `Client-root` (/client/*).
- Cấm tự ý cài thêm UI library ngoài danh mục (Antd, MUI...) khi chưa có yêu cầu rõ ràng.

## 4. Workspace Hygiene & Temporary Files

- Không tạo tệp nháp, tệp thử nghiệm, patch file hay report tạm ở thư mục gốc hoặc trong `src/`.
- Nếu thật sự cần script tạm, lưu tại thư mục nháp được quy định và bắt buộc dọn dẹp sạch sẽ trước khi bàn giao tác vụ.
- Không đọc, in hay commit secret, private key, token hoặc tệp `.env*`.

## 5. Skill Routing & User-Only Gates

- Mỗi skill trong `.factory/skills/` chỉ sở hữu một capability rõ ràng với trigger hẹp.
- Không tự ý nối chuỗi skill (skill chain) hoặc tự chạy pipeline đa bước ngầm.
- Các skill thuộc nhóm **User-Only Gate** sau đây **TUYỆT ĐỐI KHÔNG** được tự động gọi:
  - `satek-feature-workflow`: Chỉ khi người dùng yêu cầu lập workflow cross-layer cho tính năng lớn.
  - `satek-review-first`: Chỉ khi người dùng trực tiếp yêu cầu review/QA/audit.
- Quy chuẩn chi tiết tham chiếu `.factory/standards/`.

## 6. Frontend & Architecture Rules

- Giữ strict typing; dùng `unknown` thay cho `any` ở boundary chưa rõ kiểu (Rule `TYP001`).
- Tách component tĩnh ra ngoài thân hàm component chính để tránh hủy state (`RCT003`).
- Bảo đảm WCAG 2.2 AA cơ bản: focus visible, touch target >= 44x44px (`UIX006`, `UIX007`).
- Bắt buộc `asChild` trên Radix triggers khi bọc element con (`UIX004`).
- Bảng dữ liệu mật độ cao bắt buộc thẻ `<table>` có `table-layout: fixed` và `<colgroup>` (`UIX001`).
- Nội bộ `src/components/common/` tuyệt đối cấm import file index của chính nó (`DIR001`).
- Phân lớp Z-Index cố định: Popover/Dropdown `z-[1000]`, Dialog `z-[10000]`, Viewer `z-[1050]` / `z-[1060]`.

## 7. Mock Data & Real Data Operations Safety

- Chuẩn bị sẵn Mock Fixtures trong `src/mocks/fixtures/` khớp 100% với Figma 77 màn hình.
- Khi tích hợp API thực tế, bắt buộc dùng TanStack Query mutation và query hooks.
- Sửa dữ liệu thật chỉ được thực hiện khi người dùng cấp phép rõ ràng (read-before-write, minimal patch, verify-after-write).

## 8. Review-First Workflow (Triển khai & Bàn giao)

Workflow mặc định khi hoàn thành viết/sửa code:

1. Triển khai surgical diff đúng phạm vi yêu cầu.
2. Tự tĩnh rà soát (static review) toàn bộ diff: kiểm tra scope, typing, null-safety, edge cases, data contract và tệp phát sinh ngoài ý muốn.
3. Trình bày ngắn gọn cho người dùng: các tệp đã sửa, giải pháp chính, giả định/rủi ro (nếu có) và các kiểm tra chưa chạy.
4. **DỪNG LẠI và chờ chỉ thị của người dùng.**

Agent **nghiêm cấm**:
- Tự động tạo commit, push hay deploy nếu người dùng chưa chỉ thị.

## 9. Verification & Git Controls

- **TUYỆT ĐỐI KHÔNG TỰ Ý COMMIT HOẶC PUSH CODE.**
- Chỉ stage đúng các tệp liên quan trực tiếp đến tác vụ khi người dùng yêu cầu commit.
- Tên nhánh cá nhân bắt buộc: `dev_{developer_name}_{feature_description}`.
- Tuân thủ Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`).
- Mọi commit bị kiểm duyệt tự động qua Husky 5 Tầng Quality Gates.

## 10. Comment & Evidence Rules

- Comment giải thích **LÝ DO (Why)** cho thuật toán phức tạp, phân quyền hay workaround; không comment hành động **CÁI GÌ (What)** khi tên biến/hàm đã tự giải thích.
- Tiền tố comment chuẩn hóa bắt buộc:
  - `// QUYỀN:` giải thích điều kiện phân quyền/ownership.
  - `// LOGIC:` giải thích quy tắc nghiệp vụ/thuật toán.
  - `// UI:` giải thích hiển thị/kích thước/tương tác động/z-index.
- Không commit code cũ bị comment vô hiệu hóa (dead code); xóa bỏ hoàn toàn vì Git đã lưu lịch sử.
