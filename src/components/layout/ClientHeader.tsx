/**
 * @file ClientHeader.tsx
 * @description Topbar Header for Client Portal with Cart Badge & Wallet Balance (Matches Figma Satek Pro Client)
 */
import * as React from 'react';
import { ShoppingCart, Wallet } from 'lucide-react';
import { formatVND } from '@/utils';

export interface ClientHeaderProps {
  cartItemCount?: number;
  walletBalance?: number;
  onOpenCart?: () => void;
  onOpenWallet?: () => void;
  onSwitchPortal?: () => void;
}

export function ClientHeader({
  cartItemCount = 2,
  walletBalance = 5000000,
  onOpenCart,
  onOpenWallet,
  onSwitchPortal,
}: ClientHeaderProps): React.JSX.Element {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-surface-border bg-white px-8">
      {/* Brand Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-black tracking-tight text-primary">SATEK</span>
        <span className="rounded bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
          CLIENT
        </span>
      </div>

      {/* Right Topbar Actions */}
      <div className="flex items-center space-x-4">
        {/* Switch Portal Button */}
        {onSwitchPortal && (
          <button
            onClick={onSwitchPortal}
            type="button"
            className="cursor-pointer rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
          >
            ← Chuyển sang Admin Root
          </button>
        )}

        {/* Shopping Cart Button with Count Badge (Matches Figma Top Right) */}
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

        {/* Balance Button (Matches Figma Top Right: 5.000.000 đ) */}
        <button
          onClick={onOpenWallet}
          type="button"
          className="flex h-10 cursor-pointer items-center space-x-2 rounded-xl bg-primary px-4 text-xs font-bold text-white shadow-sm transition-colors hover:bg-primary-hover"
        >
          <Wallet className="h-4 w-4 text-white/90" />
          <span>{formatVND(walletBalance)}</span>
        </button>
      </div>
    </header>
  );
}
