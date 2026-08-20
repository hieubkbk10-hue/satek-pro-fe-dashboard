/**
 * @file MultiStepWizardBar.tsx
 * @description 6-Step Wizard Navigation Header Component (Matches Figma Promotions & Combos)
 */
import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils';

export interface WizardStep {
  id: number;
  label: string;
  subLabel?: string;
}

export interface MultiStepWizardBarProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
  className?: string;
}

export function MultiStepWizardBar({
  steps,
  currentStep,
  onStepClick,
  className,
}: MultiStepWizardBarProps): React.JSX.Element {
  return (
    <div className={cn('w-full overflow-x-auto py-3', className)}>
      <div className="flex min-w-[640px] items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle & Label */}
              <button
                onClick={() => onStepClick?.(step.id)}
                disabled={!onStepClick || step.id > currentStep}
                type="button"
                className={cn(
                  'flex items-center space-x-3 text-left transition-colors',
                  onStepClick && step.id <= currentStep ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-sm transition-all',
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                        ? 'bg-primary text-white ring-4 ring-primary/20'
                        : 'border border-slate-200 bg-slate-100 text-slate-400'
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                </div>

                <div>
                  <p
                    className={cn(
                      'text-xs font-bold tracking-tight',
                      isCurrent ? 'text-primary' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.subLabel && (
                    <p className="text-[10px] font-medium text-slate-400">{step.subLabel}</p>
                  )}
                </div>
              </button>

              {/* Connecting Line */}
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-4 h-0.5 flex-1 transition-colors',
                    step.id < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
