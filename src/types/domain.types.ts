/**
 * @file domain.types.ts
 * @description Master Type Contracts for Domain Catalog and Registration
 */

import { BaseApiResponse, PaginationParams } from './common.types';

export type DomainStatus = 'active' | 'inactive' | 'pending';
export type EkycRequirement = 'mandatory' | 'none';

export interface DomainTld {
  id: string;
  tld: string; // e.g. '.vn', '.com'
  fullName: string; // e.g. 'Tên Miền Quốc Gia Việt Nam .VN'
  managingAuthority: string; // e.g. 'VNNIC (Trung tâm Internet Việt Nam)'
  firstYearRetailPrice: number;
  yearTiersCount: number;
  bundleServicesCount: number;
  ekycRequirement: EkycRequirement;
  status: DomainStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DomainQueryParams extends PaginationParams {
  tld?: string;
  status?: DomainStatus;
  ekycRequirement?: EkycRequirement;
}

export type DomainListResponse = BaseApiResponse<DomainTld[]>;
