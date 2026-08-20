/**
 * @file ClientLayout.tsx
 * @description Master Client Layout Shell with Desktop Sidebar and Mobile Sheet Drawer
 */
import * as React from 'react';
import { ClientSidebar } from './ClientSidebar';
import { ClientHeader } from './ClientHeader';
import { AppErrorBoundary, Sheet } from '@/components/common';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);

  const handleMobileNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface-bg">
      {/* Desktop Sidebar (visible on lg screens) */}
      <div className="hidden flex-shrink-0 lg:flex">
        <ClientSidebar currentPath={currentPath} onNavigate={onNavigate} />
      </div>

      {/* Mobile Sidebar Sheet Drawer */}
      <Sheet
        open={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        side="left"
        title="Satek Pro Client"
        className="w-[280px] p-0"
      >
        <ClientSidebar currentPath={currentPath} onNavigate={handleMobileNavigate} />
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <ClientHeader
          cartItemCount={cartItemCount}
          walletBalance={walletBalance}
          onOpenCart={onOpenCart}
          onOpenWallet={onOpenWallet}
          onSwitchPortal={onSwitchPortal}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <AppErrorBoundary fallbackTitle="Không thể tải phân hệ khách hàng">
            {children}
          </AppErrorBoundary>
        </main>
      </div>
    </div>
  );
}
