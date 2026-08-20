/**
 * @file DataTable.tsx
 * @description Tabular View conforming to Fixed Table Layout Standards (UIX001)
 */
import * as React from 'react';
import { cn } from '@/utils';

export interface ColumnDefinition<T> {
  key: string;
  header: string;
  width?: string; // e.g. "120px", "20%"
  className?: string;
  render?: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'Không có dữ liệu hiển thị',
  className,
}: DataTableProps<T>): React.JSX.Element {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-xl border border-surface-border bg-white shadow-sm',
        className
      )}
    >
      {/* UI: Bắt buộc table-fixed để cố định layout cột (Rule UIX001) */}
      <table className="w-full table-fixed divide-y divide-surface-border text-left text-sm">
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} style={{ width: col.width }} />
          ))}
        </colgroup>
        <thead className="bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className={cn('px-4 py-3.5', col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border bg-white text-slate-700">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span>Đang tải dữ liệu...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={keyExtractor(row)} className="transition-colors hover:bg-slate-50/70">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn('truncate px-4 py-3.5 align-middle', col.className)}
                  >
                    {col.render
                      ? col.render(row, index)
                      : ((row as Record<string, unknown>)[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
