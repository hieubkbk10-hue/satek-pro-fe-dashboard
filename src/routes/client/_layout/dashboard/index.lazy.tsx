import { createLazyFileRoute } from '@tanstack/react-router';
import { ClientDashboardView } from '@/features/client/dashboard/ClientDashboardView';

export const Route = createLazyFileRoute('/client/_layout/dashboard/')({
  component: ClientDashboardRouteComponent,
});

function ClientDashboardRouteComponent() {
  return <ClientDashboardView />;
}
