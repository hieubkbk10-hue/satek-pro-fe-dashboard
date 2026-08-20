/**
 * @file ClientOrderHistoryView.tsx
 * @description Client Order History & Payment Invoices View
 */
import * as React from 'react';
import { FileText, Download } from 'lucide-react';
import { OrderRecord } from '@/types';
import { MOCK_ADMIN_ORDERS } from '@/mocks';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { DataTable, ColumnDefinition, Badge, Button, AppDialog } from '@/components/common';
import { formatVND } from '@/utils';
import { toast } from 'sonner';

export function ClientOrderHistoryView(): React.JSX.Element {
  const [orders] = React.useState<OrderRecord[]>(MOCK_ADMIN_ORDERS.slice(0, 2));
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [selectedOrder, setSelectedOrder] = React.useState<OrderRecord | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = React.useState<boolean>(false);

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả đơn hàng', count: orders.length },
    {
      id: 'paid',
      label: 'Đã thanh toán',
      count: orders.filter((o) => o.paymentStatus === 'paid').length,
    },
  ];

  const handleOpenReceipt = (order: OrderRecord) => {
    setSelectedOrder(order);
    setIsReceiptOpen(true);
  };

  const columns: ColumnDefinition<OrderRecord>[] = [
    {
      key: 'orderCode',
      header: 'MÃ ĐƠN HÀNG',
      width: '25%',
      render: (row) => <span className="font-bold text-slate-900">{row.orderCode}</span>,
    },
    {
      key: 'createdAt',
      header: 'NGÀY MUA',
      width: '20%',
      render: (row) => <span className="text-xs text-slate-600">{row.createdAt.slice(0, 10)}</span>,
    },
    {
      key: 'totalAmount',
      header: 'SỐ TIỀN',
      width: '20%',
      render: (row) => (
        <span className="font-black text-slate-900">{formatVND(row.totalAmount)}</span>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '20%',
      render: (row) => (
        <Badge variant={row.paymentStatus === 'paid' ? 'active' : 'warning'}>
          {row.paymentStatus === 'paid' ? 'ĐÃ THANH TOÁN' : 'CHỜ THANH TOÁN'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'HÓA ĐƠN',
      width: '15%',
      className: 'text-right',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleOpenReceipt(row)}
          className="gap-1 text-xs"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Biên lai</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="LỊCH SỬ GIAO DỊCH"
        title="Đơn Hàng & Hóa Đơn Điện Tử"
        searchPlaceholder="Tìm mã đơn hàng..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <DataTable columns={columns} data={orders} keyExtractor={(row) => row.id} />

      {/* Receipt Modal */}
      {selectedOrder && (
        <AppDialog
          open={isReceiptOpen}
          onOpenChange={setIsReceiptOpen}
          title={`Biên Lai Thanh Toán #${selectedOrder.orderCode}`}
          description="Hóa đơn điện tử GTGT được xác thực bởi Tổng cục Thuế và P.A Việt Nam"
          maxWidthClass="max-w-md"
        >
          <div className="space-y-4">
            <div className="rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4 text-center">
              <p className="text-xs font-medium text-slate-500">Tổng tiền đã thanh toán</p>
              <p className="mt-0.5 text-2xl font-black text-primary">
                {formatVND(selectedOrder.totalAmount)}
              </p>
              <p className="mt-1 text-[11px] font-bold text-emerald-700">
                ✓ Đã thanh toán qua Ví Satek Pay
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between border-b border-surface-border py-1.5">
                <span>Khách hàng:</span>
                <span className="font-bold text-slate-900">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-surface-border py-1.5">
                <span>Mã tra cứu hóa đơn:</span>
                <span className="font-bold text-slate-900">HD-2026-00342</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 border-t border-surface-border pt-3">
              <Button variant="outline" size="sm" onClick={() => setIsReceiptOpen(false)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsReceiptOpen(false);
                  toast.success('Đang tải file PDF hóa đơn điện tử...');
                }}
                className="gap-1.5 font-bold"
              >
                <Download className="h-4 w-4" />
                Tải Hóa Đơn PDF
              </Button>
            </div>
          </div>
        </AppDialog>
      )}
    </div>
  );
}
