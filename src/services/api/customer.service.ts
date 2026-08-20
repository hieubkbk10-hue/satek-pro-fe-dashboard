/**
 * @file customer.service.ts
 * @description Domain Service for Customer Accounts & VNNIC eKYC Verification
 */
import { CustomerAccount } from '@/types';
import { MOCK_ADMIN_CUSTOMERS } from '@/mocks';
import { simulateApiCall, ApiResponse } from './client';

let inMemoryCustomers: CustomerAccount[] = [...MOCK_ADMIN_CUSTOMERS];

export const customerService = {
  async fetchCustomers(): Promise<ApiResponse<CustomerAccount[]>> {
    return simulateApiCall(() => inMemoryCustomers);
  },

  async verifyEkyc(customerId: string): Promise<ApiResponse<CustomerAccount>> {
    return simulateApiCall(() => {
      const idx = inMemoryCustomers.findIndex((c) => c.id === customerId);
      if (idx === -1) throw new Error('Customer not found');

      const updated: CustomerAccount = {
        ...inMemoryCustomers[idx],
        ekycStatus: 'verified',
      };
      inMemoryCustomers[idx] = updated;
      return updated;
    }, 250);
  },
};
