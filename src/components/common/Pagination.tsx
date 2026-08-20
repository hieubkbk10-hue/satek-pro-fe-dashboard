/**
 * @file Pagination.tsx
 * @description Standard Table Pagination Control (Matches Newmoon-Admin)
 */
import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className,
}: PaginationProps): React.JSX.Element {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-4 py-3 text-xs text-slate-500 sm:flex-row',
        className
      )}
    >
      {/* Information text */}
      <div>
        <span>
          Hiển thị <span className="font-semibold text-slate-800">{startItem}</span> -{' '}
          <span className="font-semibold text-slate-800">{endItem}</span> trên{' '}
          <span className="font-semibold text-slate-800">{totalItems}</span> bản ghi
        </span>
      </div>

      {/* Page navigation buttons */}
      <div className="flex items-center space-x-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-8 w-8 p-0"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((p, idx) => (
          <React.Fragment key={idx}>
            {p === '...' ? (
              <span className="px-2 text-slate-400">...</span>
            ) : (
              <Button
                variant={currentPage === p ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onPageChange(p as number)}
                className={`h-8 w-8 p-0 text-xs font-semibold ${
                  currentPage === p ? 'bg-slate-900 text-white' : ''
                }`}
              >
                {p}
              </Button>
            )}
          </React.Fragment>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-8 w-8 p-0"
          aria-label="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Page size selector */}
        {onPageSizeChange && (
          <div className="ml-3 flex items-center space-x-1.5">
            <span>/ trang:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded-lg border border-surface-border bg-white px-2 py-1 text-xs text-slate-700 outline-none"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
