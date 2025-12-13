
# 🧪 TDD PACK — Runtime Workbench

**Feature:** Runtime Workbench ("Test Weave")
**Subsystem:** Runtime Engine / Debugging
**Spec:** `spec-runtime-workbench.md`
**UX Contract Sections Covered:** UX-20 (Runtime Workbench), UX-RW-01 to UX-RW-06
**Primary User Intent:** To validate runtime adapters in isolation without risking editor stability.

---

## Layer 1: Mechanical TDD (Wiring)

*   **[M-RW-01]** The `RuntimeWorkbench` route loads the 3-pane layout (Stimulus, Stage, Oscilloscope).
*   **[M-RW-02]** `RuntimeAdapterRegistry` is accessible from the Workbench context.
*   **[M-RW-03]** Selecting a target in Stimulus Panel mounts a `StageContainer`.
*   **[M-RW-04]** `StageContainer` calls `adapter.init()` on mount.
*   **[M-RW-05]** `StageContainer` calls `adapter.teardown()` on unmount or target change.

---

## Layer 2: Behavioral TDD (User Reality)

### [BT-RW-01] Isolation Principle
*   **Context:** Builder has a complex node tree.
*   **Action:** User enters Workbench and manipulates `runtimeStore` variables.
*   **Expected:** The Builder's node tree and selection state remain completely unchanged.
*   **Failure:** Workbench state leaks into the main editor.

### [BT-RW-02] Event Logging
*   **Context:** Preline Adapter is active in Stage.
*   **Action:** User triggers an "Open Modal" action via Stimulus.
*   **Expected:** The Oscilloscope log appends a new entry: `[Adapter] overlay:open`.
*   **Failure:** Action happens silently without logs.

### [BT-RW-03] Error Containment
*   **Context:** A faulty adapter throws an error during `init`.
*   **Action:** Mount the faulty adapter.
*   **Expected:** The Stage displays an Error Boundary UI. The app does not crash.
*   **Failure:** White screen of death.

---

## Layer 3: UX Contract TDD (Promises)

### [UX-RW-01] The Workbench Is a Sandbox (REQ-RW-01)
*   **Guarantee:** Execution inside Workbench never affects Undo History.
*   **Verification:** Measure `history.past.length` before and after running a complex workflow in Workbench. It must be identical.

### [UX-RW-02] No Hidden Execution (REQ-RW-02)
*   **Guarantee:** Adapters only run when explicitly mounted in Stage.
*   **Verification:** Spy on `adapter.init`. It is called 0 times until the user explicitly selects a target in the Workbench (or enters Preview).

### [UX-RW-03] Deterministic Replays (REQ-RW-03)
*   **Guarantee:** Resetting the Workbench restores a clean slate.
*   **Verification:** Click "Reset". The `runtimeStore` must return to initial state, and the Log must be cleared.

### [UX-RW-04] Lifecycle Visibility (REQ-RW-04)
*   **Guarantee:** Init and Teardown are always logged.
*   **Verification:** Mount and unmount a target. Ensure `adapter:init` and `adapter:teardown` events appear in the log.
