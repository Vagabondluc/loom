
# Obsolete Files for Erasure

This document tracks files that have been redundant or superseded by refactoring efforts. They are candidates for deletion to maintain project clarity.

---

### 1. `ui/Composites.tsx`
- **Reason:** This was a monolithic file containing multiple composite components.
- **Superseded by:** The components (`Panel`, `Surface`, `Toolbar`) have been extracted into individual files under the new `ui/composites/` directory as part of the Atomic Design refactor (see `Dec-012`).
- **Status:** Safe to delete.

### 2. `demo/builder/BuilderNavigator.tsx`
- **Reason:** This appears to be a previous, standalone implementation of the Navigator panel.
- **Superseded by:** The current implementation uses `demo/builder/palette/NavigatorTab.tsx`, which is integrated into the tabbed `BuilderPalette`.
- **Status:** Safe to delete. The functionality is preserved in `NavigatorTab.tsx`.

### 3. The entire `/docs/review/` directory
- **Files:** `agent.json`, `agent.md`, `gais instructions.txt`, `gais_guidelines.md`, `theme editor.md`.
- **Reason:** Meta-documents used for review/setup.
- **Superseded by:** Core project docs (`UX_CONTRACT.md`, `MENTAL_MODEL.md`).
- **Status:** Safe to delete.

### 4. `docs/brainstorm-structure-mode.md`
- **Reason:** Brainstorming document.
- **Superseded by:** `docs/roadmap/spec-structure-dock-workflow.md`.
- **Status:** Safe to delete.

### 5. Individual Export Specifications
- **Files:**
    - `docs/roadmap/spec-export-static.md`
    - `docs/roadmap/spec-export-react.md`
    - `docs/roadmap/spec-export-app-intent.md`
    - `docs/roadmap/spec-go-template-export.md`
    - `docs/roadmap/spec-export-content.md`
    - `docs/roadmap/spec-export-data.md`
- **Reason:** These have been consolidated into `docs/tdd-export-suite.md` which now contains the full specification, pipeline architecture, and verification plans for all targets.
- **Superseded by:** `docs/tdd-export-suite.md`.
- **Status:** Safe to delete.
