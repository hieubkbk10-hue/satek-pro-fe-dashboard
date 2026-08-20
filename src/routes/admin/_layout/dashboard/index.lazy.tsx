import { createLazyFileRoute } from '@tanstack/react-router';
import { AdminDashboardView } from '@/features/admin/dashboard/AdminDashboardView';

export const Route = createLazyFileRoute('/admin/_layout/dashboard/')({
  component: AdminDashboardRouteComponent,
});

function AdminDashboardRouteComponent() {
  return <AdminDashboardView />;
}
