import { createLazyFileRoute } from '@tanstack/react-router';
import { OrderManagementView } from '@/features/admin/orders/OrderManagementView';

export const Route = createLazyFileRoute('/admin/_layout/refunds/')({
  component: AdminRefundsRouteComponent,
});

function AdminRefundsRouteComponent() {
  return <OrderManagementView />;
}
