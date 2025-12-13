interface HistoryStateLike {
    nodes: Record<string, any>;
    history: { past: Record<string, any>[]; future: Record<string, any>[] };
    selectedNodeId?: string | null;
}

export const createHistorySnapshot = (state: HistoryStateLike) => {
    const past = [...state.history.past, state.nodes];
    if (past.length > 20) past.shift(); // Limit history to 20 steps
    return {
        history: {
            past,
            future: [] // Clear future on new action
        }
    };
};

export const performUndo = (state: HistoryStateLike) => {
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

export const performRedo = (state: HistoryStateLike) => {
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

export default createHistorySnapshot;
