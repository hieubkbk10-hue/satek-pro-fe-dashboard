/**
 * @file Badge.tsx
 * @description Core Atomic Status Badge Component
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors gap-1.5',
  {
    variants: {
      variant: {
        active: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
        warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
        error: 'bg-red-50 text-red-700 border border-red-200/60',
        neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
        primary: 'bg-primary-light text-primary border border-primary/20',
        mandatory: 'bg-orange-50 text-orange-700 border border-orange-200/60',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({
  className,
  variant,
  dot = true,
  children,
  ...props
}: BadgeProps): React.JSX.Element {
  const dotColorClass = {
    active: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    neutral: 'bg-slate-400',
    primary: 'bg-primary',
    mandatory: 'bg-orange-500',
  }[variant || 'neutral'];

  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotColorClass)} aria-hidden="true" />}
      {children}
    </span>
  );
}
