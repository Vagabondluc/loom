
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ThemeState, ThemeConfig } from '../types';

const DEFAULT_CONFIG: ThemeConfig = {
  fontFamily: 'Inter',
  fontType: 'sans',
  radius: 0.5, // 0.5rem is standard
  borderWidth: 1, // 1px
  animationDuration: 0.2, // seconds
  focusScale: 0.95 // slight bounce
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      config: DEFAULT_CONFIG,
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute('data-theme', theme);
      },
      updateConfig: (updates) => set((state) => ({
        config: { ...state.config, ...updates }
      })),
      resetConfig: () => set({ config: DEFAULT_CONFIG })
    }),
    {
      name: 'loom-theme-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute('data-theme', state.theme);
        }
      },
    }
  )
);