/**
 * @file FinanceMisaView.tsx
 * @description Admin Finance, VAT Invoices & MISA Reconciliation View with Mutation Hook
 */
import * as React from 'react';
import { RefreshCw, FileSpreadsheet } from 'lucide-react';
import { MisaReconciliationRecord } from '@/types';
import { useMisaRecordsQuery, useSyncAllMisaMutation } from '@/hooks';
import { DataTable, ColumnDefinition, Badge, Button } from '@/components/common';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { formatVND } from '@/utils';

export function FinanceMisaView(): React.JSX.Element {
  const { data: queriedRecords, isLoading } = useMisaRecordsQuery();
  const syncMutation = useSyncAllMisaMutation();

  const records: MisaReconciliationRecord[] = queriedRecords || [];
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả hóa đơn', count: records.length },
    {
      id: 'synced',
      label: 'Đã đồng bộ MISA',
      count: records.filter((r) => r.misaSyncStatus === 'synced').length,
    },
    {
      id: 'pending',
      label: 'Chờ đồng bộ',
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
        r.taxCode.includes(searchValue) ||
        r.customerName.toLowerCase().includes(searchValue.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [records, activeFilter, searchValue]);

  const handleSyncAll = () => {
    syncMutation.mutate();
  };

  const columns: ColumnDefinition<MisaReconciliationRecord>[] = [
    {
      key: 'invoiceCode',
      header: 'SỐ HÓA ĐƠN GTGT',
      width: '20%',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.invoiceCode}</p>
          <p className="text-[11px] text-slate-400">Ngày: {row.createdAt.slice(0, 10)}</p>
        </div>
      ),
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
      header: 'GIÁ TRỊ HÓA ĐƠN',
      width: '18%',
      render: (row) => (
        <div>
          <p className="font-black text-slate-900">{formatVND(row.amount)}</p>
          <p className="text-[10px] text-slate-400">VAT: {formatVND(row.vatAmount)}</p>
        </div>
      ),
    },
    {
      key: 'misaStatus',
      header: 'TRẠNG THÁI MISA',
      width: '18%',
      render: (row) => (
        <div>
          <Badge variant={row.misaSyncStatus === 'synced' ? 'active' : 'warning'}>
            {row.misaSyncStatus === 'synced' ? 'ĐÃ ĐỒNG BỘ' : 'CHỜ ĐỐI SOÁT'}
          </Badge>
          {row.misaVoucherNumber && (
            <p className="mt-0.5 text-[10px] text-slate-400">Số CT: {row.misaVoucherNumber}</p>
          )}
        </div>
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
          onClick={handleSyncAll}
          disabled={syncMutation.isPending}
          className="cursor-pointer text-xs hover:border-primary hover:text-primary"
        >
          Đồng bộ
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="TÀI CHÍNH & KẾ TOÁN"
        title="Đối Soát Hóa Đơn & Đồng Bộ MISA"
        searchPlaceholder="Tìm số hóa đơn, MST, tên công ty..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Đồng Bộ Tất Cả MISA"
        onPrimaryAction={handleSyncAll}
      />

      {/* Sync Status Banner */}
      <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-primary/20 bg-primary-light p-5 sm:flex-row sm:items-center">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Cổng Kết Nối Phần Mềm Kế Toán MISA SME / AMIS
            </h4>
            <p className="text-xs text-slate-600">
              Đã tự động khớp 340 trên 342 hóa đơn điện tử trong tháng hiện tại
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleSyncAll}
          isLoading={syncMutation.isPending}
          className="cursor-pointer gap-1.5 font-bold"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Kích Hoạt Đối Soát Ngay</span>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredRecords}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
      />
    </div>
  );
}
