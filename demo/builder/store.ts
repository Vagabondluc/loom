
import { create } from 'zustand';
import { BuilderState } from './slices/types';
import { createTreeSlice } from './slices/treeSlice';
import { createUISlice } from './slices/uiSlice';
import { createSelectionSlice } from './slices/selectionSlice';
import { createProjectSlice } from './slices/projectSlice';

export const useBuilderStore = create<BuilderState>((...a) => ({
  ...createTreeSlice(...a),
  ...createUISlice(...a),
  ...createSelectionSlice(...a),
  ...createProjectSlice(...a)
}));
