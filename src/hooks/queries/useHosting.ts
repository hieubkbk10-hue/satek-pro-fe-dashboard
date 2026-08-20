/**
 * @file useHosting.ts
 * @description Query and Mutation Hooks for Hosting Management
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hostingService } from '@/services';
import { queryKeys } from './queryKeys';
import { HostingSpecs } from '@/types';
import { toast } from 'sonner';

export function useHostingPackagesQuery() {
  return useQuery({
    queryKey: queryKeys.hosting.list(),
    queryFn: async () => {
      const res = await hostingService.fetchPackages();
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useHostingPackageDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.hosting.detail(id),
    queryFn: async () => {
      const res = await hostingService.fetchPackageById(id);
      return res.data;
    },
    enabled: Boolean(id),
  });
}

export function useUpdateHostingSpecsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      specs,
      price12Months,
    }: {
      id: string;
      specs: HostingSpecs;
      price12Months: number;
    }) => {
      const res = await hostingService.updateSpecs(id, specs, price12Months);
      return res.data;
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hosting.list() });
      queryClient.setQueryData(queryKeys.hosting.detail(updated.id), updated);
      toast.success('Đã lưu cấu hình thông số Hosting thành công!');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi lưu cấu hình.');
    },
  });
}
