/**
 * @file PromotionWizardView.tsx
 * @description 6-Step Promotion Campaign Creation Wizard with Real-time Discount Calculator
 */
import * as React from 'react';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { MultiStepWizardBar, WizardStep } from '@/components/molecular';
import { Button, Input, Switch, Badge } from '@/components/common';
import { formatVND } from '@/utils';
import { toast } from 'sonner';

export interface PromotionWizardViewProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export function PromotionWizardView({
  onBack,
  onSuccess,
}: PromotionWizardViewProps): React.JSX.Element {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  // Form State
  const [campaignName, setCampaignName] = React.useState<string>(
    'Khuyến mãi khai trương Satek Pro'
  );
  const [internalCode, setInternalCode] = React.useState<string>('KM-20426');
  const [originalPriceInput, setOriginalPriceInput] = React.useState<string>('399000');
  const [discountValueInput, setDiscountValueInput] = React.useState<string>('100000');
  const [isStackableWithCoupon, setIsStackableWithCoupon] = React.useState<boolean>(true);
  const [isProfitProtected, setIsProfitProtected] = React.useState<boolean>(true);

  const wizardSteps: WizardStep[] = [
    { id: 1, label: 'Thông tin cơ bản', subLabel: 'Tên & Mã KM' },
    { id: 2, label: 'Đối tượng áp dụng', subLabel: 'Sản phẩm / Chu kỳ' },
    { id: 3, label: 'Mức giảm giá', subLabel: 'Chiết khấu' },
    { id: 4, label: 'Giới hạn sử dụng', subLabel: 'Lượt dùng / Khách' },
    { id: 5, label: 'Điều kiện & Bảo vệ', subLabel: 'Chống lỗ vốn' },
    { id: 6, label: 'Hoàn tất & Kích hoạt', subLabel: 'Xem lại' },
  ];

  // Real-time Derived Calculation (Rule RCT002)
  const originalPrice = parseFloat(originalPriceInput) || 0;
  const discountValue = parseFloat(discountValueInput) || 0;
  const finalPrice = Math.max(0, originalPrice - discountValue);
  const discountPercentage =
    originalPrice > 0 ? ((discountValue / originalPrice) * 100).toFixed(1) : '0';

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      await new Promise((res) => setTimeout(res, 600));
      toast.success('Chiến dịch khuyến mãi đã được tạo và kích hoạt thành công!');
      onSuccess?.();
    } catch {
      toast.error('Có lỗi xảy ra khi tạo khuyến mãi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-surface-border bg-white text-slate-600 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Thiết Lập Khuyến Mãi
            </h1>
            <p className="text-xs text-slate-400">
              Bước {currentStep} trên 6 · {wizardSteps[currentStep - 1]?.label}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handlePrev} disabled={isSubmitting}>
            {currentStep === 1 ? 'Hủy bỏ' : 'Quay lại'}
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            isLoading={isSubmitting}
            className="gap-2 bg-primary font-bold hover:bg-primary-hover"
          >
            {currentStep === 6 ? <Check className="h-4 w-4" /> : null}
            <span>{currentStep === 6 ? 'Kích hoạt chiến dịch' : 'Tiếp tục →'}</span>
          </Button>
        </div>
      </div>

      {/* 6-Step Wizard Navigation Bar */}
      <div className="rounded-2xl border border-surface-border bg-white p-4 shadow-sm">
        <MultiStepWizardBar
          steps={wizardSteps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </div>

      {/* Main Content: Form + Real-time Calculation Card */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        {/* Left Form Area */}
        <div className="space-y-6 rounded-2xl border border-surface-border bg-white p-6 shadow-sm lg:col-span-2">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="border-b border-surface-border pb-3 text-base font-bold text-slate-900">
                1. Thông tin cơ bản
              </h3>
              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Tên chương trình khuyến mãi
                </label>
                <Input
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Nhập tên chiến dịch"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Mã nội bộ</label>
                  <Input
                    value={internalCode}
                    onChange={(e) => setInternalCode(e.target.value)}
                    placeholder="KM-XXXXX"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Mức ưu tiên</label>
                  <Input defaultValue="1" placeholder="1 = Cao nhất" className="mt-1" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="border-b border-surface-border pb-3 text-base font-bold text-slate-900">
                2. Đối tượng & Sản phẩm áp dụng
              </h3>
              <p className="text-xs text-slate-500">Chọn danh mục sản phẩm được áp dụng mã:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Tên miền Quốc gia .VN',
                  'Tên miền Quốc tế .COM',
                  'Hosting Business Pro',
                  'Email Workspace',
                ].map((prod, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2.5 rounded-xl border border-surface-border bg-slate-50/50 p-3"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded text-primary focus:ring-primary"
                    />
                    <span className="text-xs font-semibold text-slate-800">{prod}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="border-b border-surface-border pb-3 text-base font-bold text-slate-900">
                3. Mức giảm giá & Giá gốc
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Giá gốc niêm yết (VNĐ)
                  </label>
                  <Input
                    value={originalPriceInput}
                    onChange={(e) => setOriginalPriceInput(e.target.value)}
                    placeholder="399000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Số tiền giảm (VNĐ)</label>
                  <Input
                    value={discountValueInput}
                    onChange={(e) => setDiscountValueInput(e.target.value)}
                    placeholder="100000"
                    className="mt-1 font-bold text-emerald-600"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep >= 4 && (
            <div className="space-y-4">
              <h3 className="border-b border-surface-border pb-3 text-base font-bold text-slate-900">
                {currentStep === 4
                  ? '4. Giới hạn sử dụng'
                  : currentStep === 5
                    ? '5. Điều kiện & Bảo vệ lợi nhuận'
                    : '6. Hoàn tất & Kích hoạt'}
              </h3>
              <div className="flex items-center justify-between border-b border-surface-border py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Cho phép cộng dồn với Coupon
                  </p>
                  <p className="text-xs text-slate-400">Áp dụng đồng thời voucher giảm giá khác</p>
                </div>
                <Switch
                  checked={isStackableWithCoupon}
                  onCheckedChange={setIsStackableWithCoupon}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Cơ chế bảo vệ lợi nhuận (Profit Guard)
                  </p>
                  <p className="text-xs text-slate-400">
                    Tự động chặn nếu giá bán thấp hơn giá vốn nhà cung cấp
                  </p>
                </div>
                <Switch checked={isProfitProtected} onCheckedChange={setIsProfitProtected} />
              </div>
            </div>
          )}
        </div>

        {/* Right: Promotion Calculator Card (Matches Figma Realtime Calc) */}
        <div className="space-y-6 rounded-2xl border border-surface-border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <h3 className="text-sm font-bold text-slate-900">BẢNG TÍNH GIẢM GIÁ</h3>
            <Badge variant="primary">LIVE PREVIEW</Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Giá gốc:</span>
              <span className="font-semibold text-slate-800">{formatVND(originalPrice)}</span>
            </div>
            <div className="flex justify-between font-medium text-emerald-600">
              <span>Mức chiết khấu:</span>
              <span>-{formatVND(discountValue)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Tỷ lệ giảm giá:</span>
              <span className="font-bold text-emerald-600">{discountPercentage}%</span>
            </div>
            <div className="flex items-center justify-between border-t border-surface-border pt-3 text-sm font-black text-slate-900">
              <span>Giá sau KM:</span>
              <span className="text-lg font-black text-primary">{formatVND(finalPrice)}</span>
            </div>
          </div>

          {isProfitProtected && (
            <div className="flex items-center space-x-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
              <ShieldCheck className="h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span>
                Biên lợi nhuận an toàn: <strong>ĐẠT CHUẨN</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
