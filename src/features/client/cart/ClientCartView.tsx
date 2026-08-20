/**
 * @file ClientCartView.tsx
 * @description Client Cart and Checkout View (Matches Figma Shopping Cart Screen)
 */
import * as React from 'react';
import { Trash2, ShieldCheck, RefreshCw, Truck, Lock, Check } from 'lucide-react';
import { CartGroupItem, CartSummaryCalculation } from '@/types';
import { Button, Input } from '@/components/common';
import { formatVND } from '@/utils';
import { toast } from 'sonner';

export interface ClientCartViewProps {
  initialItems: CartGroupItem[];
  initialSummary: CartSummaryCalculation;
  onCheckout: () => void;
}

export function ClientCartView({
  initialItems,
  initialSummary,
  onCheckout,
}: ClientCartViewProps): React.JSX.Element {
  const [cartItems, setCartItems] = React.useState<CartGroupItem[]>(initialItems);
  const [voucherInput, setVoucherInput] = React.useState<string>(
    initialSummary.discountCode || 'SATEK10'
  );
  const [isVoucherApplied, setIsVoucherApplied] = React.useState<boolean>(true);

  // Derived state calculation for cart summary (Rule RCT002)
  const summary: CartSummaryCalculation = React.useMemo(() => {
    let subtotal = 0;
    cartItems.forEach((group) => {
      subtotal += group.primaryService.price;
      group.addons.forEach((addon) => {
        subtotal += addon.unitPrice * (addon.billingYears || 1);
      });
    });

    const discountAmount = isVoucherApplied ? Math.round(subtotal * 0.1) : 0;
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const vatTaxAmount = Math.round(taxableAmount * 0.1);
    const finalTotalAmount = taxableAmount + vatTaxAmount;

    return {
      subtotalAmount: subtotal,
      discountAmount,
      vatTaxPercentage: 10,
      vatTaxAmount,
      finalTotalAmount,
      discountCode: isVoucherApplied ? 'SATEK10' : undefined,
    };
  }, [cartItems, isVoucherApplied]);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherInput.trim().toUpperCase() === 'SATEK10') {
      setIsVoucherApplied(true);
      toast.success('Áp dụng mã giảm giá SATEK10 (Giảm 10%) thành công!');
    } else {
      toast.error('Mã giảm giá không hợp lệ.');
    }
  };

  const handleRemoveAddon = (groupId: string, addonId: string) => {
    setCartItems((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            addons: group.addons.filter((addon) => addon.id !== addonId),
          };
        }
        return group;
      })
    );
    toast.info('Đã xóa dịch vụ khỏi giỏ hàng.');
  };

  const handleClearAll = () => {
    setCartItems([]);
    toast.info('Đã xóa toàn bộ giỏ hàng.');
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Breadcrumb Path & Clear Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
          <span>home</span>
          <span className="text-slate-300">|</span>
          <span className="text-lg font-bold text-slate-900">Giỏ hàng</span>
          <span className="text-xs font-normal text-slate-400">· 6 MỤC</span>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={handleClearAll}
            type="button"
            className="flex cursor-pointer items-center space-x-1.5 text-xs text-slate-500 transition-colors hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Xoá tất cả</span>
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-2xl border border-surface-border bg-white p-16 text-center shadow-sm">
          <p className="text-base font-bold text-slate-800">Giỏ hàng của bạn đang trống</p>
          <p className="mt-1 text-xs text-slate-500">
            Hãy chọn các dịch vụ tên miền, hosting để tiếp tục.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 items-start gap-8">
          {/* Left Column: Cart Items List */}
          <div className="col-span-2 space-y-6">
            {cartItems.map((group) => (
              <div
                key={group.id}
                className="overflow-hidden rounded-2xl border border-surface-border bg-white shadow-sm"
              >
                {/* Header Orange Bar (Matches Figma: 🌐 https://tencongty.net · 4 mục · 1.000.000đ) */}
                <div className="flex items-center justify-between bg-primary px-6 py-3.5 text-white">
                  <div className="flex items-center space-x-2 text-sm font-bold">
                    <span>🌐</span>
                    <span>{group.domainTarget}</span>
                  </div>
                  <span className="text-xs font-semibold">4 mục · 1.000.000đ</span>
                </div>

                {/* Primary Item Row */}
                <div className="flex items-center justify-between border-b border-surface-border bg-amber-50/40 px-6 py-4">
                  <div>
                    <p className="text-base font-bold text-primary">{group.primaryService.name}</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-xs text-slate-500">Thời hạn:</span>
                      <select className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-700 outline-none">
                        <option value="1">1 năm</option>
                        <option value="2">2 năm</option>
                        <option value="5">5 năm</option>
                      </select>
                    </div>
                  </div>
                  <span className="text-base font-black text-slate-900">
                    {formatVND(group.primaryService.price)}
                  </span>
                </div>

                {/* Addon Items List */}
                <div className="divide-y divide-surface-border px-6">
                  {group.addons.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between py-3.5">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{addon.name}</p>
                        <div className="mt-1 flex items-center space-x-2">
                          <span className="text-xs text-slate-400">Thời hạn:</span>
                          <select
                            defaultValue={addon.billingYears}
                            className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600 outline-none"
                          >
                            <option value="1">1 năm</option>
                            <option value="2">2 năm</option>
                            <option value="5">5 năm</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-bold text-slate-800">
                          {formatVND(addon.unitPrice)}
                        </span>
                        <button
                          onClick={() => handleRemoveAddon(group.id, addon.id)}
                          type="button"
                          className="p-1 text-slate-400 transition-colors hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Bottom Trust Commitments (Matches Figma Bottom Badges) */}
            <div className="flex items-center justify-between pt-2 text-xs font-medium text-slate-600">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>SSL · VNPay an toàn</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <RefreshCw className="h-4 w-4 text-primary" />
                <span>Hoàn tiền 7 ngày</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Truck className="h-4 w-4 text-amber-600" />
                <span>Kích hoạt &lt;60s</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Card (Matches Figma Right Box) */}
          <div className="space-y-6 rounded-2xl border border-surface-border bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">Tóm tắt đơn hàng</h3>

            {/* Voucher Input Box */}
            <form onSubmit={handleApplyVoucher} className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">🏷️ Mã ưu đãi Satek:</label>
              <div className="flex items-center space-x-2">
                <Input
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  placeholder="Nhập mã ưu đãi"
                  className="font-bold uppercase tracking-wider"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-slate-900 px-4 text-xs hover:bg-slate-800"
                >
                  Áp dụng
                </Button>
              </div>
              {isVoucherApplied && (
                <p className="mt-1 flex items-center space-x-1 text-xs font-semibold text-emerald-600">
                  <Check className="h-3.5 w-3.5" />
                  <span>Đã áp dụng mã SATEK10 (Giảm 10%)</span>
                </p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-2.5 border-t border-surface-border pt-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính:</span>
                <span className="font-semibold text-slate-900">
                  {formatVND(summary.subtotalAmount)}
                </span>
              </div>

              {isVoucherApplied && (
                <div className="flex justify-between font-medium text-emerald-600">
                  <span>Giảm giá (SATEK10):</span>
                  <span>{formatVND(summary.discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Thuế VAT (10%):</span>
                <span>+{formatVND(summary.vatTaxAmount)}</span>
              </div>

              <div className="flex justify-between border-t border-surface-border pt-3 text-base font-black text-slate-900">
                <span>Tổng thanh toán:</span>
                <span className="text-xl font-black text-primary">
                  {formatVND(summary.finalTotalAmount)}
                </span>
              </div>
            </div>

            {/* Submit Action Button */}
            <Button
              onClick={onCheckout}
              variant="primary"
              size="lg"
              className="w-full gap-2 py-3.5 font-bold shadow-md shadow-primary/20"
            >
              <Lock className="h-4 w-4" />
              <span>Đăng nhập để thanh toán</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
