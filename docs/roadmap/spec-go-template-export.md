
# Specification: Go Template Export Strategy

## 1. Purpose & Core Principles
This document defines the architectural role and behavioral contract for using Go templates as an export target. The primary goal is to ensure that this export mechanism remains a pure, final-stage transformation that is fully compliant with the **Loom UX Contract**, particularly the separation of authoring, preview, and runtime execution.

**Guiding Principle:**
> The Go template is a **rendering backend**, not a logic engine. Its role is to format data, not to make decisions.

## 2. Architectural Contract

### 2.1 Domain Restriction
- **Allowed:** Go templates are permitted **exclusively in the export phase**. They are a pure text transformation tool for generating the final static artifacts.
- **Forbidden:** Go templates **must not** be used or referenced in the Editor, Preview Mode, Logic Lab, or any AI-driven explanation or generation surfaces. This preserves `UX-1.1 (Editor Is Static)` and `UX-13 (Runtime Boundary)`.

### 2.2 Export Pipeline (Mental Model)
The export process must follow this strict, unidirectional flow:

```
Builder State (Zustand JSON)
   ↓
Export AST (A normalized, serializable representation of the project)
   ↓
Template Context (Pure, decision-free data passed to the template)
   ↓
Go Template Rendering (Text transformation)
   ↓
Final Static Files (HTML, CSS, JS, etc.)
```

**Key Invariant:** All logical decisions, conditional resolutions, and structural computations must happen *before* the Go template is executed. The template only "prints" what it is given.

### 2.3 Template Context Contract
The data context passed to the Go template must be pure and declarative.
- **Allowed Data:** Page structure, node trees, attributes, class names, serialized logic (as inert data), pre-resolved feature flags.
- **Forbidden Data:** Functions, conditional logic that alters runtime behavior, I/O handles, network request configurations, or any other executable code.

## 3. UX Contract Addendum: Export Guarantees

The following rules will be considered part of the project's core UX Contract.

- **[UX-EX-01] Export Is a Pure Transformation:** The export process transforms the editor state into files. It does not execute logic, resolve runtime behavior, or have side effects.
- **[UX-EX-02] Templates Are Rendering Backends:** Any templating engine (Go, Handlebars, etc.) is an implementation detail of the export process and must not influence the authoring experience or introduce hidden behavior.
- **[UX-EX-03] Export Templates Are Inspectable:** The UI must allow a user to understand which template is being used for export, what data it will receive, and what kind of files it will produce.
- **[UX-EX-04] No Logic in Templates:** If a decision affects runtime behavior, it must occur and be resolved *before* the data is passed to the template. Templates may only be used for formatting, inclusion, and arrangement of data.

## 4. Implementation Guidance

### 4.1 Node Kind Mapping
- **HTML Nodes:** Rendered directly into the template.
- **Template Nodes:** Must be fully expanded and resolved into their constituent HTML nodes before being passed to the Go template context.
- **Applet Nodes (JS-driven):** The export process will emit placeholder HTML (`<div id="...">`), necessary script tags, and data attributes. The Go template's role is simply to wire this structure; it does not execute the applet's logic.

### 4.2 UI Microcopy
The Export UI should provide clear, concise explanations to manage user expectations.
- **Example:** "Exporting with 'Go (HTML)' template. This will format your project into static files. No logic is executed during export."
- **For Applet-heavy projects:** "Runtime behavior (e.g., for charts, interactive components) activates only in the deployed site, not during the export process."

This strategy ensures that Go templates can be integrated as a powerful, server-agnostic export target without compromising the architectural integrity and predictability of the Loom workbench.
