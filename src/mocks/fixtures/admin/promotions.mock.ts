import { PromotionCampaign } from '@/types';

export const MOCK_ADMIN_PROMOTIONS: PromotionCampaign[] = [
  {
    id: 'promo-001',
    name: 'Khuyến mãi khai trương',
    internalCode: 'KM-20426',
    startDate: '2026-04-20',
    endDate: '2026-06-20',
    targetProducts: ['.com', '.vn', '.net'],
    applicableCycles: [1, 2, 3, 5, 10],
    discountType: 'fixed_amount',
    discountValue: 100000,
    customerTarget: 'new_customer',
    totalUsageLimit: 100,
    perCustomerLimit: 1,
    minOrderAmount: 0,
    isStackableWithOtherPromotions: false,
    isStackableWithCoupon: true,
    priorityLevel: 1,
    isProfitProtected: true,
    status: 'active',
  },
];
