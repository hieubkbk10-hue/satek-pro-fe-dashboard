/**
 * @file HostingListView.tsx
 * @description Admin Hosting Management Table View (Matches Figma Admin Hosting Screen)
 */
import * as React from 'react';
import { Plus, Search, Eye } from 'lucide-react';
import { HostingPackage } from '@/types';
import { Button, Input, Badge, DataTable, ColumnDefinition } from '@/components/common';
import { formatVND } from '@/utils';

export interface HostingListViewProps {
  packages: HostingPackage[];
  onEditSpecs: (pkg: HostingPackage) => void;
  onAddPackage: () => void;
}

export function HostingListView({
  packages,
  onEditSpecs,
  onAddPackage,
}: HostingListViewProps): React.JSX.Element {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'active' | 'inactive'>('all');
  const [searchKeyword, setSearchKeyword] = React.useState<string>('');

  const filteredPackages = React.useMemo(() => {
    return packages.filter((pkg) => {
      const matchFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'active'
            ? pkg.status === 'active'
            : pkg.status === 'inactive';

      const matchSearch =
        pkg.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        pkg.provider.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        pkg.providerCode.toLowerCase().includes(searchKeyword.toLowerCase());

      return matchFilter && matchSearch;
    });
  }, [packages, activeFilter, searchKeyword]);

  const columns: ColumnDefinition<HostingPackage>[] = [
    {
      key: 'name',
      header: 'TÊN GÓI / MÃ SP',
      width: '24%',
      render: (pkg) => (
        <div>
          <p className="font-semibold text-slate-900">{pkg.name}</p>
          <p className="text-xs text-slate-400">Tên gói / Mã SP</p>
        </div>
      ),
    },
    {
      key: 'provider',
      header: 'NHÀ CUNG CẤP',
      width: '20%',
      render: (pkg) => (
        <div>
          <p className="font-medium text-slate-800">{pkg.provider}</p>
          <p className="text-xs text-slate-400">Map: {pkg.providerCode}</p>
        </div>
      ),
    },
    {
      key: 'specs',
      header: 'THÔNG SỐ CHÍNH',
      width: '18%',
      render: (pkg) => (
        <div className="space-y-0.5 text-xs">
          <p className="text-slate-600">
            <span className="text-slate-400">CPU:</span>{' '}
            <span className="font-semibold text-slate-800">{pkg.specs.cpuCores} core</span>
          </p>
          <p className="text-slate-600">
            <span className="text-slate-400">RAM:</span>{' '}
            <span className="font-semibold text-slate-800">{pkg.specs.ramGigabytes} GB</span>
          </p>
          <p className="text-slate-600">
            <span className="text-slate-400">SSD:</span>{' '}
            <span className="font-semibold text-slate-800">{pkg.specs.ssdGigabytes} GB</span>
          </p>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'GIÁ BÁN 12T',
      width: '15%',
      render: (pkg) => (
        <div>
          <p className="font-bold text-slate-900">{formatVND(pkg.price12Months)}</p>
          <p className="text-xs text-slate-400 line-through">{formatVND(pkg.originalPrice)}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '12%',
      render: (pkg) => (
        <Badge variant={pkg.status === 'active' ? 'active' : 'warning'}>
          {pkg.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </Badge>
      ),
    },
    {
      key: 'syncStatus',
      header: 'ĐỒNG BỘ',
      width: '12%',
      render: (pkg) => (
        <Badge
          variant={
            pkg.syncStatus === 'synced'
              ? 'active'
              : pkg.syncStatus === 'failed'
                ? 'error'
                : 'warning'
          }
        >
          {pkg.syncStatus === 'synced'
            ? 'Đã đồng bộ'
            : pkg.syncStatus === 'failed'
              ? 'Lỗi'
              : 'Đang chờ'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'THAO TÁC',
      width: '12%',
      className: 'text-right',
      render: (pkg) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEditSpecs(pkg)}
          className="gap-1 border-slate-200 text-xs hover:border-primary hover:text-primary"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Cấu hình</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Title & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            QUẢN TRỊ TÊN MIỀN
          </p>
          <h1 className="mt-0.5 text-2xl font-black tracking-tight text-slate-900">
            Quản Lý Hosting
          </h1>
        </div>
        <Button
          variant="primary"
          onClick={onAddPackage}
          className="gap-2 bg-slate-900 hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          <span>Thêm gói Hosting</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-80">
          <Input
            placeholder="Tìm domain hoặc khách hàng..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            prefixIcon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex rounded-xl border border-surface-border bg-white p-1 shadow-sm">
          <button
            onClick={() => setActiveFilter('all')}
            type="button"
            className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            type="button"
            className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeFilter === 'active'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hoạt động
          </button>
          <button
            onClick={() => setActiveFilter('inactive')}
            type="button"
            className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeFilter === 'inactive'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ngừng hoạt động
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={filteredPackages} keyExtractor={(pkg) => pkg.id} />
    </div>
  );
}
