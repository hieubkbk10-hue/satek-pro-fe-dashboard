/**
 * @file ClientDashboardView.tsx
 * @description Client Portal Resource Overview Dashboard (Matches Figma Client Root)
 */
import * as React from 'react';
import { Server, Plus } from 'lucide-react';
import { MetricSummaryCards, MetricCardItem } from '@/components/molecular';
import { DataTable, ColumnDefinition, Badge, Button } from '@/components/common';
import { MOCK_CLIENT_HOSTING_INSTANCES, MOCK_CLIENT_DASHBOARD_METRICS } from '@/mocks';
import { ClientHostingInstance } from '@/types';
import { formatVND } from '@/utils';

export function ClientDashboardView(): React.JSX.Element {
  const metrics: MetricCardItem[] = [
    {
      id: 'cl-m-host',
      label: 'MÁY CHỦ HOẠT ĐỘNG',
      value: `${MOCK_CLIENT_DASHBOARD_METRICS.activeHostingCount} Cụm`,
      description: MOCK_CLIENT_DASHBOARD_METRICS.hostingLocationsSummary,
      variant: 'emerald',
      icon: <Server className="h-4 w-4" />,
    },
    {
      id: 'cl-m-cpu',
      label: 'CPU TRUNG BÌNH',
      value: `${MOCK_CLIENT_DASHBOARD_METRICS.averageCpuPercentage}%`,
      description: MOCK_CLIENT_DASHBOARD_METRICS.highestCpuDomain,
      variant: 'amber',
    },
    {
      id: 'cl-m-backup',
      label: 'SAO LƯU ĐÚNG LỊCH',
      value: MOCK_CLIENT_DASHBOARD_METRICS.scheduledBackupRatio,
      description: MOCK_CLIENT_DASHBOARD_METRICS.lastBackupTimestamp,
      variant: 'sky',
    },
    {
      id: 'cl-m-cost',
      label: 'CHI PHÍ THÁNG',
      value: formatVND(MOCK_CLIENT_DASHBOARD_METRICS.monthlyRevenueAmount),
      description: MOCK_CLIENT_DASHBOARD_METRICS.activePackagesCountSummary,
      variant: 'default',
    },
  ];

  const columns: ColumnDefinition<ClientHostingInstance>[] = [
    {
      key: 'domainName',
      header: 'TÊN MIỀN & GÓI HOSTING',
      width: '35%',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.domainName}</p>
          <p className="text-xs text-slate-400">
            {row.packagePlan} · Khu vực: {row.region}
          </p>
        </div>
      ),
    },
    {
      key: 'cpu',
      header: 'CPU / RAM',
      width: '25%',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-700">
          CPU: {row.cpuUsagePercentage}% · RAM: {row.ramUsagePercentage}%
        </span>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '20%',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'active' : 'warning'}>
          {row.status === 'active' ? 'ĐANG CHẠY' : 'CẦN KIỂM TRA'}
        </Badge>
      ),
    },
    {
      key: 'backup',
      header: 'SAO LƯU GẦN NHẤT',
      width: '20%',
      render: (row) => <span className="text-xs text-slate-500">{row.lastBackupAt}</span>,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-primary to-orange-600 p-6 text-white shadow-lg shadow-primary/20 sm:flex-row sm:items-center sm:p-8">
        <div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
            PORTAL DOANH NGHIỆP
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            Chào mừng Công ty Cổ Phần An Nam!
          </h1>
          <p className="mt-1 max-w-xl text-xs text-white/90 sm:text-sm">
            Quản lý toàn bộ 4 website máy chủ, bảo mật tên miền DNSSEC và gia hạn tự động qua Ví
            Satek Pay.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <Button
            variant="outline"
            className="border-none bg-white font-bold text-slate-900 hover:bg-slate-50"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Đăng Ký Domain
          </Button>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <MetricSummaryCards metrics={metrics} />

      {/* Hosting Overview Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Danh Sách Website Đang Hoạt Động</h3>
            <p className="text-xs text-slate-500">
              Toàn bộ máy chủ đều được kích hoạt SSL và Backup tự động lúc 03:00 sáng.
            </p>
          </div>
          <span className="cursor-pointer text-xs font-bold text-primary hover:underline">
            Xem tất cả hosting →
          </span>
        </div>

        <DataTable
          columns={columns}
          data={MOCK_CLIENT_HOSTING_INSTANCES}
          keyExtractor={(row) => row.id}
        />
      </div>
    </div>
  );
}
