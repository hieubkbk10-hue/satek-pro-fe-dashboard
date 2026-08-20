/**
 * @file CustomerListView.tsx
 * @description Admin Customer Accounts & eKYC VNNIC Verification View
 */
import * as React from 'react';
import { Eye, ShieldCheck, Building2 } from 'lucide-react';
import { CustomerAccount } from '@/types';
import { MOCK_ADMIN_CUSTOMERS } from '@/mocks';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { DataTable, ColumnDefinition, Badge, Button, AppDialog } from '@/components/common';
import { formatVND } from '@/utils';
import { toast } from 'sonner';

export function CustomerListView(): React.JSX.Element {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [customers] = React.useState<CustomerAccount[]>(MOCK_ADMIN_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = React.useState<CustomerAccount | null>(null);
  const [isEkycModalOpen, setIsEkycModalOpen] = React.useState<boolean>(false);

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả khách hàng', count: customers.length },
    {
      id: 'verified',
      label: 'Đã eKYC VNNIC',
      count: customers.filter((c) => c.ekycStatus === 'verified').length,
    },
    {
      id: 'pending',
      label: 'Chờ duyệt hồ sơ',
      count: customers.filter((c) => c.ekycStatus === 'pending').length,
    },
  ];

  const filteredCustomers = React.useMemo(() => {
    return customers.filter((c) => {
      const matchFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'verified'
            ? c.ekycStatus === 'verified'
            : c.ekycStatus === 'pending';
      const matchSearch =
        c.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
        c.customerCode.toLowerCase().includes(searchValue.toLowerCase()) ||
        c.representativeName.toLowerCase().includes(searchValue.toLowerCase()) ||
        c.taxCode.includes(searchValue);
      return matchFilter && matchSearch;
    });
  }, [customers, activeFilter, searchValue]);

  const handleOpenEkyc = (customer: CustomerAccount) => {
    setSelectedCustomer(customer);
    setIsEkycModalOpen(true);
  };

  const columns: ColumnDefinition<CustomerAccount>[] = [
    {
      key: 'company',
      header: 'DOANH NGHIỆP / ĐẠI DIỆN',
      width: '30%',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.companyName}</p>
          <p className="text-xs text-slate-400">
            Đại diện: {row.representativeName} · MST: {row.taxCode}
          </p>
        </div>
      ),
    },
    {
      key: 'contact',
      header: 'LIÊN HỆ',
      width: '24%',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <p className="font-medium text-slate-700">{row.email}</p>
          <p className="text-slate-400">{row.phoneNumber}</p>
        </div>
      ),
    },
    {
      key: 'tier',
      header: 'HẠNG KHÁCH',
      width: '14%',
      render: (row) => (
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
          {row.tier}
        </span>
      ),
    },
    {
      key: 'totalSpent',
      header: 'DOANH SỐ',
      width: '16%',
      render: (row) => (
        <span className="font-bold text-slate-900">{formatVND(row.totalSpent)}</span>
      ),
    },
    {
      key: 'ekycStatus',
      header: 'EKYC VNNIC',
      width: '16%',
      render: (row) => (
        <Badge
          variant={
            row.ekycStatus === 'verified'
              ? 'active'
              : row.ekycStatus === 'pending'
                ? 'warning'
                : 'error'
          }
        >
          {row.ekycStatus === 'verified'
            ? 'Đã duyệt'
            : row.ekycStatus === 'pending'
              ? 'Chờ duyệt'
              : 'Từ chối'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'THAO TÁC',
      width: '10%',
      className: 'text-right',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleOpenEkyc(row)}
          className="gap-1 border-slate-200 text-xs hover:border-primary hover:text-primary"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Hồ sơ</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="QUẢN TRỊ KHÁCH HÀNG"
        title="Danh Sách Khách Hàng & eKYC VNNIC"
        searchPlaceholder="Tìm mã KH, tên công ty, mã số thuế..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Thêm Khách Hàng"
        onPrimaryAction={() => toast.info('Chức năng thêm khách hàng mới')}
      />

      <DataTable columns={columns} data={filteredCustomers} keyExtractor={(row) => row.id} />

      {/* eKYC Verification Dialog */}
      {selectedCustomer && (
        <AppDialog
          open={isEkycModalOpen}
          onOpenChange={setIsEkycModalOpen}
          title={`Hồ Sơ eKYC VNNIC - ${selectedCustomer.companyName}`}
          description={`Mã khách hàng: ${selectedCustomer.customerCode} · MST: ${selectedCustomer.taxCode}`}
          maxWidthClass="max-w-xl"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rounded-xl border border-surface-border bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{selectedCustomer.companyName}</p>
                <p className="text-xs text-slate-500">
                  Đại diện pháp luật: {selectedCustomer.representativeName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-surface-border p-3">
                <p className="font-medium text-slate-400">Bản khai tên miền .VN</p>
                <p className="mt-1 font-bold text-slate-800">Đã nộp có chữ ký số</p>
              </div>
              <div className="rounded-xl border border-surface-border p-3">
                <p className="font-medium text-slate-400">CCCD Người đại diện</p>
                <p className="mt-1 font-bold text-slate-800">Khớp dữ liệu Bộ Công An</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 border-t border-surface-border pt-3">
              <Button variant="outline" size="sm" onClick={() => setIsEkycModalOpen(false)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsEkycModalOpen(false);
                  toast.success('Đã xác thực eKYC VNNIC thành công cho khách hàng!');
                }}
                className="gap-1.5 bg-emerald-600 font-bold hover:bg-emerald-700"
              >
                <ShieldCheck className="h-4 w-4" />
                Duyệt Hồ Sơ VNNIC
              </Button>
            </div>
          </div>
        </AppDialog>
      )}
    </div>
  );
}
