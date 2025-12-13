
import { StateCreator } from 'zustand';
import { BuilderState, SelectionSlice } from './types';

export const createSelectionSlice: StateCreator<BuilderState, [], [], SelectionSlice> = (set) => ({
  selectedNodeId: null,
  hoveredNodeId: null,
  draggedComponentId: null, // Legacy

  dragState: {
    isDragging: false,
    type: null,
    payload: null,
    activeDropZone: null
  },

  selectNode: (id) => set({ selectedNodeId: id }),
  setHoveredNode: (id) => set({ hoveredNodeId: id }),
  setDraggedComponent: (id) => set({ draggedComponentId: id }), // Legacy

  startDrag: (type, payload) => set({
    dragState: {
        isDragging: true,
        type,
        payload,
        activeDropZone: null
    },
    // Clear selection during drag to reduce visual noise
    selectedNodeId: null,
    hoveredNodeId: null
  }),

  setActiveDropZone: (zone) => set((state) => {
      // Avoid unnecessary updates
      if (
          state.dragState.activeDropZone?.parentId === zone?.parentId &&
          state.dragState.activeDropZone?.index === zone?.index
      ) {
          return state;
      }
      return {
          dragState: { ...state.dragState, activeDropZone: zone }
      };
  }),

  endDrag: () => set({
      dragState: {
          isDragging: false,
          type: null,
          payload: null,
          activeDropZone: null
      }
  })
});
