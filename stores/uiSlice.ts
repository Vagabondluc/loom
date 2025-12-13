import { StateCreator } from 'zustand';
import { BuilderState, UISlice } from './slices/types';
import { PageSettings } from '../types';

const DEFAULT_PAGE_SETTINGS: PageSettings = {
  heightMode: 'grow',
  maxWidth: 'full',
};

export const createUISlice: StateCreator<BuilderState, [], [], UISlice> = (set) => ({
  activeBreakpoint: 'desktop',
  orientation: 'landscape',
  isStructureMode: false,
  isPreviewMode: false,
  isCommandPaletteOpen: false,
  isDebugMode: false,
  leftPanelWidth: 288,
  pageSettings: DEFAULT_PAGE_SETTINGS,
  recentlyUsed: [],

  setBreakpoint: (bp) => set({ 
    activeBreakpoint: bp, 
    orientation: bp === 'desktop' ? 'landscape' : 'portrait' 
  }),
  setOrientation: (o) => set({ orientation: o }),
  toggleOrientation: () => set((state) => ({ 
    orientation: state.orientation === 'portrait' ? 'landscape' : 'portrait' 
  })),
  toggleStructureMode: () => set((state) => ({ isStructureMode: !state.isStructureMode })),
  togglePreviewMode: () => set((state) => ({ 
    isPreviewMode: !state.isPreviewMode,
    selectedNodeId: null
  })),
  toggleDebugMode: () => set((state) => ({ isDebugMode: !state.isDebugMode })),
  setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),
  setLeftPanelWidth: (width) => set({ leftPanelWidth: Math.max(240, Math.min(width, 500)) }),
  updatePageSettings: (updates) => set(state => ({
    pageSettings: { ...state.pageSettings, ...updates }
  })),
});

export default createUISlice;
