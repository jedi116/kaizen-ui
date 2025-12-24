import { useQuery } from '@tanstack/react-query';
import { financeApi } from '../../api';
import { queryKeys } from '../../lib/queryClient';
import type { JournalFilters, JournalListResponse, FinanceJournal } from '../../types';

export const useJournals = (filters: JournalFilters = {}, enabled = true) => {
  return useQuery<JournalListResponse, Error>({
    queryKey: queryKeys.finance.journalsList(filters as Record<string, unknown>),
    queryFn: () => financeApi.getJournals(filters),
    enabled,
  });
};

export const useJournal = (id: number, enabled = true) => {
  return useQuery<FinanceJournal, Error>({
    queryKey: queryKeys.finance.journal(id),
    queryFn: () => financeApi.getJournal(id),
    enabled: enabled && id > 0,
  });
};

// Convenience hook that returns just the journals array with default empty array
export const useJournalsList = (filters: JournalFilters = {}, enabled = true) => {
  const query = useJournals(filters, enabled);

  return {
    ...query,
    journals: query.data?.journals ?? [],
    pagination: query.data
      ? {
          page: query.data.page,
          pageSize: query.data.page_size,
          totalCount: query.data.total_count,
        }
      : null,
  };
};

export default useJournals;
