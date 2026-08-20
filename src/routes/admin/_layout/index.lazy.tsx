import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { ROUTE } from '@/constants';

export const Route = createLazyFileRoute('/admin/_layout/')({
  component: AdminIndexRoute,
});

function AdminIndexRoute() {
  return <Navigate to={ROUTE.ADMIN.HOSTING} replace />;
}
