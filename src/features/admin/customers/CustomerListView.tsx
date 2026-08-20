/**
 * @file CustomerListView.tsx
 * @description Admin Customer Accounts & VNNIC eKYC Verification View with Query & Mutation Hook
 */
import * as React from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';
import { CustomerAccount } from '@/types';
import { useCustomersQuery, useVerifyCustomerEkycMutation } from '@/hooks';
import { DataTable, ColumnDefinition, Badge, Button, AppDialog } from '@/components/common';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { toast } from 'sonner';

export function CustomerListView(): React.JSX.Element {
  const { data: queriedCustomers, isLoading } = useCustomersQuery();
  const verifyMutation = useVerifyCustomerEkycMutation();

  const customers: CustomerAccount[] = queriedCustomers || [];
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = React.useState<CustomerAccount | null>(null);
  const [isEkycModalOpen, setIsEkycModalOpen] = React.useState<boolean>(false);

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả khách hàng', count: customers.length },
    {
      id: 'verified',
      label: 'Đã xác thực eKYC',
      count: customers.filter((c) => c.ekycStatus === 'verified').length,
    },
    {
      id: 'pending',
      label: 'Chờ duyệt eKYC',
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
        c.representativeName.toLowerCase().includes(searchValue.toLowerCase()) ||
        c.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        (c.companyName && c.companyName.toLowerCase().includes(searchValue.toLowerCase()));
      return matchFilter && matchSearch;
    });
  }, [customers, activeFilter, searchValue]);

  const handleOpenEkyc = (customer: CustomerAccount) => {
    setSelectedCustomer(customer);
    setIsEkycModalOpen(true);
  };

  const handleApproveEkyc = () => {
    if (!selectedCustomer) return;
    verifyMutation.mutate(selectedCustomer.id, {
      onSuccess: () => {
        setIsEkycModalOpen(false);
      },
    });
  };

  const columns: ColumnDefinition<CustomerAccount>[] = [
    {
      key: 'representativeName',
      header: 'KHÁCH HÀNG / TỔ CHỨC',
      width: '32%',
      render: (row) => (
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
            {row.representativeName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-slate-900">{row.representativeName}</p>
            <p className="text-xs text-slate-400">
              {row.companyName ? row.companyName : row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'tier',
      header: 'HẠNG TÀI KHOẢN',
      width: '18%',
      render: (row) => (
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-800">
          {row.tier}
        </span>
      ),
    },
    {
      key: 'services',
      header: 'DỊCH VỤ SỬ DỤNG',
      width: '18%',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-700">
          {row.activeServicesCount} dịch vụ đang chạy
        </span>
      ),
    },
    {
      key: 'ekyc',
      header: 'eKYC VNNIC',
      width: '18%',
      render: (row) => (
        <Badge
          variant={
            row.ekycStatus === 'verified'
              ? 'active'
              : row.ekycStatus === 'pending'
                ? 'warning'
                : 'neutral'
          }
        >
          {row.ekycStatus === 'verified'
            ? 'ĐÃ DUYỆT'
            : row.ekycStatus === 'pending'
              ? 'CHỜ DUYỆT'
              : 'CHƯA NỘP'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'THAO TÁC',
      width: '14%',
      className: 'text-right',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleOpenEkyc(row)}
          className="cursor-pointer gap-1 text-xs hover:border-primary hover:text-primary"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{row.ekycStatus === 'pending' ? 'Duyệt eKYC' : 'Xem hồ sơ'}</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="QUẢN TRỊ KHÁCH HÀNG"
        title="Danh Sách Tài Khoản & Thẩm Định eKYC"
        searchPlaceholder="Tìm tên, email, tên doanh nghiệp..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Thêm Khách Hàng"
        onPrimaryAction={() => toast.info('Chức năng thêm tài khoản khách hàng mới')}
      />

      <DataTable
        columns={columns}
        data={filteredCustomers}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
      />

      {/* eKYC Verification Dialog */}
      {selectedCustomer && (
        <AppDialog
          open={isEkycModalOpen}
          onOpenChange={setIsEkycModalOpen}
          title="Hồ Sơ Định Danh eKYC VNNIC"
          description={`Khách hàng: ${selectedCustomer.representativeName} · Email: ${selectedCustomer.email}`}
          maxWidthClass="max-w-xl"
        >
          <div className="space-y-4">
            <div className="space-y-2 rounded-xl border border-surface-border bg-slate-50 p-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Mã khách hàng:</span>
                <span className="font-bold uppercase text-slate-800">
                  {selectedCustomer.customerCode}
                </span>
              </div>
              {selectedCustomer.companyName && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Tên doanh nghiệp:</span>
                  <span className="font-bold text-slate-800">{selectedCustomer.companyName}</span>
                </div>
              )}
              {selectedCustomer.taxCode && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Mã số thuế (MST):</span>
                  <span className="font-bold text-slate-800">{selectedCustomer.taxCode}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Trạng thái hồ sơ:</span>
                <Badge variant={selectedCustomer.ekycStatus === 'verified' ? 'active' : 'warning'}>
                  {selectedCustomer.ekycStatus === 'verified' ? 'HỢP LỆ' : 'CẦN THẨM ĐỊNH'}
                </Badge>
              </div>
            </div>

            <div className="flex justify-end space-x-2 border-t border-surface-border pt-3">
              <Button variant="outline" size="sm" onClick={() => setIsEkycModalOpen(false)}>
                Đóng
              </Button>
              {selectedCustomer.ekycStatus === 'pending' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApproveEkyc}
                  isLoading={verifyMutation.isPending}
                  className="cursor-pointer gap-1.5 font-bold"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Duyệt Xác Thực eKYC</span>
                </Button>
              )}
            </div>
          </div>
        </AppDialog>
      )}
    </div>
  );
}
