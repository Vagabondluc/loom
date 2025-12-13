
import { StateCreator } from 'zustand';
import { BuilderState, TreeSlice } from './types';
import { BuilderNode, LayoutConfig, Template } from '../../../types';
import { AiAction } from '../../../services/aiActionSchema';
import { performInsert, performMove, performDelete } from './treeUtils';
import { createHistorySnapshot, performUndo, performRedo } from './historyUtils';
import { reduceAiAction } from './aiReducer';

const INITIAL_ROOT_ID = 'root';
const INITIAL_NODES: Record<string, BuilderNode> = {
  [INITIAL_ROOT_ID]: {
    id: INITIAL_ROOT_ID,
    type: 'container',
    data: { className: 'h-full w-full' },
    layout: { mode: 'static' },
    children: [],
    parentId: null
  }
};

export const createTreeSlice: StateCreator<BuilderState, [], [], TreeSlice> = (set, get) => ({
  nodes: INITIAL_NODES,
  rootNodeId: INITIAL_ROOT_ID,
  
  history: { past: [], future: [] },

  undo: () => set((state) => performUndo(state) || state),

  redo: () => set((state) => performRedo(state) || state),

  snapshot: () => {
    // REQ-UNDO-RUNTIME-EXCL-02: No snapshots in Preview Mode
    if (get().isPreviewMode) return;
    set((state) => createHistorySnapshot(state));
  },

  insertNodeTree: (parentId, template, index) => set((state) => {
    // Block structural mutations in Preview Mode to enforce boundary
    if (state.isPreviewMode) return state;

    const newNodes = performInsert(state.nodes, parentId, template, index);

    const rootNodeType = template.nodes[template.rootId]?.type;
    const recentlyUsed = rootNodeType
      ? [
          rootNodeType,
          ...state.recentlyUsed.filter((id) => id !== rootNodeType),
        ].slice(0, 8)
      : state.recentlyUsed;
    
    return {
      ...createHistorySnapshot(state),
      nodes: newNodes,
      recentlyUsed,
    };
  }),

  moveNode: (nodeId, newParentId, index) => set((state) => {
    if (state.isPreviewMode) return state;
    if (nodeId === state.rootNodeId) return state;
    
    const newNodes = performMove(state.nodes, nodeId, newParentId, index);
    if (newNodes === state.nodes) return state; // No change
    
    return { 
        ...createHistorySnapshot(state), 
        nodes: newNodes 
    };
  }),

  updateNodeData: (id, updates, options) => set((state) => ({
    // REQ-UNDO-RUNTIME-EXCL-02: Guard history snapshot
    ...((options?.skipHistory || state.isPreviewMode) ? {} : createHistorySnapshot(state)),
    nodes: {
      ...state.nodes,
      [id]: {
        ...state.nodes[id],
        data: { ...state.nodes[id].data, ...updates }
      }
    }
  })),

  updateNodeLayout: (id, updates, options) => set((state) => {
    const node = state.nodes[id];
    if (!node) return state;
    const bp = state.activeBreakpoint;

    let newNode = { ...node };
    if (bp === 'mobile') {
        newNode.layout = { ...newNode.layout, ...updates } as LayoutConfig;
    } else {
        const responsive = { ...newNode.responsive };
        // @ts-ignore
        responsive[bp] = { ...responsive[bp], ...updates };
        newNode.responsive = responsive as any;
    }

    return { 
        ...((options?.skipHistory || state.isPreviewMode) ? {} : createHistorySnapshot(state)),
        nodes: { ...state.nodes, [id]: newNode } 
    };
  }),

  updateNodeEvents: (id, events, options) => set((state) => ({
    ...((options?.skipHistory || state.isPreviewMode) ? {} : createHistorySnapshot(state)),
    nodes: {
        ...state.nodes,
        [id]: { ...state.nodes[id], events }
    }
  })),

  updateNodeLogic: (id, logic, options) => set((state) => ({
    ...((options?.skipHistory || state.isPreviewMode) ? {} : createHistorySnapshot(state)),
    nodes: {
        ...state.nodes,
        [id]: { 
            ...state.nodes[id], 
            logic: { ...(state.nodes[id].logic || {}), ...logic } 
        }
    }
  })),

  resetLayoutOverrides: (id) => set((state) => {
    if (state.isPreviewMode) return state;
    const node = state.nodes[id];
    const bp = state.activeBreakpoint;
    if (!node || bp === 'mobile') return state;

    const newNode = { ...node, responsive: { ...node.responsive } };
    if (newNode.responsive) {
        delete newNode.responsive[bp as keyof typeof newNode.responsive];
    }
    
    return { 
        ...createHistorySnapshot(state), 
        nodes: { ...state.nodes, [id]: newNode } 
    };
  }),

  deleteNode: (id) => set((state) => {
    if (state.isPreviewMode) return state;
    if (id === state.rootNodeId) return state;
    const newNodes = performDelete(state.nodes, id);
    return {
      ...createHistorySnapshot(state),
      nodes: newNodes,
      selectedNodeId: null
    };
  }),

  loadProject: (nodes, rootId) => set({ 
      nodes, 
      rootNodeId: rootId, 
      selectedNodeId: null,
      history: { past: [], future: [] } 
  }),

  applyAiActions: (actions: AiAction[]) => set((state) => {
    if (state.isPreviewMode) return state;
    let newNodes = state.nodes;
    for (const action of actions) {
        newNodes = reduceAiAction(newNodes, action);
    }

    if (newNodes === state.nodes) {
        return state; 
    }

    return {
        ...createHistorySnapshot(state),
        nodes: newNodes,
    };
  }),
});
