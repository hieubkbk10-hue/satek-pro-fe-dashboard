/**
 * @file AdminHeader.tsx
 * @description Topbar Header for Admin Dashboard with Breadcrumbs & Actions
 */
import * as React from 'react';
import { Bell, Search, ChevronRight } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

export interface AdminHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  onSwitchPortal?: () => void;
}

export function AdminHeader({ breadcrumbs, onSwitchPortal }: AdminHeaderProps): React.JSX.Element {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-surface-border bg-white px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500">
        {breadcrumbs?.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
            <span
              className={item.isCurrentPage ? 'font-semibold text-slate-900' : 'text-slate-500'}
            >
              {item.label}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        {/* Switch Portal Button */}
        {onSwitchPortal && (
          <button
            onClick={onSwitchPortal}
            type="button"
            className="cursor-pointer rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
          >
            Chuyển sang Client Portal →
          </button>
        )}

        {/* Global Search Icon */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
