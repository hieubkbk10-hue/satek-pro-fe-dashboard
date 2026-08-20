/**
 * @file order.service.ts
 * @description Domain Service for Orders, Billing & MISA Sync
 */
import { OrderRecord, MisaReconciliationRecord } from '@/types';
import { MOCK_ADMIN_ORDERS, MOCK_MISA_RECONCILIATION_LIST } from '@/mocks';
import { simulateApiCall, ApiResponse } from './client';

let inMemoryOrders: OrderRecord[] = [...MOCK_ADMIN_ORDERS];
let inMemoryMisa: MisaReconciliationRecord[] = [...MOCK_MISA_RECONCILIATION_LIST];

export const orderService = {
  async fetchOrders(): Promise<ApiResponse<OrderRecord[]>> {
    return simulateApiCall(() => inMemoryOrders);
  },

  async fetchMisaRecords(): Promise<ApiResponse<MisaReconciliationRecord[]>> {
    return simulateApiCall(() => inMemoryMisa);
  },

  async syncAllMisa(): Promise<ApiResponse<MisaReconciliationRecord[]>> {
    return simulateApiCall(() => {
      inMemoryMisa = inMemoryMisa.map((rec) => ({
        ...rec,
        misaSyncStatus: 'synced' as const,
        misaVoucherNumber:
          rec.misaVoucherNumber || `CT-2026-05-${Math.floor(1000 + Math.random() * 9000)}`,
      }));
      return inMemoryMisa;
    }, 400);
  },
};
