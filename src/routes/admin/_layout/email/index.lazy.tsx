import { createLazyFileRoute } from '@tanstack/react-router';
import { AdminEmailView } from '@/features/admin/email/AdminEmailView';

export const Route = createLazyFileRoute('/admin/_layout/email/')({
  component: AdminEmailRouteComponent,
});

function AdminEmailRouteComponent() {
  return <AdminEmailView />;
}
