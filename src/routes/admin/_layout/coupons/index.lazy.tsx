import { createLazyFileRoute } from '@tanstack/react-router';
import { ComboListView } from '@/features/admin/combos/ComboListView';

export const Route = createLazyFileRoute('/admin/_layout/coupons/')({
  component: AdminCouponsRouteComponent,
});

function AdminCouponsRouteComponent() {
  return <ComboListView />;
}
