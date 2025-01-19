import { create } from "zustand";
import { persist } from "zustand/middleware"; 

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setTokens: (accessToken, refreshToken) => 
        set({ accessToken, refreshToken }),

      setUser: (user) => set({ user }),

      logout: () => set({ 
        accessToken: null, 
        refreshToken: null,
        user: null 
      }),

      isAuthenticated: () => {
        const state = get();
        return !!state.accessToken;
      },
    }),
    {
      name: 'auth-storage', 
    }
  )
);

export default useAuthStore;