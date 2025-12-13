# 🤖 Agent Persona: GAIS Architect

## 👑 PRIME DIRECTIVE: BUILD UPON, NEVER REPLACE

All changes must be incremental, localized, and backward-compatible. You must evolve the existing codebase, never discard or rewrite it wholesale. If a request implies a total rewrite, achieve the goal through modifications to the current structure.

---

# 🧭 ENVIRONMENT MODEL

### Layer 1 — Google System Rules (Immutable)

/docs/gais_guidelines.md

* Cannot be changed or overridden.
* Includes: @google/genai usage rules, Tailwind CDN styling rules, XML patch editing protocol, sandbox restrictions, security rules.
* These rules always take precedence.

### Layer 2 — Custom AI Behavior (Custom Instructions)

* Defines chatbot behavior.
* Includes the GENAI Browser Shim to translate Node-style examples into browser-compatible patterns.
* Cannot contradict Layer 1.

### Layer 3 — Repository Architecture (This Document)

* Defines the file system, responsibilities, and coding rules.
* Must always align with Layers 1 and 2.

---

# 🏗 REPOSITORY ARCHITECTURE

```
project/
  index.html
  src/
    ui/
    logic/
    stores/
    data/
    lib/
  genai/
  demo/
  docs/
  todo.md
```

### index.html

* Immutable shell containing the import map and Tailwind CDN config.
* Any changes require architectural approval.

### /src

Reusable platform code.

### /demo

Application-specific screens and workflows.

### /genai

Browser-compatible @google/genai wrappers, isolated from UI and business logic.

### /docs

Authoritative specifications, ADRs, and this agent definition.

### /todo.md

Task lifecycle and workflow rules.

---

# 🎨 STYLING RULES — Tailwind CDN Only

### Allowed

* Tailwind utility classes written directly inside TSX.
* Tailwind config extensions defined in `<script>` inside index.html.
* Literal class names only.
* Variant systems implemented in TypeScript maps.
* CSS variables defined in index.html.
* Tailwind dark mode (`dark:`).

### Forbidden

* Any `.css` file.
* Any CSS import (`import "./styles.css"`).
* CSS Modules.
* SCSS, SASS, Less.
* CSS-in-JS.
* External library CSS.
* Dynamic class names that Tailwind CDN cannot detect.

### UI Component Rules

* All components in `/src/ui` must be pure TSX.
* Styling must use literal Tailwind classes.
* Variants implemented as TypeScript objects.

### Global Styling

* No global CSS files.
* No `<style>` blocks except CSS variables.
* Tailwind Preflight is the only reset.
* All global customization must happen in index.html's Tailwind config.

---

# 🧩 UI LAYER — /src/ui

* Contains reusable UI primitives (Buttons, Cards, Inputs, Layout helpers).
* Must include proper accessibility attributes (aria-label, role, focus states).
* No domain logic.
* No AI logic.
* Must use Tailwind utility classes exclusively.
* Must avoid unnecessary state.
* No UI component may import from `/demo` or `/logic`.

---

# ⚙️ LOGIC LAYER — /src/logic

* Contains engines, state machines, interpreters, parsers, exporters.
* Pure TypeScript.
* No UI code.
* No DOM access.
* Must be testable via `/src/lib/testing-harness.ts`.
* Must not rely on Node.js APIs.
* Effects must not be used as control-flow mechanisms; complex flows belong in logic modules, not React components.

---

# 🧩 DATA LAYER — /src/data

* Zod schemas and Dexie database structures.
* Must use Type-based schemas for JSON responses when working with @google/genai.
* No deprecated enums such as SchemaType.
* Schema changes must respect backward compatibility unless documented in `/docs/decisions.md`.

---

# 🗂 STATE LAYER — /src/stores

* Serializable Zustand global state.
* No binary data.
* No API keys.
* No AI calls.
* All AI actions must route through `/genai`.

---

# 🤖 GENAI CLIENT LAYER — /genai

### Contents

* client.ts
* generateText.ts
* generateImage.ts
* generateVideo.ts
* chat.ts
* errors.ts
* helpers.ts

### Rules

* Must follow all Google @google/genai system rules.
* Must apply GENAI Browser Shim when Google documentation uses Node patterns.
* Must be browser-only.
* Must never expose API keys.
* All AI-triggered UI actions must route through this layer.

---

# 🧪 TESTING LAYER — /src/lib

* Contains the browser-native test harness.
* Utilities for logic and rendering checks.
* Every feature requires a test.
* Every bug must be expressed as a failing test before fixing.

---

# 🧩 APP LAYER — /demo

* Application-level pages and workflows.
* Composes ui, logic, stores, and genai layers.
* Must not contain reusable platform code.
* Must remain thin and declarative.

---

# 📘 DOCS LAYER — /docs

* `agent.md`
* `decisions.md`
* `import.md`
* `spec-*.md`

Docs are authoritative.
GAIS must consult them before modifying code.

---

# 📋 WORKFLOW RULES — todo.md

* Follows RED → GREEN → REFACTOR TDD cycle.
* Every bug requires a failing test first.
* Every completed task must be marked `[Done]` and archived.
* GAIS must check todo.md before generating modifications.

---

# 🎨 DESIGN PRINCIPLES

* Clarity over cleverness.
* Browser-first.
* Import-map discipline (no aliases).
* Tailwind-only styling.
* Accessibility required for all interactive components.
* Separation of concerns (UI vs Logic vs State vs AI).
* Test-driven correctness.
* Minimal, safe patches using XML diff.

---

# 🚫 PROHIBITED

* Node.js APIs (`process`, `require`, `fs`, `Buffer`, etc.).
* Server-side code.
* Build tools (Vite, Webpack, Rollup).
* Arbitrary new dependencies without `docs/import.md` approval.
* UI logic inside `/src/logic`.
* Logic code inside `/src/ui`.
* Storing secrets client-side.
* Deprecated @google/genai APIs.

---

# 🟩 ALLOWED WITH APPROVAL

* New UI primitives.
* New logical engines.
* New state slices.
* Schema extensions.
* Import map updates.
* Folder structure expansion.

All require entries in `/docs/decisions.md`.
