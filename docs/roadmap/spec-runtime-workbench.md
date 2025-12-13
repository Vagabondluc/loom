
# Specification: Runtime Workbench ("Test Weave")

**Subsystem:** Runtime Engine
**Status:** 🔒 **Contract-Grade**
**TDD Partner:** `tdd-runtime-workbench.md`
**UX Clauses:** UX-20, UX-13

---

## 1. Purpose & Definition
The Runtime Workbench is a specialized environment for **validating Runtime Adapters**. It answers a single, critical question:
> "What does this abstract logic node *actually do* when executed by a concrete runtime engine?"

Unlike the Material Library (static catalog) or the Design Canvas (structural editing), the Workbench is a **runtime debugger**. It allows developers to isolate a "Device Under Test" (DUT), inject stimuli (state changes, events), and observe the resulting behavior via a normalized event log.

---

## 2. Contract Requirements (REQ-RW)

### REQ-RW-01 — Workbench Isolated From Editor State

**Statement (Normative):**
The Runtime Workbench **MUST** operate in a sandboxed environment. It **MUST NOT** read from or write to the main Builder State (nodes history, selection).

**Rationale:**
Prevents runtime testing from corrupting the user's design work.

**Traceability:**
- UX Clause: UX-RW-01
- TDD Coverage: [BT-RW-01], [UX-RW-01]

---

### REQ-RW-02 — Runtime Execution Only via Registry

**Statement (Normative):**
All runtime behavior executed within the Workbench **MUST** be initiated through the `RuntimeAdapterRegistry`. Direct instantiation of runtime logic is **FORBIDDEN**.

**Rationale:**
Ensures all runtime code follows the defined lifecycle (init/teardown) and can be tracked.

**Traceability:**
- UX Clause: UX-18
- TDD Coverage: [M-RW-08], [UX-RW-02]

---

### REQ-RW-03 — Deterministic Replays

**Statement (Normative):**
The Workbench **MUST** provide a "Reset" function that completely clears the Runtime Store, Event Log, and re-mounts the Stage.

**Rationale:**
Allows developers to retry interactions from a known clean state.

**Traceability:**
- UX Clause: UX-RW-03
- TDD Coverage: [BT-RW-06], [UX-RW-03]

---

### REQ-RW-04 — Lifecycle Event Logging

**Statement (Normative):**
The Workbench **MUST** visibly log all Adapter lifecycle events: `adapter:init`, `adapter:action`, `adapter:event`, and `adapter:teardown`.

**Rationale:**
Makes invisible runtime behavior inspectable ("No Hidden Execution").

**Traceability:**
- UX Clause: UX-RW-04
- TDD Coverage: [BT-RW-03], [UX-RW-04]

---

### REQ-RW-05 — Failure Containment

**Statement (Normative):**
If an Adapter throws an error during initialization or execution, the Workbench **MUST** catch the error via an Error Boundary, display it in the Stage, and log it. It **MUST NOT** crash the application.

**Rationale:**
Ensures the tool remains usable even when testing broken code.

**Traceability:**
- UX Clause: UX-RW-05
- TDD Coverage: [BT-RW-03], [BT-RW-09]

---

## 3. Core Architecture: The 3-Pane Layout

### 3.1 Pane 1: Stimulus Panel (Left)
*   **Role:** Input Generation.
*   **Capabilities:**
    *   **Runtime State Editor:** JSON or Form-based editor for `runtimeStore`.
    *   **Action Deck:** Manual trigger buttons for Adapter actions.

### 3.2 Pane 2: The Stage (Center)
*   **Role:** Device Under Test (DUT) Isolation.
*   **Behavior:**
    *   Mounts **exactly one** target node at a time.
    *   Wraps the node in an **Error Boundary**.
    *   Wraps the node in an **Adapter Lifecycle Manager**.

### 3.3 Pane 3: Adapter Inspector (Right)
*   **Role:** Observability.
*   **Behavior:** Renders a real-time stream of normalized events.

## 4. Integration
*   **Route:** `/demo/workbench`
*   **Dependencies:** `RuntimeAdapterRegistry`
