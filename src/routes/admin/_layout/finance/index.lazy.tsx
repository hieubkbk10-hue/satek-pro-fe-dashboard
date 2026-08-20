import { createLazyFileRoute } from '@tanstack/react-router';
import { FinanceMisaView } from '@/features/admin/finance/FinanceMisaView';

export const Route = createLazyFileRoute('/admin/_layout/finance/')({
  component: AdminFinanceRouteComponent,
});

function AdminFinanceRouteComponent() {
  return <FinanceMisaView />;
}
