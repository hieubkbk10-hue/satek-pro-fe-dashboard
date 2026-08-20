/**
 * @file hosting.types.ts
 * @description Master Type Contracts for Hosting Domain
 */

import { BaseApiResponse, PaginationParams } from './common.types';

export type HostingStatus = 'active' | 'inactive' | 'pending' | 'error';
export type SyncStatus = 'synced' | 'pending' | 'failed';
export type HostingRegion = 'VN-HCM' | 'SG-SIN' | 'US-WEST';

export interface HostingSpecs {
  cpuCores: number;
  ramGigabytes: number;
  ssdGigabytes: number;
  sslIncluded: boolean;
  bandwidth: string;
}

export interface HostingPackage {
  id: string;
  code: string;
  name: string;
  provider: string;
  providerCode: string;
  price12Months: number;
  originalPrice: number;
  specs: HostingSpecs;
  status: HostingStatus;
  syncStatus: SyncStatus;
  createdAt: string;
  updatedAt: string;

  // UI Optional Fields (Rule TYP003)
  isSelected?: boolean;
  isProcessing?: boolean;
}

export interface ClientHostingInstance {
  id: string;
  domainName: string;
  companyName: string;
  packagePlan: string;
  region: HostingRegion;
  cpuUsagePercentage: number;
  ramUsagePercentage: number;
  status: 'active' | 'needs_review' | 'expired';
  backupStatus: string;
  lastBackupAt: string;
}

export interface HostingQueryParams extends PaginationParams {
  status?: HostingStatus;
  syncStatus?: SyncStatus;
  provider?: string;
}

export type HostingListResponse = BaseApiResponse<HostingPackage[]>;
export type ClientHostingListResponse = BaseApiResponse<ClientHostingInstance[]>;
