# Quy Chuẩn Frontend (React 19 / TypeScript 5.7+ / Radix UI / Tailwind CSS)

Tài liệu này tổng hợp các tiêu chuẩn phát triển Frontend cho dự án Satek Pro (Admin & Client).

## 1. Strict Typing & Type Safety
- Tuyệt đối cấm sử dụng kiểu `any` (Rule `TYP001`).
- Dùng `unknown` cho dữ liệu chưa rõ và thu hẹp kiểu bằng `typeof`, `instanceof` hoặc `in` (Rule `TYP002`).
- Toàn bộ kiểu dữ liệu đặt trong `src/types/*.types.ts` và export qua `src/types/index.ts` (Rule `TYP007`, `TYP008`).
- Cấm deep import file type con, bắt buộc import từ `@/types` (Rule `TYP009`).

## 2. Component Extraction & State Hygiene
- Tách helper/sub-component tĩnh ra ngoài thân hàm component chính (Rule `RCT003`).
- Ưu tiên Derived State từ props/state; cấm gọi `setState` đồng bộ trong `useEffect` (Rule `RCT001`, `RCT002`).
- State Boolean bắt buộc đặt tên theo chuẩn: **`is[Feature][State]`** (Rule `STA001`).
- Cấm biểu thức Boolean tĩnh `{false && <Component />}` trong JSX (Rule `STA003`).

## 3. UI, Layout, Radix & Accessibility
- Bảng dữ liệu mật độ cao bắt buộc thẻ `<table>` có `table-layout: fixed` và `<colgroup>` (Rule `UIX001`).
- Cấm thuộc tính CSS `display: contents` (Rule `UIX002`).
- Không lồng thẻ `<button>` trong `<button>` (Rule `UIX003`).
- Bắt buộc khai báo `asChild` trên các trigger Radix UI (`PopoverTrigger`, `DialogTrigger`, `TooltipTrigger`) khi bọc button con (Rule `UIX004`).
- Tuân thủ phân lớp Z-Index: Popover `z-[1000]`, Dialog `z-[10000]`, Viewer Backdrop `z-[1050]` & Content `z-[1060]` (Rule `ZIN001` - `ZIN003`).

## 4. Directory & Import Rules
- **Nội bộ `src/components/common/` tuyệt đối CẤM import từ file index của chính nó** (Rule `DIR001`).
- Bên ngoài bắt buộc import qua `@/components/common` (Rule `DIR002`).
- Tên định danh (biến, hàm, file, class) 100% bằng tiếng Anh (Rule `STA005`).

## 5. Semantic Comments
- `// QUYỀN:` giải thích điều kiện phân quyền/ownership.
- `// LOGIC:` giải thích quy tắc nghiệp vụ/thuật toán phức tạp.
- `// UI:` giải thích kích thước động, z-index hoặc điều kiện hiển thị.
