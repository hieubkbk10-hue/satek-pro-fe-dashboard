/**
 * @file ClientHostingListView.tsx
 * @description Client Hosting Management Dashboard & Storage List (Matches Figma Client Hosting Screen)
 */
import * as React from 'react';
import { Plus, Search, FileText } from 'lucide-react';
import { ClientHostingInstance } from '@/types';
import { Button, Input, Badge, DataTable, ColumnDefinition } from '@/components/common';
import { MOCK_CLIENT_DASHBOARD_METRICS } from '@/mocks';
import { formatVND } from '@/utils';

export interface ClientHostingListViewProps {
  instances: ClientHostingInstance[];
  onAddNewDomain: () => void;
}

export function ClientHostingListView({
  instances,
  onAddNewDomain,
}: ClientHostingListViewProps): React.JSX.Element {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'active' | 'needs_review'>('all');
  const [searchKeyword, setSearchKeyword] = React.useState<string>('');

  const filteredInstances = React.useMemo(() => {
    return instances.filter((item) => {
      const matchFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'active'
            ? item.status === 'active'
            : item.status === 'needs_review';

      const matchSearch =
        item.domainName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.companyName.toLowerCase().includes(searchKeyword.toLowerCase());

      return matchFilter && matchSearch;
    });
  }, [instances, activeFilter, searchKeyword]);

  const columns: ColumnDefinition<ClientHostingInstance>[] = [
    {
      key: 'domain',
      header: 'HOSTING',
      width: '28%',
      render: (item) => (
        <div>
          <p className="font-bold text-slate-900">{item.domainName}</p>
          <p className="text-xs text-slate-400">{item.companyName}</p>
        </div>
      ),
    },
    {
      key: 'plan',
      header: 'GÓI',
      width: '22%',
      render: (item) => (
        <span className="rounded-full border border-amber-200/60 bg-amber-50 px-3 py-1 text-[11px] font-bold tracking-wide text-amber-800">
          {item.packagePlan}
        </span>
      ),
    },
    {
      key: 'region',
      header: 'KHU VỰC',
      width: '12%',
      render: (item) => <span className="text-xs font-semibold text-slate-700">{item.region}</span>,
    },
    {
      key: 'cpu',
      header: 'CPU',
      width: '10%',
      render: (item) => (
        <span className="text-xs font-semibold text-slate-700">{item.cpuUsagePercentage}%</span>
      ),
    },
    {
      key: 'ram',
      header: 'RAM',
      width: '10%',
      render: (item) => (
        <span className="text-xs font-semibold text-slate-700">{item.ramUsagePercentage}%</span>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '18%',
      render: (item) => (
        <Badge variant={item.status === 'active' ? 'active' : 'warning'}>
          {item.status === 'active' ? 'ĐANG HOẠT ĐỘNG' : 'CẦN KIỂM TRA'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'THAO TÁC',
      width: '12%',
      className: 'text-right',
      render: () => (
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs text-slate-600 hover:text-slate-900"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Chi tiết</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            DỊCH VỤ LƯU TRỮ
          </p>
          <h1 className="mt-0.5 text-2xl font-black tracking-tight text-slate-900">
            Danh sách lưu trữ
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Xem toàn bộ hosting, trạng thái bản khai, bảo mật DNS, bảo vệ thương hiệu và gia hạn tự
            động.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={onAddNewDomain}
          className="gap-2 bg-slate-900 hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          <span>Thêm tên miền</span>
        </Button>
      </div>

      {/* 4 Metrics Summary Cards (Matches Figma Client Dashboard) */}
      <div className="grid grid-cols-4 gap-4">
        {/* Card 1: Hosting Active */}
        <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            HOSTING ACTIVE
          </p>
          <p className="mt-1 text-2xl font-black text-emerald-600">
            {MOCK_CLIENT_DASHBOARD_METRICS.activeHostingCount}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {MOCK_CLIENT_DASHBOARD_METRICS.hostingLocationsSummary}
          </p>
        </div>

        {/* Card 2: CPU Trung Bình */}
        <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            CPU TRUNG BÌNH
          </p>
          <p className="mt-1 text-2xl font-black text-amber-500">
            {MOCK_CLIENT_DASHBOARD_METRICS.averageCpuPercentage}%
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {MOCK_CLIENT_DASHBOARD_METRICS.highestCpuDomain}
          </p>
        </div>

        {/* Card 3: Backup Đúng Lịch */}
        <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            BACKUP ĐÚNG LỊCH
          </p>
          <p className="mt-1 text-2xl font-black text-sky-600">
            {MOCK_CLIENT_DASHBOARD_METRICS.scheduledBackupRatio}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {MOCK_CLIENT_DASHBOARD_METRICS.lastBackupTimestamp}
          </p>
        </div>

        {/* Card 4: Doanh Thu Tháng */}
        <div className="rounded-2xl border border-surface-border bg-white p-5 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            DOANH THU THÁNG
          </p>
          <p className="mt-1 text-2xl font-black text-slate-900">
            {formatVND(MOCK_CLIENT_DASHBOARD_METRICS.monthlyRevenueAmount)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {MOCK_CLIENT_DASHBOARD_METRICS.activePackagesCountSummary}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-80">
          <Input
            placeholder="Tìm domain hoặc khách hàng..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            prefixIcon={<Search className="h-4 w-4 text-slate-400" />}
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
            Đang hoạt động
          </button>
          <button
            onClick={() => setActiveFilter('needs_review')}
            type="button"
            className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeFilter === 'needs_review'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cần kiểm tra
          </button>
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredInstances} keyExtractor={(item) => item.id} />
    </div>
  );
}
