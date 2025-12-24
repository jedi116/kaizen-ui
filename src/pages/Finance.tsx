import { useState, useMemo } from 'react';
import { Plus, FolderPlus } from 'lucide-react';
import { Button } from '../components/ui';
import {
  TransactionModal,
  CategoryModal,
  FinanceSummary,
  TransactionList,
  CategoryList,
  FilterBar,
} from '../components/finance';
import { useCategories, useInfiniteJournals, useJournalsList, useSummary } from '../hooks';
import { useJournalMutations, useCategoryMutations } from '../hooks';
import { useFinanceStore } from '../stores';
import { tabsConfig } from '../config/finance.config';
import type { FinanceTab } from '../config/finance.config';
import type {
  FinanceJournal,
  FinanceCategory,
  CreateJournalRequest,
  CreateCategoryRequest,
} from '../types';

const Finance = () => {
  // UI State from Zustand
  const {
    activeTab,
    setActiveTab,
    isTransactionModalOpen,
    editingTransaction,
    openTransactionModal,
    closeTransactionModal,
    isCategoryModalOpen,
    editingCategory,
    openCategoryModal,
    closeCategoryModal,
    filterType,
    setFilterType,
    dateRange,
    setDateRange,
    clearDateRange,
    clearAllFilters,
    getJournalFilters,
  } = useFinanceStore();

  // Local state for summary month selection
  const [summaryMonth, setSummaryMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  // Calculate start and end dates for the selected summary month
  const summaryDateRange = useMemo(() => {
    const startDate = new Date(summaryMonth.getFullYear(), summaryMonth.getMonth(), 1);
    const endDate = new Date(summaryMonth.getFullYear(), summaryMonth.getMonth() + 1, 0);
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  }, [summaryMonth]);

  // Data fetching with TanStack Query
  const { data: categories = [] } = useCategories();

  // Transactions tab data - with filters and infinite scroll
  const filters = getJournalFilters();
  const { journals, totalCount, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteJournals(filters);

  // Summary tab data - fetch ALL journals for the selected month
  const { journals: summaryJournals } = useJournalsList(
    {
      start_date: summaryDateRange.startDate,
      end_date: summaryDateRange.endDate,
      page_size: 1000, // High page size to get all transactions for the month
    },
    activeTab === 'summary' // Only fetch when summary tab is active
  );

  // Summary API data for the selected month
  const { data: summary } = useSummary({
    startDate: summaryDateRange.startDate,
    endDate: summaryDateRange.endDate,
  });

  // Mutations
  const { createJournal, updateJournal, deleteJournal } = useJournalMutations();
  const { createCategory, updateCategory, deleteCategory } = useCategoryMutations();

  const handleCreateTransaction = async (data: CreateJournalRequest) => {
    if (editingTransaction) {
      await updateJournal.mutateAsync({ id: editingTransaction.ID, data });
    } else {
      await createJournal.mutateAsync(data);
    }
    closeTransactionModal();
  };

  const handleCreateCategory = async (data: CreateCategoryRequest) => {
    if (editingCategory) {
      await updateCategory.mutateAsync({ id: editingCategory.ID, data });
    } else {
      await createCategory.mutateAsync(data);
    }
    closeCategoryModal();
  };

  const handleEditTransaction = (transaction: FinanceJournal) => {
    openTransactionModal(transaction);
  };

  const handleEditCategory = (category: FinanceCategory) => {
    openCategoryModal(category);
  };

  const handleDeleteTransaction = async (id: number) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      await deleteJournal.mutateAsync(id);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      await deleteCategory.mutateAsync(id);
    }
  };

  const handleStartDateChange = (date: string | null) => {
    setDateRange(date, dateRange.endDate);
  };

  const handleEndDateChange = (date: string | null) => {
    setDateRange(dateRange.startDate, date);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Tabs */}
        <div className="flex gap-2 p-1 glass-card rounded-xl">
          {tabsConfig.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as FinanceTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-accent-cyan/30 to-accent-violet/30 text-white'
                  : 'text-white/60 hover:text-white hover:bg-glass-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {activeTab === 'transactions' && (
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => openTransactionModal()}
            >
              Add Transaction
            </Button>
          )}
          {activeTab === 'categories' && (
            <Button
              variant="primary"
              leftIcon={<FolderPlus className="w-4 h-4" />}
              onClick={() => openCategoryModal()}
            >
              Add Category
            </Button>
          )}
        </div>
      </div>

      {/* Filter Bar - Only show for transactions */}
      {activeTab === 'transactions' && (
        <FilterBar
          filterType={filterType}
          onFilterTypeChange={setFilterType}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onClearDateRange={clearDateRange}
          onClearAllFilters={clearAllFilters}
        />
      )}

      {/* Content */}
      {activeTab === 'transactions' && (
        <TransactionList
          transactions={journals}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          totalCount={totalCount}
        />
      )}

      {activeTab === 'categories' && (
        <CategoryList
          categories={categories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          onAdd={() => openCategoryModal()}
        />
      )}

      {activeTab === 'summary' && (
        <FinanceSummary
          summary={summary ?? null}
          categories={categories}
          journals={summaryJournals}
          selectedMonth={summaryMonth}
          onMonthChange={setSummaryMonth}
        />
      )}

      {/* Modals */}
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={closeTransactionModal}
        onSubmit={handleCreateTransaction}
        categories={categories}
        transaction={editingTransaction}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        onSubmit={handleCreateCategory}
        category={editingCategory}
      />
    </div>
  );
};

export default Finance;
