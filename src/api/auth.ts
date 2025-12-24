import apiClient, { tokenManager } from './client';
import type { LoginRequest, RegisterRequest, AuthResponse, User, MessageResponse } from '../types';

export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    const { access_token, refresh_token } = response.data;
    tokenManager.setTokens(access_token, refresh_token);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    const { access_token, refresh_token } = response.data;
    tokenManager.setTokens(access_token, refresh_token);
    return response.data;
  },

  /**
   * Logout current session
   */
  logout: async (): Promise<MessageResponse> => {
    try {
      const response = await apiClient.post<MessageResponse>('/auth/logout');
      return response.data;
    } finally {
      tokenManager.clearTokens();
    }
  },

  /**
   * Logout from all devices
   */
  logoutAll: async (): Promise<MessageResponse> => {
    try {
      const response = await apiClient.post<MessageResponse>('/auth/logout-all');
      return response.data;
    } finally {
      tokenManager.clearTokens();
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: { name: string }): Promise<User> => {
    const response = await apiClient.put<User>('/users/me', data);
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return tokenManager.hasTokens();
  },
};

export default authApi;
