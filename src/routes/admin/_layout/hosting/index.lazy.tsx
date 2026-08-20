import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { HostingListView } from '@/features/admin/hosting/HostingListView';
import { MOCK_ADMIN_HOSTING_PACKAGES } from '@/mocks';
import { HostingPackage } from '@/types';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/admin/_layout/hosting/')({
  component: AdminHostingListRouteComponent,
});

function AdminHostingListRouteComponent() {
  const navigate = useNavigate();
  const [packages] = React.useState<HostingPackage[]>(MOCK_ADMIN_HOSTING_PACKAGES);

  const handleEditSpecs = (pkg: HostingPackage) => {
    navigate({ to: `/admin/hosting/${pkg.id}` });
  };

  const handleAddPackage = () => {
    toast.info('Chức năng tạo gói Hosting mới');
  };

  return (
    <HostingListView
      packages={packages}
      onEditSpecs={handleEditSpecs}
      onAddPackage={handleAddPackage}
    />
  );
}
