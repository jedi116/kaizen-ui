import { useInfiniteQuery } from '@tanstack/react-query';
import { financeApi } from '../../api';
import { queryKeys } from '../../lib/queryClient';
import type { JournalFilters, JournalListResponse } from '../../types';

const DEFAULT_PAGE_SIZE = 20;

export const useInfiniteJournals = (
  filters: Omit<JournalFilters, 'page' | 'page_size'> = {},
  enabled = true
) => {
  const query = useInfiniteQuery<JournalListResponse, Error>({
    queryKey: [...queryKeys.finance.journals(), 'infinite', filters],
    queryFn: async ({ pageParam }) => {
      return financeApi.getJournals({
        ...filters,
        page: pageParam as number,
        page_size: DEFAULT_PAGE_SIZE,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total_count / lastPage.page_size);
      if (lastPage.page < totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled,
  });

  // Flatten all pages into a single journals array
  const journals = query.data?.pages.flatMap((page) => page.journals) ?? [];

  // Get total count from first page
  const totalCount = query.data?.pages[0]?.total_count ?? 0;

  return {
    ...query,
    journals,
    totalCount,
  };
};

export default useInfiniteJournals;
