/**
 * @file queryKeys.ts
 * @description Centralized Query Keys Factory for TanStack Query Cache
 */

export const queryKeys = {
  hosting: {
    all: () => ['hosting'] as const,
    list: () => ['hosting', 'list'] as const,
    detail: (id: string) => ['hosting', 'detail', id] as const,
  },
  domains: {
    all: () => ['domains'] as const,
    tlds: () => ['domains', 'tlds'] as const,
    clientList: () => ['domains', 'clientList'] as const,
  },
  tickets: {
    all: () => ['tickets'] as const,
    list: () => ['tickets', 'list'] as const,
    detail: (id: string) => ['tickets', 'detail', id] as const,
  },
  wallet: {
    all: () => ['wallet'] as const,
    balance: () => ['wallet', 'balance'] as const,
    transactions: () => ['wallet', 'transactions'] as const,
  },
  orders: {
    all: () => ['orders'] as const,
    list: () => ['orders', 'list'] as const,
    misa: () => ['orders', 'misa'] as const,
  },
  customers: {
    all: () => ['customers'] as const,
    list: () => ['customers', 'list'] as const,
  },
  promotions: {
    all: () => ['promotions'] as const,
    list: () => ['promotions', 'list'] as const,
  },
};
