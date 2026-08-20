/**
 * @file DomainListView.tsx
 * @description Admin Domain TLD Catalog View (Matches Figma Admin Domain List Screen)
 */
import * as React from 'react';
import { Plus, Search, Eye } from 'lucide-react';
import { DomainTld } from '@/types';
import { Button, Input, Badge, DataTable, ColumnDefinition } from '@/components/common';
import { formatVND } from '@/utils';

export interface DomainListViewProps {
  tlds: DomainTld[];
  onAddDomain: () => void;
}

export function DomainListView({ tlds, onAddDomain }: DomainListViewProps): React.JSX.Element {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'active' | 'inactive'>('all');
  const [searchKeyword, setSearchKeyword] = React.useState<string>('');

  const filteredTlds = React.useMemo(() => {
    return tlds.filter((item) => {
      const matchFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'active'
            ? item.status === 'active'
            : item.status === 'inactive';

      const matchSearch =
        item.tld.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.managingAuthority.toLowerCase().includes(searchKeyword.toLowerCase());

      return matchFilter && matchSearch;
    });
  }, [tlds, activeFilter, searchKeyword]);

  const columns: ColumnDefinition<DomainTld>[] = [
    {
      key: 'tld',
      header: 'ĐUÔI TLD',
      width: '12%',
      render: (item) => <span className="font-bold text-slate-900">{item.tld}</span>,
    },
    {
      key: 'fullName',
      header: 'TÊN GỌI ĐUÔI TÊN MIỀN',
      width: '24%',
      render: (item) => <span className="font-semibold text-slate-800">{item.fullName}</span>,
    },
    {
      key: 'authority',
      header: 'CƠ QUAN QUẢN LÝ / ĐỐI TÁC',
      width: '24%',
      render: (item) => <span className="text-xs text-slate-600">{item.managingAuthority}</span>,
    },
    {
      key: 'price',
      header: 'GIÁ BÁN LẺ NĂM ĐẦU',
      width: '15%',
      render: (item) => (
        <span className="font-bold text-slate-900">{formatVND(item.firstYearRetailPrice)}</span>
      ),
    },
    {
      key: 'yearTiers',
      header: 'CÁC MỨC SỐ NĂM',
      width: '12%',
      render: (item) => (
        <span className="text-xs text-slate-600">{item.yearTiersCount} Mức năm</span>
      ),
    },
    {
      key: 'bundle',
      header: 'DỊCH VỤ KÈM',
      width: '10%',
      render: (item) => (
        <span className="text-xs text-slate-600">{item.bundleServicesCount} Dịch vụ</span>
      ),
    },
    {
      key: 'ekyc',
      header: 'EKYC VNNIC',
      width: '12%',
      render: (item) => (
        <Badge variant={item.ekycRequirement === 'mandatory' ? 'mandatory' : 'neutral'}>
          {item.ekycRequirement === 'mandatory' ? 'Bắt buộc' : 'Không'}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '14%',
      render: (item) => (
        <Badge variant={item.status === 'active' ? 'active' : 'warning'}>
          {item.status === 'active' ? 'HOẠT ĐỘNG' : 'TẠM DỪNG'}
        </Badge>
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
          className="gap-1 border-slate-200 text-xs hover:border-primary hover:text-primary"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Cấu hình</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            QUẢN TRỊ TÊN MIỀN
          </p>
          <h1 className="mt-0.5 text-2xl font-black tracking-tight text-slate-900">
            Danh mục tên miền hệ thống
          </h1>
        </div>
        <Button
          variant="primary"
          onClick={onAddDomain}
          className="gap-2 bg-slate-900 hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          <span>Thêm tên miền</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-80">
          <Input
            placeholder="Tìm domain hoặc khách hàng..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            prefixIcon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex rounded-xl border border-surface-border bg-white p-1 shadow-sm">
          <button
            onClick={() => setActiveFilter('all')}
            type="button"
            className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            type="button"
            className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeFilter === 'active'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hoạt động
          </button>
          <button
            onClick={() => setActiveFilter('inactive')}
            type="button"
            className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeFilter === 'inactive'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ngừng hoạt động
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={filteredTlds} keyExtractor={(item) => item.id} />
    </div>
  );
}
