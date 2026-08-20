/**
 * @file useCustomers.ts
 * @description Query and Mutation Hooks for Customers & eKYC Verification
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService } from '@/services';
import { queryKeys } from './queryKeys';
import { toast } from 'sonner';

export function useCustomersQuery() {
  return useQuery({
    queryKey: queryKeys.customers.list(),
    queryFn: async () => {
      const res = await customerService.fetchCustomers();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useVerifyCustomerEkycMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customerId: string) => {
      const res = await customerService.verifyEkyc(customerId);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.list() });
      toast.success('Đã xác thực eKYC VNNIC thành công cho khách hàng!');
    },
  });
}
