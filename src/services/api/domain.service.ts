/**
 * @file domain.service.ts
 * @description Domain Service for Domain TLDs & Client Domain Management
 */
import { DomainTld } from '@/types';
import { MOCK_ADMIN_DOMAIN_TLDS } from '@/mocks';
import { simulateApiCall, ApiResponse } from './client';

export interface ClientDomainData {
  id: string;
  domainName: string;
  registrar: string;
  isDnssecEnabled: boolean;
  isRegistryLocked: boolean;
  isAutoRenew: boolean;
  expiresAt: string;
  status: 'active' | 'expiring_soon' | 'expired';
}

let inMemoryClientDomains: ClientDomainData[] = [
  {
    id: 'c-dom-01',
    domainName: 'annam.vn',
    registrar: 'VNNIC / P.A Việt Nam',
    isDnssecEnabled: true,
    isRegistryLocked: true,
    isAutoRenew: true,
    expiresAt: '2027-05-20',
    status: 'active',
  },
  {
    id: 'c-dom-02',
    domainName: 'tencongty.net',
    registrar: 'VeriSign / P.A Việt Nam',
    isDnssecEnabled: true,
    isRegistryLocked: false,
    isAutoRenew: true,
    expiresAt: '2026-06-15',
    status: 'expiring_soon',
  },
];

export const domainService = {
  async fetchDomainTlds(): Promise<ApiResponse<DomainTld[]>> {
    return simulateApiCall(() => MOCK_ADMIN_DOMAIN_TLDS);
  },

  async fetchClientDomains(): Promise<ApiResponse<ClientDomainData[]>> {
    return simulateApiCall(() => inMemoryClientDomains);
  },

  async toggleAutoRenew(
    domainId: string,
    isAutoRenew: boolean
  ): Promise<ApiResponse<ClientDomainData>> {
    return simulateApiCall(() => {
      const idx = inMemoryClientDomains.findIndex((d) => d.id === domainId);
      if (idx === -1) throw new Error('Domain not found');
      inMemoryClientDomains[idx] = { ...inMemoryClientDomains[idx], isAutoRenew };
      return inMemoryClientDomains[idx];
    }, 200);
  },
};
