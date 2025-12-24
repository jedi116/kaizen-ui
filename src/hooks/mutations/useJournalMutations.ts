import { useMutation, useQueryClient } from '@tanstack/react-query';
import { financeApi } from '../../api';
import { queryKeys } from '../../lib/queryClient';
import type { CreateJournalRequest, UpdateJournalRequest, FinanceJournal } from '../../types';

export const useCreateJournal = () => {
  const queryClient = useQueryClient();

  return useMutation<FinanceJournal, Error, CreateJournalRequest>({
    mutationFn: (data) => financeApi.createJournal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.journals() });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.summary() });
    },
  });
};

export const useUpdateJournal = () => {
  const queryClient = useQueryClient();

  return useMutation<FinanceJournal, Error, { id: number; data: UpdateJournalRequest }>({
    mutationFn: ({ id, data }) => financeApi.updateJournal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.journals() });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.summary() });
    },
  });
};

export const useDeleteJournal = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationFn: (id) => financeApi.deleteJournal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.journals() });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.summary() });
    },
  });
};

// Combined hook for all journal mutations
export const useJournalMutations = () => {
  const createJournal = useCreateJournal();
  const updateJournal = useUpdateJournal();
  const deleteJournal = useDeleteJournal();

  return {
    createJournal,
    updateJournal,
    deleteJournal,
    isLoading: createJournal.isPending || updateJournal.isPending || deleteJournal.isPending,
  };
};

export default useJournalMutations;
