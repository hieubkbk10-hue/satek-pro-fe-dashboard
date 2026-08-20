import { createLazyFileRoute } from '@tanstack/react-router';
import { ClientCartView } from '@/features/client/cart/ClientCartView';
import { MOCK_CLIENT_CART_ITEMS, MOCK_CLIENT_CART_SUMMARY } from '@/mocks';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/client/_layout/cart/')({
  component: ClientCartRouteComponent,
});

function ClientCartRouteComponent() {
  return (
    <ClientCartView
      initialItems={MOCK_CLIENT_CART_ITEMS}
      initialSummary={MOCK_CLIENT_CART_SUMMARY}
      onCheckout={() => toast.success('Chuyển hướng đến cổng thanh toán VNPay an toàn...')}
    />
  );
}
