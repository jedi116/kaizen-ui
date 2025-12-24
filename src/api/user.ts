import apiClient from './client';
import type { APIKey, CreateAPIKeyRequest, APIKeyResponse, MessageResponse } from '../types';

export const userApi = {
  /**
   * List all API keys
   */
  getAPIKeys: async (): Promise<APIKey[]> => {
    const response = await apiClient.get<APIKey[]>('/users/api-keys');
    return response.data;
  },

  /**
   * Create a new API key
   */
  createAPIKey: async (data: CreateAPIKeyRequest): Promise<APIKeyResponse> => {
    const response = await apiClient.post<APIKeyResponse>('/users/api-keys', data);
    return response.data;
  },

  /**
   * Delete an API key
   */
  deleteAPIKey: async (id: number): Promise<MessageResponse> => {
    const response = await apiClient.delete<MessageResponse>(`/users/api-keys/${id}`);
    return response.data;
  },
};

export default userApi;
