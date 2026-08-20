/**
 * @file AdminChatAiView.tsx
 * @description Admin Chat AI Assistant Configuration & Bot Scenarios
 */
import * as React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { Button, Input, Switch } from '@/components/common';
import { toast } from 'sonner';

export function AdminChatAiView(): React.JSX.Element {
  const [isBotEnabled, setIsBotEnabled] = React.useState<boolean>(true);
  const [modelName, setModelName] = React.useState<string>('Satek Claude-3.5-Sonnet / GPT-4o');
  const [botGreeting, setBotGreeting] = React.useState<string>(
    'Xin chào quý khách! Em là Trợ lý Ảo Satek Pro. Em có thể hỗ trợ tư vấn chọn gói Hosting, cấu hình tên miền hoặc cứu hộ kỹ thuật 24/7!'
  );

  const handleSave = () => {
    toast.success('Đã lưu cấu hình Trợ lý Chat AI thành công!');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          TRÍ TUỆ NHÂN TẠO & HỖ TRỢ
        </p>
        <h1 className="mt-0.5 text-2xl font-black tracking-tight text-slate-900">
          Cấu Hình Trợ Lý Chat AI
        </h1>
      </div>

      <div className="space-y-6 rounded-2xl border border-surface-border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Kích hoạt Bot Chat AI tư vấn tự động</p>
              <p className="text-xs text-slate-400">
                Tự động trả lời thắc mắc thường gặp của khách hàng trong &lt; 1 giây
              </p>
            </div>
          </div>
          <Switch checked={isBotEnabled} onCheckedChange={setIsBotEnabled} />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">
              Mô hình AI cơ sở (LLM Engine):
            </label>
            <Input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Lời chào mở đầu:</label>
            <textarea
              rows={3}
              value={botGreeting}
              onChange={(e) => setBotGreeting(e.target.value)}
              className="mt-1 w-full rounded-xl border border-surface-border p-3 text-xs text-slate-800 outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-surface-border pt-3">
          <Button
            variant="primary"
            onClick={handleSave}
            className="gap-2 bg-primary font-bold hover:bg-primary-hover"
          >
            <Sparkles className="h-4 w-4" />
            <span>Lưu Cấu Hình AI</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
