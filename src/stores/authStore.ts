import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, LoginRequest, RegisterRequest } from '../types';
import { authApi, tokenManager } from '../api';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: { name: string }) => Promise<void>;
  clearError: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(credentials);
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: unknown) {
          const error = err as { response?: { data?: { error?: string } } };
          set({
            error: error.response?.data?.error || 'Login failed',
            isLoading: false,
          });
          throw err;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(data);
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: unknown) {
          const error = err as { response?: { data?: { error?: string } } };
          set({
            error: error.response?.data?.error || 'Registration failed',
            isLoading: false,
          });
          throw err;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authApi.logout();
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const user = await authApi.getProfile();
          set({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: unknown) {
          const error = err as { response?: { data?: { error?: string } } };
          set({
            error: error.response?.data?.error || 'Failed to fetch profile',
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
        }
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authApi.updateProfile(data);
          set({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            isLoading: false,
          });
        } catch (err: unknown) {
          const error = err as { response?: { data?: { error?: string } } };
          set({
            error: error.response?.data?.error || 'Failed to update profile',
            isLoading: false,
          });
          throw err;
        }
      },

      clearError: () => set({ error: null }),

      checkAuth: () => {
        const hasToken = tokenManager.hasTokens();
        if (hasToken && !get().user) {
          get().fetchProfile();
        } else if (!hasToken) {
          set({ isAuthenticated: false, user: null });
        }
      },
    }),
    {
      name: 'kaizen-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
