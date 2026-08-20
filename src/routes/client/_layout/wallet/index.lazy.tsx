import { createLazyFileRoute } from '@tanstack/react-router';
import { ClientWalletView } from '@/features/client/wallet/ClientWalletView';

export const Route = createLazyFileRoute('/client/_layout/wallet/')({
  component: ClientWalletRouteComponent,
});

function ClientWalletRouteComponent() {
  return <ClientWalletView />;
}
