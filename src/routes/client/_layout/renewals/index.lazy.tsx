import { createLazyFileRoute } from '@tanstack/react-router';
import { ClientRenewalsView } from '@/features/client/renewals/ClientRenewalsView';

export const Route = createLazyFileRoute('/client/_layout/renewals/')({
  component: ClientRenewalsRouteComponent,
});

function ClientRenewalsRouteComponent() {
  return <ClientRenewalsView />;
}
