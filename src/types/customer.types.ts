/**
 * @file customer.types.ts
 * @description Master Type Definitions for Customer Accounts & eKYC
 */

export interface CustomerAccount {
  id: string;
  customerCode: string;
  companyName: string;
  representativeName: string;
  email: string;
  phoneNumber: string;
  taxCode: string;
  ekycStatus: 'verified' | 'pending' | 'rejected';
  activeServicesCount: number;
  totalSpent: number;
  tier: 'VIP' | 'Standard' | 'Enterprise';
  createdAt: string;
}
