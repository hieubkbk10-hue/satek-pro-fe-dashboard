import { createLazyFileRoute } from '@tanstack/react-router';
import { ClientHostingListView } from '@/features/client/hosting/ClientHostingListView';
import { MOCK_CLIENT_HOSTING_INSTANCES } from '@/mocks';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/client/_layout/hosting/')({
  component: ClientHostingRouteComponent,
});

function ClientHostingRouteComponent() {
  return (
    <ClientHostingListView
      instances={MOCK_CLIENT_HOSTING_INSTANCES}
      onAddNewDomain={() => toast.info('Chức năng đăng ký thêm tên miền')}
    />
  );
}
