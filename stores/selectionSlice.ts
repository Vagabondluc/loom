import { StateCreator } from 'zustand';
import { BuilderState, SelectionSlice } from './slices/types';

export const createSelectionSlice: StateCreator<BuilderState, [], [], SelectionSlice> = (set) => ({
  selectedNodeId: null,
  hoveredNodeId: null,
  dragState: { isDragging: false, type: null, payload: null, activeDropZone: null },
  
  selectNode: (id) => set({ selectedNodeId: id }),
  setHoveredNode: (id) => set({ hoveredNodeId: id }),
  
  startDrag: (type, payload) => set({ dragState: { isDragging: true, type, payload, activeDropZone: null } }),
  setActiveDropZone: (zone) => set((state) => ({ dragState: { ...state.dragState, activeDropZone: zone } })),
  endDrag: () => set({ dragState: { isDragging: false, type: null, payload: null, activeDropZone: null } }),
  setDraggedComponent: (id) => set({ draggedComponentId: id }),
  draggedComponentId: null
});

export default createSelectionSlice;
