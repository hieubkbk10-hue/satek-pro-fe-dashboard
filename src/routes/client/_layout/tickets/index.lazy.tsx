import { createLazyFileRoute } from '@tanstack/react-router';
import { TicketThreadView } from '@/features/common/tickets/TicketThreadView';

export const Route = createLazyFileRoute('/client/_layout/tickets/')({
  component: ClientTicketsRouteComponent,
});

function ClientTicketsRouteComponent() {
  return <TicketThreadView userRole="client" />;
}
