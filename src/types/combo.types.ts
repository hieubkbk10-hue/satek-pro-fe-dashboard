/**
 * @file combo.types.ts
 * @description Master Type Definitions for Combo Packages
 */

export interface ComboPackage {
  id: string;
  code: string;
  name: string;
  description: string;
  includedServices: string[];
  price12Months: number;
  originalPrice: number;
  discountPercentage: number;
  status: 'active' | 'inactive';
  targetAudience: string;
}
