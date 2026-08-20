/**
 * @file hosting.service.ts
 * @description Domain Service for Hosting Packages & Specs Configuration
 */
import { HostingPackage, HostingSpecs } from '@/types';
import { MOCK_ADMIN_HOSTING_PACKAGES } from '@/mocks';
import { simulateApiCall, ApiResponse } from './client';

let inMemoryHostingList = [...MOCK_ADMIN_HOSTING_PACKAGES];

export const hostingService = {
  async fetchPackages(): Promise<ApiResponse<HostingPackage[]>> {
    return simulateApiCall(() => inMemoryHostingList);
  },

  async fetchPackageById(id: string): Promise<ApiResponse<HostingPackage | undefined>> {
    return simulateApiCall(() => inMemoryHostingList.find((p) => p.id === id));
  },

  async updateSpecs(
    id: string,
    specs: HostingSpecs,
    price12Months: number
  ): Promise<ApiResponse<HostingPackage>> {
    return simulateApiCall(() => {
      const idx = inMemoryHostingList.findIndex((p) => p.id === id);
      if (idx === -1) {
        throw new Error(`Hosting package with id ${id} not found`);
      }
      const updated: HostingPackage = {
        ...inMemoryHostingList[idx],
        specs,
        price12Months,
        updatedAt: new Date().toISOString(),
      };
      inMemoryHostingList[idx] = updated;
      return updated;
    }, 300);
  },
};
