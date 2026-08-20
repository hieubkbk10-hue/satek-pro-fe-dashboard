/**
 * @file email.types.ts
 * @description Master Type Contracts for Email Workspace
 */

import { BaseApiResponse, PaginationParams } from './common.types';

export type EmailPlanStatus = 'active' | 'inactive';

export interface EmailWorkspaceItem {
  id: string;
  domain: string;
  companyName: string;
  planName: string;
  totalMailboxes: number;
  usedStorageGb: number;
  totalStorageGb: number;
  status: EmailPlanStatus;
  expiresAt: string;
}

export type EmailWorkspaceListResponse = BaseApiResponse<EmailWorkspaceItem[]>;
export type EmailQueryParams = PaginationParams;
