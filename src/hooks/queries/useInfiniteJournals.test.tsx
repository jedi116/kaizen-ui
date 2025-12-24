import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '../../test/test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInfiniteJournals } from './useInfiniteJournals';
import { financeApi } from '../../api';
import type { ReactNode } from 'react';

// Mock the finance API
vi.mock('../../api', () => ({
  financeApi: {
    getJournals: vi.fn(),
  },
}));

const mockJournals = [
  {
    ID: 1,
    title: 'Salary',
    amount: 5000,
    type: 'income',
    date: '2024-01-15',
    category_id: 1,
  },
  {
    ID: 2,
    title: 'Groceries',
    amount: 150,
    type: 'expense',
    date: '2024-01-16',
    category_id: 2,
  },
];

describe('useInfiniteJournals', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
          staleTime: 0,
        },
      },
    });
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('fetches initial page of journals', async () => {
    vi.mocked(financeApi.getJournals).mockResolvedValue({
      journals: mockJournals,
      page: 1,
      page_size: 20,
      total_count: 2,
    });

    const { result } = renderHook(() => useInfiniteJournals(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.journals).toHaveLength(2);
    expect(result.current.totalCount).toBe(2);
    expect(financeApi.getJournals).toHaveBeenCalledWith({
      page: 1,
      page_size: 20,
    });
  });

  it('passes filters to the API', async () => {
    vi.mocked(financeApi.getJournals).mockResolvedValue({
      journals: mockJournals.filter((j) => j.type === 'income'),
      page: 1,
      page_size: 20,
      total_count: 1,
    });

    const filters = { type: 'income' as const };
    const { result } = renderHook(() => useInfiniteJournals(filters), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(financeApi.getJournals).toHaveBeenCalledWith({
      type: 'income',
      page: 1,
      page_size: 20,
    });
  });

  it('indicates when there are more pages', async () => {
    vi.mocked(financeApi.getJournals).mockResolvedValue({
      journals: mockJournals,
      page: 1,
      page_size: 20,
      total_count: 50,
    });

    const { result } = renderHook(() => useInfiniteJournals(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.hasNextPage).toBe(true);
  });

  it('indicates when there are no more pages', async () => {
    vi.mocked(financeApi.getJournals).mockResolvedValue({
      journals: mockJournals,
      page: 1,
      page_size: 20,
      total_count: 2,
    });

    const { result } = renderHook(() => useInfiniteJournals(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.hasNextPage).toBe(false);
  });

  it('can fetch next page', async () => {
    vi.mocked(financeApi.getJournals)
      .mockResolvedValueOnce({
        journals: mockJournals,
        page: 1,
        page_size: 20,
        total_count: 50,
      })
      .mockResolvedValueOnce({
        journals: [
          {
            ID: 3,
            title: 'Rent',
            amount: 1200,
            type: 'expense',
            date: '2024-01-17',
            category_id: 3,
          },
        ],
        page: 2,
        page_size: 20,
        total_count: 50,
      });

    const { result } = renderHook(() => useInfiniteJournals(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Fetch next page
    result.current.fetchNextPage();

    await waitFor(() => {
      expect(result.current.journals).toHaveLength(3);
    });
  });

  it('flattens all pages into a single journals array', async () => {
    vi.mocked(financeApi.getJournals)
      .mockResolvedValueOnce({
        journals: mockJournals.slice(0, 1),
        page: 1,
        page_size: 1,
        total_count: 2,
      })
      .mockResolvedValueOnce({
        journals: mockJournals.slice(1, 2),
        page: 2,
        page_size: 1,
        total_count: 2,
      });

    const { result } = renderHook(() => useInfiniteJournals(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    result.current.fetchNextPage();

    await waitFor(() => {
      expect(result.current.journals).toHaveLength(2);
    });

    expect(result.current.journals[0].ID).toBe(1);
    expect(result.current.journals[1].ID).toBe(2);
  });

  it('does not fetch when disabled', async () => {
    renderHook(() => useInfiniteJournals({}, false), { wrapper });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(financeApi.getJournals).not.toHaveBeenCalled();
  });
});
