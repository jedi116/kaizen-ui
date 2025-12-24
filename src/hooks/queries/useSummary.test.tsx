import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useSummary } from './useSummary';
import { financeApi } from '../../api';

// Mock the API
vi.mock('../../api', () => ({
  financeApi: {
    getSummary: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useSummary', () => {
  const mockSummary = {
    total_income: 10000,
    total_expense: 5000,
    net_balance: 5000,
    entry_count: 15,
    start_date: '2024-01-01',
    end_date: '2024-01-31',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches summary successfully', async () => {
    vi.mocked(financeApi.getSummary).mockResolvedValue(mockSummary);

    const { result } = renderHook(() => useSummary(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockSummary);
  });

  it('passes date range to API', async () => {
    vi.mocked(financeApi.getSummary).mockResolvedValue(mockSummary);

    const { result } = renderHook(
      () => useSummary({ startDate: '2024-01-01', endDate: '2024-01-31' }),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(financeApi.getSummary).toHaveBeenCalledWith({
      start_date: '2024-01-01',
      end_date: '2024-01-31',
    });
  });

  it('handles error state', async () => {
    const error = new Error('Failed to fetch');
    vi.mocked(financeApi.getSummary).mockRejectedValue(error);

    const { result } = renderHook(() => useSummary(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it('does not fetch when enabled is false', async () => {
    const { result } = renderHook(() => useSummary({ enabled: false }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(financeApi.getSummary).not.toHaveBeenCalled();
  });
});
