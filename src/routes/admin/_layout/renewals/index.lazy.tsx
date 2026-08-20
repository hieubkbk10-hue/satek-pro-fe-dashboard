import { createLazyFileRoute } from '@tanstack/react-router';
import { OrderManagementView } from '@/features/admin/orders/OrderManagementView';

export const Route = createLazyFileRoute('/admin/_layout/renewals/')({
  component: AdminRenewalsRouteComponent,
});

function AdminRenewalsRouteComponent() {
  return <OrderManagementView />;
}
