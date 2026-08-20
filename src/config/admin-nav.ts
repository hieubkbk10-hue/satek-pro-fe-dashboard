import {
  LayoutDashboard,
  Globe,
  Server,
  Mail,
  Bot,
  Gift,
  Tag,
  Users,
  LifeBuoy,
  Package,
  RefreshCw,
  RotateCcw,
  Wallet,
  TrendingUp,
  FileText,
  CheckSquare,
  Building2,
  Settings,
  Layers,
  HelpCircle,
  ShieldAlert,
  Sliders,
  FileSpreadsheet,
  LucideIcon,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface NavGroup {
  id: string;
  groupTitle: string;
  items: NavItem[];
}

export const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    id: 'overview',
    groupTitle: 'TỔNG QUAN',
    items: [
      { id: 'dashboard', label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    id: 'products_services',
    groupTitle: 'SẢN PHẨM & DỊCH VỤ',
    items: [
      { id: 'all_products', label: 'Tất cả sản phẩm', path: '/admin/products', icon: Layers },
      { id: 'domains', label: 'Tên miền', path: '/admin/domains', icon: Globe },
      { id: 'hosting', label: 'Hosting', path: '/admin/hosting', icon: Server },
      { id: 'email', label: 'Email', path: '/admin/email', icon: Mail },
      { id: 'chat_ai', label: 'Chat AI', path: '/admin/chat-ai', icon: Bot },
      { id: 'other_services', label: 'Dịch vụ khác', path: '/admin/services', icon: Gift },
    ],
  },
  {
    id: 'sales',
    groupTitle: 'BÁN HÀNG',
    items: [
      { id: 'combos', label: 'Combo & Gói dịch vụ', path: '/admin/combos', icon: Tag },
      { id: 'promotions', label: 'Khuyến mãi', path: '/admin/promotions', icon: Tag },
      { id: 'coupons', label: 'Mã giảm giá', path: '/admin/coupons', icon: Tag },
    ],
  },
  {
    id: 'customers',
    groupTitle: 'KHÁCH HÀNG',
    items: [
      { id: 'customers_list', label: 'Khách Hàng', path: '/admin/customers', icon: Users },
      { id: 'tech_support', label: 'Hỗ Trợ Kỹ Thuật', path: '/admin/tickets', icon: LifeBuoy },
    ],
  },
  {
    id: 'orders',
    groupTitle: 'ĐƠN HÀNG',
    items: [
      { id: 'all_orders', label: 'Tất cả đơn hàng', path: '/admin/orders', icon: Package },
      { id: 'renewals', label: 'Gia hạn', path: '/admin/renewals', icon: RefreshCw },
      { id: 'refunds', label: 'Hoàn tiền', path: '/admin/refunds', icon: RotateCcw },
    ],
  },
  {
    id: 'finance',
    groupTitle: 'TÀI CHÍNH',
    items: [
      { id: 'wallet', label: 'Ví tiền', path: '/admin/finance/wallet', icon: Wallet },
      { id: 'revenue', label: 'Doanh thu', path: '/admin/finance/revenue', icon: TrendingUp },
      { id: 'invoices', label: 'Hóa đơn', path: '/admin/finance/invoices', icon: FileText },
      {
        id: 'reconciliation',
        label: 'Đối soát',
        path: '/admin/finance/reconciliation',
        icon: CheckSquare,
      },
      { id: 'misa', label: 'MISA', path: '/admin/finance/misa', icon: FileSpreadsheet },
    ],
  },
  {
    id: 'providers',
    groupTitle: 'NHÀ CUNG CẤP',
    items: [
      { id: 'vendors', label: 'Nhà cung cấp', path: '/admin/providers', icon: Building2 },
      { id: 'api_connect', label: 'Kết nối API', path: '/admin/providers/api', icon: Sliders },
      { id: 'data_sync', label: 'Đồng bộ dữ liệu', path: '/admin/providers/sync', icon: RefreshCw },
    ],
  },
  {
    id: 'configuration',
    groupTitle: 'CẤU HÌNH',
    items: [
      { id: 'pricing_table', label: 'Bảng giá', path: '/admin/config/pricing', icon: Tag },
      { id: 'tech_specs', label: 'Thông số kỹ thuật', path: '/admin/config/specs', icon: Sliders },
      { id: 'fqa', label: 'FQA', path: '/admin/config/fqa', icon: HelpCircle },
      { id: 'policies', label: 'Chính sách', path: '/admin/config/policies', icon: ShieldAlert },
    ],
  },
  {
    id: 'system',
    groupTitle: 'HỆ THỐNG',
    items: [
      {
        id: 'roles_permissions',
        label: 'Vai trò & Phân quyền',
        path: '/admin/system/roles',
        icon: Users,
      },
      {
        id: 'activity_logs',
        label: 'Nhật ký hoạt động',
        path: '/admin/system/logs',
        icon: FileText,
      },
      { id: 'settings', label: 'Cài đặt', path: '/admin/system/settings', icon: Settings },
    ],
  },
];
