/**
 * @file useOrders.ts
 * @description Query and Mutation Hooks for Orders & MISA Accounting Sync
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services';
import { queryKeys } from './queryKeys';
import { toast } from 'sonner';

export function useOrdersQuery() {
  return useQuery({
    queryKey: queryKeys.orders.list(),
    queryFn: async () => {
      const res = await orderService.fetchOrders();
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });
}

export function useMisaRecordsQuery() {
  return useQuery({
    queryKey: queryKeys.orders.misa(),
    queryFn: async () => {
      const res = await orderService.fetchMisaRecords();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useSyncAllMisaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await orderService.syncAllMisa();
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.misa() });
      toast.success('Đã đối soát và đồng bộ toàn bộ hóa đơn sang MISA thành công!');
    },
    onError: () => {
      toast.error('Lỗi kết nối cổng API MISA.');
    },
  });
}
