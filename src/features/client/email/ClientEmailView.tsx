/**
 * @file ClientEmailView.tsx
 * @description Client Workspace Mailboxes Management View
 */
import * as React from 'react';
import { Mail } from 'lucide-react';
import { FilterSearchHeader, FilterOption } from '@/components/molecular';
import { DataTable, ColumnDefinition, Badge, Button, AppDialog, Input } from '@/components/common';
import { toast } from 'sonner';

export interface ClientMailboxItem {
  id: string;
  emailAddress: string;
  domain: string;
  storageUsed: string;
  storageMax: string;
  status: 'active' | 'locked';
}

export const MOCK_CLIENT_MAILBOXES: ClientMailboxItem[] = [
  {
    id: 'mb-01',
    emailAddress: 'contact@annam.vn',
    domain: 'annam.vn',
    storageUsed: '1.2GB',
    storageMax: '5GB',
    status: 'active',
  },
  {
    id: 'mb-02',
    emailAddress: 'admin@annam.vn',
    domain: 'annam.vn',
    storageUsed: '3.4GB',
    storageMax: '5GB',
    status: 'active',
  },
  {
    id: 'mb-03',
    emailAddress: 'sales@annam.vn',
    domain: 'annam.vn',
    storageUsed: '0.8GB',
    storageMax: '5GB',
    status: 'active',
  },
];

export function ClientEmailView(): React.JSX.Element {
  const [mailboxes] = React.useState<ClientMailboxItem[]>(MOCK_CLIENT_MAILBOXES);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);
  const [newEmail, setNewEmail] = React.useState<string>('');

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'Tất cả hòm thư', count: mailboxes.length },
    {
      id: 'active',
      label: 'Đang hoạt động',
      count: mailboxes.filter((m) => m.status === 'active').length,
    },
  ];

  const handleCreateMailbox = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreateOpen(false);
    toast.success(`Đã tạo hộp thư ${newEmail}@annam.vn thành công!`);
    setNewEmail('');
  };

  const columns: ColumnDefinition<ClientMailboxItem>[] = [
    {
      key: 'emailAddress',
      header: 'ĐỊA CHỈ EMAIL',
      width: '35%',
      render: (row) => (
        <div className="flex items-center space-x-2.5">
          <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
          <div>
            <p className="font-bold text-slate-900">{row.emailAddress}</p>
            <p className="text-xs text-slate-400">Tên miền: {row.domain}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'storage',
      header: 'DUNG LƯỢNG ĐÃ DÙNG',
      width: '30%',
      render: (row) => (
        <div>
          <span className="text-xs font-semibold text-slate-700">
            {row.storageUsed} / {row.storageMax}
          </span>
          <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-primary" style={{ width: '28%' }} />
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'TRẠNG THÁI',
      width: '20%',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'active' : 'warning'}>
          {row.status === 'active' ? 'HOẠT ĐỘNG' : 'TẠM KHÓA'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'THAO TÁC',
      width: '15%',
      className: 'text-right',
      render: () => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.info('Đổi mật khẩu hộp thư')}
          className="text-xs"
        >
          Đổi mật khẩu
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <FilterSearchHeader
        categoryLabel="DỊCH VỤ EMAIL WORKSPACE"
        title="Danh Sách Hộp Thư Doanh Nghiệp"
        searchPlaceholder="Tìm địa chỉ email..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        primaryActionLabel="Tạo Hộp Thư Mới"
        onPrimaryAction={() => setIsCreateOpen(true)}
      />

      <DataTable columns={columns} data={mailboxes} keyExtractor={(row) => row.id} />

      {/* Create Mailbox Dialog */}
      <AppDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="Tạo Hộp Thư Doanh Nghiệp Mới"
        description="Gói dịch vụ Email Pro: Còn trống 2 trên 5 tài khoản"
        maxWidthClass="max-w-md"
      >
        <form onSubmit={handleCreateMailbox} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">Tên người dùng hòm thư:</label>
            <div className="mt-1 flex items-center space-x-2">
              <Input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="vd: marketing"
                className="flex-1"
              />
              <span className="text-xs font-bold text-slate-600">@annam.vn</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Mật khẩu ban đầu:</label>
            <Input type="password" defaultValue="Satek@2026Secure" className="mt-1" />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" size="sm" className="font-bold">
              Xác nhận tạo
            </Button>
          </div>
        </form>
      </AppDialog>
    </div>
  );
}
