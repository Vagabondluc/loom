# TDD PACK — “Low-Code Superpowers” (UX Contract-Driven)

This document applies the three-layer TDD model to ensure each "superpower" is not only implemented correctly but is also trustworthy, predictable, and compliant with the UX Contract.

---

## 1) Zod-First Architecture

**Feature:** Zod Schemas
**Subsystem:** Data Modeling / Forms
**UX Contract Sections Covered:** 1.1 (Builder Never Lies), 5.1 (Selection is Deterministic)
**Primary User Intent:** To bind form inputs to a reliable data schema for validation and structure.

### Layer 1: Mechanical TDD
*   **[M-ZOD-01]** The `SCHEMAS` object in `utils/schemaRegistry.ts` can be imported and contains valid Zod schemas.
*   **[M-ZOD-02]** A `form` node in the builder has a `data.schemaId` property that can be updated.
*   **[M-ZOD-03]** An `input` node has a `data.field` property that can be updated.

### Layer 2: Behavioral TDD
*   **[BT-ZOD-01] Input Field Binding:** An `input` placed inside a `form` with a "login" schema correctly shows "email" and "password" in its "Bind to Field" dropdown.
*   **[BT-ZOD-02] Unbound State:** An `input` placed outside a `form` with a schema shows a disabled or "No Schema Found" state in its properties panel.
*   **[BT-ZOD-03] Schema Change Propagation:** Changing a `form`'s schema from "login" to "registration" correctly updates the available fields for all child `input` elements.

### Layer 3: UX Contract TDD
*   **[UX-ZOD-01] Builder Never Lies:** The fields listed in the "Bind to Field" dropdown for an input *must* correspond exactly to the keys of the parent form's Zod schema. There are no phantom or stale fields.
*   **[UX-ZOD-02] Deterministic Binding:** Binding an input to the "email" field, moving it, and then inspecting it again shows it is still bound to "email". The binding is persistent and trustworthy.

---

## 2) HTMX-Style Interactions

**Feature:** Declarative Data Fetching
**Subsystem:** Runtime / Data
**UX Contract Sections Covered:** 8.1 (Logic is Never Implicit), 8.2 (Editor Never Executes Logic)
**Primary User Intent:** To fetch and display data based on component attributes without writing code.

### Layer 1: Mechanical TDD
*   **[M-HTMX-01]** `useHtmxLogic` hook exists and can be called.
*   **[M-HTMX-02]** The `runtimeStore` has a `fetchData` action that can be triggered.
*   **[M-HTMX-03]** Setting `data-url`, `data-key`, and `data-trigger` props on a node is saved to the node's state.

### Layer 2: Behavioral TDD
*   **[BT-HTMX-01] Trigger on Load:** A `div` with `data-trigger="load"` automatically calls `fetchData` when entering Preview Mode.
*   **[BT-HTMX-02] Trigger on Click:** A `button` with `data-trigger="click"` only calls `fetchData` when clicked in Preview Mode.
*   **[BT-HTMX-03] Data Interpolation:** A `paragraph` with text `Hello, {{api.user.name}}` correctly displays "Hello, John Doe" after the relevant `data-key` ("api.user") is populated by a fetch.

### Layer 3: UX Contract TDD
*   **[UX-HTMX-01] Editor Never Executes Logic:** Adding or modifying `data-url` attributes in the editor **must not** trigger any network requests. Fetching only occurs in Preview Mode.
*   **[UX-HTMX-02] Logic is Never Implicit:** The Properties panel must clearly display the configured `data-url` and `data-key`, making the data-binding behavior explicit and inspectable.

---

## 3) Composite Components Pattern

**Feature:** High-Level Primitives
**Subsystem:** Component Registry / Layout
**UX Contract Sections Covered:** 1.1 (Builder Never Lies), 4.4 (Structure Mode is Safer)
**Primary User Intent:** To build layouts faster using robust, pre-composed patterns like Panel and Toolbar.

### Layer 1: Mechanical TDD
*   **[M-COMP-01]** `Panel`, `Surface`, and `Toolbar` components are exported from `ui/Composites.tsx`.
*   **[M-COMP-02]** The Component Registry contains definitions for 'panel', 'surface', and 'toolbar'.
*   **[M-COMP-03]** Dropping a `Panel` from the palette creates a node with `type: 'panel'`.

### Layer 2: Behavioral TDD
*   **[BT-COMP-01] Prop Passthrough:** Setting `elevation={3}` on a `Panel` in the properties editor correctly applies the `bg-neutral` class.
*   **[BT-COMP-02] Composition:** A `Toolbar` can be placed inside a `Panel` and function correctly. Children can be added to the `Toolbar`.

### Layer 3: UX Contract TDD
*   **[UX-COMP-01] Structure Mode Clarity:** In Structure Mode, a `Panel` must have a clear badge `[Panel]` and its outline must encompass its entire padded area, making its boundaries unambiguous.
*   **[UX-COMP-02] Predictable Abstraction:** The `Panel` primitive must reliably combine `Surface` behavior with padding and rounding. Changing its `elevation` prop should *only* affect its background/color and never its padding or shape, ensuring predictability.

---

## 4) Persistence with Dexie.js

**Feature:** Local Project Storage
**Subsystem:** Data / Persistence
**UX Contract Sections Covered:** 7.1 (All Actions Are Recoverable), 9.1 (Errors Are Recoverable)
**Primary User Intent:** To save work locally and not lose it on refresh.

### Layer 1: Mechanical TDD
*   **[M-DEX-01]** The `db` instance from `utils/db.ts` is a valid Dexie database.
*   **[M-DEX-02]** `saveCurrentProject` action adds a record to the `projects` table in IndexedDB.
*   **[M-DEX-03]** `loadProjectFromDB` retrieves a record and applies it to the store.

### Layer 2: Behavioral TDD
*   **[BT-DEX-01] Save and Refresh:** After saving a project, refreshing the browser and loading the project from the list restores the exact node tree.
*   **[BT-DEX-02] Delete Action:** Deleting a project removes it from the list in the UI and the underlying database.

### Layer 3: UX Contract TDD
*   **[UX-DEX-01] Graceful Failure:** If IndexedDB is blocked or fails, the application must still function. The "Save" button should be disabled and a `toast` should inform the user, rather than the app crashing.
*   **[UX-DEX-02] Data Integrity:** Loading a project from the database must completely replace the current state and clear the undo/redo history to prevent state corruption.