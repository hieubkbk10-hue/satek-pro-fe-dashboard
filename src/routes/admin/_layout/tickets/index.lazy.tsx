import { createLazyFileRoute } from '@tanstack/react-router';
import { TicketThreadView } from '@/features/common/tickets/TicketThreadView';

export const Route = createLazyFileRoute('/admin/_layout/tickets/')({
  component: AdminTicketsRouteComponent,
});

function AdminTicketsRouteComponent() {
  return <TicketThreadView userRole="admin" />;
}
