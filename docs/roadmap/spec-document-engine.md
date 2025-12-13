
# Specification: Document Authoring Engine

**Architecture:** Markdown AST + Visual Authoring Layer
**Status:** Canonical (Recommended)
**Applies to:** Loom Design Canvas, Story Creator, Logic Lab, Export

---

## 1. Purpose & Positioning

This system defines **how written content exists in Loom**.

It replaces the idea of a “rich text editor” with a **document-as-structure** model that is:

* Inspectable
* Diffable
* AI-addressable
* Export-safe
* Runtime-clean

> **Core Principle:**
> Markdown is the *truth*. Visual editing is a *lens*.

---

## 2. Canonical Mental Model

### 2.1 What a “Document” Is in Loom

A Document is:

* A **semantic tree**
* Authored primarily as Markdown
* Rendered visually for comfort
* Never opaque
* Never runtime-active

A Document is **not**:

* A layout system
* A widget container
* A JS execution surface
* A freeform DOM blob

---

## 3. Architecture Overview

### 3.1 Canonical Data Flow

```
Markdown (source of truth)
   ↓
Markdown AST (mdast)
   ↓
Semantic HTML AST (hast)
   ↓
Rendered HTML (Design / Preview)
```

The **Markdown AST** is the authoritative representation.

---

### 3.2 Authoring Surfaces (Views)

| Surface         | Purpose                 | Authority   |
| --------------- | ----------------------- | ----------- |
| Markdown Editor | Precise authoring       | Canonical   |
| Visual Editor   | Comfort & accessibility | Derived     |
| AI Generator    | Draft creation          | Generated   |
| Inspector       | Explanation & intent    | Descriptive |

No surface is allowed to silently mutate another.

---

## 4. Structural Semantics (Why Markdown Wins)

Markdown elements map directly to Loom concepts:

| Markdown        | Loom Meaning              |
| --------------- | ------------------------- |
| `# Heading`     | Section boundary          |
| `## Subheading` | Nested scope              |
| Paragraph       | Narrative content         |
| List            | Intent / sequence         |
| Blockquote      | Emphasis / callout        |
| Code block      | Literal / non-interpreted |
| Horizontal rule | Structural divider        |

This gives Loom **structure for free**.

---

## 5. Integration with Loom Subsystems

### 5.1 Design Canvas

* Document nodes are **single selectable units**
* Sections (headings) are **sub-selectable**
* No layout manipulation inside documents
* Typography only (via theme)

---

### 5.2 Structure Mode

Structure Mode reveals:

* Section boundaries
* Heading hierarchy
* Document depth
* Scope regions

> A document is readable as a **map**, not a blob.

---

### 5.3 Logic Lab (Critical)

Document sections can be:

* Referenced by logic steps
* Used as explanation anchors
* Bound to flow context

Example:

> “This validation step applies to **Section: Pricing → Checkout Rules**”

This creates **narrative-backed logic**.

---

### 5.4 Story Creator

The Document Engine is the **primary substrate** for Story Creator.

Stories become:

* Structured documents
* With inspectable intent
* That feed logic explanations
* And UI scaffolding

---

## 6. Runtime Boundary (Non-Negotiable)

**Document Nodes are STATIC.**

| Mode      | Behavior    |
| --------- | ----------- |
| Design    | Editable    |
| Structure | Read-only   |
| Preview   | Render-only |
| Runtime   | Pure HTML   |

No JS.
No deltas.
No editor artifacts.

---

## 7. Export Guarantees

Exports must produce:

* Clean HTML
* No editor metadata
* No Markdown remnants (unless explicitly requested)
* No runtime scripts

Optional export targets:

* Static HTML
* Markdown (round-trip safe)
* SSG templates
* Go templates (text/template)

---

## 8. AI Integration Contract

### 8.1 AI May:

* Generate Markdown
* Annotate intent
* Propose structure
* Reference sections explicitly

### 8.2 AI Must NOT:

* Generate layout
* Generate runtime JS
* Hide ambiguity
* Bypass inspectability

### 8.3 Determinism Rule

> The same prompt produces structurally identical Markdown.

---

## 9. UX Contract Addendum (Document Engine)

### UX-DOC-01 — Inspectability

Every document has a readable structure view.

### UX-DOC-02 — Truthfulness

What the Inspector describes must exist in Markdown.

### UX-DOC-03 — Drift Visibility

If AI-generated content is edited, authority becomes **stale**.

### UX-DOC-04 — Runtime Purity

No document behavior executes outside Preview.

---

## 10. Test Plan
The TDD pack for the Document Engine has been extracted to a dedicated file.
**See:** `docs/tdd-document-engine.md`

---

## 11. Contract Requirements (Inventory)

| Proposed REQ-ID | Title                           | Risk           |
| --------------- | ------------------------------- | -------------- |
| REQ-DOC-01      | Semantic Hierarchy Preservation | Content loss   |
| REQ-DOC-02      | Layout Stripping Rules          | Invalid output |
| REQ-DOC-03      | MDX Applet Preservation         | Broken docs    |
