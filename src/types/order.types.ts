/**
 * @file order.types.ts
 * @description Master Type Contracts for Orders and Renewals
 */

export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'unpaid' | 'paid' | 'failed';

export interface OrderRecord {
  id: string;
  orderCode: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}
