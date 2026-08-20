/**
 * @file ClientHeader.tsx
 * @description Topbar Header for Client Portal with Mobile Hamburger, Cart Badge & Wallet Balance
 */
import * as React from 'react';
import { ShoppingCart, Wallet, Menu } from 'lucide-react';
import { formatVND } from '@/utils';

export interface ClientHeaderProps {
  cartItemCount?: number;
  walletBalance?: number;
  onOpenCart?: () => void;
  onOpenWallet?: () => void;
  onSwitchPortal?: () => void;
  onOpenMobileMenu?: () => void;
}

export function ClientHeader({
  cartItemCount = 2,
  walletBalance = 5000000,
  onOpenCart,
  onOpenWallet,
  onSwitchPortal,
  onOpenMobileMenu,
}: ClientHeaderProps): React.JSX.Element {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-surface-border bg-white px-4 sm:px-8">
      {/* Left: Mobile Hamburger & Brand Logo */}
      <div className="flex items-center space-x-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-surface-border text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tight text-primary">SATEK</span>
          <span className="rounded bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
            CLIENT
          </span>
        </div>
      </div>

      {/* Right Topbar Actions */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Switch Portal Button */}
        {onSwitchPortal && (
          <button
            onClick={onSwitchPortal}
            type="button"
            className="cursor-pointer whitespace-nowrap rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
          >
            <span className="hidden sm:inline">← Chuyển sang </span>Admin Root
          </button>
        )}

        {/* Shopping Cart Button */}
        <button
          onClick={onOpenCart}
          type="button"
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-surface-border bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="h-4 w-4" />
          {cartItemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* Balance Button */}
        <button
          onClick={onOpenWallet}
          type="button"
          className="flex h-10 cursor-pointer items-center space-x-2 rounded-xl bg-primary px-3 text-xs font-bold text-white shadow-sm transition-colors hover:bg-primary-hover sm:px-4"
        >
          <Wallet className="h-4 w-4 text-white/90" />
          <span className="hidden sm:inline">{formatVND(walletBalance)}</span>
          <span className="inline sm:hidden">Ví</span>
        </button>
      </div>
    </header>
  );
}
