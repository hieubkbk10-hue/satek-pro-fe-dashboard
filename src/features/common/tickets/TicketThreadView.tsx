/**
 * @file TicketThreadView.tsx
 * @description 2-Way Interactive Technical Support Ticket Thread & Chat View
 */
import * as React from 'react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { FullTicketRecord, MOCK_TICKETS_DATA } from '@/mocks';
import { Button, Input, Badge, AppDialog } from '@/components/common';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { toast } from 'sonner';

export interface TicketThreadViewProps {
  userRole?: 'admin' | 'client';
}

export function TicketThreadView({ userRole = 'admin' }: TicketThreadViewProps): React.JSX.Element {
  const [tickets, setTickets] = React.useState<FullTicketRecord[]>(MOCK_TICKETS_DATA);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [selectedTicket, setSelectedTicket] = React.useState<FullTicketRecord | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = React.useState<boolean>(false);
  const [replyText, setReplyText] = React.useState<string>('');

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả Ticket', count: tickets.length },
    {
      id: 'open',
      label: 'Chờ phản hồi',
      count: tickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length,
    },
    {
      id: 'resolved',
      label: 'Đã giải quyết',
      count: tickets.filter((t) => t.status === 'resolved').length,
    },
  ];

  const filteredTickets = React.useMemo(() => {
    return tickets.filter((t) => {
      const matchFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'open'
            ? t.status === 'open' || t.status === 'in_progress'
            : t.status === 'resolved';
      const matchSearch =
        t.ticketCode.toLowerCase().includes(searchValue.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchValue.toLowerCase()) ||
        t.customerName.toLowerCase().includes(searchValue.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [tickets, activeFilter, searchValue]);

  const handleOpenChat = (ticket: FullTicketRecord) => {
    setSelectedTicket(ticket);
    setIsChatModalOpen(true);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      ticketId: selectedTicket.id,
      senderName: userRole === 'admin' ? 'Kỹ Thuật Viên Satek' : 'Khách Hàng (An Nam)',
      senderRole: (userRole === 'admin' ? 'support_agent' : 'client') as 'support_agent' | 'client',
      content: replyText.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedTicket: FullTicketRecord = {
      ...selectedTicket,
      status: userRole === 'admin' ? 'in_progress' : 'open',
      messages: [...selectedTicket.messages, newMessage],
    };

    setTickets((prev) => prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)));
    setSelectedTicket(updatedTicket);
    setReplyText('');
    toast.success('Đã gửi phản hồi thành công!');
  };

  const handleResolveTicket = () => {
    if (!selectedTicket) return;
    const updatedTicket: FullTicketRecord = {
      ...selectedTicket,
      status: 'resolved',
    };
    setTickets((prev) => prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)));
    setSelectedTicket(updatedTicket);
    toast.success('Đã đánh dấu ticket là ĐÃ GIẢI QUYẾT!');
  };

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="CHĂM SÓC & HỖ TRỢ KỸ THUẬT"
        title="Trung Tâm Hỗ Trợ Kỹ Thuật (Tickets)"
        searchPlaceholder="Tìm mã ticket, tiêu đề, khách hàng..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Tạo Ticket Mới"
        onPrimaryAction={() => toast.info('Chức năng tạo ticket yêu cầu hỗ trợ mới')}
      />

      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTickets.map((t) => (
          <div
            key={t.id}
            onClick={() => handleOpenChat(t)}
            className="flex cursor-pointer flex-col justify-between rounded-2xl border border-surface-border bg-white p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary">{t.ticketCode}</span>
                <Badge
                  variant={
                    t.status === 'resolved'
                      ? 'active'
                      : t.priority === 'urgent'
                        ? 'error'
                        : 'warning'
                  }
                >
                  {t.status === 'resolved'
                    ? 'Đã xử lý'
                    : t.priority === 'urgent'
                      ? 'Khẩn cấp'
                      : 'Đang xử lý'}
                </Badge>
              </div>

              <h4 className="mt-2 line-clamp-2 text-sm font-bold text-slate-900">{t.subject}</h4>
              <p className="mt-1 text-xs text-slate-500">
                {t.customerName} · {t.department}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-surface-border pt-4 text-[11px] text-slate-400">
              <span className="flex items-center space-x-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{t.messages.length} tin nhắn</span>
              </span>
              <span>Cập nhật: {t.updatedAt.slice(0, 10)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive 2-Way Chat Modal (z-[10000]) */}
      {selectedTicket && (
        <AppDialog
          open={isChatModalOpen}
          onOpenChange={setIsChatModalOpen}
          title={`[${selectedTicket.ticketCode}] ${selectedTicket.subject}`}
          description={`${selectedTicket.customerName} · Bộ phận: ${selectedTicket.department}`}
          maxWidthClass="max-w-2xl"
        >
          <div className="space-y-4">
            {/* Action Bar inside Chat */}
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-slate-500">Trạng thái:</span>
                <Badge variant={selectedTicket.status === 'resolved' ? 'active' : 'warning'}>
                  {selectedTicket.status === 'resolved' ? 'ĐÃ GIẢI QUYẾT' : 'ĐANG XỬ LÝ'}
                </Badge>
              </div>

              {selectedTicket.status !== 'resolved' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResolveTicket}
                  className="gap-1.5 text-xs text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Đánh dấu giải quyết</span>
                </Button>
              )}
            </div>

            {/* Message Thread History */}
            <div className="max-h-80 space-y-3 overflow-y-auto p-1">
              {selectedTicket.messages.map((msg) => {
                const isSupport = msg.senderRole === 'support_agent' || msg.senderRole === 'admin';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isSupport ? 'items-end' : 'items-start'}`}
                  >
                    <div className="mb-1 flex items-center space-x-1.5 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-700">{msg.senderName}</span>
                      <span>·</span>
                      <span>{msg.createdAt.slice(11, 16)}</span>
                    </div>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        isSupport
                          ? 'rounded-tr-none bg-slate-900 text-white'
                          : 'rounded-tl-none border border-primary/20 bg-primary-light text-slate-900'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Input Form */}
            <form
              onSubmit={handleSendReply}
              className="flex items-center space-x-2 border-t border-surface-border pt-3"
            >
              <Input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Nhập phản hồi trao đổi kỹ thuật..."
                className="flex-1"
              />
              <Button
                type="submit"
                variant="primary"
                className="gap-1.5 bg-primary px-4 font-bold hover:bg-primary-hover"
              >
                <Send className="h-4 w-4" />
                <span>Gửi</span>
              </Button>
            </form>
          </div>
        </AppDialog>
      )}
    </div>
  );
}
