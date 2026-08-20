import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { HostingSpecsEditView } from '@/features/admin/hosting/HostingSpecsEditView';
import { MOCK_ADMIN_HOSTING_PACKAGES } from '@/mocks';
import { HostingPackage } from '@/types';
import { ROUTE } from '@/constants';

export const Route = createLazyFileRoute('/admin/_layout/hosting/$id')({
  component: AdminHostingSpecsRouteComponent,
});

function AdminHostingSpecsRouteComponent() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const initialPkg = React.useMemo(() => {
    return MOCK_ADMIN_HOSTING_PACKAGES.find((p) => p.id === id) || MOCK_ADMIN_HOSTING_PACKAGES[0];
  }, [id]);

  const handleBack = () => {
    navigate({ to: ROUTE.ADMIN.HOSTING });
  };

  const handleSaveSuccess = (_updated: HostingPackage) => {
    navigate({ to: ROUTE.ADMIN.HOSTING });
  };

  return (
    <HostingSpecsEditView
      initialPackage={initialPkg}
      onBack={handleBack}
      onSaveSuccess={handleSaveSuccess}
    />
  );
}
