import apiClient from './client';
import type {
  FinanceCategory,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  FinanceJournal,
  CreateJournalRequest,
  UpdateJournalRequest,
  JournalListResponse,
  JournalFilters,
  JournalSummary,
  MessageResponse,
} from '../types';

export const financeApi = {
  // ============ Categories ============

  /**
   * List all categories
   */
  getCategories: async (params?: {
    type?: 'income' | 'expense';
    active?: boolean;
  }): Promise<FinanceCategory[]> => {
    const response = await apiClient.get<FinanceCategory[]>('/categories', { params });
    return response.data;
  },

  /**
   * Get a single category
   */
  getCategory: async (id: number): Promise<FinanceCategory> => {
    const response = await apiClient.get<FinanceCategory>(`/categories/${id}`);
    return response.data;
  },

  /**
   * Create a new category
   */
  createCategory: async (data: CreateCategoryRequest): Promise<FinanceCategory> => {
    const response = await apiClient.post<FinanceCategory>('/categories', data);
    return response.data;
  },

  /**
   * Update a category
   */
  updateCategory: async (id: number, data: UpdateCategoryRequest): Promise<FinanceCategory> => {
    const response = await apiClient.put<FinanceCategory>(`/categories/${id}`, data);
    return response.data;
  },

  /**
   * Delete a category
   */
  deleteCategory: async (id: number): Promise<MessageResponse> => {
    const response = await apiClient.delete<MessageResponse>(`/categories/${id}`);
    return response.data;
  },

  // ============ Journals ============

  /**
   * List journal entries with filters
   */
  getJournals: async (filters?: JournalFilters): Promise<JournalListResponse> => {
    const response = await apiClient.get<JournalListResponse>('/journals', {
      params: filters,
    });
    return response.data;
  },

  /**
   * Get a single journal entry
   */
  getJournal: async (id: number): Promise<FinanceJournal> => {
    const response = await apiClient.get<FinanceJournal>(`/journals/${id}`);
    return response.data;
  },

  /**
   * Create a new journal entry
   */
  createJournal: async (data: CreateJournalRequest): Promise<FinanceJournal> => {
    const response = await apiClient.post<FinanceJournal>('/journals', data);
    return response.data;
  },

  /**
   * Update a journal entry
   */
  updateJournal: async (id: number, data: UpdateJournalRequest): Promise<FinanceJournal> => {
    const response = await apiClient.put<FinanceJournal>(`/journals/${id}`, data);
    return response.data;
  },

  /**
   * Delete a journal entry
   */
  deleteJournal: async (id: number): Promise<MessageResponse> => {
    const response = await apiClient.delete<MessageResponse>(`/journals/${id}`);
    return response.data;
  },

  /**
   * Get financial summary for a date range
   */
  getSummary: async (params?: {
    start_date?: string;
    end_date?: string;
  }): Promise<JournalSummary> => {
    const response = await apiClient.get<JournalSummary>('/journals/summary', { params });
    return response.data;
  },
};

export default financeApi;
