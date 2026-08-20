/**
 * @file client.ts
 * @description Centralized HTTP and Async Simulation Client with Unified Response Envelope
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export class AppApiError extends Error {
  public statusCode: number;
  public details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = 'AppApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Simulate realistic async API call with latency
 */
export async function simulateApiCall<T>(
  dataFetcher: () => T,
  delayMs = 250
): Promise<ApiResponse<T>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: dataFetcher(),
        status: 200,
        message: 'Success',
      });
    }, delayMs);
  });
}
