/**
 * @file MetricSummaryCards.tsx
 * @description Standard 4-Metric Grid Cards Component (Matches Client & Admin Dashboard Figma)
 */
import * as React from 'react';
import { cn } from '@/utils';

export interface MetricCardItem {
  id: string;
  label: string;
  value: string | number;
  description?: string;
  variant?: 'emerald' | 'amber' | 'sky' | 'default';
  icon?: React.ReactNode;
}

export interface MetricSummaryCardsProps {
  metrics: MetricCardItem[];
  className?: string;
}

export function MetricSummaryCards({
  metrics,
  className,
}: MetricSummaryCardsProps): React.JSX.Element {
  const valueColorClass = {
    emerald: 'text-emerald-600',
    amber: 'text-amber-500',
    sky: 'text-sky-600',
    default: 'text-slate-900',
  };

  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {metrics.map((card) => (
        <div
          key={card.id}
          className="rounded-2xl border border-surface-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {card.label}
            </p>
            {card.icon && <span className="text-slate-400">{card.icon}</span>}
          </div>

          <p
            className={cn('mt-1.5 text-2xl font-black', valueColorClass[card.variant || 'default'])}
          >
            {card.value}
          </p>

          {card.description && (
            <p className="mt-1 line-clamp-1 text-xs text-slate-500">{card.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
