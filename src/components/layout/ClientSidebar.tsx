/**
 * @file ClientSidebar.tsx
 * @description Compact Client Sidebar Navigation (Matches Figma Satek Pro Client)
 */
import * as React from 'react';
import { CLIENT_NAV_GROUPS } from '@/config/client-nav';
import { cn } from '@/utils';

export interface ClientSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function ClientSidebar({ currentPath, onNavigate }: ClientSidebarProps): React.JSX.Element {
  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-surface-border bg-white">
      {/* Brand Logo Header */}
      <div className="flex h-16 items-center border-b border-surface-border px-6">
        <span className="text-2xl font-black tracking-tight text-primary">SATEK</span>
        <span className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-400">
          PORTAL
        </span>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
        {CLIENT_NAV_GROUPS.map((group) => (
          <div key={group.id} className="space-y-1">
            <h4 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {group.groupTitle}
            </h4>
            <div className="mt-1 space-y-0.5">
              {group.items.map((item) => {
                const IconComp = item.icon;
                const isActive =
                  currentPath === item.path || currentPath.startsWith(`${item.path}/`);

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.path)}
                    type="button"
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-slate-100/80 font-semibold text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <IconComp
                        className={cn(
                          'h-4 w-4 flex-shrink-0',
                          isActive ? 'text-primary' : 'text-slate-500'
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Client User Profile Card (Matches Figma Bottom Card: Công ty An Nam) */}
      <div className="border-t border-surface-border p-4">
        <div className="flex items-center space-x-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-2.5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-800">
            A
          </div>
          <div className="truncate">
            <p className="truncate text-xs font-bold text-slate-900">Công ty An Nam</p>
            <p className="truncate text-[10px] font-medium text-emerald-700">Gói doanh nghiệp</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
