/**
 * @file AppPopover.tsx
 * @description Core Popover Wrapper conforming to Z-Index standards (z-[1000])
 */
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/utils';

export interface AppPopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
}

export function AppPopover({
  trigger,
  children,
  align = 'center',
  sideOffset = 4,
  className,
}: AppPopoverProps): React.JSX.Element {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-[1000] rounded-xl border border-surface-border bg-white p-4 shadow-xl transition-all focus:outline-none',
            className
          )}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
