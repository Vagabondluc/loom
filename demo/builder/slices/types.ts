
import { BuilderNode, Breakpoint, LayoutConfig, Template, BuilderAction, PageSettings } from '../../../types';
import { Project } from '../../../utils/db';
import { AiAction } from '../../../services/aiActionSchema';

export interface TreeSlice {
  nodes: Record<string, BuilderNode>;
  rootNodeId: string;
  
  // History State
  history: {
    past: Record<string, BuilderNode>[];
    future: Record<string, BuilderNode>[];
  };
  
  // History Actions
  undo: () => void;
  redo: () => void;
  snapshot: () => void; // Manual checkpoint

  // Tree Actions
  insertNodeTree: (parentId: string, template: Template, index?: number) => void;
  moveNode: (nodeId: string, newParentId: string, index?: number) => void;
  updateNodeData: (id: string, updates: Partial<BuilderNode['data']>, options?: { skipHistory?: boolean }) => void;
  updateNodeLayout: (id: string, updates: Partial<LayoutConfig>, options?: { skipHistory?: boolean }) => void;
  updateNodeEvents: (id: string, events: Record<string, BuilderAction[]>, options?: { skipHistory?: boolean }) => void;
  updateNodeLogic: (id: string, logic: { visibleWhen?: string }, options?: { skipHistory?: boolean }) => void;
  resetLayoutOverrides: (id: string) => void;
  deleteNode: (id: string) => void;
  loadProject: (nodes: Record<string, BuilderNode>, rootId: string) => void;
  applyAiActions: (actions: AiAction[]) => void;
}

export interface UISlice {
  activeBreakpoint: Breakpoint;
  orientation: 'portrait' | 'landscape';
  isStructureMode: boolean;
  isPreviewMode: boolean;
  isCommandPaletteOpen: boolean;
  isDebugMode: boolean; // Visual Debugger for Envelopes
  leftPanelWidth: number;
  pageSettings: PageSettings;
  recentlyUsed: string[];
  setBreakpoint: (bp: Breakpoint) => void;
  setOrientation: (o: 'portrait' | 'landscape') => void;
  toggleOrientation: () => void;
  toggleStructureMode: () => void;
  togglePreviewMode: () => void;
  toggleDebugMode: () => void;
  setCommandPaletteOpen: (isOpen: boolean) => void;
  setLeftPanelWidth: (width: number) => void;
  updatePageSettings: (updates: Partial<PageSettings>) => void;
}

export interface DragState {
  isDragging: boolean;
  type: 'new' | 'move' | null;
  payload: any; // Template (new) or nodeId (move)
  activeDropZone: { parentId: string; index: number } | null;
}

export interface SelectionSlice {
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  
  // Drag State
  dragState: DragState;

  selectNode: (id: string | null) => void;
  setHoveredNode: (id: string | null) => void;
  
  // Drag Actions
  startDrag: (type: 'new' | 'move', payload: any) => void;
  setActiveDropZone: (zone: { parentId: string; index: number } | null) => void;
  endDrag: () => void;
  // Legacy support cleanup
  setDraggedComponent: (id: string | null) => void; 
  draggedComponentId: string | null;
}

export interface ProjectSlice {
  savedProjects: Project[];
  refreshProjects: () => Promise<void>;
  saveCurrentProject: (name: string) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  loadProjectFromDB: (id: number) => Promise<void>;
}

export type BuilderState = TreeSlice & UISlice & SelectionSlice & ProjectSlice;
