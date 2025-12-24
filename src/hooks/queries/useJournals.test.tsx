import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useJournals, useJournalsList } from './useJournals';
import { financeApi } from '../../api';

// Mock the API
vi.mock('../../api', () => ({
  financeApi: {
    getJournals: vi.fn(),
    getJournal: vi.fn(),
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

describe('useJournals', () => {
  const mockResponse = {
    journals: [
      {
        ID: 1,
        user_id: 1,
        category_id: 1,
        type: 'income' as const,
        amount: 5000,
        title: 'Salary',
        description: '',
        date: '2024-01-15',
        payment_method: 'bank_transfer',
        location: '',
        is_recurring: false,
        receipt_url: '',
        CreatedAt: '',
        UpdatedAt: '',
        DeletedAt: null,
      },
    ],
    page: 1,
    page_size: 20,
    total_count: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches journals successfully', async () => {
    vi.mocked(financeApi.getJournals).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useJournals(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockResponse);
  });

  it('passes filters to API', async () => {
    vi.mocked(financeApi.getJournals).mockResolvedValue(mockResponse);

    const filters = { type: 'income' as const, page: 1 };
    const { result } = renderHook(() => useJournals(filters), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(financeApi.getJournals).toHaveBeenCalledWith(filters);
  });

  it('handles error state', async () => {
    const error = new Error('Failed to fetch');
    vi.mocked(financeApi.getJournals).mockRejectedValue(error);

    const { result } = renderHook(() => useJournals(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});

describe('useJournalsList', () => {
  const mockResponse = {
    journals: [
      {
        ID: 1,
        user_id: 1,
        category_id: 1,
        type: 'income' as const,
        amount: 5000,
        title: 'Salary',
        description: '',
        date: '2024-01-15',
        payment_method: 'bank_transfer',
        location: '',
        is_recurring: false,
        receipt_url: '',
        CreatedAt: '',
        UpdatedAt: '',
        DeletedAt: null,
      },
    ],
    page: 1,
    page_size: 20,
    total_count: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns journals array and pagination', async () => {
    vi.mocked(financeApi.getJournals).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useJournalsList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.journals).toEqual(mockResponse.journals);
    expect(result.current.pagination).toEqual({
      page: 1,
      pageSize: 20,
      totalCount: 1,
    });
  });

  it('returns empty array when no data', async () => {
    vi.mocked(financeApi.getJournals).mockResolvedValue({
      journals: [],
      page: 1,
      page_size: 20,
      total_count: 0,
    });

    const { result } = renderHook(() => useJournalsList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.journals).toEqual([]);
  });
});
