/**
 * @file OrderSummaryBox.tsx
 * @description Standard Order Summary & Voucher Checkout Card (Matches Figma Cart)
 */
import * as React from 'react';
import { Lock, Check } from 'lucide-react';
import { Button, Input } from '@/components/common';
import { formatVND } from '@/utils';

export interface OrderSummaryBoxProps {
  subtotalAmount: number;
  discountAmount: number;
  vatTaxPercentage: number;
  vatTaxAmount: number;
  finalTotalAmount: number;
  voucherCode?: string;
  isVoucherApplied?: boolean;
  onApplyVoucher: (code: string) => void;
  onCheckout: () => void;
  checkoutButtonLabel?: string;
  isLoading?: boolean;
  className?: string;
}

export function OrderSummaryBox({
  subtotalAmount,
  discountAmount,
  vatTaxPercentage,
  vatTaxAmount,
  finalTotalAmount,
  voucherCode = 'SATEK10',
  isVoucherApplied = true,
  onApplyVoucher,
  onCheckout,
  checkoutButtonLabel = 'Đăng nhập để thanh toán',
  isLoading = false,
  className,
}: OrderSummaryBoxProps): React.JSX.Element {
  const [inputCode, setInputCode] = React.useState<string>(voucherCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      onApplyVoucher(inputCode.trim());
    }
  };

  return (
    <div
      className={`space-y-6 rounded-2xl border border-surface-border bg-white p-6 shadow-sm ${className || ''}`}
    >
      <h3 className="text-base font-bold text-slate-900">Tóm tắt đơn hàng</h3>

      {/* Voucher Input Box */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="text-xs font-semibold text-slate-500">🏷️ Mã ưu đãi Satek:</label>
        <div className="flex items-center space-x-2">
          <Input
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
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
            <span>Đã áp dụng mã {voucherCode} (Giảm 10%)</span>
          </p>
        )}
      </form>

      {/* Calculations */}
      <div className="space-y-2.5 border-t border-surface-border pt-4 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Tạm tính:</span>
          <span className="font-semibold text-slate-900">{formatVND(subtotalAmount)}</span>
        </div>

        {isVoucherApplied && (
          <div className="flex justify-between font-medium text-emerald-600">
            <span>Giảm giá ({voucherCode}):</span>
            <span>{formatVND(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Thuế VAT ({vatTaxPercentage}%):</span>
          <span>+{formatVND(vatTaxAmount)}</span>
        </div>

        <div className="flex justify-between border-t border-surface-border pt-3 text-base font-black text-slate-900">
          <span>Tổng thanh toán:</span>
          <span className="text-xl font-black text-primary">{formatVND(finalTotalAmount)}</span>
        </div>
      </div>

      {/* Checkout Submit */}
      <Button
        onClick={onCheckout}
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full cursor-pointer gap-2 py-3.5 font-bold shadow-md shadow-primary/20"
      >
        <Lock className="h-4 w-4" />
        <span>{checkoutButtonLabel}</span>
      </Button>
    </div>
  );
}
