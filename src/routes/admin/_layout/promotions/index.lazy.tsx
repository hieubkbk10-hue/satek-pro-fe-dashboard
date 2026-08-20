import { createLazyFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { PromotionWizardView } from '@/features/admin/promotions/PromotionWizardView';
import { Button } from '@/components/common';
import { Plus } from 'lucide-react';
import { MOCK_ADMIN_PROMOTIONS } from '@/mocks';
import { formatVND } from '@/utils';

export const Route = createLazyFileRoute('/admin/_layout/promotions/')({
  component: AdminPromotionsRouteComponent,
});

function AdminPromotionsRouteComponent() {
  const [isCreating, setIsCreating] = React.useState<boolean>(false);

  if (isCreating) {
    return (
      <PromotionWizardView
        onBack={() => setIsCreating(false)}
        onSuccess={() => setIsCreating(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            CHIẾN DỊCH BÁN HÀNG
          </p>
          <h1 className="mt-0.5 text-2xl font-black tracking-tight text-slate-900">
            Quản Lý Khuyến Mãi & Giảm Giá
          </h1>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsCreating(true)}
          className="gap-2 bg-slate-900 hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          <span>Tạo Khuyến Mãi Mới (Wizard)</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {MOCK_ADMIN_PROMOTIONS.map((promo) => (
          <div
            key={promo.id}
            className="space-y-4 rounded-2xl border border-surface-border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">
                {promo.internalCode}
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                ĐANG CHẠY
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{promo.name}</h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Áp dụng: {promo.targetProducts.join(', ')} · Chu kỳ:{' '}
                {promo.applicableCycles.join(', ')} năm
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-surface-border pt-4 text-xs">
              <span className="text-slate-500">
                Mức giảm:{' '}
                <strong className="font-bold text-emerald-600">
                  -{formatVND(promo.discountValue)}
                </strong>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreating(true)}
                className="text-xs"
              >
                Chỉnh sửa
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
