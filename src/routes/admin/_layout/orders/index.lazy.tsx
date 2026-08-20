import { createLazyFileRoute } from '@tanstack/react-router';
import { OrderManagementView } from '@/features/admin/orders/OrderManagementView';

export const Route = createLazyFileRoute('/admin/_layout/orders/')({
  component: AdminOrdersRouteComponent,
});

function AdminOrdersRouteComponent() {
  return <OrderManagementView />;
}
