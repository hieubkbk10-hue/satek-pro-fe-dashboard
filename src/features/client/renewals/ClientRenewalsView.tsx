/**
 * @file ClientRenewalsView.tsx
 * @description Client Services Auto Renewals & Expiration Monitoring
 */
import * as React from 'react';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { DataTable, ColumnDefinition, Button, Switch } from '@/components/common';
import { formatVND } from '@/utils';
import { toast } from 'sonner';

export interface RenewalItem {
  id: string;
  serviceName: string;
  type: string;
  expirationDate: string;
  daysRemaining: number;
  renewalPrice: number;
  isAutoRenew: boolean;
}

export const MOCK_RENEWAL_ITEMS: RenewalItem[] = [
  {
    id: 'rn-01',
    serviceName: 'tencongty.net',
    type: 'Tên miền .NET',
    expirationDate: '2026-06-15',
    daysRemaining: 25,
    renewalPrice: 320000,
    isAutoRenew: true,
  },
  {
    id: 'rn-02',
    serviceName: 'Gói Hosting Business An Nam',
    type: 'Hosting Cloud',
    expirationDate: '2026-07-01',
    daysRemaining: 41,
    renewalPrice: 1500000,
    isAutoRenew: true,
  },
  {
    id: 'rn-03',
    serviceName: 'Email Workspace 5 user',
    type: 'Email',
    expirationDate: '2026-08-10',
    daysRemaining: 81,
    renewalPrice: 360000,
    isAutoRenew: false,
  },
];

export function ClientRenewalsView(): React.JSX.Element {
  const [items, setItems] = React.useState<RenewalItem[]>(MOCK_RENEWAL_ITEMS);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả dịch vụ', count: items.length },
    {
      id: 'urgent',
      label: 'Hết hạn dưới 30 ngày',
      count: items.filter((i) => i.daysRemaining <= 30).length,
    },
  ];

  const handleToggle = (id: string, current: boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAutoRenew: !current } : item))
    );
    toast.success(`Đã ${!current ? 'bật' : 'tắt'} tự động trích tiền ví gia hạn dịch vụ!`);
  };

  const columns: ColumnDefinition<RenewalItem>[] = [
    {
      key: 'service',
      header: 'DỊCH VỤ / TÊN MIỀN',
      width: '32%',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.serviceName}</p>
          <p className="text-xs text-slate-400">Loại: {row.type}</p>
        </div>
      ),
    },
    {
      key: 'expiration',
      header: 'HẠN DỊCH VỤ',
      width: '24%',
      render: (row) => (
        <div>
          <p className="text-xs font-bold text-slate-800">{row.expirationDate}</p>
          <p
            className={`text-[11px] font-semibold ${row.daysRemaining <= 30 ? 'text-status-warning' : 'text-slate-400'}`}
          >
            Còn {row.daysRemaining} ngày
          </p>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'PHÍ GIA HẠN / 12T',
      width: '18%',
      render: (row) => (
        <span className="font-black text-slate-900">{formatVND(row.renewalPrice)}</span>
      ),
    },
    {
      key: 'autoRenew',
      header: 'TỰ GIA HẠN VÍ',
      width: '14%',
      render: (row) => (
        <Switch
          checked={row.isAutoRenew}
          onCheckedChange={() => handleToggle(row.id, row.isAutoRenew)}
        />
      ),
    },
    {
      key: 'actions',
      header: 'THAO TÁC',
      width: '12%',
      className: 'text-right',
      render: () => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => toast.success('Đã chuyển dịch vụ vào giỏ hàng gia hạn!')}
          className="bg-primary text-xs font-bold hover:bg-primary-hover"
        >
          Gia hạn ngay
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="QUẢN LÝ VÒNG ĐỜI DỊCH VỤ"
        title="Gia Hạn Dịch Vụ & Tránh Gián Đoạn"
        searchPlaceholder="Tìm dịch vụ..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <DataTable columns={columns} data={items} keyExtractor={(row) => row.id} />
    </div>
  );
}
