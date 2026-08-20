/**
 * @file promotion.types.ts
 * @description Master Type Contracts for Promotion Management
 */

export type DiscountType = 'fixed_amount' | 'percentage' | 'free';
export type CustomerTarget = 'all' | 'new_customer' | 'loyal_customer';

export interface PromotionCampaign {
  id: string;
  name: string; // e.g. "Khuyến mãi khai trương"
  internalCode: string; // e.g. "KM-20426"
  startDate: string;
  endDate: string;
  targetProducts: string[];
  applicableCycles: number[]; // e.g. [1, 2, 3, 5, 10] (years)
  discountType: DiscountType;
  discountValue: number; // e.g. 100000 VND
  customerTarget: CustomerTarget;
  totalUsageLimit: number;
  perCustomerLimit: number;
  minOrderAmount: number;
  isStackableWithOtherPromotions: boolean;
  isStackableWithCoupon: boolean;
  priorityLevel: number;
  isProfitProtected: boolean;
  status: 'active' | 'scheduled' | 'expired' | 'draft';
}
