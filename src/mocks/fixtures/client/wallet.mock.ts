import { TransactionRecord, WalletBalance } from '@/types';

export const MOCK_CLIENT_WALLET_BALANCE: WalletBalance = {
  currentBalance: 5000000,
  currency: 'VND',
  totalDeposited: 25000000,
  totalSpent: 20000000,
};

export const MOCK_CLIENT_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx-01',
    transactionCode: 'GD-2026-9041',
    type: 'deposit',
    amount: 5000000,
    balanceAfter: 5000000,
    description: 'Nạp tiền vào ví qua cổng thanh toán VNPay QR',
    status: 'success',
    createdAt: '2026-05-20T08:15:00Z',
  },
  {
    id: 'tx-02',
    transactionCode: 'GD-2026-8920',
    type: 'payment',
    amount: -861300,
    balanceAfter: 0,
    description: 'Thanh toán đơn hàng DH-2026-0892 (Tên miền tencongty.net + Addons)',
    status: 'success',
    createdAt: '2026-05-19T14:30:00Z',
  },
  {
    id: 'tx-03',
    transactionCode: 'GD-2026-8711',
    type: 'deposit',
    amount: 2000000,
    balanceAfter: 861300,
    description: 'Nạp tiền tài khoản từ ngân hàng Vietcombank',
    status: 'success',
    createdAt: '2026-05-18T10:00:00Z',
  },
];
