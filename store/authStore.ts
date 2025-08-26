
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthStore, LoginCredentials, RegisterUserData } from '../types';
import { apiLogin, apiRegister } from '../services/authService';
import { ApiError } from '../services/authService';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await apiLogin(credentials);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          if (error instanceof ApiError && error.fields) {
            set({ error: error.fields, isLoading: false });
          } else {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: errorMessage, isLoading: false });
          }
        }
      },
      
      register: async (userData: RegisterUserData) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await apiRegister(userData);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          if (error instanceof ApiError && error.fields) {
            set({ error: error.fields, isLoading: false });
          } else {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: errorMessage, isLoading: false });
          }
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        // Navigate to login page after logout by changing the hash.
        // The hashchange listener in App.tsx will handle the route update.
        window.location.hash = '/login';
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }), // only persist these fields
    }
  )
);