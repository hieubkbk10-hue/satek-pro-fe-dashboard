/**
 * @file HostingSpecsEditView.tsx
 * @description Admin Hosting Specs Configuration View (Matches Figma First Screenshot)
 */
import * as React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { HostingPackage, HostingSpecs } from '@/types';
import { Button, Input, Switch, Badge, TabsBar } from '@/components/common';
import { toast } from 'sonner';

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
  const [activeTab, setActiveTab] = React.useState<string>('specs');
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isSslIncluded, setIsSslIncluded] = React.useState<boolean>(
    initialPackage.specs.sslIncluded
  );
  const [cpuCores, setCpuCores] = React.useState<string>(String(initialPackage.specs.cpuCores));
  const [ramGb, setRamGb] = React.useState<string>(String(initialPackage.specs.ramGigabytes));
  const [ssdGb, setSsdGb] = React.useState<string>(String(initialPackage.specs.ssdGigabytes));
  const [sslDomain, setSslDomain] = React.useState<string>('tencongty.net');

  const tabs = [
    { id: 'info', label: 'Thông tin' },
    { id: 'pricing', label: 'Bảng giá' },
    { id: 'specs', label: 'Cấu hình kỹ thuật (Specs)' },
    { id: 'provider', label: 'Nhà cung cấp (PA M...)' },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await new Promise((res) => setTimeout(res, 600));

      const updatedSpecs: HostingSpecs = {
        cpuCores: parseInt(cpuCores, 10) || 4,
        ramGigabytes: parseInt(ramGb, 10) || 8,
        ssdGigabytes: parseInt(ssdGb, 10) || 100,
        sslIncluded: isSslIncluded,
        bandwidth: initialPackage.specs.bandwidth,
      };

      const updatedPkg: HostingPackage = {
        ...initialPackage,
        specs: updatedSpecs,
        updatedAt: new Date().toISOString(),
      };

      toast.success('Cập nhật cấu hình kỹ thuật Hosting thành công!');
      onSaveSuccess?.(updatedPkg);
    } catch {
      toast.error('Có lỗi xảy ra khi lưu cấu hình.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Breadcrumb Path */}
      <div className="text-xs font-medium text-slate-400">
        <span>Sản phẩm & Dịch vụ</span> <span className="mx-1">/</span> <span>Tên miền</span>{' '}
        <span className="mx-1">/</span> <span className="font-semibold text-slate-700">.COM</span>
      </div>

      {/* Header with Back Button and Action Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-surface-border bg-white text-slate-600 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Chỉnh sửa Hosting</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleSave} isLoading={isSubmitting} className="gap-2">
            <Check className="h-4 w-4" />
            <span>Lưu cấu hình</span>
          </Button>
        </div>
      </div>

      {/* Summary Metadata Card (Matches Figma: Hosting Business, Đang bán, HOST_BUSINESS) */}
      <div className="grid grid-cols-3 gap-4 rounded-2xl border border-surface-border bg-white p-6 shadow-sm">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">HOSTING</p>
          <p className="mt-1 text-base font-bold text-slate-900">{initialPackage.name}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            TRẠNG THÁI
          </p>
          <div className="mt-1">
            <Badge variant="active">Đang bán</Badge>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">MÃ SP</p>
          <p className="mt-1 text-sm font-bold text-slate-700">{initialPackage.code}</p>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <TabsBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Specs Form Content (Matches Figma Form Structure) */}
      {activeTab === 'specs' && (
        <form
          onSubmit={handleSave}
          className="space-y-6 rounded-2xl border border-surface-border bg-white p-6 shadow-sm"
        >
          <div className="border-b border-surface-border pb-4">
            <h3 className="text-base font-bold text-slate-900">CẤU HÌNH KỸ THUẬT</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Được sử dụng để hiển thị cho khách hàng khi so sánh gói.
            </p>
          </div>

          <div className="max-w-2xl space-y-4">
            {/* Input Row 1: Tên miền sử dụng SSL */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium text-slate-700">Tên miền sử dụng SSL</label>
              <div className="col-span-2">
                <Input
                  value={sslDomain}
                  onChange={(e) => setSslDomain(e.target.value)}
                  placeholder="Text input (Ngắn)"
                />
              </div>
            </div>

            {/* Input Row 2: CPU Cores */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium text-slate-700">Số lượng CPU Cores</label>
              <div className="col-span-2">
                <Input
                  value={cpuCores}
                  onChange={(e) => setCpuCores(e.target.value)}
                  placeholder="Ví dụ: 4"
                />
              </div>
            </div>

            {/* Input Row 3: RAM */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium text-slate-700">Dung lượng RAM (GB)</label>
              <div className="col-span-2">
                <Input
                  value={ramGb}
                  onChange={(e) => setRamGb(e.target.value)}
                  placeholder="Ví dụ: 8"
                />
              </div>
            </div>

            {/* Input Row 4: SSD */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium text-slate-700">Dung lượng SSD (GB)</label>
              <div className="col-span-2">
                <Input
                  value={ssdGb}
                  onChange={(e) => setSsdGb(e.target.value)}
                  placeholder="Ví dụ: 100"
                />
              </div>
            </div>

            {/* Switch Row: SSL miễn phí */}
            <div className="grid grid-cols-3 items-center gap-4 pt-2">
              <label className="text-sm font-medium text-slate-700">Kích hoạt chứng chỉ SSL</label>
              <div className="col-span-2 flex items-center space-x-3">
                <Switch checked={isSslIncluded} onCheckedChange={setIsSslIncluded} />
                <span className="text-xs text-slate-500">
                  {isSslIncluded ? 'Đã bật SSL miễn phí trọn đời' : 'Chưa kích hoạt'}
                </span>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Fallback for other tabs */}
      {activeTab !== 'specs' && (
        <div className="rounded-2xl border border-surface-border bg-white p-12 text-center text-slate-400">
          <p className="text-sm font-medium">
            Nội dung tab {tabs.find((t) => t.id === activeTab)?.label} đang được tải...
          </p>
        </div>
      )}
    </div>
  );
}
