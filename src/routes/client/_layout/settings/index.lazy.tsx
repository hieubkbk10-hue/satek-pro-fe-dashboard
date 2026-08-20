import { createLazyFileRoute } from '@tanstack/react-router';
import { ClientSettingsView } from '@/features/client/settings/ClientSettingsView';

export const Route = createLazyFileRoute('/client/_layout/settings/')({
  component: ClientSettingsRouteComponent,
});

function ClientSettingsRouteComponent() {
  return <ClientSettingsView />;
}
