/**
 * @file Skeleton.tsx
 * @description Shimmer Loading Placeholder Component
 */
import * as React from 'react';
import { cn } from '@/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps): React.JSX.Element {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-slate-200/80', className)}
      aria-hidden="true"
      {...props}
    />
  );
}
