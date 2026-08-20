/**
 * @file AdminLayout.tsx
 * @description Master Admin Layout Shell with Desktop Sidebar and Mobile Sheet Drawer
 */
import * as React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { BreadcrumbItem } from '@/types';
import { AppErrorBoundary, Sheet } from '@/components/common';

export interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
  breadcrumbs?: BreadcrumbItem[];
  onSwitchPortal?: () => void;
}

export function AdminLayout({
  children,
  currentPath,
  onNavigate,
  breadcrumbs,
  onSwitchPortal,
}: AdminLayoutProps): React.JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);

  const handleMobileNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface-bg">
      {/* Desktop Sidebar (visible on lg screens) */}
      <div className="hidden flex-shrink-0 lg:flex">
        <AdminSidebar currentPath={currentPath} onNavigate={onNavigate} />
      </div>

      {/* Mobile Sidebar Sheet Drawer */}
      <Sheet
        open={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        side="left"
        title="Satek Pro Admin"
        className="w-[280px] p-0"
      >
        <AdminSidebar currentPath={currentPath} onNavigate={handleMobileNavigate} />
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader
          breadcrumbs={breadcrumbs}
          onSwitchPortal={onSwitchPortal}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <AppErrorBoundary fallbackTitle="Không thể tải phân hệ quản trị">
            {children}
          </AppErrorBoundary>
        </main>
      </div>
    </div>
  );
}
