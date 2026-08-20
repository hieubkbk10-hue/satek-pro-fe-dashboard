/**
 * @file ClientStaffView.tsx
 * @description Client Staff Members & Role Delegation View
 */
import * as React from 'react';
import { Shield } from 'lucide-react';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { DataTable, ColumnDefinition, Badge, Button, AppDialog, Input } from '@/components/common';
import { toast } from 'sonner';

export interface StaffItem {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: 'active' | 'pending';
  lastActive: string;
}

export const MOCK_CLIENT_STAFF: StaffItem[] = [
  {
    id: 'st-01',
    fullName: 'Nguyễn Văn An',
    email: 'an.nguyen@annam.vn',
    role: 'Chủ sở hữu (Owner)',
    status: 'active',
    lastActive: 'Vừa xong',
  },
  {
    id: 'st-02',
    fullName: 'Lê Minh Khang',
    email: 'khang.lm@annam.vn',
    role: 'Quản trị viên IT',
    status: 'active',
    lastActive: '2 giờ trước',
  },
  {
    id: 'st-03',
    fullName: 'Phạm Thị Thúy',
    email: 'thuy.pt@annam.vn',
    role: 'Kế toán thanh toán',
    status: 'active',
    lastActive: 'Hôm qua',
  },
];

export function ClientStaffView(): React.JSX.Element {
  const [staffList] = React.useState<StaffItem[]>(MOCK_CLIENT_STAFF);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [isInviteOpen, setIsInviteOpen] = React.useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = React.useState<string>('');

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả nhân sự', count: staffList.length },
    {
      id: 'active',
      label: 'Đang hoạt động',
      count: staffList.filter((s) => s.status === 'active').length,
    },
  ];

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviteOpen(false);
    toast.success(`Đã gửi thư mời quản trị đến email ${inviteEmail}!`);
    setInviteEmail('');
  };

  const columns: ColumnDefinition<StaffItem>[] = [
    {
      key: 'fullName',
      header: 'HỌ VÀ TÊN / EMAIL',
      width: '38%',
      render: (row) => (
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
            {row.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-slate-900">{row.fullName}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'VAI TRÒ PHÂN QUYỀN',
      width: '28%',
      render: (row) => (
        <span className="flex items-center space-x-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
          <Shield className="h-3.5 w-3.5 text-primary" />
          <span>{row.role}</span>
        </span>
      ),
    },
    {
      key: 'lastActive',
      header: 'HOẠT ĐỘNG',
      width: '20%',
      render: (row) => <span className="text-xs text-slate-500">{row.lastActive}</span>,
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '14%',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'active' : 'warning'}>
          {row.status === 'active' ? 'HOẠT ĐỘNG' : 'CHỜ DUYỆT'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="PHÂN QUYỀN NỘI BỘ"
        title="Thành Viên & Quản Trị Viên Tổ Chức"
        searchPlaceholder="Tìm nhân viên..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Mời Thành Viên Mới"
        onPrimaryAction={() => setIsInviteOpen(true)}
      />

      <DataTable columns={columns} data={staffList} keyExtractor={(row) => row.id} />

      {/* Invite Modal */}
      <AppDialog
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
        title="Mời Nhân Viên Tham Gia Quản Trị"
        description="Nhân viên sẽ nhận email kích hoạt và quyền truy cập theo vai trò được chọn"
        maxWidthClass="max-w-md"
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">Email nhân viên:</label>
            <Input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="nhanvien@congty.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Chọn vai trò:</label>
            <select className="mt-1 w-full rounded-xl border border-surface-border bg-white p-2.5 text-xs text-slate-800 outline-none">
              <option>Quản trị viên IT (Toàn quyền quản trị Hosting/Domain)</option>
              <option>Kế toán (Xem hóa đơn và nạp tiền ví)</option>
              <option>Người xem (Chỉ xem thông số kỹ thuật)</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsInviteOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" size="sm" className="font-bold">
              Gửi lời mời
            </Button>
          </div>
        </form>
      </AppDialog>
    </div>
  );
}
