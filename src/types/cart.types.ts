/**
 * @file cart.types.ts
 * @description Master Type Contracts for Client Shopping Cart & Checkout
 */

export interface CartSubItem {
  id: string;
  name: string; // e.g. "DNSSEC", "Registry Lock", "Email Pro #1"
  billingYears: number;
  unitPrice: number;
}

export interface CartGroupItem {
  id: string;
  domainTarget: string; // e.g. "https://tencongty.net"
  primaryService: {
    name: string; // e.g. "tencongty.net"
    billingYears: number;
    price: number;
  };
  addons: CartSubItem[];
  subtotal: number;
}

export interface CartSummaryCalculation {
  subtotalAmount: number;
  discountCode?: string;
  discountAmount: number;
  vatTaxPercentage: number;
  vatTaxAmount: number;
  finalTotalAmount: number;
}
