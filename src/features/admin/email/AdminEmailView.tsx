/**
 * @file AdminEmailView.tsx
 * @description Admin Email Workspace & Domain Mailboxes Management
 */
import * as React from 'react';
import { Mail, Users } from 'lucide-react';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { DataTable, ColumnDefinition, Badge } from '@/components/common';
import { formatVND } from '@/utils';
import { toast } from 'sonner';

export interface EmailPackageItem {
  id: string;
  name: string;
  storagePerUser: string;
  maxAccounts: number;
  price12Months: number;
  status: 'active' | 'inactive';
}

export const MOCK_EMAIL_PACKAGES: EmailPackageItem[] = [
  {
    id: 'ep-01',
    name: 'Email Doanh Nghiệp Pro #1',
    storagePerUser: '5GB',
    maxAccounts: 5,
    price12Months: 360000,
    status: 'active',
  },
  {
    id: 'ep-02',
    name: 'Email Doanh Nghiệp Pro #2',
    storagePerUser: '10GB',
    maxAccounts: 10,
    price12Months: 720000,
    status: 'active',
  },
  {
    id: 'ep-03',
    name: 'Email Enterprise Unlimited',
    storagePerUser: '50GB',
    maxAccounts: 50,
    price12Months: 2400000,
    status: 'active',
  },
];

export function AdminEmailView(): React.JSX.Element {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả gói', count: MOCK_EMAIL_PACKAGES.length },
    {
      id: 'active',
      label: 'Đang mở bán',
      count: MOCK_EMAIL_PACKAGES.filter((p) => p.status === 'active').length,
    },
  ];

  const columns: ColumnDefinition<EmailPackageItem>[] = [
    {
      key: 'name',
      header: 'TÊN GÓI EMAIL',
      width: '35%',
      render: (row) => (
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900">{row.name}</p>
            <p className="text-xs text-slate-400">Dung lượng: {row.storagePerUser} / hòm thư</p>
          </div>
        </div>
      ),
    },
    {
      key: 'accounts',
      header: 'SỐ LƯỢNG USER',
      width: '25%',
      render: (row) => (
        <span className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700">
          <Users className="h-3.5 w-3.5 text-slate-400" />
          <span>Tối đa {row.maxAccounts} người dùng</span>
        </span>
      ),
    },
    {
      key: 'price',
      header: 'GIÁ NIÊM YẾT / 12T',
      width: '25%',
      render: (row) => (
        <span className="font-black text-slate-900">{formatVND(row.price12Months)}</span>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '15%',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'active' : 'warning'}>
          {row.status === 'active' ? 'ĐANG BÁN' : 'TẠM DỪNG'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="SẢN PHẨM & DỊCH VỤ"
        title="Quản Lý Gói Email Doanh Nghiệp"
        searchPlaceholder="Tìm kiếm gói email..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Tạo Gói Email Mới"
        onPrimaryAction={() => toast.info('Chức năng tạo gói Email Workspace mới')}
      />

      <DataTable columns={columns} data={MOCK_EMAIL_PACKAGES} keyExtractor={(row) => row.id} />
    </div>
  );
}
