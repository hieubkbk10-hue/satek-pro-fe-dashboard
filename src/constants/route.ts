/**
 * @file route.ts
 * @description Master Route Path Constants (Matches Newmoon-Admin & Superdong)
 */

export const ROUTE = {
  // Common Root
  HOME: '/',

  // Admin Portal Routes
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/products',
    DOMAINS: '/admin/domains',
    HOSTING: '/admin/hosting',
    HOSTING_EDIT: (id: string) => `/admin/hosting/${id}/edit`,
    EMAIL: '/admin/email',
    CHAT_AI: '/admin/chat-ai',
    SERVICES: '/admin/services',
    COMBOS: '/admin/combos',
    PROMOTIONS: '/admin/promotions',
    PROMOTIONS_CREATE: '/admin/promotions/create',
    COUPONS: '/admin/coupons',
    CUSTOMERS: '/admin/customers',
    TICKETS: '/admin/tickets',
    ORDERS: '/admin/orders',
    RENEWALS: '/admin/renewals',
    REFUNDS: '/admin/refunds',
    FINANCE_WALLET: '/admin/finance/wallet',
    FINANCE_REVENUE: '/admin/finance/revenue',
    FINANCE_INVOICES: '/admin/finance/invoices',
    FINANCE_RECONCILIATION: '/admin/finance/reconciliation',
    FINANCE_MISA: '/admin/finance/misa',
    PROVIDERS: '/admin/providers',
    CONFIG_PRICING: '/admin/config/pricing',
    CONFIG_SPECS: '/admin/config/specs',
    CONFIG_FQA: '/admin/config/fqa',
    CONFIG_POLICIES: '/admin/config/policies',
    SYSTEM_ROLES: '/admin/system/roles',
    SYSTEM_LOGS: '/admin/system/logs',
    SYSTEM_SETTINGS: '/admin/system/settings',
  },

  // Client Portal Routes
  CLIENT: {
    ROOT: '/client',
    DASHBOARD: '/client/dashboard',
    DOMAINS: '/client/domains',
    HOSTING: '/client/hosting',
    EMAIL: '/client/email',
    ORDERS: '/client/orders',
    RENEWALS: '/client/renewals',
    STAFF: '/client/staff',
    TICKETS: '/client/tickets',
    WALLET: '/client/wallet',
    CART: '/client/cart',
    SETTINGS: '/client/settings',
  },
} as const;
