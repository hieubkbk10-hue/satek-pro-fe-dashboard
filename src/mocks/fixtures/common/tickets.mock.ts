import { SupportTicket, TicketMessage } from '@/types';

export interface FullTicketRecord extends SupportTicket {
  messages: TicketMessage[];
}

export const MOCK_TICKETS_DATA: FullTicketRecord[] = [
  {
    id: 'ticket-01',
    ticketCode: 'TK-8821',
    subject: 'Hỗ trợ cấu hình bản ghi DNSSEC cho tên miền annam.vn',
    customerName: 'Công ty Cổ Phần An Nam',
    department: 'Kỹ thuật máy chủ',
    priority: 'high',
    status: 'in_progress',
    unreadCount: 1,
    createdAt: '2026-05-20T08:45:00Z',
    updatedAt: '2026-05-20T09:30:00Z',
    messages: [
      {
        id: 'msg-01',
        ticketId: 'ticket-01',
        senderName: 'Nguyễn Văn An (An Nam)',
        senderRole: 'client',
        content:
          'Chào admin, bên mình vừa đăng ký gói DNSSEC cho domain annam.vn nhưng chưa thấy bản khai cập nhật sang VNNIC. Nhờ admin kiểm tra giúp!',
        createdAt: '2026-05-20T08:45:00Z',
      },
      {
        id: 'msg-02',
        ticketId: 'ticket-01',
        senderName: 'Kỹ Thuật Viên Satek',
        senderRole: 'support_agent',
        content:
          'Dạ chào anh An, bên em đã tiếp nhận yêu cầu và đang đồng bộ khóa DS Record sang cổng đăng ký VNNIC. Dự kiến hoàn tất trong 15 phút nữa ạ.',
        createdAt: '2026-05-20T09:00:00Z',
      },
    ],
  },
  {
    id: 'ticket-02',
    ticketCode: 'TK-9042',
    subject: 'Yêu cầu nâng cấp gói RAM lên 16GB cho server Omega Noodles',
    customerName: 'Công ty TNHH Omega Noodles',
    department: 'Hạ tầng Cloud',
    priority: 'urgent',
    status: 'open',
    unreadCount: 2,
    createdAt: '2026-05-20T09:10:00Z',
    updatedAt: '2026-05-20T09:10:00Z',
    messages: [
      {
        id: 'msg-03',
        ticketId: 'ticket-02',
        senderName: 'Trần Thị Mai',
        senderRole: 'client',
        content:
          'Server bán hàng đang quá tải 76% RAM trong đợt khuyến mãi. Nhờ kỹ thuật nâng cấp gói Specs lên 16GB RAM ngay trong sáng nay.',
        createdAt: '2026-05-20T09:10:00Z',
      },
    ],
  },
  {
    id: 'ticket-03',
    ticketCode: 'TK-7910',
    subject: 'Xuất lại hóa đơn điện tử GTGT cho đơn hàng DH-2026-0891',
    customerName: 'Hộ Kinh Doanh Lotus Retail',
    department: 'Kế toán & Hóa đơn',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2026-05-18T10:00:00Z',
    updatedAt: '2026-05-18T16:00:00Z',
    messages: [
      {
        id: 'msg-04',
        ticketId: 'ticket-03',
        senderName: 'Lê Hoàng Long',
        senderRole: 'client',
        content: 'Nhờ kế toán gửi lại link tra cứu hóa đơn điện tử cho đơn hàng DH-2026-0891.',
        createdAt: '2026-05-18T10:00:00Z',
      },
      {
        id: 'msg-05',
        ticketId: 'ticket-03',
        senderName: 'Kế Toán Satek',
        senderRole: 'support_agent',
        content:
          'Dạ đã gửi link tra cứu qua email long.le@lotusretail.vn và đồng bộ MISA thành công rồi anh nhé.',
        createdAt: '2026-05-18T16:00:00Z',
      },
    ],
  },
];
