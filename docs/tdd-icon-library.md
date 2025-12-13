
# TDD PACK — Lucide Icon Library

**Feature:** Icon Browser & Search
**Subsystem:** Material Library
**UX Contract Sections Covered:** [UX-ML-IC-01] to [UX-ML-IC-04] (Catalog Accuracy & Performance)
**Primary User Intent:** To rapidly find, visualize, and copy the name of an icon for use in the Builder.

---

## Layer 1: Mechanical TDD (Implementation Correctness)

*   **[M-IC-01]** Icons Tab exists in KitchenSink tabs model.
*   **[M-IC-02]** `IconLibrarySection` renders a grid container + sticky header.
*   **[M-IC-03]** Lucide namespace import provides an object of exports.
*   **[M-IC-04]** **Export Filter** produces a clean `iconNames[]` list with stable ordering (alphabetical), excluding non-component exports (e.g., `createLucideIcon`).
*   **[M-IC-05]** `visibleCount` state correctly slices the filtered results list for virtualization/batching.
*   **[M-IC-06]** Clicking a tile triggers the clipboard API with the icon name.
*   **[M-IC-07]** Copy feedback UI (toast/tooltip) appears upon click.

---

## Layer 2: Behavioral TDD (User Reality)

*   **[BT-IC-01] Search Substring:** Typing `user` shows `User`, `UserPlus`, `Users`, etc.
*   **[BT-IC-02] Search Reset:** Clearing search input restores the full list and resets `visibleCount` to the initial batch size.
*   **[BT-IC-03] Load More:** Clicking "Load More" increases `visibleCount` by a fixed increment without scroll jumping.
*   **[BT-IC-04] Copy Confirmation:** Clicking a tile displays "Copied: ArrowRight" and the message clears automatically.
*   **[BT-IC-05] Repeat Copy:** Clicking the same tile twice updates the feedback message reliably (no stale state).
*   **[BT-IC-06] Tag Filtering (v2):** Clicking a category tag (e.g., "Arrows") filters the list to the predefined subset.

---

## Layer 3: UX Contract TDD (Promises to the User)

*   **[UX-IC-01] Catalog Never Lies:** Manual inspection confirms no non-icon exports (like `createLucideIcon`, `Icon`, `default`) are visible in the grid.
*   **[UX-IC-02] Feedback Is Immediate:** Switching to the Icons tab does not cause a long frame stall (>100ms).
*   **[UX-IC-03] Search Is Absolute:** Search results are consistent regardless of previous filter states.
*   **[UX-IC-04] Copy Is Confirmed:** The user always receives visual confirmation of the copy action.
*   **[UX-IC-05] Visual Fidelity (v2):** The grid must update immediately (<16ms) when dragging sizing/stroke sliders.

---

## Layer 4: Performance TDD

*   **[P-IC-01] Batch Render Policy:** Initial render count is ≤ 100 icons.
*   **[P-IC-02] Keystroke Safety:** Rapid typing in the search bar does not freeze the UI; updates are debounced or use `requestIdleCallback`.
*   **[P-IC-03] No Full Render:** There is no code path that mounts all ~1500 icons at once.
