/**
 * @file ClientWalletView.tsx
 * @description Client Satek Pay Wallet View with TanStack Query and Deposit Mutation
 */
import * as React from 'react';
import { QrCode, ArrowDownRight, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TransactionRecord, WalletBalance } from '@/types';
import {
  useWalletBalanceQuery,
  useWalletTransactionsQuery,
  useDepositWalletMutation,
} from '@/hooks';
import { DataTable, ColumnDefinition, Badge, Button, AppDialog } from '@/components/common';
import { formatVND } from '@/utils';

export function ClientWalletView(): React.JSX.Element {
  const { data: balanceData, isLoading: isBalanceLoading } = useWalletBalanceQuery();
  const { data: txData, isLoading: isTxLoading } = useWalletTransactionsQuery();
  const depositMutation = useDepositWalletMutation();

  const balance: WalletBalance = balanceData || {
    currentBalance: 5000000,
    currency: 'VND',
    totalDeposited: 25000000,
    totalSpent: 20000000,
  };

  const transactions: TransactionRecord[] = txData || [];

  const [isDepositModalOpen, setIsDepositModalOpen] = React.useState<boolean>(false);
  const [depositAmount, setDepositAmount] = React.useState<string>('2000000');

  const handleCreateQr = (e: React.FormEvent) => {
    e.preventDefault();
    depositMutation.mutate(Number(depositAmount), {
      onSuccess: () => {
        setIsDepositModalOpen(false);
      },
    });
  };

  const columns: ColumnDefinition<TransactionRecord>[] = [
    {
      key: 'transactionCode',
      header: 'MÃ GIAO DỊCH',
      width: '20%',
      render: (row) => <span className="font-bold text-slate-900">{row.transactionCode}</span>,
    },
    {
      key: 'description',
      header: 'NỘI DUNG BIẾN ĐỘNG SỐ DƯ',
      width: '38%',
      render: (row) => (
        <div className="flex items-center space-x-2">
          {row.amount > 0 ? (
            <ArrowDownRight className="h-4 w-4 flex-shrink-0 text-emerald-600" />
          ) : (
            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-primary" />
          )}
          <span className="text-xs font-medium text-slate-700">{row.description}</span>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'SỐ TIỀN',
      width: '18%',
      render: (row) => (
        <span className={`font-black ${row.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
          {row.amount > 0 ? `+${formatVND(row.amount)}` : formatVND(row.amount)}
        </span>
      ),
    },
    {
      key: 'balanceAfter',
      header: 'SỐ DƯ CUỐI',
      width: '14%',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-600">{formatVND(row.balanceAfter)}</span>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '10%',
      render: (row) => (
        <Badge variant={row.status === 'success' ? 'active' : 'warning'}>
          {row.status === 'success' ? 'THÀNH CÔNG' : 'CHỜ XỬ LÝ'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Wallet Overview Hero Card */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Balance Box */}
        <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white shadow-xl lg:col-span-2">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
                VÍ SATEK PAY DOANH NGHIỆP
              </span>
              <span className="text-xs text-slate-400">Đơn vị: VNĐ</span>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              SỐ DƯ KHẢ DỤNG
            </p>
            {isBalanceLoading ? (
              <div className="mt-1 h-10 w-48 animate-pulse rounded-lg bg-slate-700" />
            ) : (
              <p className="mt-1 text-4xl font-black tracking-tight text-white">
                {formatVND(balance.currentBalance)}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-700/60 pt-6 sm:flex-row sm:items-center">
            <div className="flex space-x-6 text-xs text-slate-300">
              <div>
                <p className="text-slate-400">Tổng nạp tích lũy</p>
                <p className="mt-0.5 font-bold text-white">{formatVND(balance.totalDeposited)}</p>
              </div>
              <div>
                <p className="text-slate-400">Tổng chi tiêu</p>
                <p className="mt-0.5 font-bold text-white">{formatVND(balance.totalSpent)}</p>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => setIsDepositModalOpen(true)}
              className="cursor-pointer gap-2 self-start bg-primary font-bold shadow-md shadow-primary/20 hover:bg-primary-hover sm:self-auto"
            >
              <QrCode className="h-4 w-4" />
              <span>Nạp Tiền Nhanh QR</span>
            </Button>
          </div>
        </div>

        {/* Security & Benefits Box */}
        <div className="flex flex-col justify-between rounded-2xl border border-surface-border bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900">Ưu Điểm Ví Satek Pay</h3>
            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                <span>Tự động gia hạn tên miền, hosting trước 7 ngày tránh gián đoạn web.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                <span>Nạp tiền tự động 24/7 qua VietQR và VNPay trong &lt; 30 giây.</span>
              </div>
              <div className="flex items-start space-x-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Bảo chứng số dư và xuất hóa đơn điện tử VAT đầy đủ.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Lịch Sử Biến Động Số Dư</h3>
        <DataTable
          columns={columns}
          data={transactions}
          keyExtractor={(row) => row.id}
          isLoading={isTxLoading}
        />
      </div>

      {/* Deposit QR Modal */}
      <AppDialog
        open={isDepositModalOpen}
        onOpenChange={setIsDepositModalOpen}
        title="Nạp Tiền Vào Ví Satek Pay"
        description="Quét mã VietQR chuyển khoản tự động khớp lệnh trong 30 giây"
        maxWidthClass="max-w-md"
      >
        <form onSubmit={handleCreateQr} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">Chọn số tiền nạp (VNĐ):</label>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {['1000000', '2000000', '5000000'].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setDepositAmount(amt)}
                  className={`cursor-pointer rounded-xl border p-2 text-xs font-bold transition-all ${
                    depositAmount === amt
                      ? 'border-primary bg-primary-light text-primary ring-2 ring-primary/20'
                      : 'border-surface-border text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {formatVND(Number(amt))}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-surface-border bg-slate-50 p-6 text-center">
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-2xl border border-surface-border bg-white shadow-sm">
              <QrCode className="h-24 w-24 text-slate-800" />
            </div>
            <p className="mt-3 text-xs font-bold text-slate-800">Vietcombank · STK: 9988223344</p>
            <p className="text-[11px] text-slate-400">Nội dung: SATEK NAP KH88219</p>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDepositModalOpen(false)}
              disabled={depositMutation.isPending}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={depositMutation.isPending}
              className="font-bold"
            >
              Xác nhận đã chuyển khoản
            </Button>
          </div>
        </form>
      </AppDialog>
    </div>
  );
}
