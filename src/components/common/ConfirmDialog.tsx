/**
 * @file ConfirmDialog.tsx
 * @description Confirmation Dialog Modal for destructive / sensitive actions (z-[10000])
 */
import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { AppDialog } from './AppDialog';
import { Button } from './Button';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy bỏ',
  isDestructive = false,
  isLoading = false,
  onConfirm,
}: ConfirmDialogProps): React.JSX.Element {
  return (
    <AppDialog open={open} onOpenChange={onOpenChange} title={title} maxWidthClass="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
              isDestructive ? 'bg-red-100 text-status-error' : 'bg-amber-100 text-status-warning'
            }`}
          >
            <AlertCircle className="h-5 w-5" />
          </div>
          <p className="pt-1 text-xs leading-relaxed text-slate-600">{description}</p>
        </div>

        <div className="flex items-center justify-end space-x-2.5 border-t border-surface-border pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
