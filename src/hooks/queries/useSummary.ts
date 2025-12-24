import { useQuery } from '@tanstack/react-query';
import { financeApi } from '../../api';
import { queryKeys } from '../../lib/queryClient';
import type { JournalSummary } from '../../types';

interface UseSummaryOptions {
  startDate?: string;
  endDate?: string;
  enabled?: boolean;
}

export const useSummary = (options: UseSummaryOptions = {}) => {
  const { startDate, endDate, enabled = true } = options;

  return useQuery<JournalSummary, Error>({
    queryKey: queryKeys.finance.summaryByDate(startDate, endDate),
    queryFn: () =>
      financeApi.getSummary({
        start_date: startDate,
        end_date: endDate,
      }),
    enabled,
  });
};

export default useSummary;
