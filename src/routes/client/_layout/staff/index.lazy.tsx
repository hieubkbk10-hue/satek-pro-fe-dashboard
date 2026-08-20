import { createLazyFileRoute } from '@tanstack/react-router';
import { ClientStaffView } from '@/features/client/staff/ClientStaffView';

export const Route = createLazyFileRoute('/client/_layout/staff/')({
  component: ClientStaffRouteComponent,
});

function ClientStaffRouteComponent() {
  return <ClientStaffView />;
}
