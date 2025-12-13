# 🛡️ Non-Negotiable Invariants

These are the fundamental rules of the builder's architecture and user experience. They are not features; they are guarantees. A regression that violates an invariant is a critical-priority bug.

---

### 1. State is the Single Source of Truth
The rendered canvas is a pure function of the `nodes` state object. No direct DOM manipulation is permitted in the rendering logic. To change what is on the screen, you must change the state.

### 2. Selection Never Changes Without User Input
No background process, asynchronous event, or state mutation unrelated to selection may alter `selectedNodeId` or `hoveredNodeId`. Selection is sacred to user intent and must only change as a direct result of a user's pointer or keyboard action.

### 3. No Mutation Without Explicit Commit
The layout tree is immutable during "planning" states (dragging, resizing, multi-step operations). Mutation occurs only on a final, explicit commit event (e.g., `onDrop`, `onMouseUp`, "Apply" button click).

### 4. Visual Highlight Guarantees Outcome
The final position and parentage of a dropped or placed element will be exactly where the visual drop zone highlight indicated at the moment of commit. There are no post-drop layout shifts or reparenting surprises. What you see is what you get.

### 5. The Escape Key Aborts
Any multi-step, modal, or temporary operation (drag, click-to-place, dialogs, command palette) must be cleanly and completely cancellable via the `Escape` key, returning the application to its previous state with no side effects.

### 6. Editing Modes Never Execute Logic
No user-defined logic—including `onClick` events, data fetching triggers, or conditional visibility checks that would hide an element—will run outside of Preview Mode. The editor is for building, not for running.