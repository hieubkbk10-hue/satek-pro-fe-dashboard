/**
 * @file useDomains.ts
 * @description Query and Mutation Hooks for Domain TLDs & Security Configurations
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { domainService } from '@/services';
import { queryKeys } from './queryKeys';
import { toast } from 'sonner';

export function useDomainTldsQuery() {
  return useQuery({
    queryKey: queryKeys.domains.tlds(),
    queryFn: async () => {
      const res = await domainService.fetchDomainTlds();
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useClientDomainsQuery() {
  return useQuery({
    queryKey: queryKeys.domains.clientList(),
    queryFn: async () => {
      const res = await domainService.fetchClientDomains();
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });
}

export function useToggleDomainAutoRenewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isAutoRenew }: { id: string; isAutoRenew: boolean }) => {
      const res = await domainService.toggleAutoRenew(id, isAutoRenew);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.domains.clientList() });
      toast.success(`Đã ${data.isAutoRenew ? 'bật' : 'tắt'} tính năng Tự động gia hạn tên miền!`);
    },
  });
}
