/**
 * @file AdminLayout.tsx
 * @description Master Admin Layout Shell with Sidebar, Header and Main Content Container
 */
import * as React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { BreadcrumbItem } from '@/types';
import { AppErrorBoundary } from '@/components/common';

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
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface-bg">
      {/* Fixed Admin Sidebar */}
      <AdminSidebar currentPath={currentPath} onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader breadcrumbs={breadcrumbs} onSwitchPortal={onSwitchPortal} />

        <main className="flex-1 overflow-y-auto p-8">
          <AppErrorBoundary fallbackTitle="Không thể tải phân hệ quản trị">
            {children}
          </AppErrorBoundary>
        </main>
      </div>
    </div>
  );
}
