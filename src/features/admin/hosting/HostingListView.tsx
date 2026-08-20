/**
 * @file HostingListView.tsx
 * @description Admin Hosting Packages Table View with Shimmer Loading
 */
import * as React from 'react';
import { Sliders, Server } from 'lucide-react';
import { HostingPackage } from '@/types';
import { useHostingPackagesQuery } from '@/hooks';
import { Button, Badge, DataTable, ColumnDefinition } from '@/components/common';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { formatVND } from '@/utils';

export interface HostingListViewProps {
  packages?: HostingPackage[];
  onEditSpecs: (pkg: HostingPackage) => void;
  onAddPackage: () => void;
}

export function HostingListView({
  packages: propsPackages,
  onEditSpecs,
  onAddPackage,
}: HostingListViewProps): React.JSX.Element {
  const { data: queriedPackages, isLoading } = useHostingPackagesQuery();
  const packages = propsPackages || queriedPackages || [];

  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả gói', count: packages.length },
    {
      id: 'active',
      label: 'Đang hoạt động',
      count: packages.filter((p) => p.status === 'active').length,
    },
    {
      id: 'inactive',
      label: 'Tạm ngưng',
      count: packages.filter((p) => p.status === 'inactive').length,
    },
  ];

  const filteredPackages = React.useMemo(() => {
    return packages.filter((pkg) => {
      const matchFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'active'
            ? pkg.status === 'active'
            : pkg.status === 'inactive';
      const matchSearch =
        pkg.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        pkg.code.toLowerCase().includes(searchValue.toLowerCase()) ||
        pkg.provider.toLowerCase().includes(searchValue.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [packages, activeFilter, searchValue]);

  const columns: ColumnDefinition<HostingPackage>[] = [
    {
      key: 'code',
      header: 'MÃ GÓI (CODE)',
      width: '18%',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900">{row.code}</span>
          <p className="text-xs text-slate-400">NCC: {row.provider}</p>
        </div>
      ),
    },
    {
      key: 'name',
      header: 'TÊN GÓI DỊCH VỤ',
      width: '24%',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <Server className="h-4 w-4 flex-shrink-0 text-primary" />
          <span className="font-semibold text-slate-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: 'specs',
      header: 'THÔNG SỐ SPECS',
      width: '24%',
      render: (row) => (
        <div className="space-y-0.5 text-xs text-slate-600">
          <p>
            <strong>{row.specs.cpuCores} Core</strong> CPU ·{' '}
            <strong>{row.specs.ramGigabytes} GB</strong> RAM
          </p>
          <p className="text-slate-400">
            {row.specs.ssdGigabytes} GB SSD · {row.specs.sslIncluded ? 'SSL Free' : 'Không SSL'}
          </p>
        </div>
      ),
    },
    {
      key: 'pricing',
      header: 'GIÁ NIÊM YẾT',
      width: '16%',
      render: (row) => (
        <div>
          <span className="font-black text-slate-900">{formatVND(row.price12Months)}</span>
          <span className="text-[11px] text-slate-400"> / 12 tháng</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '10%',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'active' : 'warning'}>
          {row.status === 'active' ? 'HOẠT ĐỘNG' : 'TẠM NGƯNG'}
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
          onClick={() => onEditSpecs(row)}
          className="cursor-pointer gap-1.5 border-slate-200 text-xs font-semibold hover:border-primary hover:text-primary"
        >
          <Sliders className="h-3.5 w-3.5" />
          <span>Sửa Specs</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="SẢN PHẨM & DỊCH VỤ"
        title="Quản Lý Gói Hosting P.A Việt Nam"
        searchPlaceholder="Tìm kiếm theo mã SKU, tên gói..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Tạo Gói Mới"
        onPrimaryAction={onAddPackage}
      />

      <DataTable
        columns={columns}
        data={filteredPackages}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
      />
    </div>
  );
}
