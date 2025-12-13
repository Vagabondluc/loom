
# Specification: Persistence Workflow v1.1 (Zustand → Zod → Dexie)

## 1. Purpose & Core Contracts
This document defines the architectural contract for saving and loading project data, ensuring a reliable, local-first persistence layer that is resilient to data corruption and aligned with the **Loom UX Contract**.

### 1.1 Guiding Principles
- **Zustand is the Working Copy:** The live, mutable, in-memory state.
- **Dexie is the Saved Copy:** The durable, on-disk, immutable snapshots.
- **Zod is the Gatekeeper:** All data crossing the boundary from Dexie to Zustand must be validated.

### 1.2 Trust Boundary Invariants
- **Validation is a Boundary Event:** State is validated only when crossing from a persistent/untrusted source (Dexie) into the live application state (Zustand). Live state is not continuously validated.
- **Failed Loads are Non-Destructive:** An attempt to load a project that fails validation must not partially mutate or corrupt the current live state. The operation must fail cleanly.

---

## 2. Data Model & Validation Schema

### 2.1 Project Identity & Versioning
To prevent silent data corruption from future schema changes, every saved project is stamped with a version.

**Current Schema Version:** `1`

### 2.2 Zod Schemas
```typescript
import { z } from 'zod';

// Zod Schema for a single BuilderNode (recursive)
const baseNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  // NOTE: This is intentionally permissive for v1. Future versions should introduce
  // tiered validation (structural vs. semantic) to flag unknown data properties.
  data: z.record(z.any()),
  layout: z.record(z.any()).optional(),
  responsive: z.record(z.any()).optional(),
  events: z.record(z.array(z.record(z.any()))).optional(),
  logic: z.record(z.any()).optional(),
  parentId: z.string().nullable(),
});

type Node = z.infer<typeof baseNodeSchema> & { children: Node[] };

const builderNodeSchema: z.ZodType<Node> = baseNodeSchema.extend({
  children: z.lazy(() => z.array(z.string())),
});

// Zod Schema for the entire Project object stored in Dexie
export const projectSchema = z.object({
  id: z.number().optional(),
  schemaVersion: z.literal(1), // Enforces versioning
  name: z.string().min(1),
  nodes: z.record(builderNodeSchema),
  rootId: z.string(),
  // NOTE: Dates are stored as ISO strings to ensure serialization safety across all browsers.
  // They are converted to Date objects only after successful validation.
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
```

---

## 3. The "Save" Workflow (Zustand → Dexie)
This flow defines the creation of an **immutable snapshot**, not an "overwrite" operation.

1.  **Trigger:** `saveCurrentProject(name)` is called from the UI.
2.  **State Capture:** The `projectSlice` reads the current `nodes` and `rootId` from the Zustand state.
3.  **Snapshotting:** A deep, serializable copy of the `nodes` is created to break object references.
4.  **Object Creation:** A new `Project` object is assembled with the snapshot, a user-provided `name`, the current `schemaVersion`, and ISO string timestamps for `createdAt` and `updatedAt`.
5.  **Persistence:** The `Project` object is passed to `db.projects.add()`. This is an append-only action.
6.  **Feedback & Refresh:**
    - On success, `refreshProjects()` is called to update the UI, and a success `toast` is dispatched.
    - On failure (e.g., storage quota exceeded), an error `toast` is dispatched.

---

## 4. The "Load" Workflow (Dexie → Zod → Zustand)
This is the most critical flow for maintaining application stability.

1.  **Trigger:** `loadProjectFromDB(id)` is called.
2.  **Data Retrieval:** The raw `Project` object is retrieved from Dexie.
3.  **Version Check:** The system checks the `schemaVersion` of the retrieved object. If it is missing or greater than the current app version, the load is aborted. The error message must distinguish between an **"outdated format"** (known, older version) and potentially **"corrupt data"** (unknown version).
4.  **Validation (The Zod Gate):**
    - The object is parsed using `projectSchema.safeParse(project)`.
    - **If validation fails:** The load is aborted immediately. An error `toast` informs the user of "corrupt data." The current Zustand state remains untouched.
    - **If validation succeeds:** The flow continues with the validated data. Timestamps are converted from strings to `Date` objects.
5.  **State Mutation:** The `loadProject(nodes, rootId)` action is called. This action **must** perform a complete state reset:
    - Replace the entire `nodes` object.
    - Set the new `rootId`.
    - **Reset the history stack:** `history: { past: [], future: [] }`. This is non-negotiable.
    - Reset selection: `selectedNodeId: null`.
6.  **Feedback:** A success `toast` is dispatched.

---

## 5. UX Contract Addendum: Persistence Guarantees

- **[UX-PS-01] No Silent Data Loss:** The system must provide explicit feedback for both successful and failed save/load operations.
- **[UX-PS-02] Load is a Clean Reset:** Loading a project is a destructive action on the current, unsaved state. It must clear the undo history to guarantee a clean state.
- **[UX-PS-03] Graceful Degradation:** If IndexedDB is unavailable, persistence-related UI should be disabled with an informative message. The core app must remain functional.
- **[UX-PS-04] Corruption Resilience:** The app must never crash when loading malformed or outdated data. The Zod gate rejects invalid data before it can contaminate the live state.
- **[UX-PS-05] Snapshot Immutability:** Saved projects are immutable snapshots. Loading a project never mutates the stored record. Any changes create a new snapshot.
- **[UX-PS-06] Validation Failure Is Non-Destructive:** A failed load attempt must never partially mutate or corrupt the live application state. The operation must be atomic.
