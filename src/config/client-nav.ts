import {
  LayoutDashboard,
  Globe,
  Server,
  Mail,
  FileText,
  RefreshCw,
  Users,
  LifeBuoy,
  Settings,
  LucideIcon,
} from 'lucide-react';

export interface ClientNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: number;
}

export interface ClientNavGroup {
  id: string;
  groupTitle: string;
  items: ClientNavItem[];
}

export const CLIENT_NAV_GROUPS: ClientNavGroup[] = [
  {
    id: 'overview',
    groupTitle: 'TỔNG QUAN',
    items: [
      { id: 'dashboard', label: 'Dashboard', path: '/client/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    id: 'services',
    groupTitle: 'DỊCH VỤ',
    items: [
      { id: 'domains', label: 'Tên miền', path: '/client/domains', icon: Globe },
      { id: 'hosting', label: 'Hosting', path: '/client/hosting', icon: Server },
      { id: 'email', label: 'Email workspace', path: '/client/email', icon: Mail },
    ],
  },
  {
    id: 'transactions',
    groupTitle: 'GIAO DỊCH',
    items: [
      { id: 'orders', label: 'Đơn hàng', path: '/client/orders', icon: FileText },
      { id: 'renewals', label: 'Gia hạn', path: '/client/renewals', icon: RefreshCw },
    ],
  },
  {
    id: 'internal_admin',
    groupTitle: 'QUẢN TRỊ NỘI BỘ & DỰ ÁN',
    items: [
      { id: 'staff_roles', label: 'Nhân viên & Phân quyền', path: '/client/staff', icon: Users },
    ],
  },
  {
    id: 'support',
    groupTitle: 'CHĂM SÓC',
    items: [
      { id: 'tickets', label: 'Ticket hỗ trợ', path: '/client/tickets', icon: LifeBuoy, badge: 2 },
    ],
  },
  {
    id: 'system',
    groupTitle: 'HỆ THỐNG',
    items: [{ id: 'settings', label: 'Cài đặt', path: '/client/settings', icon: Settings }],
  },
];
