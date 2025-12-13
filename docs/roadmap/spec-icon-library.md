
# Specification: Lucide Icon Library (Material Catalog)

## 1. Overview
The goal is to integrate a comprehensive browser for the **Lucide React** icon set into the Material Library (`KitchenSink`). This will allow users to browse, search, and identify icons available for use in the Builder.

**Scope (v1 - Reference Only):**
-   Display all valid icon components exported by `lucide-react`.
-   Provide performant search and filtering.
-   **Action:** Click to copy icon name (for use in properties panel or code).
-   **Future (v1.1):** Drag-and-drop instantiation of Icon nodes directly from this tab.

## 2. Architecture & Data Source

### 2.1 Data Ingestion
We import the entire namespace object via ESM.

```typescript
import * as LucideIcons from 'lucide-react';
```

### 2.2 Icon Export Filter Contract (Critical)
We cannot blindly iterate over `Object.keys(LucideIcons)` because the package exports helpers, aliases, and types. To adhere to **UX-ML-IC-01 (Catalog Never Lies)**, we must filter strictly.

**Rule:** An entry is considered an Icon if and only if:
1.  **Naming:** The key starts with a capital letter (PascalCase).
2.  **Type:** The value is a `function` (React Component).
3.  **Exclusion:** It is not in a specific `DENYLIST` of known non-icon exports (e.g., `createLucideIcon`, `Icon`, `lucide`, `default`).
4.  **Verification (Optional/Robustness):** The component renders an `<svg>` element (validated via a lightweight probe of the first N items, not all).

### 2.3 Component Structure
`demo/sections/IconLibrarySection.tsx`:
-   **Data Layer:** Memoized, filtered list of icons.
-   **Controls:** Sticky header with search input and status feedback.
-   **Virtualization/Batching:** A mechanism to render subsets of icons to preserve frame budget.

## 3. Performance Strategy & Budgets

Rendering 1500+ items violates **UX Contract §8.1 (Feedback Is Immediate)** if done naively.

### 3.1 Performance Budgets
*   **Tab Open:** Time-to-Interactive **< 100ms**. Heavy processing must be chunked or deferred.
*   **Search Keystroke:** Input must reflect immediately. Filtering must not block the main thread for **> 16ms** (one frame). Use debouncing or `requestIdleCallback` for result updates.
*   **Batch Size:** Render in chunks of **50–100** icons. Never render the entire set in one tick.
*   **Hard Ceiling:** Max visible icons **400** unless user explicitly triggers "Load More".

### 3.2 Implementation: "Load More"
We will avoid complex infinite scroll observers in v1.
-   **Initial State:** Render first 100 matches.
-   **Action:** "Load More" button at the bottom appends the next batch.
-   **Filtering:** Resets the list to the first batch of matches.

## 4. User Experience (UX)

### 4.1 UX Contract Mapping
-   **UX-ML-IC-01 (Catalog Never Lies):** Only true, usable icons appear. No internal helpers.
-   **UX-ML-IC-02 (Feedback Is Immediate):** Switching to the Icons tab never freezes the browser.
-   **UX-ML-IC-03 (Search Is Absolute):** Search results are deterministic and ignore UI state (e.g., scroll position).
-   **UX-ML-IC-04 (Copy Is Confirmed):** Copy actions always yield visible confirmation (toast/tooltip).

### 4.2 Interaction Design
-   **Location:** New "Icons" tab in `KitchenSink`.
-   **Search:** Prominent, sticky.
-   **Tile:** Grid layout. Each tile shows Icon + Name (truncated).
-   **Hover:** Tooltip "Click to copy [Name]".
-   **Click:** Copies name to clipboard.
-   **Feedback:** Toast "Copied: [Name]" (clears after 2s).

## 5. Test Plan
The TDD plan for this feature has been extracted to a dedicated file to ensure rigorous verification.
**See:** `docs/tdd-icon-library.md`

---

## 6. Contract Requirements (Inventory)

| Proposed REQ-ID | Title                | Risk          |
| --------------- | -------------------- | ------------- |
| REQ-ICON-01     | Catalog Never Lies   | Invalid icons |
| REQ-ICON-02     | Performance Batching | UI freeze     |
| REQ-ICON-03     | Deterministic Search | Trust         |
