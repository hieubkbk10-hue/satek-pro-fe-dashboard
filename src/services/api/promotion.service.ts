/**
 * @file promotion.service.ts
 * @description Domain Service for Promotions & Coupons
 */
import { PromotionCampaign } from '@/types';
import { MOCK_ADMIN_PROMOTIONS } from '@/mocks';
import { simulateApiCall, ApiResponse } from './client';

let inMemoryPromotions: PromotionCampaign[] = [...MOCK_ADMIN_PROMOTIONS];

export const promotionService = {
  async fetchPromotions(): Promise<ApiResponse<PromotionCampaign[]>> {
    return simulateApiCall(() => inMemoryPromotions);
  },

  async createPromotion(
    payload: Omit<PromotionCampaign, 'id'>
  ): Promise<ApiResponse<PromotionCampaign>> {
    return simulateApiCall(() => {
      const newPromo: PromotionCampaign = {
        id: `promo-${Date.now()}`,
        ...payload,
      };
      inMemoryPromotions = [newPromo, ...inMemoryPromotions];
      return newPromo;
    }, 300);
  },
};
