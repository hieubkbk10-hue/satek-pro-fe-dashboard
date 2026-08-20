/**
 * @file FinanceMisaView.tsx
 * @description Admin Finance, Invoices & MISA Accounting Sync Management View
 */
import * as React from 'react';
import { RefreshCw } from 'lucide-react';
import { MisaReconciliationRecord } from '@/types';
import { MOCK_MISA_RECONCILIATION_LIST } from '@/mocks';
import {
  MetricSummaryCards,
  MetricCardItem,
  FilterSearchHeader,
  FilterOption,
} from '@/components/molecular';
import { DataTable, ColumnDefinition, Badge, Button } from '@/components/common';
import { formatVND } from '@/utils';
import { toast } from 'sonner';

export function FinanceMisaView(): React.JSX.Element {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [records] = React.useState<MisaReconciliationRecord[]>(MOCK_MISA_RECONCILIATION_LIST);
  const [isSyncing, setIsSyncing] = React.useState<boolean>(false);

  const metrics: MetricCardItem[] = [
    {
      id: 'm-rev-tot',
      label: 'DOANH THU THÁNG NÀY',
      value: '489.200.000 ₫',
      description: '+18.5% so với cùng kỳ',
      variant: 'emerald',
    },
    {
      id: 'm-inv-count',
      label: 'HÓA ĐƠN ĐÃ XUẤT',
      value: '342 hóa đơn',
      description: 'Tổng tiền thuế VAT: 44.472.000 ₫',
      variant: 'default',
    },
    {
      id: 'm-misa-sync',
      label: 'ĐỒNG BỘ MISA',
      value: '340/342 (99.4%)',
      description: '2 hóa đơn đang chờ đối soát',
      variant: 'amber',
    },
    {
      id: 'm-float',
      label: 'TỔNG SỐ DƯ VÍ CLIENT',
      value: '1.250.000.000 ₫',
      description: 'Tiền ký quỹ an toàn',
      variant: 'sky',
    },
  ];

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả hóa đơn', count: records.length },
    {
      id: 'synced',
      label: 'Đã đồng bộ MISA',
      count: records.filter((r) => r.misaSyncStatus === 'synced').length,
    },
    {
      id: 'pending',
      label: 'Chờ đối soát',
      count: records.filter((r) => r.misaSyncStatus === 'pending').length,
    },
  ];

  const filteredRecords = React.useMemo(() => {
    return records.filter((r) => {
      const matchFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'synced'
            ? r.misaSyncStatus === 'synced'
            : r.misaSyncStatus === 'pending';
      const matchSearch =
        r.invoiceCode.toLowerCase().includes(searchValue.toLowerCase()) ||
        r.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        r.taxCode.includes(searchValue);
      return matchFilter && matchSearch;
    });
  }, [records, activeFilter, searchValue]);

  const handleSyncMisaAll = async () => {
    try {
      setIsSyncing(true);
      await new Promise((res) => setTimeout(res, 800));
      toast.success('Đã đối soát và đồng bộ toàn bộ chứng từ sang phần mềm MISA thành công!');
    } catch {
      toast.error('Lỗi kết nối cổng API MISA.');
    } finally {
      setIsSyncing(false);
    }
  };

  const columns: ColumnDefinition<MisaReconciliationRecord>[] = [
    {
      key: 'invoiceCode',
      header: 'SỐ HÓA ĐƠN',
      width: '20%',
      render: (row) => <span className="font-bold text-slate-900">{row.invoiceCode}</span>,
    },
    {
      key: 'customer',
      header: 'DOANH NGHIỆP / MST',
      width: '32%',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800">{row.customerName}</p>
          <p className="text-xs text-slate-400">MST: {row.taxCode}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'GIÁ TRỊ / VAT',
      width: '20%',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{formatVND(row.amount)}</p>
          <p className="text-xs text-emerald-600">VAT: {formatVND(row.vatAmount)}</p>
        </div>
      ),
    },
    {
      key: 'misaStatus',
      header: 'ĐỒNG BỘ MISA',
      width: '16%',
      render: (row) => (
        <Badge variant={row.misaSyncStatus === 'synced' ? 'active' : 'warning'}>
          {row.misaSyncStatus === 'synced' ? 'Đã đẩy MISA' : 'Chờ đối soát'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'THAO TÁC',
      width: '12%',
      className: 'text-right',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.info(`Tra cứu chứng từ ${row.misaVoucherNumber || row.invoiceCode}`)}
          className="gap-1 text-xs"
        >
          <span>Đối soát</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            TÀI CHÍNH & KẾ TOÁN
          </p>
          <h1 className="mt-0.5 text-2xl font-black tracking-tight text-slate-900">
            Đối Soát Tài Chính & Đồng Bộ MISA
          </h1>
        </div>

        <Button
          variant="primary"
          onClick={handleSyncMisaAll}
          isLoading={isSyncing}
          className="gap-2 bg-emerald-600 font-bold shadow-sm hover:bg-emerald-700"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Đồng Bộ Hóa Đơn MISA</span>
        </Button>
      </div>

      <MetricSummaryCards metrics={metrics} />

      <FilterSearchHeader
        searchPlaceholder="Tìm số hóa đơn, tên công ty, MST..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <DataTable columns={columns} data={filteredRecords} keyExtractor={(row) => row.id} />
    </div>
  );
}
