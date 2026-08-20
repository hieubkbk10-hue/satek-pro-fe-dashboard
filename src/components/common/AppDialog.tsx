/**
 * @file AppDialog.tsx
 * @description Core Modal Dialog Wrapper conforming to Z-Index standards (z-[10000]) and Radix asChild
 */
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/utils';

export interface AppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  maxWidthClass = 'max-w-lg',
}: AppDialogProps): React.JSX.Element {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop Z-Index */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[10000] bg-slate-900/50 backdrop-blur-sm transition-opacity" />

        {/* Content Z-Index */}
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[10000] w-full -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-surface-border bg-white p-6 shadow-2xl transition-all focus:outline-none',
            maxWidthClass
          )}
        >
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div>
              <DialogPrimitive.Title className="text-base font-semibold text-slate-900">
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="mt-0.5 text-xs text-slate-500">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          <div className="pt-4">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
