/**
 * @file _layout.tsx
 * @description Client Route Layout Shell
 */
import { createFileRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { ClientLayout } from '@/components/layout';
import { ROUTE } from '@/constants';
import { MOCK_CLIENT_CART_ITEMS } from '@/mocks';

export const Route = createFileRoute('/client/_layout')({
  component: ClientLayoutRouteComponent,
});

function ClientLayoutRouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigate = (path: string) => {
    navigate({ to: path });
  };

  const handleSwitchPortal = () => {
    navigate({ to: ROUTE.ADMIN.HOSTING });
  };

  const handleOpenCart = () => {
    navigate({ to: ROUTE.CLIENT.CART });
  };

  const handleOpenWallet = () => {
    navigate({ to: '/client/wallet' });
  };

  return (
    <ClientLayout
      currentPath={currentPath}
      onNavigate={handleNavigate}
      cartItemCount={MOCK_CLIENT_CART_ITEMS[0]?.addons.length || 0}
      walletBalance={5000000}
      onOpenCart={handleOpenCart}
      onOpenWallet={handleOpenWallet}
      onSwitchPortal={handleSwitchPortal}
    >
      <Outlet />
    </ClientLayout>
  );
}
