
import { BuilderNode } from '../../../types';
import { BuilderState } from './types';

export const createHistorySnapshot = (state: BuilderState) => {
    const past = [...state.history.past, state.nodes];
    if (past.length > 20) past.shift(); // Limit history to 20 steps
    return {
        history: {
            past,
            future: [] // Clear future on new action
        }
    };
};

export const performUndo = (state: BuilderState) => {
    const past = state.history.past;
    if (past.length === 0) return null;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    return {
        nodes: previous,
        history: {
            past: newPast,
            future: [state.nodes, ...state.history.future]
        },
        selectedNodeId: null
    };
};

export const performRedo = (state: BuilderState) => {
    const future = state.history.future;
    if (future.length === 0) return null;

    const next = future[0];
    const newFuture = future.slice(1);

    return {
        nodes: next,
        history: {
            past: [...state.history.past, state.nodes],
            future: newFuture
        },
        selectedNodeId: null
    };
};
