import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useCategories } from './useCategories';
import { financeApi } from '../../api';

// Mock the API
vi.mock('../../api', () => ({
  financeApi: {
    getCategories: vi.fn(),
    getCategory: vi.fn(),
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

describe('useCategories', () => {
  const mockCategories = [
    {
      ID: 1,
      user_id: 1,
      name: 'Salary',
      type: 'income' as const,
      description: '',
      color: '#22c55e',
      icon: '💰',
      is_active: true,
      CreatedAt: '',
      UpdatedAt: '',
      DeletedAt: null,
    },
    {
      ID: 2,
      user_id: 1,
      name: 'Food',
      type: 'expense' as const,
      description: '',
      color: '#ef4444',
      icon: '🍔',
      is_active: true,
      CreatedAt: '',
      UpdatedAt: '',
      DeletedAt: null,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches categories successfully', async () => {
    vi.mocked(financeApi.getCategories).mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCategories);
    expect(financeApi.getCategories).toHaveBeenCalledWith({ type: undefined, active: undefined });
  });

  it('filters by type when specified', async () => {
    vi.mocked(financeApi.getCategories).mockResolvedValue([mockCategories[0]]);

    const { result } = renderHook(() => useCategories({ type: 'income' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(financeApi.getCategories).toHaveBeenCalledWith({ type: 'income', active: undefined });
  });

  it('handles error state', async () => {
    const error = new Error('Failed to fetch');
    vi.mocked(financeApi.getCategories).mockRejectedValue(error);

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('does not fetch when enabled is false', async () => {
    const { result } = renderHook(() => useCategories({ enabled: false }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(financeApi.getCategories).not.toHaveBeenCalled();
  });
});
