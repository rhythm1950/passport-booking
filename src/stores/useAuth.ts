import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  permissions: string[];
  login: (user: User, permissions: string[]) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: undefined,
      permissions: [],
      login: (user: User, permissions: string[]) =>
        set({
          isAuthenticated: true,
          user,
          permissions,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          user: undefined,
          permissions: [],
        }),
    }),
    {
      name: 'passport-booking-auth',
    }
  )
);