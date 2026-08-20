/**
 * @file OrderManagementView.tsx
 * @description Admin Orders, Auto Renewals & Refunds Management View with Query Hook
 */
import * as React from 'react';
import { Eye, FileText } from 'lucide-react';
import { OrderRecord } from '@/types';
import { useOrdersQuery } from '@/hooks';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import {
  DataTable,
  ColumnDefinition,
  Badge,
  Button,
  AppDialog,
  TabsBar,
} from '@/components/common';
import { formatVND } from '@/utils';
import { toast } from 'sonner';

export function OrderManagementView(): React.JSX.Element {
  const { data: queriedOrders, isLoading } = useOrdersQuery();
  const orders: OrderRecord[] = queriedOrders || [];

  const [activeTab, setActiveTab] = React.useState<string>('orders');
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [selectedOrder, setSelectedOrder] = React.useState<OrderRecord | null>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState<boolean>(false);

  const tabs = [
    { id: 'orders', label: 'Tất cả đơn hàng', count: orders.length },
    { id: 'renewals', label: 'Gia hạn tự động', count: 2 },
    { id: 'refunds', label: 'Yêu cầu hoàn tiền', count: 0 },
  ];

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả trạng thái', count: orders.length },
    {
      id: 'completed',
      label: 'Đã hoàn thành',
      count: orders.filter((o) => o.status === 'completed').length,
    },
    {
      id: 'pending',
      label: 'Chờ thanh toán',
      count: orders.filter((o) => o.status === 'pending').length,
    },
  ];

  const filteredOrders = React.useMemo(() => {
    return orders.filter((o) => {
      const matchFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'completed'
            ? o.status === 'completed'
            : o.status === 'pending';
      const matchSearch =
        o.orderCode.toLowerCase().includes(searchValue.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(searchValue.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [orders, activeFilter, searchValue]);

  const handleOpenDetail = (order: OrderRecord) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const columns: ColumnDefinition<OrderRecord>[] = [
    {
      key: 'orderCode',
      header: 'MÃ ĐƠN HÀNG',
      width: '20%',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.orderCode}</p>
          <p className="text-[11px] text-slate-400">PT: {row.paymentMethod}</p>
        </div>
      ),
    },
    {
      key: 'customer',
      header: 'KHÁCH HÀNG / EMAIL',
      width: '32%',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800">{row.customerName}</p>
          <p className="text-xs text-slate-400">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'totalAmount',
      header: 'TỔNG THANH TOÁN',
      width: '18%',
      render: (row) => (
        <span className="font-black text-slate-900">{formatVND(row.totalAmount)}</span>
      ),
    },
    {
      key: 'paymentStatus',
      header: 'THANH TOÁN',
      width: '15%',
      render: (row) => (
        <Badge variant={row.paymentStatus === 'paid' ? 'active' : 'warning'}>
          {row.paymentStatus === 'paid' ? 'ĐÃ TRẢ' : 'CHƯA TRẢ'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'THAO TÁC',
      width: '15%',
      className: 'text-right',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleOpenDetail(row)}
          className="cursor-pointer gap-1 border-slate-200 text-xs hover:border-primary hover:text-primary"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Chi tiết</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="QUẢN LÝ BÁN HÀNG"
        title="Quản Lý Đơn Hàng & Gia Hạn"
        searchPlaceholder="Tìm mã đơn, tên khách hàng..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Tạo Đơn Hàng"
        onPrimaryAction={() => toast.info('Chức năng tạo đơn hàng thủ công')}
      />

      <TabsBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <DataTable
        columns={columns}
        data={filteredOrders}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
      />

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <AppDialog
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          title={`Chi Tiết Đơn Hàng #${selectedOrder.orderCode}`}
          description={`Ngày tạo: ${selectedOrder.createdAt} · Phương thức: ${selectedOrder.paymentMethod}`}
          maxWidthClass="max-w-xl"
        >
          <div className="space-y-4">
            <div className="rounded-xl border border-surface-border bg-slate-50 p-4">
              <div className="flex items-center justify-between border-b border-surface-border pb-2">
                <span className="text-xs text-slate-500">Khách hàng:</span>
                <span className="text-xs font-bold text-slate-900">
                  {selectedOrder.customerName}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-surface-border py-2">
                <span className="text-xs text-slate-500">Email nhận hóa đơn:</span>
                <span className="text-xs font-medium text-slate-700">
                  {selectedOrder.customerEmail}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-800">Tổng tiền đã thanh toán:</span>
                <span className="text-base font-black text-primary">
                  {formatVND(selectedOrder.totalAmount)}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 border-t border-surface-border pt-3">
              <Button variant="outline" size="sm" onClick={() => setIsDetailOpen(false)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsDetailOpen(false);
                  toast.success('Đã gửi lại email xác nhận đơn hàng!');
                }}
                className="cursor-pointer gap-1.5 font-bold"
              >
                <FileText className="h-4 w-4" />
                Xuất Hóa Đơn VAT
              </Button>
            </div>
          </div>
        </AppDialog>
      )}
    </div>
  );
}
