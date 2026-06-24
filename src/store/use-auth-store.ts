"use client";

import { create } from "zustand";
import {
  validateCredentials,
  setAuthCookie,
  clearAuthCookie,
} from "@/lib/auth";

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  error: null,

  login: (email: string, password: string) => {
    if (validateCredentials(email, password)) {
      setAuthCookie();
      set({ isAuthenticated: true, error: null });
      return true;
    }

    set({ error: "Invalid email or password" });
    return false;
  },

  logout: () => {
    clearAuthCookie();
    set({ isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
}));
