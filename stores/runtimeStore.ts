
import { create } from 'zustand';

interface RuntimeState {
  variables: Record<string, any>;
  setVariable: (path: string, value: any) => void;
  fetchData: (url: string, method: string, storageKey: string) => Promise<void>;
  resetVariables: () => void;
}

const INITIAL_STATE = {
  // Demo Data
  isLoggedIn: true,
  user: {
    name: 'Builder User',
    role: 'admin',
    credits: 50
  },
  featureFlags: {
    newUI: false
  },
  cart: {
    items: 2,
    total: 99.99
  },
  api: {} // Namespace for fetched data
};

export const useRuntimeStore = create<RuntimeState>((set, get) => ({
  variables: INITIAL_STATE,
  
  setVariable: (path, value) => set((state) => {
    // Basic deep set implementation
    const newVars = JSON.parse(JSON.stringify(state.variables));
    const parts = path.split('.');
    let current = newVars;
    
    for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
    }
    
    current[parts[parts.length - 1]] = value;
    return { variables: newVars };
  }),

  fetchData: async (url, method, storageKey) => {
      // 1. Set Loading State
      get().setVariable(`${storageKey}_loading`, true);
      get().setVariable(`${storageKey}_error`, null);

      try {
          // 2. Perform Fetch
          const response = await fetch(url, { method });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const data = await response.json();
          
          // 3. Store Result
          get().setVariable(storageKey, data);
          get().setVariable(`${storageKey}_loading`, false);
      } catch (e: any) {
          console.error(`[Runtime] Fetch Failed: ${url}`, e);
          get().setVariable(`${storageKey}_error`, e.message);
          get().setVariable(`${storageKey}_loading`, false);
      }
  },

  resetVariables: () => set({ variables: INITIAL_STATE })
}));
