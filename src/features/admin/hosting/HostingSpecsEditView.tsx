/**
 * @file HostingSpecsEditView.tsx
 * @description Admin Hosting Specs Configuration View with Mutation Hook
 */
import * as React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { HostingPackage, HostingSpecs } from '@/types';
import { useUpdateHostingSpecsMutation } from '@/hooks';
import { Button, Input, Switch, TabsBar } from '@/components/common';
import { formatVND } from '@/utils';

export interface HostingSpecsEditViewProps {
  initialPackage: HostingPackage;
  onBack: () => void;
  onSaveSuccess?: (updated: HostingPackage) => void;
}

export function HostingSpecsEditView({
  initialPackage,
  onBack,
  onSaveSuccess,
}: HostingSpecsEditViewProps): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState<string>('hardware');
  const [specs, setSpecs] = React.useState<HostingSpecs>(initialPackage.specs);
  const [price12Months, setPrice12Months] = React.useState<number>(initialPackage.price12Months);

  const updateMutation = useUpdateHostingSpecsMutation();

  const tabs = [
    { id: 'hardware', label: 'Thông số Phần cứng' },
    { id: 'features', label: 'Tính năng & SSL' },
    { id: 'pricing', label: 'Bảng giá theo chu kỳ' },
    { id: 'provider', label: 'Cấu hình P.A Việt Nam' },
  ];

  const handleSave = () => {
    updateMutation.mutate(
      { id: initialPackage.id, specs, price12Months },
      {
        onSuccess: (updated) => {
          onSaveSuccess?.(updated);
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-surface-border bg-white text-slate-600 transition-colors hover:bg-slate-50"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900">
              Chỉnh Sửa Cấu Hình: {initialPackage.name}
            </h1>
            <p className="text-xs text-slate-400">
              Mã gói: {initialPackage.code} · Nhà cung cấp: {initialPackage.provider}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button variant="outline" onClick={onBack} disabled={updateMutation.isPending}>
            Hủy bỏ
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            isLoading={updateMutation.isPending}
            className="gap-2 bg-primary font-bold shadow-md shadow-primary/20 hover:bg-primary-hover"
          >
            <Save className="h-4 w-4" />
            <span>Lưu Thay Đổi</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <TabsBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Panels */}
      <div className="space-y-6 rounded-2xl border border-surface-border bg-white p-6 shadow-sm">
        {activeTab === 'hardware' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">CPU Cores (Core):</label>
              <Input
                type="number"
                value={specs.cpuCores}
                onChange={(e) => setSpecs({ ...specs, cpuCores: Number(e.target.value) })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Dung lượng RAM (GB):</label>
              <Input
                type="number"
                value={specs.ramGigabytes}
                onChange={(e) => setSpecs({ ...specs, ramGigabytes: Number(e.target.value) })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">
                Ổ cứng lưu trữ SSD (GB):
              </label>
              <Input
                type="number"
                value={specs.ssdGigabytes}
                onChange={(e) => setSpecs({ ...specs, ssdGigabytes: Number(e.target.value) })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Băng thông hàng tháng:</label>
              <Input
                value={specs.bandwidth}
                onChange={(e) => setSpecs({ ...specs, bandwidth: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Tặng kèm chứng chỉ SSL Let's Encrypt
                </p>
                <p className="text-xs text-slate-400">
                  Tự động cấu hình HTTPS khi trỏ tên miền về máy chủ
                </p>
              </div>
              <Switch
                checked={specs.sslIncluded}
                onCheckedChange={(checked) => setSpecs({ ...specs, sslIncluded: checked })}
              />
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="max-w-sm space-y-4">
            <label className="text-xs font-semibold text-slate-700">
              Giá niêm yết 12 tháng (VNĐ):
            </label>
            <Input
              type="number"
              value={price12Months}
              onChange={(e) => setPrice12Months(Number(e.target.value))}
              className="font-bold text-slate-900"
            />
            <p className="text-xs text-slate-400">Đơn giá hiển thị: {formatVND(price12Months)}</p>
          </div>
        )}

        {activeTab === 'provider' && (
          <div className="space-y-2 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
            <p>
              <strong>Cụm máy chủ:</strong> Cloud Server PA Vietnam - Trung tâm Dữ liệu Tân Thuận
              TP.HCM
            </p>
            <p>
              <strong>API Endpoint:</strong>{' '}
              <code>https://api.pavietnam.vn/v2/hosting/provision</code>
            </p>
            <p>
              <strong>Trạng thái kết nối:</strong>{' '}
              <span className="font-bold text-emerald-600">
                Hoạt động bình thường (Latency: 28ms)
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
