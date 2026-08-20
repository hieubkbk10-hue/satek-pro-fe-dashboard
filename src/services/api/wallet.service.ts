/**
 * @file wallet.service.ts
 * @description Domain Service for Satek Pay Wallet & Balance Operations
 */
import { WalletBalance, TransactionRecord } from '@/types';
import { MOCK_CLIENT_WALLET_BALANCE, MOCK_CLIENT_TRANSACTIONS } from '@/mocks';
import { simulateApiCall, ApiResponse } from './client';

let inMemoryBalance: WalletBalance = { ...MOCK_CLIENT_WALLET_BALANCE };
let inMemoryTransactions: TransactionRecord[] = [...MOCK_CLIENT_TRANSACTIONS];

export const walletService = {
  async fetchBalance(): Promise<ApiResponse<WalletBalance>> {
    return simulateApiCall(() => inMemoryBalance);
  },

  async fetchTransactions(): Promise<ApiResponse<TransactionRecord[]>> {
    return simulateApiCall(() => inMemoryTransactions);
  },

  async deposit(
    amount: number
  ): Promise<ApiResponse<{ balance: WalletBalance; transaction: TransactionRecord }>> {
    return simulateApiCall(() => {
      const newBalanceAmount = inMemoryBalance.currentBalance + amount;
      inMemoryBalance = {
        ...inMemoryBalance,
        currentBalance: newBalanceAmount,
        totalDeposited: inMemoryBalance.totalDeposited + amount,
      };

      const newTx: TransactionRecord = {
        id: `tx-${Date.now()}`,
        transactionCode: `GD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        type: 'deposit',
        amount,
        balanceAfter: newBalanceAmount,
        description: `Nạp tiền vào ví qua cổng thanh toán QR (${amount.toLocaleString('vi-VN')} đ)`,
        status: 'success',
        createdAt: new Date().toISOString(),
      };

      inMemoryTransactions = [newTx, ...inMemoryTransactions];
      return { balance: inMemoryBalance, transaction: newTx };
    }, 300);
  },
};
