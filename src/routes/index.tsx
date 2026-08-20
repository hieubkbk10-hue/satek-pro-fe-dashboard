import { createFileRoute, Navigate } from '@tanstack/react-router';
import { ROUTE } from '@/constants';

export const Route = createFileRoute('/')({
  component: IndexRedirectComponent,
});

function IndexRedirectComponent() {
  return <Navigate to={ROUTE.ADMIN.HOSTING} replace />;
}
