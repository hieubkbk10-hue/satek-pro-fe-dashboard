import { CartGroupItem, CartSummaryCalculation } from '@/types';

export const MOCK_CLIENT_CART_ITEMS: CartGroupItem[] = [
  {
    id: 'cart-group-01',
    domainTarget: 'https://tencongty.net',
    primaryService: {
      name: 'tencongty.net',
      billingYears: 1,
      price: 500000,
    },
    addons: [
      { id: 'addon-01', name: 'DNSSEC', billingYears: 1, unitPrice: 50000 },
      { id: 'addon-02', name: 'Email Pro #1', billingYears: 5, unitPrice: 50000 },
      {
        id: 'addon-03',
        name: 'Web đang xây dựng (Page Builder)',
        billingYears: 1,
        unitPrice: 50000,
      },
      { id: 'addon-04', name: 'Registry Lock', billingYears: 1, unitPrice: 50000 },
    ],
    subtotal: 1000000,
  },
];

export const MOCK_CLIENT_CART_SUMMARY: CartSummaryCalculation = {
  subtotalAmount: 870000,
  discountCode: 'SATEK10',
  discountAmount: -87000,
  vatTaxPercentage: 10,
  vatTaxAmount: 78300,
  finalTotalAmount: 861300,
};
