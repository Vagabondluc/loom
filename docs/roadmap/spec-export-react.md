
# Specification: React Source Export

**Type:** Framework Source
**Fidelity:** High (Structure & Logic)
**Target Audience:** Developers, Product Teams

## 1. Overview
This export target generates a modern, developer-ready React codebase. It ejects the user from the Loom proprietary editor into a standard Vite + React ecosystem.

## 2. Output Structure
The generator produces a standard Vite project structure:

```text
/project-name
  ├── package.json          (React 19, Tailwind, DaisyUI)
  ├── vite.config.ts
  ├── tailwind.config.js    (Generated from Theme Store)
  ├── postcss.config.js
  ├── index.html
  └── /src
       ├── main.tsx
       ├── App.tsx          (Router or Root Layout)
       ├── /components      (Atomic components)
       ├── /pages           (Route definitions)
       └── /styles          (Global CSS)
```

## 3. Transformation Strategy

### 3.1 Component Extraction
Loom's "Atomic" components are mapped to React components.
- **Primitives:** Standard HTML tags (`div`, `button`) with Tailwind classes are rendered inline.
- **Composites:** Reusable patterns identified in the builder (if "Symbols" logic exists) are extracted to `src/components/`.
- **DaisyUI:** Components retain their semantic class names (`btn btn-primary`), ensuring the code remains readable and maintainable.

### 3.2 Logic & State
- **Runtime Store:** Converted to a localized `zustand` store or React Context (`src/context/RuntimeContext.tsx`).
- **Event Bindings:** Builder events (`onClick`) are compiled into standard React event handlers.
- **Navigation:** Converted to `react-router` or standard `<a>` tags depending on complexity.

### 3.3 Theming
- The **Color Mill** settings are compiled into a valid `tailwind.config.js` theme extension.
- CSS variables are written to `src/styles/globals.css`.

## 4. Dependency Management
The `package.json` is generated with:
- `daisyui` plugin.
- `preline` plugin (if required).
- `lucide-react` for icons.
- `clsx` and `tailwind-merge` for class management.

## 5. UX Contract
- **[UX-EXP-RX-01]** Exported code must be clean, idiomatic React, not "machine code."
- **[UX-EXP-RX-02]** The project must run immediately after `npm install && npm run dev`.
- **[UX-EXP-RX-03]** No dependency on Loom-internal libraries. The builder runtime is compiled away.
