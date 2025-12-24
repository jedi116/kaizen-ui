import { create } from 'zustand';
import type { FinanceJournal, FinanceCategory, JournalFilters } from '../types';

type FinanceTab = 'transactions' | 'categories' | 'summary';
type FilterType = 'all' | 'income' | 'expense';

interface FinanceUIState {
  // Tab state
  activeTab: FinanceTab;
  setActiveTab: (tab: FinanceTab) => void;

  // Transaction modal state
  isTransactionModalOpen: boolean;
  editingTransaction: FinanceJournal | null;
  openTransactionModal: (transaction?: FinanceJournal) => void;
  closeTransactionModal: () => void;

  // Category modal state
  isCategoryModalOpen: boolean;
  editingCategory: FinanceCategory | null;
  openCategoryModal: (category?: FinanceCategory) => void;
  closeCategoryModal: () => void;

  // Filter state
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;

  // Date range filter
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  setDateRange: (startDate: string | null, endDate: string | null) => void;
  clearDateRange: () => void;
  clearAllFilters: () => void;

  // Build journal filters from UI state
  getJournalFilters: () => JournalFilters;

  // Reset all UI state
  reset: () => void;
}

const initialState = {
  activeTab: 'transactions' as FinanceTab,
  isTransactionModalOpen: false,
  editingTransaction: null,
  isCategoryModalOpen: false,
  editingCategory: null,
  filterType: 'all' as FilterType,
  dateRange: {
    startDate: null,
    endDate: null,
  },
};

export const useFinanceStore = create<FinanceUIState>((set, get) => ({
  ...initialState,

  // Tab actions
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Transaction modal actions
  openTransactionModal: (transaction) =>
    set({
      isTransactionModalOpen: true,
      editingTransaction: transaction || null,
    }),
  closeTransactionModal: () =>
    set({
      isTransactionModalOpen: false,
      editingTransaction: null,
    }),

  // Category modal actions
  openCategoryModal: (category) =>
    set({
      isCategoryModalOpen: true,
      editingCategory: category || null,
    }),
  closeCategoryModal: () =>
    set({
      isCategoryModalOpen: false,
      editingCategory: null,
    }),

  // Filter actions
  setFilterType: (type) => set({ filterType: type }),

  // Date range actions
  setDateRange: (startDate, endDate) =>
    set({
      dateRange: { startDate, endDate },
    }),
  clearDateRange: () =>
    set({
      dateRange: { startDate: null, endDate: null },
    }),
  clearAllFilters: () =>
    set({
      filterType: 'all',
      dateRange: { startDate: null, endDate: null },
    }),

  // Build filters for API calls
  getJournalFilters: () => {
    const { filterType, dateRange } = get();
    const filters: JournalFilters = {};

    if (filterType !== 'all') {
      filters.type = filterType;
    }

    if (dateRange.startDate) {
      filters.start_date = dateRange.startDate;
    }

    if (dateRange.endDate) {
      filters.end_date = dateRange.endDate;
    }

    return filters;
  },

  // Reset
  reset: () => set(initialState),
}));

export default useFinanceStore;
