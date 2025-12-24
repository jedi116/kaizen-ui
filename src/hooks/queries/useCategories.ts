import { useQuery } from '@tanstack/react-query';
import { financeApi } from '../../api';
import { queryKeys } from '../../lib/queryClient';
import type { FinanceCategory } from '../../types';

interface UseCategoriesOptions {
  type?: 'income' | 'expense';
  active?: boolean;
  enabled?: boolean;
}

export const useCategories = (options: UseCategoriesOptions = {}) => {
  const { type, active, enabled = true } = options;

  return useQuery<FinanceCategory[], Error>({
    queryKey: queryKeys.finance.categoriesByType(type),
    queryFn: () => financeApi.getCategories({ type, active }),
    enabled,
  });
};

export const useCategory = (id: number, enabled = true) => {
  return useQuery<FinanceCategory, Error>({
    queryKey: [...queryKeys.finance.categories(), id],
    queryFn: () => financeApi.getCategory(id),
    enabled: enabled && id > 0,
  });
};

export default useCategories;
