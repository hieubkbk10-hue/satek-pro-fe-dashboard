/**
 * @file Input.tsx
 * @description Core Atomic Input Component with Prefix/Suffix Icons & Clear Button
 */
import * as React from 'react';
import { cn } from '@/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', prefixIcon, suffixIcon, error, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {prefixIcon && (
            <div className="pointer-events-none absolute left-3 flex items-center text-slate-400">
              {prefixIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-lg border border-surface-border bg-white px-3 py-2 text-sm text-slate-800 transition-colors placeholder:text-slate-400 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
              prefixIcon && 'pl-9',
              suffixIcon && 'pr-9',
              error && 'border-status-error focus-visible:ring-status-error',
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {suffixIcon && (
            <div className="absolute right-3 flex items-center text-slate-400">{suffixIcon}</div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-status-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
