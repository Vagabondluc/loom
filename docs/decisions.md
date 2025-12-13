
# Architectural Decisions

## Dec-001: Decompose Monolithic KitchenSink
**Date:** 2024-05-22
**Status:** Accepted

**Context:** The `KitchenSink.tsx` file was becoming too large (>500 lines) and difficult to maintain.
**Decision:** Extract each UI category (Actions, Inputs, etc.) into its own file under `demo/sections/`.
**Consequences:** 
- Improved readability.
- Easier to extend with new components.
- Requires orchestrator component (`KitchenSink.tsx`) to manage layout and scrolling.

## Dec-002: Modular UI Coverage
**Date:** 2024-05-22
**Status:** Accepted

**Context:** The initial Kitchen Sink missed several DaisyUI primitives like Tables and Heroes.
**Decision:** Create specific sections for Tables, Marketing, Media, and Status to ensure full library representation without overcrowding existing sections.

## Dec-008: Adopt Contract-Driven Specification Model
**Date:** 2024-05-24
**Status:** Accepted

**Context:** Core specifications were mixing behavioral guarantees with implementation details (e.g., DaisyUI class names, native DOM APIs), making them brittle and hard to enforce.
**Decision:** All major specifications must be refactored into two layers: a **UX Contract Spec** defining non-negotiable promises and invariants, and a **Reference Implementation Spec** containing technical details.
**Consequences:**
- Core promises are now decoupled from the chosen UI library.
- TDD can be written directly against the contract, improving test quality.
- Future architectural changes (e.g., swapping drag libraries) are easier to manage.

## Dec-009: Formalize Core Governance Documents
**Date:** 2024-05-24
**Status:** Accepted

**Context:** The project lacked a "north star" and explicit, non-negotiable rules, leading to potential architectural drift and inconsistent user experiences.
**Decision:** The project will be governed by a set of high-level documents:
- `docs/UX_CONTRACT.md`: The supreme source of truth for user experience promises.
- `docs/MENTAL_MODEL.md`: Defines the conceptual role of each part of the builder.
- `docs/INVARIANTS.md`: A list of technical and UX rules that must never be broken.
- `docs/HARD_PROBLEMS.md`: A transparent log of known technical challenges.
**Consequences:**
- Provides a stable foundation for all future development.
- Aligns all contributors on a shared set of principles.
- Makes architectural reviews more objective.

## Dec-010: Define Strict Undo Semantics
**Date:** 2024-05-24
**Status:** Accepted

**Context:** The undo/redo functionality was implemented but lacked a formal definition of what constitutes a single, undoable "action," potentially leading to a confusing history stack (e.g., one undo step per character typed).
**Decision:** Create `docs/roadmap/spec-undo-semantics.md` to formally define the boundaries of atomic actions. For example, text input changes are debounced, and slider changes are committed on release.
**Consequences:**
- The undo/redo feature will now align with the user's mental model of an "action."
- Prevents history stack pollution from micro-updates.
- Makes the undo feature more trustworthy and predictable.

## Dec-011: Full Preline UI Integration
**Date:** 2024-05-25
**Status:** Accepted

**Context:** The initial Preline integration was a proof-of-concept. To fulfill the "dual-library" promise of the project, a more comprehensive set of Preline's core, JS-driven components is required.
**Decision:** Fully integrate a core set of Preline components (Alert, Accordion, Modal, Tabs, etc.) into both the Kitchen Sink demo and the Visual Builder's component palette, as detailed in `spec-preline-integration.md`.
**Consequences:**
- Provides users with a genuine choice between DaisyUI's component-class approach and Preline's utility-first, JS-driven approach.
- Increases the Visual Builder's capabilities for creating enterprise-style interfaces.
- Requires careful management of Preline's JS initialization lifecycle (`HSStaticMethods.autoInit()`).

## Dec-012: UI Folder Reorganization to Atomic Structure
**Date:** 2024-05-26
**Status:** Accepted

**Context:** The `/ui` directory was flat, mixing simple atoms (Button) with complex molecules (Navbar), making it hard to navigate and scale.
**Decision:** Reorganize the `/ui` directory into an Atomic Design-inspired structure: `/atoms`, `/molecules`, and `/composites`. A central barrel file (`/ui/index.ts`) will be used to manage exports, simplifying imports across the application. This replaces the previous plan for a "Radix-friendly" structure with one better suited for the existing DaisyUI component library.
**Consequences:**
- Improved developer experience and component discoverability.
- Clearer separation of concerns based on component complexity.
- Requires a one-time, widespread update of import paths across the `demo/` directory.
- Future components must be placed in the appropriate new directory.

## Dec-013: Introduce Explicit Page Settings
**Date:** 2024-05-27
**Status:** Accepted

**Context:** The builder's root canvas has an ambiguous sizing behavior, leading to layout bugs like content overflow. It implicitly tries to be both a fixed-height "artboard" (for app-like UIs) and a flowing "document" (for websites), causing unpredictable scroll behavior.
**Decision:** Implement a dedicated "Page Settings" interface, accessible when no node is selected. This will allow the user to explicitly choose the page's height behavior: "Fit to Viewport" (fixed height, internal scroll) or "Grow with Content" (variable height, browser scroll). This separates document-level semantics from container layout logic.
**Consequences:**
- Directly resolves the root cause of canvas overflow bugs.
- Gives users clear, intentional control over their layout's fundamental behavior.
- Requires a new data structure in the state store for page-level settings, distinct from node-specific properties.
- The `BuilderCanvas` component will be refactored to respect these new settings.

## Dec-014: Preline Integration Contract
**Date:** 2024-05-28
**Status:** Accepted

**Context:** Integrating Preline UI's JS-driven components directly into React's lifecycle caused DOM ownership conflicts and application instability. A formal contract is needed to ensure a safe and predictable integration.
**Decision:** Preline UI will be treated as a **"behavioral enhancement layer," not a React component library.** Its JavaScript is explicitly forbidden from executing within the Kitchen Sink and the Visual Builder's editing modes. Preline JS is only allowed to initialize in controlled, runtime-only environments like Preview Mode or on dedicated playground pages.
**Consequences:**
- Prevents all future crashes related to React/Preline DOM conflicts.
- Enforces a clear separation between static structure (React's responsibility) and dynamic behavior (Preline's responsibility).
- The Kitchen Sink will showcase Preline components as *static, visual templates* only.
- The Visual Builder will use these static templates, with interactivity enabled only in Preview Mode.
- This decision strengthens the "Editor Never Executes Logic" guarantee of the UX Contract.

## Dec-015: Project Rebranding to "Loom"
**Date:** 2024-05-29
**Status:** Accepted

**Context:** The project has evolved from a "starter kit" into an integrated "creative suite". The original name ("GAIS DaisyUI Starter") was technology-focused and undersold the project's vision and capabilities.
**Decision:** Rebrand the project to **"Loom"**, with the core metaphor of "weaving" structure, logic, and intent into interactive experiences. The core applications will be renamed to align with this workbench metaphor (e.g., Visual Builder → Design Canvas, Logic Lab → Behavior Engine). Formalize naming conventions and AI tone in `docs/IDENTITY_GOVERNANCE.md`.
**Consequences:**
- Creates a stronger, more memorable product identity that focuses on user value.
- Requires updates to UI copy, documentation, and metadata across the entire project.
- Aligns all parts of the suite under a single, cohesive narrative.

## Dec-016: Self-Documenting Logic via Step Inspector
**Date:** 2024-05-30
**Status:** Accepted

**Context:** The Behavior Engine visualized logic flows but did not explain the *intent* behind each step, violating the "Logic Is Never Implicit" principle.
**Decision:** The Behavior Engine will be enhanced with a **"Step Inspector"**. Each logic node will contain a natural-language `description` field. Clicking a step in the visualizer will display its detailed description, making the flow self-documenting. This transforms the engine from a visualizer into a design-time reasoning tool.
**Consequences:**
- Strongly reinforces the "inspectability" and "clarity" pillars of the Loom identity.
- The `LogicNode` data type is extended with a `description` property.
- The "System Log" UI is replaced with the new, interactive "Step Inspector" panel.
- This requires a new UX Contract addendum to govern "Explanation Authority" (e.g., generated vs. authored descriptions).

## Dec-017: Add Static HTML Snippets to index.html
**Date:** 2024-05-31
**Status:** Accepted

**Context:** A request was made to have pre-made, copy-pasteable HTML elements available for quick templating and reference.
**Decision:** Add a new section to the bottom of `index.html` (outside the React root) containing several static DaisyUI cards. This includes examples with responsive YouTube embeds and Picsum placeholder images. These elements are styled with Tailwind/DaisyUI but are not part of the React application. They will be lazy-loaded to improve performance.
**Consequences:** Provides a useful "snippet library" for developers without interfering with the main React application. Improves developer velocity for common patterns.

## Dec-018: Decompose index.html by Responsibility
**Date:** 2024-06-01
**Status:** Accepted

**Context:** The `index.html` file was serving multiple roles: app shell, design system loader, and static content host. The "Premade Static HTML Snippets" section violated the principle of separation of concerns.
**Decision:** Decompose `index.html`'s responsibilities as defined in `docs/philosophy/decomposition-strategy.md`. The core principle is that `index.html` should only bootstrap the application, not demonstrate it. The static HTML snippets will be removed. This content will be re-integrated into appropriate areas (e.g., Kitchen Sink, Template Registry) in future tasks.
**Consequences:**
- `index.html` is now a pure, minimal application shell, improving maintainability.
- Clearer separation between the application's bootstrapping environment and its content/demos.
- Paves the way for correct re-implementation of static examples within the React application.