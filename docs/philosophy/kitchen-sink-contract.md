# Vision: Epistemic Separation in UI (The Kitchen Sink Contract)

This document reframes *why* the Material Library (formerly Kitchen Sink) must be organized by method, not just by visual appearance. The goal is **epistemic separation**: each section of the library should answer a single, clear question about the system's architecture.

---

## Why the Material Library *must* be separated by method

The Library currently answers **too many different questions at once**:

* “What components exist?”
* “What library does this come from?”
* “Is this safe in the editor?”
* “Is this runtime-only?”
* “Is this logic or UI?”

That overload causes two problems:

1. **Users can’t form a stable mental model.**
2. **Contributors will violate contracts accidentally.**

The fix is not just "tabs for neatness." The fix is:

> **Each tab answers exactly one question.**

---

## The Core Principle for the Material Library

> **The Material Library is a Static Catalog of Methods, not a Demo App.**

It does *not* show:

* behavior
* execution
* runtime state

It shows:

* structure
* syntax
* shape
* capability boundaries

---

## Material Library Mental Model

### The Library answers:

> “What *kinds* of things can I use, and *how* do they exist in the system?”

It does **not** answer:

> “What happens when I click this?”

That question belongs to Preview or the Playground.

---

## Tabs as “Methods”, not Libraries

This is subtle but critical. The tabs should **not** merely reflect vendors. They should reflect **architectural roles**. That said, vendor-aligned tabs *are valid* **when the vendor defines a method**.

### 1️⃣ **DaisyUI (Styling Method)**

**Question answered:**
> “What can I style without behavior?”

**Contents:**
* buttons, cards, alerts, badges
* inputs, layout utilities, visual states

**Contract alignment:**
* static-only
* editor-safe
* preview-identical

This is your **default builder palette**.

---

### 2️⃣ **Preline (Runtime-Capable Templates)**

**Question answered:**
> “What templates gain behavior at runtime?”

**Contents (static representations only):**
* tabs (one selected)
* accordion (one open)
* modal (open shell)
* dropdown (expanded)
* tooltip (visible)
* carousel (first frame)

**Explicit UI copy at top of tab:**
> “Preline components are shown as static templates. Behavior activates only in Preview or Export.”

**Why this works:**
* zero DOM mutation in editor
* no React conflict
* no false expectations

This tab is *declarative*, not interactive.

---

### 3️⃣ **Patterns (Composition Method)**

**Question answered:**
> “What higher-level layouts exist?”

**Contents:**
* page sections, headers/footers
* dashboards, auth layouts, marketing blocks
* navigation shells

**Source-agnostic:**
* may use DaisyUI
* may resemble Preline
* but are owned by *this project*

This is where the **product identity** lives.

---

### 4️⃣ **Logic & Data (Declarative Wiring)**

**Question answered:**
> “What can be described without executing?”

**Contents:**
* Zod schemas
* form binding examples
* interaction wiring
* AI-generated logic graphs
* data placeholders

**Critical rule:**
* nothing executes
* everything is inspectable
* everything is editable

This aligns perfectly with:
* “Editor never executes logic”
* AI Logic Generator rules

---

## UX Copy That Makes This Bulletproof

Each tab has a **one-line contract statement** at the top.

* **DaisyUI:** “Styling-only components. Safe in editor.”
* **Preline:** “Static templates. Behavior activates at runtime.”
* **Patterns:** “Composed layouts built from primitives.”
* **Logic & Data:** “Declarative wiring. No execution.”

These are *guardrails*, not decoration.

## Final takeaway

You’re not reorganizing UI. You’re **teaching the architecture through the UI**. Once this is done:
* Preline stops being dangerous.
* the builder stops lying.
* contributors stop guessing.
* users build faster with more confidence.
