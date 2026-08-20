/**
 * @file TabsBar.tsx
 * @description Core Atomic Tabs Component with Orange Underline Indicator
 */
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabsBar({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabsBarProps): React.JSX.Element {
  return (
    <TabsPrimitive.Root
      value={activeTab}
      onValueChange={onTabChange}
      className={cn('w-full', className)}
    >
      <TabsPrimitive.List className="flex space-x-6 border-b border-surface-border">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.id}
            value={tab.id}
            className={cn(
              'group relative cursor-pointer pb-3 text-sm font-medium outline-none transition-colors',
              activeTab === tab.id
                ? 'font-semibold text-primary'
                : 'text-slate-500 hover:text-slate-800'
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-primary" />
            )}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
