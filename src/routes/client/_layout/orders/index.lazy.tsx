import { createLazyFileRoute } from '@tanstack/react-router';
import { ClientOrderHistoryView } from '@/features/client/orders/ClientOrderHistoryView';

export const Route = createLazyFileRoute('/client/_layout/orders/')({
  component: ClientOrdersRouteComponent,
});

function ClientOrdersRouteComponent() {
  return <ClientOrderHistoryView />;
}
