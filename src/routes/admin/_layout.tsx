/**
 * @file _layout.tsx
 * @description Admin Route Layout Shell
 */
import { createFileRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import * as React from 'react';
import { AdminLayout } from '@/components/layout';
import { BreadcrumbItem } from '@/types';
import { ROUTE } from '@/constants';

export const Route = createFileRoute('/admin/_layout')({
  component: AdminLayoutRouteComponent,
});

function AdminLayoutRouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const breadcrumbs: BreadcrumbItem[] = React.useMemo(() => {
    if (currentPath === ROUTE.ADMIN.HOSTING) {
      return [{ label: 'Sản phẩm & Dịch vụ' }, { label: 'Hosting', isCurrentPage: true }];
    }
    if (currentPath.includes('/admin/hosting/')) {
      return [
        { label: 'Sản phẩm & Dịch vụ' },
        { label: 'Hosting', href: ROUTE.ADMIN.HOSTING },
        { label: 'Chỉnh sửa cấu hình', isCurrentPage: true },
      ];
    }
    if (currentPath === ROUTE.ADMIN.DOMAINS) {
      return [{ label: 'Sản phẩm & Dịch vụ' }, { label: 'Tên miền', isCurrentPage: true }];
    }
    return [{ label: 'Dashboard', isCurrentPage: true }];
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    navigate({ to: path });
  };

  const handleSwitchPortal = () => {
    navigate({ to: ROUTE.CLIENT.HOSTING });
  };

  return (
    <AdminLayout
      currentPath={currentPath}
      onNavigate={handleNavigate}
      breadcrumbs={breadcrumbs}
      onSwitchPortal={handleSwitchPortal}
    >
      <Outlet />
    </AdminLayout>
  );
}
