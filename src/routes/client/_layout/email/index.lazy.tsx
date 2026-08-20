import { createLazyFileRoute } from '@tanstack/react-router';
import { ClientEmailView } from '@/features/client/email/ClientEmailView';

export const Route = createLazyFileRoute('/client/_layout/email/')({
  component: ClientEmailRouteComponent,
});

function ClientEmailRouteComponent() {
  return <ClientEmailView />;
}
