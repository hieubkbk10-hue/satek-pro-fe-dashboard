/**
 * @file useWallet.ts
 * @description Query and Mutation Hooks for Satek Pay Wallet & Deposits
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletService } from '@/services';
import { queryKeys } from './queryKeys';
import { formatVND } from '@/utils';
import { toast } from 'sonner';

export function useWalletBalanceQuery() {
  return useQuery({
    queryKey: queryKeys.wallet.balance(),
    queryFn: async () => {
      const res = await walletService.fetchBalance();
      return res.data;
    },
    staleTime: 1000 * 60,
  });
}

export function useWalletTransactionsQuery() {
  return useQuery({
    queryKey: queryKeys.wallet.transactions(),
    queryFn: async () => {
      const res = await walletService.fetchTransactions();
      return res.data;
    },
    staleTime: 1000 * 60,
  });
}

export function useDepositWalletMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: number) => {
      const res = await walletService.deposit(amount);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.wallet.balance(), data.balance);
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.transactions() });
      toast.success(`Nạp thành công ${formatVND(data.transaction.amount)} vào Ví Satek Pay!`);
    },
    onError: () => {
      toast.error('Lỗi giao dịch nạp tiền.');
    },
  });
}
