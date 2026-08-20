/**
 * @file AppErrorBoundary.tsx
 * @description Global and Widget Level Error Boundary with Safe Reload Action
 */
import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('AppErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 p-8 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-status-error">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">
            {this.props.fallbackTitle || 'Đã có lỗi xảy ra khi tải giao diện'}
          </h3>
          <p className="mt-1 max-w-md text-xs text-slate-500">
            Hệ thống đã tự động cô lập lỗi để bảo vệ ứng dụng. Vui lòng bấm nút bên dưới để tải lại
            dữ liệu.
          </p>
          <div className="mt-6">
            <Button variant="primary" onClick={this.handleReload} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Tải lại trang</span>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
