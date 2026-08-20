/**
 * @file common.types.ts
 * @description Master Common Types and Generic API Response Contracts
 */

export interface BaseApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  statusCode?: number;
}

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export type StatusVariant = 'active' | 'inactive' | 'pending' | 'warning' | 'error' | 'success';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}
