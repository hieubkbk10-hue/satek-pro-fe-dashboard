/**
 * @file ClientLayout.tsx
 * @description Master Client Layout Shell with Topbar Header, Sidebar and Content Area
 */
import * as React from 'react';
import { ClientSidebar } from './ClientSidebar';
import { ClientHeader } from './ClientHeader';
import { AppErrorBoundary } from '@/components/common';

export interface ClientLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
  cartItemCount?: number;
  walletBalance?: number;
  onOpenCart?: () => void;
  onOpenWallet?: () => void;
  onSwitchPortal?: () => void;
}

export function ClientLayout({
  children,
  currentPath,
  onNavigate,
  cartItemCount,
  walletBalance,
  onOpenCart,
  onOpenWallet,
  onSwitchPortal,
}: ClientLayoutProps): React.JSX.Element {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface-bg">
      {/* Client Sidebar */}
      <ClientSidebar currentPath={currentPath} onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <ClientHeader
          cartItemCount={cartItemCount}
          walletBalance={walletBalance}
          onOpenCart={onOpenCart}
          onOpenWallet={onOpenWallet}
          onSwitchPortal={onSwitchPortal}
        />

        <main className="flex-1 overflow-y-auto p-8">
          <AppErrorBoundary fallbackTitle="Không thể tải phân hệ khách hàng">
            {children}
          </AppErrorBoundary>
        </main>
      </div>
    </div>
  );
}
