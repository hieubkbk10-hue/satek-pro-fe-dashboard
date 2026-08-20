/**
 * @file __root.tsx
 * @description Master Root Route for TanStack Router (Matches Newmoon-Admin & Superdong)
 */
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { AppErrorBoundary } from '@/components/common';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppErrorBoundary fallbackTitle="Không thể khởi tạo hệ thống Satek Pro">
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </AppErrorBoundary>
  );
}
