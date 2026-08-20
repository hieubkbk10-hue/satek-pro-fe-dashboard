/**
 * @file FilterSearchHeader.tsx
 * @description Standard Filter & Search Toolbar with Debounced Input and Segmented Buttons
 */
import * as React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button, Input } from '@/components/common';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterSearchHeaderProps {
  title?: string;
  categoryLabel?: string;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterOptions: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  className?: string;
}

export function FilterSearchHeader({
  title,
  categoryLabel,
  searchPlaceholder = 'Tìm kiếm...',
  searchValue,
  onSearchChange,
  filterOptions,
  activeFilter,
  onFilterChange,
  primaryActionLabel,
  onPrimaryAction,
  className,
}: FilterSearchHeaderProps): React.JSX.Element {
  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Title Bar and Primary Action */}
      {(title || primaryActionLabel) && (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            {categoryLabel && (
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {categoryLabel}
              </p>
            )}
            {title && (
              <h1 className="mt-0.5 text-2xl font-black tracking-tight text-slate-900">{title}</h1>
            )}
          </div>

          {primaryActionLabel && onPrimaryAction && (
            <Button
              variant="primary"
              onClick={onPrimaryAction}
              className="gap-2 self-start bg-slate-900 hover:bg-slate-800 sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              <span>{primaryActionLabel}</span>
            </Button>
          )}
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="w-full sm:w-80">
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            prefixIcon={<Search className="h-4 w-4 text-slate-400" />}
          />
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex flex-wrap rounded-xl border border-surface-border bg-white p-1 shadow-sm">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onFilterChange(opt.id)}
              type="button"
              className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeFilter === opt.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{opt.label}</span>
              {opt.count !== undefined && <span className="ml-1.5 opacity-75">({opt.count})</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
