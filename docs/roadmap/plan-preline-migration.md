
# Plan: Preline Migration (Library → Runtime)

## Goal
Remove Preline components from the "Static Material Library" (Kitchen Sink) and re-integrate them as "Runtime Adapters" accessible via the Behavior Engine and tested in the Runtime Workbench.

## Phase 1: Inventory & Classification
1.  **Audit Registry:** Identify all `COMPONENT_REGISTRY` entries with `category: 'preline'`.
2.  **Tag Applets:** Ensure all Preline components have `kind: 'applet'` and `meta.runtimeAdapterId = 'preline'`.

## Phase 2: Material Library Cleanup
1.  **Deprecate Tab:** Rename the "Preline" tab in `KitchenSink` to "Runtime Patterns (Reference)".
2.  **Remove Interactive Illusions:** Ensure all Preline examples in the Kitchen Sink are explicitly labeled as "Static Previews".
3.  **Add Directional Cues:** Add a prominent callout: *"Preline components are Runtime Applets. To test their behavior, use the Runtime Workbench."*

## Phase 3: Behavior Engine Integration
1.  **Adapter Binding:** Update the Logic Lab to allow selecting "Preline Modal Adapter" as a target for "Open Overlay" actions.
2.  **Action Mapping:** Map abstract actions (`open`, `close`) to the concrete Preline adapter methods defined in `spec-adapter-preline.md`.

## Phase 4: Runtime Workbench Implementation
1.  **Scaffold Workbench:** Build the `RuntimeWorkbench.tsx` page following `spec-runtime-workbench.md`.
2.  **Migrate Playground:** Move the content/demos from `RuntimeWorkbench.tsx` into specific Test Fixtures within the Workbench.
3.  **Delete Playground:** Once the Workbench is active, delete `PrelinePlayground.tsx` and redirect its route.

## Phase 5: Palette Update
1.  **Visual Distinction:** Ensure Preline items in the `BuilderPalette` have the "Play" icon (Runtime Only).
2.  **Drop Behavior:** Dropping a Preline component creates the *Static Shell* by default. Interactivity is strictly gated to Preview Mode.
