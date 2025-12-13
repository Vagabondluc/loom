
# TDD PACK — Procedural Wizards & AI Generation

**Features:** Template Wizard, Page Wizard, AI Prompting
**Subsystem:** Creation / AI Services
**Specs Covered:** `docs/roadmap/spec-procedural-page-wizard.md`, `docs/roadmap/spec-ai-preline-generation.md`
**UX Contract Sections Covered:** [UX-WIZ-01] to [UX-WIZ-04], [AIP-01] to [AIP-04]
**Primary User Intent:** To generate a complete, structured starting point for a page based on high-level intent, without manually assembling every atom.

---

## 1. Wizard UI & Flow

### Layer 1: Mechanical TDD
*   **[M-WIZ-01]** `TemplateWizard` modal renders when triggered.
*   **[M-WIZ-02]** Selecting a "Page Archetype" (e.g., Landing Page) updates the local state `pageType`.
*   **[M-WIZ-03]** Toggling "Sections" checkbox updates the `selectedSections` map.
*   **[M-WIZ-04]** The "Generate" button is disabled while `isGenerating` is true.

### Layer 2: Behavioral TDD
*   **[BT-WIZ-01] Dynamic Defaults:** Switching Archetype from "Landing Page" to "Dashboard" automatically changes the default selected sections (e.g., deselects "Hero", selects "Sidebar").
*   **[BT-WIZ-02] Section Configuration:** Expanding a section (e.g., "Hero") and changing "Layout" to "Centered" updates the `sectionConfig` state correctly.
*   **[BT-WIZ-03] Content Strategy:** Selecting "Lorem Ipsum" text mode ensures the prompt builder receives this instruction.

---

## 2. Prompt Engineering & Service

### Layer 1: Mechanical TDD
*   **[M-PRM-01]** `buildTemplateWizardPrompt` returns a string containing the user's selected Page Type, Style, and Sections.
*   **[M-PRM-02]** The prompt includes strict JSON formatting instructions.

### Layer 2: Behavioral TDD
*   **[BT-PRM-01] Instructor Voice:** If "Hero" is selected, the prompt includes the specific educational context ("Explain value proposition...").
*   **[BT-PRM-02] Negative Constraints:** If Image Mode is "None", the prompt explicitly forbids `<img>` tags or image components.
*   **[BT-PRM-03] Style Enforcement:** If Style is "Corporate", the prompt requests "clean lines" and "professional language".

---

## 3. AI Response & Safety (The Preline Contract)

### Layer 1: Mechanical TDD
*   **[M-AI-01]** The service parses the AI's JSON response using `aiGeneratedTemplateSchema`.
*   **[M-AI-02]** If parsing fails, the wizard displays a user-friendly error message, not a crash.

### Layer 2: Behavioral TDD
*   **[BT-AI-01] Node Transformation:** The flat array or nested tree returned by AI is correctly normalized into the Loom `Record<string, BuilderNode>` format.
*   **[BT-AI-02] ID Uniqueness:** Generated nodes have unique IDs to prevent collisions with existing canvas nodes.

### Layer 3: UX Contract TDD
*   **[UX-WIZ-03] Educational Value:** The generated template structure reflects the "best practices" defined by the Archetype (e.g., Header at top, Footer at bottom).
*   **[UX-AI-01] Static Markup Only:** The generated node tree **must not** contain any `script` tags, `onclick` handlers, or executable code strings. It must be pure data.
*   **[UX-AI-02] Preline Safety:** If the AI generates a Preline component (e.g., Accordion), it produces the **Static Shell** HTML with correct `data-*` attributes, but **no** initialization logic.
*   **[UX-AI-03] Deterministic Structure:** The AI respects the requested section order. It does not hallucinate unrequested sections.

---

## 4. Integration

### Layer 2: Behavioral TDD
*   **[BT-INT-01] Successful Load:** Upon successful generation, the `loadProject` action is called, the modal closes, and the canvas displays the new layout.
*   **[BT-INT-02] Undoability:** The entire generation event is treated as a single history step. Pressing "Undo" once clears the generated page and restores the previous state.
