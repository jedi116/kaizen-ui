import { useCategories } from './queries/useCategories';
import { useJournalsList } from './queries/useJournals';
import { useSummary } from './queries/useSummary';
import { useCategoryMutations } from './mutations/useCategoryMutations';
import { useJournalMutations } from './mutations/useJournalMutations';
import type { JournalFilters } from '../types';

interface UseFinanceOptions {
  journalFilters?: JournalFilters;
  summaryStartDate?: string;
  summaryEndDate?: string;
}

/**
 * Composed hook that provides all finance-related data and mutations.
 * Combines categories, journals, and summary queries with mutation handlers.
 */
export const useFinance = (options: UseFinanceOptions = {}) => {
  const { journalFilters = {}, summaryStartDate, summaryEndDate } = options;

  // Queries
  const categoriesQuery = useCategories();
  const journalsQuery = useJournalsList(journalFilters);
  const summaryQuery = useSummary({
    startDate: summaryStartDate,
    endDate: summaryEndDate,
  });

  // Mutations
  const categoryMutations = useCategoryMutations();
  const journalMutations = useJournalMutations();

  return {
    // Data
    categories: categoriesQuery.data ?? [],
    journals: journalsQuery.journals,
    pagination: journalsQuery.pagination,
    summary: summaryQuery.data ?? null,

    // Loading states
    isLoading: categoriesQuery.isLoading || journalsQuery.isLoading || summaryQuery.isLoading,
    isCategoriesLoading: categoriesQuery.isLoading,
    isJournalsLoading: journalsQuery.isLoading,
    isSummaryLoading: summaryQuery.isLoading,
    isMutating: categoryMutations.isLoading || journalMutations.isLoading,

    // Error states
    categoriesError: categoriesQuery.error,
    journalsError: journalsQuery.error,
    summaryError: summaryQuery.error,

    // Refetch functions
    refetchCategories: categoriesQuery.refetch,
    refetchJournals: journalsQuery.refetch,
    refetchSummary: summaryQuery.refetch,

    // Mutations (excluding isLoading which is renamed to isMutating above)
    createCategory: categoryMutations.createCategory,
    updateCategory: categoryMutations.updateCategory,
    deleteCategory: categoryMutations.deleteCategory,
    createJournal: journalMutations.createJournal,
    updateJournal: journalMutations.updateJournal,
    deleteJournal: journalMutations.deleteJournal,
  };
};

export default useFinance;
