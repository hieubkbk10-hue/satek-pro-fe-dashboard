import { createLazyFileRoute } from '@tanstack/react-router';
import { AdminChatAiView } from '@/features/admin/chat-ai/AdminChatAiView';

export const Route = createLazyFileRoute('/admin/_layout/chat-ai/')({
  component: AdminChatAiRouteComponent,
});

function AdminChatAiRouteComponent() {
  return <AdminChatAiView />;
}
