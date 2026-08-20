/**
 * @file wallet.types.ts
 * @description Master Type Contracts for Client Wallet & Finance
 */

export interface WalletBalance {
  currentBalance: number;
  currency: 'VND';
  totalDeposited: number;
  totalSpent: number;
}

export interface TransactionRecord {
  id: string;
  transactionCode: string;
  type: 'deposit' | 'payment' | 'refund';
  amount: number;
  balanceAfter: number;
  description: string;
  status: 'success' | 'pending' | 'failed';
  createdAt: string;
}
