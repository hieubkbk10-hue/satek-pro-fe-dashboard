import { createLazyFileRoute } from '@tanstack/react-router';
import { DomainListView } from '@/features/admin/domains/DomainListView';
import { MOCK_ADMIN_DOMAIN_TLDS } from '@/mocks';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/admin/_layout/domains/')({
  component: AdminDomainsRouteComponent,
});

function AdminDomainsRouteComponent() {
  return (
    <DomainListView
      tlds={MOCK_ADMIN_DOMAIN_TLDS}
      onAddDomain={() => toast.info('Chức năng thêm tên miền mới')}
    />
  );
}
