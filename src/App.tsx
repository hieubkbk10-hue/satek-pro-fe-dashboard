/**
 * @file App.tsx
 * @description Master App Shell assembling Admin and Client Portals with Real Mock Data
 * @package Satek Pro
 */
import * as React from 'react';
import { Toaster, toast } from 'sonner';
import { AdminLayout, ClientLayout } from '@/components/layout';
import { HostingListView } from '@/features/admin/hosting/HostingListView';
import { HostingSpecsEditView } from '@/features/admin/hosting/HostingSpecsEditView';
import { DomainListView } from '@/features/admin/domains/DomainListView';
import { ClientHostingListView } from '@/features/client/hosting/ClientHostingListView';
import { ClientCartView } from '@/features/client/cart/ClientCartView';
import {
  MOCK_ADMIN_HOSTING_PACKAGES,
  MOCK_ADMIN_DOMAIN_TLDS,
  MOCK_CLIENT_HOSTING_INSTANCES,
  MOCK_CLIENT_CART_ITEMS,
  MOCK_CLIENT_CART_SUMMARY,
} from '@/mocks';
import { HostingPackage, BreadcrumbItem } from '@/types';

export function App(): React.JSX.Element {
  const [currentPortal, setCurrentPortal] = React.useState<'admin' | 'client'>('admin');
  const [currentPath, setCurrentPath] = React.useState<string>('/admin/hosting');
  const [adminHostingList, setAdminHostingList] = React.useState<HostingPackage[]>(
    MOCK_ADMIN_HOSTING_PACKAGES
  );
  const [editingPackage, setEditingPackage] = React.useState<HostingPackage | null>(null);

  // Switch Portal Action
  const handleTogglePortal = () => {
    if (currentPortal === 'admin') {
      setCurrentPortal('client');
      setCurrentPath('/client/hosting');
      toast.info('Đã chuyển sang phân hệ Khách Hàng (Client Portal)');
    } else {
      setCurrentPortal('admin');
      setCurrentPath('/admin/hosting');
      toast.info('Đã chuyển sang phân hệ Quản Trị (Admin Root)');
    }
  };

  // Breadcrumbs Generator
  const breadcrumbs: BreadcrumbItem[] = React.useMemo(() => {
    if (currentPath === '/admin/hosting') {
      return [{ label: 'Sản phẩm & Dịch vụ' }, { label: 'Hosting', isCurrentPage: true }];
    }
    if (currentPath.includes('/admin/hosting/edit')) {
      return [
        { label: 'Sản phẩm & Dịch vụ' },
        { label: 'Hosting', href: '/admin/hosting' },
        { label: 'Chỉnh sửa cấu hình', isCurrentPage: true },
      ];
    }
    if (currentPath === '/admin/domains') {
      return [{ label: 'Sản phẩm & Dịch vụ' }, { label: 'Tên miền', isCurrentPage: true }];
    }
    return [{ label: 'Dashboard', isCurrentPage: true }];
  }, [currentPath]);

  // Navigate Action
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setEditingPackage(null);
  };

  // Admin: Open Specs Edit View
  const handleEditSpecs = (pkg: HostingPackage) => {
    setEditingPackage(pkg);
    setCurrentPath(`/admin/hosting/${pkg.id}/edit`);
  };

  // Admin: Save Specs
  const handleSaveSpecsSuccess = (updatedPkg: HostingPackage) => {
    setAdminHostingList((prev) =>
      prev.map((item) => (item.id === updatedPkg.id ? updatedPkg : item))
    );
    setEditingPackage(null);
    setCurrentPath('/admin/hosting');
  };

  return (
    <>
      <Toaster position="top-right" richColors closeButton />

      {currentPortal === 'admin' ? (
        <AdminLayout
          currentPath={currentPath}
          onNavigate={handleNavigate}
          breadcrumbs={breadcrumbs}
          onSwitchPortal={handleTogglePortal}
        >
          {/* Màn hình Chỉnh sửa Hosting */}
          {currentPath.includes('/admin/hosting/') && editingPackage ? (
            <HostingSpecsEditView
              initialPackage={editingPackage}
              onBack={() => {
                setEditingPackage(null);
                setCurrentPath('/admin/hosting');
              }}
              onSaveSuccess={handleSaveSpecsSuccess}
            />
          ) : currentPath === '/admin/domains' ? (
            /* Màn hình Danh mục Tên miền */
            <DomainListView
              tlds={MOCK_ADMIN_DOMAIN_TLDS}
              onAddDomain={() => toast.info('Chức năng thêm tên miền mới')}
            />
          ) : (
            /* Màn hình Danh sách Hosting */
            <HostingListView
              packages={adminHostingList}
              onEditSpecs={handleEditSpecs}
              onAddPackage={() => toast.info('Chức năng tạo gói Hosting mới')}
            />
          )}
        </AdminLayout>
      ) : (
        <ClientLayout
          currentPath={currentPath}
          onNavigate={handleNavigate}
          cartItemCount={MOCK_CLIENT_CART_ITEMS[0]?.addons.length || 0}
          walletBalance={5000000}
          onOpenCart={() => setCurrentPath('/client/cart')}
          onOpenWallet={() => toast.info('Số dư tài khoản ví: 5.000.000 đ')}
          onSwitchPortal={handleTogglePortal}
        >
          {currentPath === '/client/cart' ? (
            /* Màn hình Giỏ Hàng Client */
            <ClientCartView
              initialItems={MOCK_CLIENT_CART_ITEMS}
              initialSummary={MOCK_CLIENT_CART_SUMMARY}
              onCheckout={() => toast.success('Chuyển hướng đến cổng thanh toán VNPay an toàn...')}
            />
          ) : (
            /* Màn hình Danh Sách Lưu Trữ Hosting Client */
            <ClientHostingListView
              instances={MOCK_CLIENT_HOSTING_INSTANCES}
              onAddNewDomain={() => toast.info('Chức năng đăng ký thêm tên miền')}
            />
          )}
        </ClientLayout>
      )}
    </>
  );
}

export default App;
