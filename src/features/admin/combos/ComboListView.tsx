/**
 * @file ComboListView.tsx
 * @description Admin Combo Packages Management Table View (Matches Figma Admin Combos)
 */
import * as React from 'react';
import { Eye, Check, Tag } from 'lucide-react';
import { ComboPackage } from '@/types';
import { MOCK_ADMIN_COMBOS } from '@/mocks';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { DataTable, ColumnDefinition, Badge, Button, AppDialog } from '@/components/common';
import { formatVND } from '@/utils';
import { toast } from 'sonner';

export function ComboListView(): React.JSX.Element {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [combos] = React.useState<ComboPackage[]>(MOCK_ADMIN_COMBOS);
  const [selectedCombo, setSelectedCombo] = React.useState<ComboPackage | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState<boolean>(false);

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả Combo', count: combos.length },
    {
      id: 'active',
      label: 'Đang mở bán',
      count: combos.filter((c) => c.status === 'active').length,
    },
    {
      id: 'inactive',
      label: 'Tạm dừng',
      count: combos.filter((c) => c.status === 'inactive').length,
    },
  ];

  const filteredCombos = React.useMemo(() => {
    return combos.filter((c) => {
      const matchFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'active'
            ? c.status === 'active'
            : c.status === 'inactive';
      const matchSearch =
        c.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        c.code.toLowerCase().includes(searchValue.toLowerCase()) ||
        c.description.toLowerCase().includes(searchValue.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [combos, activeFilter, searchValue]);

  const handleOpenDetail = (combo: ComboPackage) => {
    setSelectedCombo(combo);
    setIsDetailModalOpen(true);
  };

  const columns: ColumnDefinition<ComboPackage>[] = [
    {
      key: 'name',
      header: 'TÊN GÓI COMBO',
      width: '28%',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.name}</p>
          <p className="text-xs font-medium text-slate-400">Mã: {row.code}</p>
        </div>
      ),
    },
    {
      key: 'description',
      header: 'MÔ TẢ CHI TIẾT',
      width: '32%',
      render: (row) => (
        <span className="line-clamp-2 text-xs text-slate-600">{row.description}</span>
      ),
    },
    {
      key: 'pricing',
      header: 'GIÁ BÁN GÓI',
      width: '18%',
      render: (row) => (
        <div>
          <p className="font-black text-primary">{formatVND(row.price12Months)}</p>
          <div className="flex items-center space-x-1 text-[11px]">
            <span className="text-slate-400 line-through">{formatVND(row.originalPrice)}</span>
            <span className="font-bold text-emerald-600">(-{row.discountPercentage}%)</span>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '12%',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'active' : 'warning'}>
          {row.status === 'active' ? 'ĐANG BÁN' : 'TẠM DỪNG'}
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
          onClick={() => handleOpenDetail(row)}
          className="gap-1 border-slate-200 text-xs hover:border-primary hover:text-primary"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Xem</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="BÁN HÀNG & GÓI DỊCH VỤ"
        title="Quản Lý Combo Gói Dịch Vụ"
        searchPlaceholder="Tìm mã combo, tên gói dịch vụ..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Tạo Combo Mới"
        onPrimaryAction={() => toast.info('Chức năng tạo combo gói dịch vụ mới')}
      />

      <DataTable columns={columns} data={filteredCombos} keyExtractor={(row) => row.id} />

      {/* Combo Detail Dialog */}
      {selectedCombo && (
        <AppDialog
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
          title={selectedCombo.name}
          description={`Mã gói: ${selectedCombo.code} · ${selectedCombo.targetAudience}`}
          maxWidthClass="max-w-xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50/50 p-4">
              <div>
                <p className="text-xs text-slate-500">Giá bán trọn gói 12 tháng</p>
                <p className="mt-0.5 text-xl font-black text-primary">
                  {formatVND(selectedCombo.price12Months)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 line-through">
                  {formatVND(selectedCombo.originalPrice)}
                </p>
                <Badge variant="active" className="mt-1 font-bold">
                  Tiết kiệm {selectedCombo.discountPercentage}%
                </Badge>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                Các dịch vụ bao gồm trong Combo:
              </p>
              <div className="space-y-2">
                {selectedCombo.includedServices.map((svc: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2.5 rounded-lg bg-slate-50 p-2.5 text-xs font-medium text-slate-700"
                  >
                    <Check className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                    <span>{svc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 border-t border-surface-border pt-3">
              <Button variant="outline" size="sm" onClick={() => setIsDetailModalOpen(false)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsDetailModalOpen(false);
                  toast.success('Đã lưu cấu hình combo!');
                }}
              >
                <Tag className="mr-1.5 h-3.5 w-3.5" />
                Cập nhật gói
              </Button>
            </div>
          </div>
        </AppDialog>
      )}
    </div>
  );
}
