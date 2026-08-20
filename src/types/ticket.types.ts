/**
 * @file ticket.types.ts
 * @description Master Type Contracts for Technical Support Tickets
 */

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderName: string;
  senderRole: 'client' | 'support_agent' | 'admin';
  content: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketCode: string;
  subject: string;
  customerName: string;
  department: string;
  priority: TicketPriority;
  status: TicketStatus;
  unreadCount?: number;
  createdAt: string;
  updatedAt: string;
}
