import { MisaReconciliationRecord, FinanceMetrics } from '@/types';

export const MOCK_ADMIN_FINANCE_METRICS: FinanceMetrics = {
  totalRevenueMonthly: 489200000,
  growthPercentage: 18.5,
  totalInvoicesIssued: 342,
  misaSyncedRatio: '340/342',
  walletTotalFloat: 1250000000,
};

export const MOCK_MISA_RECONCILIATION_LIST: MisaReconciliationRecord[] = [
  {
    id: 'misa-01',
    invoiceCode: 'HD-2026-00342',
    customerName: 'Công ty Cổ Phần An Nam',
    taxCode: '0315892110',
    amount: 1861300,
    vatAmount: 169209,
    misaSyncStatus: 'synced',
    misaVoucherNumber: 'CT-2026-05-0012',
    createdAt: '2026-05-20T08:31:00Z',
  },
  {
    id: 'misa-02',
    invoiceCode: 'HD-2026-00341',
    customerName: 'Công ty TNHH Omega Noodles',
    taxCode: '0314981122',
    amount: 3200000,
    vatAmount: 290909,
    misaSyncStatus: 'synced',
    misaVoucherNumber: 'CT-2026-05-0011',
    createdAt: '2026-05-19T14:21:30Z',
  },
  {
    id: 'misa-03',
    invoiceCode: 'HD-2026-00340',
    customerName: 'Hộ Kinh Doanh Lotus Retail',
    taxCode: '8492019283',
    amount: 750000,
    vatAmount: 68181,
    misaSyncStatus: 'pending',
    createdAt: '2026-05-19T11:05:00Z',
  },
  {
    id: 'misa-04',
    invoiceCode: 'HD-2026-00339',
    customerName: 'Công ty CP Xuất Nhập Khẩu Mê Kông',
    taxCode: '0317765544',
    amount: 5400000,
    vatAmount: 490909,
    misaSyncStatus: 'synced',
    misaVoucherNumber: 'CT-2026-05-0010',
    createdAt: '2026-05-18T09:41:00Z',
  },
];
