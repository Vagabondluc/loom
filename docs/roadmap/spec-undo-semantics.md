
# Specification: Undo Semantics v2.0 (Runtime-Aware)

## 1. Purpose
This document defines what constitutes a single, atomic, undoable action within the builder. Its purpose is to ensure the undo/redo functionality aligns with the user's mental model, thereby upholding **UX Contract §7.1 (All Actions Are Recoverable)**.

**Version 2.0 Update:** Explicitly separates **structural intent** from **runtime side-effects**.

## 2. Definition: Atomic Action
An **Atomic Action** is a single, user-initiated operation that results in a meaningful, reversible change to the builder's node tree state. Every atomic action must create exactly one entry in the undo history stack.

### 2.1 Structural vs. Runtime State
Undo applies **only** to **design-time state**:
*   Node tree structure (children, parents)
*   Node properties (data, layout, attributes)
*   Page settings (height mode, max width)
*   Logic graph definitions (flow structure)

Undo explicitly does **not** apply to:
*   Runtime adapter execution (opened modals, active tabs)
*   Preview / Playground state
*   Adapter logs and diagnostics
*   Network simulation (loading states)
*   Timers, animations, or side effects

## 3. Action Boundaries

The following user operations are defined as single atomic actions:

### 3.1 Creation & Deletion
*   **Insert Node:** A single `insertNodeTree` action, whether initiated by drag-and-drop or click-to-place. The entire template insertion is one undoable step.
*   **Delete Node:** A single `deleteNode` action. Deleting a node and all its descendants is one undoable step.

### 3.2 Structural Changes
*   **Move Node:** A single `moveNode` action. Reparenting and reordering a node is one undoable step.

### 3.3 Property Edits
Property edits are bundled to match user intent and avoid polluting the history stack with micro-changes.
*   **Text Inputs:** A change is committed **on blur** or after a **debounce period (e.g., 500ms)** of inactivity. A user typing "Hello World" should result in one undo step, not eleven.
*   **Sliders / Draggable Controls:** A change is committed **on mouse up** (or the equivalent "end" event). Dragging a slider from 0 to 100 is one undoable action, not 100.
*   **Toggles, Selects, Buttons:** A change is committed **immediately on click/change**. Each distinct selection is one undoable action.

### 3.4 AI-Driven Actions
*   **AI Generation:** The entire application of a single AI-driven structural or logical change is considered **one** atomic action. The user must be able to revert the entire AI suggestion with a single undo.

### 3.5 Non-Undoable State (Hard Boundary)
The following state changes must **never** generate undo entries:
*   Node selection changes (`selectedNodeId`)
*   Hover or focus state
*   Preview Mode toggling
*   Runtime Workbench interactions (Stimulus/Actions)
*   Adapter initialization / teardown events
*   Runtime variable injection
*   Logs, diagnostics, or console output

**[UX-UNDO-04] Undo Affects Structure, Not Execution**

## 4. Implementation Rules

### 4.1 Snapshot Timing
The `createHistorySnapshot` function must only be called once at the end of a state action corresponding to one of the atomic boundaries defined above. It must never be called multiple times within a single user operation.

### 4.2 Runtime Isolation Rule
Runtime adapters may emit events, logs, or visual changes. These must never:
*   Call `createHistorySnapshot`
*   Mutate design-time state (`nodes`)
*   Trigger implicit undo boundaries

Undo must remain deterministic regardless of runtime activity.

---

## 5. Specification Addendum: Runtime-Aware Undo Semantics

**UX Clause:** UX-7.1 (All Actions Are Recoverable)
**Risk Class:** Critical (History Corruption)

### **REQ-UNDO-RUNTIME-EXCL — Runtime Events Are Not Undoable**

**Statement (Normative):**
Runtime execution **MUST NOT** create undo history entries.

**Definition:**
A *Runtime Event* is any state change, side effect, or event emission that occurs as a result of:

* Runtime Adapters (e.g. Preline, Charts, Applets)
* Preview Mode execution
* Behavior Engine actions executed in runtime context
* Runtime Workbench stimulus triggers
* Adapter lifecycle events (init / teardown / emit)

**Guarantee:**
Undo/Redo operates **only** on **Authoring Intent**, never on **Execution Effects**.

### **REQ-UNDO-RUNTIME-EXCL-01 — Structural vs Runtime Boundary**

Undo history **MUST** capture:

* Node tree mutations
* Authoring-time property changes
* Editor-initiated layout or configuration edits

Undo history **MUST NOT** capture:

* Adapter `init()` or `teardown()`
* Runtime state mutations (e.g. modal open, tab switch)
* Runtime logs or telemetry
* Behavior Engine execution results
* Preview-only data injection

### **REQ-UNDO-RUNTIME-EXCL-02 — Preview Mode Immunity**

While `isPreviewMode === true`:

* **No calls** to `createHistorySnapshot()` may occur
* Runtime actions **MUST NOT** mutate the history stack
* Undo stack length **MUST remain constant**

### **REQ-UNDO-RUNTIME-EXCL-03 — Adapter Isolation**

Runtime Adapters:

* **MUST NOT** access the undo store
* **MUST NOT** emit history-affecting actions
* **MUST NOT** indirectly trigger undo via shared state

Any adapter that mutates undo state is **non-compliant**.

### **REQ-UNDO-RUNTIME-EXCL-04 — Behavior Engine Safety**

Behavior Engine actions executed in **runtime context**:

* Are **ephemeral**
* Are **not recorded**
* Must be replayable without affecting undo history

### **REQ-UNDO-RUNTIME-EXCL-05 — Deterministic Undo Length**

Given a fixed authoring history:

* Replaying runtime actions **MUST NOT** change:

  * `history.past.length`
  * `history.future.length`
