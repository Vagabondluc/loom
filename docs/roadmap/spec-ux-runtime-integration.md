
# UX Contract Addendum: Runtime & Behavior Integration

## §18 — Runtime Adapters & Behavior

### UX-BE-RA-01 — Adapters Are Explicit
Every runtime-capable node must explicitly declare its **Adapter** (e.g., "Preline Modal") and its **Activation Domains** (Preview, Export). Hidden runtime behavior is forbidden.

### UX-BE-RA-02 — Editor Never Executes Adapters
In Design Mode, Structure Mode, and the Material Library:
*   Adapters must **not** initialize.
*   Adapters must **not** attach event listeners.
*   Adapters must **not** mutate the DOM.
Any violation of this rule is a critical regression.

### UX-BE-RA-03 — One Behavior, One Meaning
A Logic Action (e.g., `openOverlay`) must map to exactly one canonical abstract definition, which is then fulfilled by the selected Runtime Adapter. Silent swapping or ambiguous fallbacks are not allowed.

### UX-BE-RA-04 — Adapter Lifecycle Is Inspectable
Every adapter activation (init, action, teardown) must be observable in the **Runtime Workbench** via a normalized event log. "Magic" background behavior is not permitted.

### UX-BE-RA-05 — Safe Failure
If a Runtime Adapter crashes or fails to initialize:
*   The error must be isolated (e.g., via Error Boundary).
*   The rest of the application must remain stable.
*   The user must be presented with a clear error state ("Runtime Error").

### UX-BE-RA-06 — Deterministic Execution
Given the same Node Tree, Runtime State, and Adapter Selection, the runtime execution in the Workbench must be 100% reproducible. Randomness is allowed in *generation* (AI), but never in *execution*.

### UX-BE-RA-07 — Adapter Identity Is Stable
Once a node is bound to an Adapter, switching adapters is an explicit, undoable user action. Silent adapter reassignment is forbidden.

## §19 — Adapter Event Taxonomy

All runtime adapters must emit events using a **normalized taxonomy**. Events are **observational**, never mutative.

### 19.1 Event Categories

| Category | Description | Examples |
| :--- | :--- | :--- |
| `adapter:init` | Adapter initialized | Preline autoInit |
| `adapter:teardown` | Adapter cleaned up | Modal destroyed |
| `adapter:action` | Adapter performed behavior | Accordion opened |
| `adapter:event` | Native or library event | `hs.modal.open` |
| `adapter:error` | Runtime failure | Init failed |
| `runtime:state` | Runtime store mutation | `user.name changed` |

### 19.2 Event Shape (Canonical)

```typescript
interface RuntimeEvent {
  timestamp: number;
  source: 'adapter' | 'runtime' | 'system';
  adapterId?: string;
  nodeId?: string;
  type: string;
  payload?: Record<string, unknown>;
  severity?: 'info' | 'warn' | 'error';
}
```

### 19.3 Contract Rules
- Events are **append-only**.
- Events never trigger undo.
- Events never mutate the node tree.
- Events must be deterministic given the same inputs.

**[UX-BE-RA-08] Runtime Events Are Observable, Not Causal**
