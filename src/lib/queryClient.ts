import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

// Query keys factory for type-safe and consistent query keys
export const queryKeys = {
  // Finance
  finance: {
    all: ['finance'] as const,
    categories: () => [...queryKeys.finance.all, 'categories'] as const,
    categoriesByType: (type?: 'income' | 'expense') =>
      [...queryKeys.finance.categories(), { type }] as const,
    journals: () => [...queryKeys.finance.all, 'journals'] as const,
    journalsList: (filters?: Record<string, unknown>) =>
      [...queryKeys.finance.journals(), 'list', filters] as const,
    journal: (id: number) => [...queryKeys.finance.journals(), id] as const,
    summary: () => [...queryKeys.finance.all, 'summary'] as const,
    summaryByDate: (startDate?: string, endDate?: string) =>
      [...queryKeys.finance.summary(), { startDate, endDate }] as const,
  },
  // Auth
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },
} as const;

export default queryClient;
