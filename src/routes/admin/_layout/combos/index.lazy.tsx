import { createLazyFileRoute } from '@tanstack/react-router';
import { ComboListView } from '@/features/admin/combos/ComboListView';

export const Route = createLazyFileRoute('/admin/_layout/combos/')({
  component: AdminCombosRouteComponent,
});

function AdminCombosRouteComponent() {
  return <ComboListView />;
}
