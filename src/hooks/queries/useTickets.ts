/**
 * @file useTickets.ts
 * @description Query and Mutation Hooks for Tickets with Realtime Optimistic UI
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketService } from '@/services';
import { queryKeys } from './queryKeys';
import { FullTicketRecord } from '@/mocks';
import { TicketMessage } from '@/types';
import { toast } from 'sonner';

export function useTicketsQuery() {
  return useQuery({
    queryKey: queryKeys.tickets.list(),
    queryFn: async () => {
      const res = await ticketService.fetchTickets();
      return res.data;
    },
    staleTime: 1000 * 30, // 30s
  });
}

export function useSendTicketMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ticketId,
      message,
    }: {
      ticketId: string;
      message: Omit<TicketMessage, 'id' | 'createdAt'>;
    }) => {
      const res = await ticketService.sendMessage(ticketId, message);
      return res.data;
    },
    // Optimistic Update Implementation
    onMutate: async ({ ticketId, message }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.tickets.list() });
      const previousTickets = queryClient.getQueryData<FullTicketRecord[]>(
        queryKeys.tickets.list()
      );

      if (previousTickets) {
        const optimisticMsg: TicketMessage = {
          id: `temp-${Date.now()}`,
          createdAt: new Date().toISOString(),
          ...message,
        };

        const updated = previousTickets.map((t) => {
          if (t.id === ticketId) {
            return {
              ...t,
              status:
                message.senderRole === 'admin' || message.senderRole === 'support_agent'
                  ? ('in_progress' as const)
                  : ('open' as const),
              messages: [...t.messages, optimisticMsg],
            };
          }
          return t;
        });

        queryClient.setQueryData(queryKeys.tickets.list(), updated);
      }

      return { previousTickets };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTickets) {
        queryClient.setQueryData(queryKeys.tickets.list(), context.previousTickets);
      }
      toast.error('Lỗi khi gửi phản hồi.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.list() });
      toast.success('Đã gửi phản hồi thành công!');
    },
  });
}

export function useUpdateTicketStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ticketId,
      status,
    }: {
      ticketId: string;
      status: FullTicketRecord['status'];
    }) => {
      const res = await ticketService.updateStatus(ticketId, status);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.list() });
      toast.success('Đã cập nhật trạng thái ticket!');
    },
  });
}
