/**
 * @file ticket.service.ts
 * @description Domain Service for Technical Support Tickets & 2-Way Chat Threads
 */
import { FullTicketRecord, MOCK_TICKETS_DATA } from '@/mocks';
import { TicketMessage } from '@/types';
import { simulateApiCall, ApiResponse } from './client';

let inMemoryTickets: FullTicketRecord[] = [...MOCK_TICKETS_DATA];

export const ticketService = {
  async fetchTickets(): Promise<ApiResponse<FullTicketRecord[]>> {
    return simulateApiCall(() => inMemoryTickets);
  },

  async fetchTicketById(id: string): Promise<ApiResponse<FullTicketRecord | undefined>> {
    return simulateApiCall(() => inMemoryTickets.find((t) => t.id === id));
  },

  async sendMessage(
    ticketId: string,
    message: Omit<TicketMessage, 'id' | 'createdAt'>
  ): Promise<ApiResponse<FullTicketRecord>> {
    return simulateApiCall(() => {
      const idx = inMemoryTickets.findIndex((t) => t.id === ticketId);
      if (idx === -1) throw new Error('Ticket not found');

      const newMessage: TicketMessage = {
        id: `msg-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...message,
      };

      const updated: FullTicketRecord = {
        ...inMemoryTickets[idx],
        status:
          message.senderRole === 'admin' || message.senderRole === 'support_agent'
            ? 'in_progress'
            : 'open',
        updatedAt: new Date().toISOString(),
        messages: [...inMemoryTickets[idx].messages, newMessage],
      };

      inMemoryTickets[idx] = updated;
      return updated;
    }, 200);
  },

  async updateStatus(
    ticketId: string,
    status: FullTicketRecord['status']
  ): Promise<ApiResponse<FullTicketRecord>> {
    return simulateApiCall(() => {
      const idx = inMemoryTickets.findIndex((t) => t.id === ticketId);
      if (idx === -1) throw new Error('Ticket not found');

      const updated: FullTicketRecord = {
        ...inMemoryTickets[idx],
        status,
        updatedAt: new Date().toISOString(),
      };

      inMemoryTickets[idx] = updated;
      return updated;
    }, 150);
  },
};
