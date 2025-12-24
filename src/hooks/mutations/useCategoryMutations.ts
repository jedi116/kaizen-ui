import { useMutation, useQueryClient } from '@tanstack/react-query';
import { financeApi } from '../../api';
import { queryKeys } from '../../lib/queryClient';
import type { CreateCategoryRequest, UpdateCategoryRequest, FinanceCategory } from '../../types';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<FinanceCategory, Error, CreateCategoryRequest>({
    mutationFn: (data) => financeApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.categories() });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<FinanceCategory, Error, { id: number; data: UpdateCategoryRequest }>({
    mutationFn: ({ id, data }) => financeApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.categories() });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationFn: (id) => financeApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.categories() });
    },
  });
};

// Combined hook for all category mutations
export const useCategoryMutations = () => {
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading: createCategory.isPending || updateCategory.isPending || deleteCategory.isPending,
  };
};

export default useCategoryMutations;
