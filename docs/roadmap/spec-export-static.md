
# Specification: Static Web Export (HTML)

**Type:** Materialized Artifact
**Fidelity:** 1:1 (WYSIWYG)
**Target Audience:** Marketing, Prototyping, Documentation

## 1. Overview
This export target produces a standard, zero-build-step HTML package. It is the most "truthful" representation of the Design Canvas, converting the internal node tree directly into standard DOM elements with linked CDN assets.

## 2. Output Structure
The export generator produces a ZIP archive with the following structure:

```text
/dist
  ├── index.html
  ├── /assets
  │    ├── styles.css      (Extracted CSS variables & custom styles)
  │    ├── script.js       (Runtime adapter initialization)
  │    └── images/         (Local assets, if applicable)
  └── /pages               (For multi-page projects)
       ├── about.html
       └── contact.html
```

## 3. Technology Stack (DaisyUI Adaptation)
Unlike generic exporters, this targets the **Loom Stack** specifically:
- **Tailwind CSS (CDN):** Injected via `<script src="cdn.tailwindcss.com">`.
- **DaisyUI (CDN):** Injected as a stylesheet link.
- **Preline UI (CDN):** Injected only if Preline Applets are present in the tree.
- **Google Fonts:** Injected based on the Theme Store config.

## 4. Generation Logic

### 4.1 Head Generation
The `<head>` must include:
- The exact **Import Map** defined in the project (for module safety).
- The **Tailwind Config** script, populated with the user's Theme Store settings (colors, radius, fonts).
- **CSS Variables:** The global design tokens (`--rounded-box`, `--font-theme`) extracted from the Theme Engine.

### 4.2 Body Generation
- **Root:** The `root` node of the builder becomes `<body>` or `<div id="root">`.
- **Nodes:** Recursively rendered to HTML strings.
- **Attributes:** React `className` is converted to standard `class`. CamelCase attributes (`strokeWidth`) are converted to kebab-case (`stroke-width`) where appropriate for SVG/HTML.

### 4.3 Runtime Injection
If the project contains **Applet** nodes (e.g., `preline-accordion`):
1. The **Static Shell** HTML is rendered.
2. The `preline.js` script is added to the footer.
3. A `script.js` is generated containing the `HSStaticMethods.autoInit()` call.

## 5. Multi-Page Support
- **Source:** Uses the "Procedural Templates" mental model.
- **Routing:** File-system based routing (`/about.html`).
- **Shared Layouts:** If a "Layout" wrapper exists in the project structure, it wraps every exported page content.

## 6. UX Contract
- **[UX-EXP-ST-01]** The exported HTML must look pixel-perfect identical to Preview Mode.
- **[UX-EXP-ST-02]** The export must run locally (via `file://`) or on any static host (Netlify/Vercel) without a build step.
