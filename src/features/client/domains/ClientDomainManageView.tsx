/**
 * @file ClientDomainManageView.tsx
 * @description Client Domain Names, DNS Records & Security Management View with Mutation Hook
 */
import * as React from 'react';
import { Globe, ShieldCheck, Lock } from 'lucide-react';
import { useClientDomainsQuery, useToggleDomainAutoRenewMutation } from '@/hooks';
import { DataTable, ColumnDefinition, Button, Switch } from '@/components/common';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { ClientDomainData } from '@/services';
import { toast } from 'sonner';

export function ClientDomainManageView(): React.JSX.Element {
  const { data: queriedDomains, isLoading } = useClientDomainsQuery();
  const toggleMutation = useToggleDomainAutoRenewMutation();

  const domains: ClientDomainData[] = queriedDomains || [];
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả tên miền', count: domains.length },
    {
      id: 'active',
      label: 'Đang hoạt động',
      count: domains.filter((d) => d.status === 'active').length,
    },
    {
      id: 'expiring',
      label: 'Sắp hết hạn (30 ngày)',
      count: domains.filter((d) => d.status === 'expiring_soon').length,
    },
  ];

  const filteredDomains = React.useMemo(() => {
    return domains.filter((d) => {
      const matchFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'active'
            ? d.status === 'active'
            : d.status === 'expiring_soon';
      const matchSearch = d.domainName.toLowerCase().includes(searchValue.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [domains, activeFilter, searchValue]);

  const handleToggleAutoRenew = (domainId: string, currentVal: boolean) => {
    toggleMutation.mutate({ id: domainId, isAutoRenew: !currentVal });
  };

  const columns: ColumnDefinition<ClientDomainData>[] = [
    {
      key: 'domainName',
      header: 'TÊN MIỀN',
      width: '28%',
      render: (row) => (
        <div className="flex items-center space-x-2.5">
          <Globe className="h-4 w-4 flex-shrink-0 text-primary" />
          <div>
            <p className="font-bold text-slate-900">{row.domainName}</p>
            <p className="text-xs text-slate-400">Đơn vị: {row.registrar}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'security',
      header: 'BẢO MẬT KHÓA',
      width: '22%',
      render: (row) => (
        <div className="flex items-center space-x-2">
          {row.isDnssecEnabled && (
            <span className="flex items-center space-x-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              <ShieldCheck className="h-3 w-3" />
              <span>DNSSEC</span>
            </span>
          )}
          {row.isRegistryLocked && (
            <span className="flex items-center space-x-1 rounded-full border border-primary/20 bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              <Lock className="h-3 w-3" />
              <span>Khóa Registry</span>
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'expiresAt',
      header: 'HẠN DỊCH VỤ',
      width: '18%',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-700">{row.expiresAt}</span>
      ),
    },
    {
      key: 'autoRenew',
      header: 'TỰ GIA HẠN',
      width: '18%',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <Switch
            checked={row.isAutoRenew}
            onCheckedChange={() => handleToggleAutoRenew(row.id, row.isAutoRenew)}
          />
          <span className="text-xs text-slate-500">{row.isAutoRenew ? 'Bật' : 'Tắt'}</span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'THAO TÁC',
      width: '14%',
      className: 'text-right',
      render: () => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.info('Mở cấu hình DNS Record')}
          className="cursor-pointer text-xs"
        >
          Quản lý DNS
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="DỊCH VỤ TÊN MIỀN"
        title="Danh Sách Tên Miền Đang Sử Dụng"
        searchPlaceholder="Tìm tên miền..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Đăng Ký Thêm Tên Miền"
        onPrimaryAction={() => toast.info('Chức năng tìm kiếm và đăng ký tên miền mới')}
      />

      <DataTable
        columns={columns}
        data={filteredDomains}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
      />
    </div>
  );
}
