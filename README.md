# 🚀 Loom

**Loom is a browser-native workbench for weaving structure, logic, and intent into interactive experiences.**

This modern, production-ready scaffold is designed specifically for Google AI Studio’s import-map environment. It enables rapid development with **React 19**, **DaisyUI**, **Preline UI**, and **pure ESM modules**, without requiring Node.js, bundlers, or build tooling of any kind.

The centerpiece of this suite is a powerful **Design Canvas**, demonstrating a low-code, drag-and-drop interface for creating responsive web layouts directly in the browser.

It is ideal for:

*   prototyping directly inside **Google AI Studio**
*   building complex, data-driven frontends without a build step
*   deployment as lightweight static web apps anywhere

---

## ✨ Technology Stack

This scaffold is built on a strict set of GAIS-compatible technologies.

### 🎯 Core Framework

*   **⚛ React 19 (RC)** — Modern, fast, browser-native React via ESM.
*   **📘 TypeScript (ESM)** — Strong types for a robust and scalable architecture.
*   **🎨 Tailwind CSS (CDN)** — Utility-first styling for maximum flexibility.
*   **🗺 Import Maps** — GAIS-native module resolution for instant load times and zero configuration.

---

## 🧩 UI Components & Styling

All components and styling systems are designed to be **GAIS-safe**.

### ✔ Dual-Library Approach

This template uses two powerful UI libraries, giving you flexibility in your design approach:

1.  **DaisyUI (Component-Oriented):** Provides semantic class names (`btn`, `card`, `alert`) for rapid, consistent component styling. It is the primary library for most UI elements.
2.  **Preline UI (Utility-Oriented):** An enterprise-grade library that relies on pure utility classes and JS behaviors. To ensure editor stability, its JavaScript is only activated in "Preview Mode" or on dedicated runtime pages.

### ✔ Dynamic Theming Engine

Theming is managed by a powerful, runtime-configurable engine:

*   **DaisyUI Themes:** The `data-theme` attribute on the `<html>` tag is controlled by a Zustand store, allowing instant switching between dozens of pre-built color schemes.
*   **CSS Variables Bridge:** Global design tokens (fonts, border radius, animation speed) are injected as CSS variables into the root, allowing Tailwind to consume them without a build step.
*   **No CSS Files:** All styling is achieved via CDN libraries and runtime-injected variables. **There are no local `.css` files to manage.**

### Icons

*   **Lucide React (ESM)** — A beautiful and consistent icon set, imported via CDN-safe modules.

---

## 🧠 Low-Code Logic Engine

This template includes a flexible logic engine that enables rich interactivity without writing complex code.

*   **Zod-First Architecture:** Define data structures in `utils/schemaRegistry.ts` using **Zod**. The Design Canvas can then bind form containers and inputs to these schemas for automatic validation.
*   **HTMX-Style Data Fetching:** Add `data-url`, `data-trigger`, and `data-key` attributes to any element to fetch data from an API and store it in a global state, mimicking the simplicity of HTMX.
*   **Conditional Visibility:** Use simple JavaScript expressions (e.g., `user.isLoggedIn`) to dynamically show or hide components in Preview Mode.
*   **Runtime Variable Store:** A global Zustand store (`runtimeStore`) holds application state that can be manipulated by user actions and used in logic expressions.
*   **Event System:** Attach actions like `toast`, `alert`, or `navigate` to `onClick` events directly from the Properties Panel.

---

## 🔄 State Management & Data

### State — `/stores/`

*   **Zustand 4.5:** Used for all global UI and application state.
    *   `themeStore`: Manages the current theme and global design tokens.
    *   `builderStore`: A complex, sliced store that manages the entire state of the Design Canvas.
    *   `runtimeStore`: Holds dynamic data used for logic and data binding.

### Data & Persistence — `/utils/db.ts`

*   **Dexie.js:** A minimalist wrapper for **IndexedDB**, providing robust, client-side persistence for saving and loading projects.

---

## 🎯 The Loom Creative Suite

The `/demo` folder contains the core applications of the Loom workbench.

### 1. **Material Library (`KitchenSink.tsx`)**

A **static catalog of methods**, not a demo app. It answers the question: *"What kinds of 'threads' can I build with?"* It is organized by architectural role (DaisyUI, Preline, Patterns, Logic) to teach the system's structure.

### 2. **Design Canvas (`VisualBuilder.tsx`)**

The flagship application where you weave the visual fabric of your application. A full-featured, low-code editor for creating responsive web pages.
*   **Drag & Drop Interface** with a rich component library.
*   **Responsive Viewports** (Mobile, Tablet, Desktop) with orientation toggle.
*   **Structure Mode** for a high-precision "X-Ray" view of your layout.
*   **Properties Panel** to edit layout, content, styles, and interactions.
*   **Undo/Redo** support and robust keyboard shortcuts.

### 3. **Behavior Engine (`LogicLab.tsx`)**

The "spindle" of the suite. A design-time reasoning tool to make logic flows **self-documenting, inspectable, and teachable**. It answers *"What should happen, and in what order?"* by allowing you to define abstract state machines and inspect the intent of each step.

### 4. **Runtime Workbench (`RuntimeWorkbench.tsx`)**

An isolated, sandboxed environment for validating **runtime adapters**. It serves as a runtime debugger for concrete UI logic, answering the question: *"What does this component actually do when executed?"*

Replaces the legacy Preline Playground.

### 5. **Narrative Weaver (`StoryCreator.tsx`)**

A hybrid prototype tool that demonstrates how to build a choice-based narrative game. It showcases the powerful combination of UI editing (`UI Mode`) and data/logic editing (`Logic Mode`).

### 6. **Color Mill (`ThemeGenerator.tsx`)**

The "dye house" of the suite. A powerful tool to create custom themes by adjusting colors, fonts, and other global design tokens. It provides a live preview and generates the necessary `tailwind.config.js` code for you.

---

## 🚀 Quick Start

1.  **Open the project inside Google AI Studio.**
    The application loads instantly from `index.html` with no setup required.

2.  **Explore the Suite.**
    Use the main navigation bar to switch between the Design Canvas, Behavior Engine, and other tools.

3.  **Start Building in the Design Canvas.**
    *   Drag components from the **Library** panel on the left.
    *   Select components on the canvas to edit them in the **Properties** panel on the right.
    *   Use the **Toolbar** at the top to switch viewports, toggle modes, and undo/redo changes.

---

## 📁 Project Structure

```
/index.html              # Import map, CDN links, root div
/index.tsx               # React entrypoint
/App.tsx                 # Main application shell and router

/demo/                   # Demo Applications (The Loom Suite)
  VisualBuilder.tsx      # Design Canvas
  KitchenSink.tsx        # Material Library
  ...                    # Other tools
  builder/               # Sub-components for the Design Canvas
  sections/              # Sub-components for the Material Library

/ui/                     # Reusable UI components (Atomic Design)
  index.ts               # Central barrel file for easy imports
  atoms/                 # Basic building blocks (Button, Input)
  molecules/             # More complex components (Card, Navbar)
  composites/            # High-level layout patterns (Panel, Surface)
  utils.ts               # Shared UI utilities (e.g., cn function)

/stores/                 # Zustand global state stores
/utils/                  # Shared utilities (theming, database, etc.)
/config/                 # Application configuration (themes, viewports)
/types.ts                # Global TypeScript type definitions

/docs/                   # Specifications, architecture decisions, TDD plans
/todo.md                 # Project tasks & workflow
```

---

## 🤝 Built for AI-Assisted Development

This scaffold is optimized for **Google AI Studio’s coding assistant**.
Every file is structured so the AI can safely:

*   generate new components in `/ui` or `/demo/sections`.
*   add new component definitions to the Design Canvas's registry.
*   create new Zustand stores or add actions to existing ones.
*   update or extend Zod schemas in `utils/schemaRegistry.ts`.
*   write new TDD plans in the `/docs` folder.

Without ever breaking GAIS import-map rules.

---

## ✔ GAIS Compatibility Summary

This scaffold is fully compliant with the restrictions of **Google AI Studio**:

*   ❌ No build step
*   ❌ No Node.js runtime
*   ❌ No local CSS files
*   ✔ Pure ESM via Import Maps
*   ✔ React 19, Tailwind, DaisyUI, Preline loaded from CDN
*   ✔ Browser-native persistence via IndexedDB (Dexie.js)
*   ✔ Safe, runtime-only styling and theming

Everything here is designed to work **inside the GAIS Monaco editor + live preview environment**, without additional tooling.

---

## ⚠️ GAIS Runtime Notes (Important)

This project targets GAIS's import-map runtime and follows these constraints:

- **Browser-only:** Do not use Node.js runtime APIs (e.g., `fs`, `path`).
- **State is King:** All UI should be a reflection of state. To change the UI, change the state in a Zustand store. Avoid direct DOM manipulation.
- **Adding Components:** To add a new component to the Design Canvas, you must add its definition to the `COMPONENT_REGISTRY` in `demo/builder/registries.ts`.
- **Architectural Specs:** Use the documents in `/docs` (especially `UX_CONTRACT.md` and `MENTAL_MODEL.md`) as the authoritative source for architectural rules and the project's philosophy.
- **Secrets:** For features requiring API keys (like the AI integration in `todo.md`), use the GAIS-provided environment variables, never hard-code secrets.