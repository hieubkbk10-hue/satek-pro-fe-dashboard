/**
 * @file DropdownMenu.tsx
 * @description Dropdown Menu wrapper based on Radix UI (z-[1000])
 */
import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/utils';

export interface DropdownMenuItemConfig {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger';
  onClick: () => void;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItemConfig[];
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = 'end',
  sideOffset = 4,
  className,
}: DropdownMenuProps): React.JSX.Element {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-[1000] min-w-[160px] overflow-hidden rounded-xl border border-surface-border bg-white p-1.5 shadow-xl transition-all',
            className
          )}
        >
          {items.map((item) => (
            <DropdownMenuPrimitive.Item
              key={item.id}
              onClick={item.onClick}
              disabled={item.disabled}
              className={cn(
                'relative flex cursor-pointer select-none items-center rounded-lg px-2.5 py-2 text-xs font-medium outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                item.variant === 'danger'
                  ? 'text-status-error hover:bg-red-50 focus:bg-red-50'
                  : 'text-slate-700 hover:bg-slate-50 focus:bg-slate-50'
              )}
            >
              {item.icon && (
                <span className="mr-2 flex h-3.5 w-3.5 items-center justify-center">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
