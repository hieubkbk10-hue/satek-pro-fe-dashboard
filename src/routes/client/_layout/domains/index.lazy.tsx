import { createLazyFileRoute } from '@tanstack/react-router';
import { ClientDomainManageView } from '@/features/client/domains/ClientDomainManageView';

export const Route = createLazyFileRoute('/client/_layout/domains/')({
  component: ClientDomainsRouteComponent,
});

function ClientDomainsRouteComponent() {
  return <ClientDomainManageView />;
}
