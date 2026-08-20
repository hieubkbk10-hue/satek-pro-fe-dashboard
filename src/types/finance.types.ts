/**
 * @file finance.types.ts
 * @description Master Type Definitions for Finance, Invoices & MISA Accounting Sync
 */

export interface MisaReconciliationRecord {
  id: string;
  invoiceCode: string;
  customerName: string;
  taxCode: string;
  amount: number;
  vatAmount: number;
  misaSyncStatus: 'synced' | 'pending' | 'error';
  misaVoucherNumber?: string;
  createdAt: string;
}

export interface FinanceMetrics {
  totalRevenueMonthly: number;
  growthPercentage: number;
  totalInvoicesIssued: number;
  misaSyncedRatio: string;
  walletTotalFloat: number;
}
