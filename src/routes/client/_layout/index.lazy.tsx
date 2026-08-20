import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { ROUTE } from '@/constants';

export const Route = createLazyFileRoute('/client/_layout/')({
  component: ClientIndexRoute,
});

function ClientIndexRoute() {
  return <Navigate to={ROUTE.CLIENT.HOSTING} replace />;
}
