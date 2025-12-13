
# TDD PACK — Undo Semantics

**Feature:** History & State Recovery
**Subsystem:** State Management / Tree Slice
**UX Contract Sections Covered:** [UX-7.1] All Actions Are Recoverable
**Primary User Intent:** To experiment fearlessly, knowing that any mistake (structural or content) can be instantly reversed.

---

## Layer 1: Mechanical TDD (Implementation Correctness)

*   **[M-UNDO-01]** `createHistorySnapshot` pushes the current `nodes` state to `history.past`.
*   **[M-UNDO-02]** The history stack is capped (e.g., 20 items) to prevent memory leaks.
*   **[M-UNDO-03]** `undo()` moves the top of `past` to `nodes` and current `nodes` to `future`.
*   **[M-UNDO-04]** `redo()` moves the top of `future` to `nodes` and current `nodes` to `past`.
*   **[M-UNDO-05]** Any new commit (snapshot) clears the `future` stack.

---

## Layer 2: Behavioral TDD (User Reality)

*   **[BT-UNDO-01] Text Input Debouncing (The "Typing" Test):**
    *   **Context:** User focuses a text field and types "Hello World".
    *   **Action:** Triggers `snapshot()` on focus, then multiple updates with `skipHistory: true`.
    *   **Result:** Pressing Undo **once** removes the entire string "Hello World", not just the "d".
*   **[BT-UNDO-02] Slider Interaction (The "Drag" Test):**
    *   **Context:** User drags a spacing slider from 0px to 24px.
    *   **Action:** `pointerDown` triggers snapshot. `onChange` updates live. `pointerUp` finalizes.
    *   **Result:** Pressing Undo **once** resets the slider to 0px.
*   **[BT-UNDO-03] Structural Atomicity:**
    *   **Context:** User drops a new component into a container.
    *   **Result:** The addition of the node + the update to the parent's children array are treated as **one** undoable step.
*   **[BT-UNDO-04] AI Generation Batching:**
    *   **Context:** AI generates a full page layout (50+ nodes).
    *   **Result:** Pressing Undo **once** removes the entire generated tree, restoring the blank canvas.

---

## Layer 3: UX Contract TDD (Promises to the User)

*   **[UX-UNDO-01] No Silent Data Loss:** Undo never corrupts the tree structure (e.g., leaving orphaned children ID references).
*   **[UX-UNDO-02] Selection Stability:** While not strictly required to restore selection, Undo must not crash the app if the previously selected node no longer exists. The system must gracefully handle `selectedNodeId` pointing to a deleted node (e.g., by deselecting).
*   **[UX-UNDO-03] History is Local-First:** Reloading the page (if persistence is active) should ideally clear the history stack to avoid confused state, OR history should be explicitly persisted. (Current decision: History is transient; clear on reload).

---

## TDD ADDENDUM — Runtime Exclusion (REQ-UNDO-RUNTIME-EXCL)

**Risk:** History Corruption by Runtime Events

### Behavioral Tests

#### **BT-UNDO-RTE-01 — Runtime Action Does Not Affect History**
* **Given:** Undo stack length = N
* **When:** Runtime adapter opens modal
* **Then:** Undo stack length remains N

#### **BT-UNDO-RTE-02 — Preview Mode Immunity**
* **Given:** Preview Mode active
* **When:** Any runtime action executes
* **Then:** `createHistorySnapshot()` is never called

#### **BT-UNDO-RTE-03 — Behavior Engine Runtime Safety**
* **When:** Runtime behavior node fires
* **Then:** No undo entry created

### Negative Tests

#### **NEG-UNDO-RTE-01 — Adapter Cannot Access Undo Store**
* **Action:** Adapter attempts undo mutation
* **Result:** Operation blocked or throws

#### **NEG-UNDO-RTE-02 — Runtime Replay Determinism**
* **Action:** Replay runtime actions
* **Result:** `history.past.length` unchanged

### UX Contract Proof

#### **UX-UNDO-01 — Undo Reflects Authoring Only**
* **Verification:** Undo reverses structure, not execution effects
