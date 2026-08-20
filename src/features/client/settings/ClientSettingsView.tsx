/**
 * @file ClientSettingsView.tsx
 * @description Client Company Profile, Security 2FA & Notification Settings
 */
import * as React from 'react';
import { Building2, Shield, Bell, Save } from 'lucide-react';
import { Button, Input, Switch } from '@/components/common';
import { toast } from 'sonner';

export function ClientSettingsView(): React.JSX.Element {
  const [companyName, setCompanyName] = React.useState<string>('Công ty Cổ Phần An Nam');
  const [taxCode, setTaxCode] = React.useState<string>('0315892110');
  const [address, setAddress] = React.useState<string>(
    '128 Nguyễn Thị Minh Khai, P.6, Q.3, TP. Hồ Chí Minh'
  );
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = React.useState<boolean>(true);
  const [isEmailNotify, setIsEmailNotify] = React.useState<boolean>(true);

  const handleSave = () => {
    toast.success('Đã cập nhật thông tin doanh nghiệp và cài đặt bảo mật!');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          TÀI KHOẢN & TỔ CHỨC
        </p>
        <h1 className="mt-0.5 text-2xl font-black tracking-tight text-slate-900">
          Cài Đặt Hồ Sơ & Bảo Mật
        </h1>
      </div>

      <div className="space-y-6">
        {/* Company Profile Box */}
        <div className="space-y-4 rounded-2xl border border-surface-border bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-surface-border pb-3">
            <Building2 className="h-5 w-5 text-primary" />
            <h3 className="text-base font-bold text-slate-900">Thông Tin Doanh Nghiệp (eKYC)</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">Tên doanh nghiệp:</label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Mã số thuế (MST):</label>
              <Input
                value={taxCode}
                onChange={(e) => setTaxCode(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-700">
                Địa chỉ đăng ký kinh doanh:
              </label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Security Box */}
        <div className="space-y-4 rounded-2xl border border-surface-border bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-surface-border pb-3">
            <Shield className="h-5 w-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Bảo Mật Tài Khoản (2FA)</h3>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Xác thực 2 yếu tố qua Google Authenticator
              </p>
              <p className="text-xs text-slate-400">
                Bắt buộc mã OTP 6 số khi đăng nhập từ thiết bị mới
              </p>
            </div>
            <Switch checked={isTwoFactorEnabled} onCheckedChange={setIsTwoFactorEnabled} />
          </div>
        </div>

        {/* Notifications Box */}
        <div className="space-y-4 rounded-2xl border border-surface-border bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3 border-b border-surface-border pb-3">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="text-base font-bold text-slate-900">Thông Báo Vận Hành & Gia Hạn</h3>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Nhận email cảnh báo hết hạn dịch vụ
              </p>
              <p className="text-xs text-slate-400">Gửi nhắc trước 30 ngày, 15 ngày và 7 ngày</p>
            </div>
            <Switch checked={isEmailNotify} onCheckedChange={setIsEmailNotify} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleSave}
            className="gap-2 bg-primary font-bold shadow-md shadow-primary/20 hover:bg-primary-hover"
          >
            <Save className="h-4 w-4" />
            <span>Lưu Tất Cả Thay Đổi</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
