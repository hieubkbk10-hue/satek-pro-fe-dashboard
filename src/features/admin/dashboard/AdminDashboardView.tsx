/**
 * @file AdminDashboardView.tsx
 * @description Master Business Overview Dashboard for Admin Portal (Matches Figma Admin Root)
 */
import * as React from 'react';
import { Server, Globe, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { MetricSummaryCards, MetricCardItem } from '@/components/molecular';
import { DataTable, ColumnDefinition, Badge, Button } from '@/components/common';
import { MOCK_ADMIN_HOSTING_PACKAGES, MOCK_ADMIN_ORDERS } from '@/mocks';
import { HostingPackage, OrderRecord } from '@/types';
import { formatVND } from '@/utils';

export function AdminDashboardView(): React.JSX.Element {
  const metrics: MetricCardItem[] = [
    {
      id: 'm-rev',
      label: 'DOANH THU THÁNG',
      value: '489.200.000 ₫',
      description: '+18.5% so với tháng trước',
      variant: 'emerald',
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: 'm-host',
      label: 'GÓI HOSTING HOẠT ĐỘNG',
      value: '342 gói',
      description: 'Từ 4 cụm máy chủ P.A Việt Nam',
      variant: 'sky',
      icon: <Server className="h-4 w-4" />,
    },
    {
      id: 'm-dom',
      label: 'TÊN MIỀN QUẢN LÝ',
      value: '1.280 TLD',
      description: '890 tên miền .VN đã xác thực eKYC',
      variant: 'default',
      icon: <Globe className="h-4 w-4" />,
    },
    {
      id: 'm-cust',
      label: 'KHÁCH HÀNG DOANH NGHIỆP',
      value: '215 công ty',
      description: '4 khách hàng mới trong tuần',
      variant: 'amber',
      icon: <Users className="h-4 w-4" />,
    },
  ];

  const recentOrderColumns: ColumnDefinition<OrderRecord>[] = [
    {
      key: 'orderCode',
      header: 'MÃ ĐƠN HÀNG',
      width: '25%',
      render: (row) => <span className="font-bold text-slate-900">{row.orderCode}</span>,
    },
    {
      key: 'customerName',
      header: 'KHÁCH HÀNG',
      width: '35%',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800">{row.customerName}</p>
          <p className="text-xs text-slate-400">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'totalAmount',
      header: 'TỔNG TIỀN',
      width: '20%',
      render: (row) => <span className="font-bold text-primary">{formatVND(row.totalAmount)}</span>,
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '20%',
      render: (row) => (
        <Badge variant={row.status === 'completed' ? 'active' : 'warning'}>
          {row.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
        </Badge>
      ),
    },
  ];

  const hostingSummaryColumns: ColumnDefinition<HostingPackage>[] = [
    {
      key: 'name',
      header: 'GÓI HOSTING',
      width: '35%',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.name}</p>
          <p className="text-xs text-slate-400">NCC: {row.provider}</p>
        </div>
      ),
    },
    {
      key: 'specs',
      header: 'SPECS',
      width: '30%',
      render: (row) => (
        <span className="text-xs text-slate-600">
          {row.specs.cpuCores}C / {row.specs.ramGigabytes}GB / {row.specs.ssdGigabytes}GB SSD
        </span>
      ),
    },
    {
      key: 'price',
      header: 'GIÁ 12T',
      width: '20%',
      render: (row) => (
        <span className="font-semibold text-slate-800">{formatVND(row.price12Months)}</span>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '15%',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'active' : 'warning'}>
          {row.status === 'active' ? 'Bán chạy' : 'Tạm dừng'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-lg sm:flex-row sm:items-center sm:p-8">
        <div>
          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
            SATEK PRO ENTERPRISE
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            Trung Tâm Quản Trị Hệ Thống Satek Pro
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-slate-300 sm:text-sm">
            Giám sát vận hành máy chủ P.A Việt Nam, quản lý tên miền VNNIC, điều phối khuyến mãi và
            đối soát hóa đơn MISA.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <Button
            variant="primary"
            className="bg-primary font-bold shadow-md shadow-primary/20 hover:bg-primary-hover"
          >
            Xem Báo Cáo Doanh Thu
          </Button>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <MetricSummaryCards metrics={metrics} />

      {/* Two Column Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left: Recent Orders */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Đơn Hàng Gần Đây</h3>
            <span className="text-xs font-medium text-slate-400">Hôm nay</span>
          </div>
          <DataTable
            columns={recentOrderColumns}
            data={MOCK_ADMIN_ORDERS}
            keyExtractor={(row) => row.id}
          />
        </div>

        {/* Right: Key Hosting Packages */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Gói Dịch Vụ Chủ Lực</h3>
            <span className="text-xs font-medium text-slate-400">4 Gói Active</span>
          </div>
          <DataTable
            columns={hostingSummaryColumns}
            data={MOCK_ADMIN_HOSTING_PACKAGES}
            keyExtractor={(row) => row.id}
          />
        </div>
      </div>

      {/* System Sync Alert Notification */}
      <div className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-emerald-50 p-4 text-xs text-emerald-800">
        <div className="flex items-center space-x-2.5">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 text-emerald-600" />
          <span>
            Hệ thống đối soát MISA và cổng kết nối P.A Việt Nam đang hoạt động ổn định. Lần đồng bộ
            gần nhất: <strong>10 phút trước</strong>.
          </span>
        </div>
        <span className="cursor-pointer font-semibold text-emerald-700 underline">
          Chi tiết đối soát →
        </span>
      </div>
    </div>
  );
}
