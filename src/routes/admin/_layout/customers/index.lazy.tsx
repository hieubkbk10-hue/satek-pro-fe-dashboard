import { createLazyFileRoute } from '@tanstack/react-router';
import { CustomerListView } from '@/features/admin/customers/CustomerListView';

export const Route = createLazyFileRoute('/admin/_layout/customers/')({
  component: AdminCustomersRouteComponent,
});

function AdminCustomersRouteComponent() {
  return <CustomerListView />;
}
