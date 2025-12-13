
Good instinct. Your `index.html` is doing **too many jobs at once**, and that’s why it *feels* wrong even though nothing is “broken”.

Below is a **conceptual decomposition** of your file into **responsibility layers**, plus a refactor plan that stays fully aligned with:

* Loom’s **runtime boundaries**
* your **Static vs Runtime** rules
* **Preline / DaisyUI safety**
* future **export / Go template** support

No code rewriting — just architecture.

---

## 1. What Your Current `index.html` Is Doing (Too Much)

Right now, this single file is acting as:

1. **App Shell**
2. **Design System Loader**
3. **Runtime Initializer**
4. **Demo / Kitchen Sink**
5. **Static Content Host**
6. **Templating Playground**
7. **Brand Definition**

Those roles **must not live together** long-term.

---

## 2. Correct Mental Model: Split by Responsibility

Think in **five layers**, not one file.

---

## Layer A — App Shell (Non-Negotiable, Minimal)

**Purpose:**
Bootstraps Loom itself.

**Contains:**

* `<html>`, `<head>`, `<body>`
* `<div id="root">`
* `index.tsx` entry
* viewport + charset
* theme attribute (`data-theme`)

**Contract:**

> This layer must never change because of UI demos, Preline, or templates.

**Rule:**

* No example UI
* No cards
* No embeds
* No “static snippets”

---

## Layer B — Design System Loaders (Controlled, Declarative)

**Purpose:**
Load *capabilities*, not content.

### Includes:

* Google Fonts
* DaisyUI CSS
* Tailwind CDN config
* Preline JS (⚠️ runtime-bound)
* CSS variables (`--font-theme`)

**Key distinction:**

* **Loading a system ≠ using it**

This layer should be **purely infrastructural**.

**Contract rule:**

> Loading Preline JS here is acceptable, *but usage must be gated elsewhere*.

---

## Layer C — Runtime Wiring (Preview-Only Activation)

**Purpose:**
Prepare hooks for runtime behavior **without activating them**.

### Examples:

* Preline availability
* Applet bootstrapping
* Chart.js readiness
* Lazy-loading policies

**Important:**
This layer **must not execute UI logic by default**.

Think:

> “Runtime *capable*, not runtime *active*.”

This is where your **Preview Mode switch** later flips a flag.

---

## Layer D — Authoring Environment (React Owns the DOM)

**Purpose:**
Everything the builder, logic lab, and inspectors do.

### This includes:

* Visual Builder
* Logic Lab
* Kitchen Sink
* Theme Generator
* Story Creator

**Hard rule (already in your UX Contract):**

> No external JS library is allowed to mutate DOM inside the editor.

This is why:

* Preline components are **static**
* Charts are **schemas**
* Applets are **placeholders**

---

## Layer E — Static Content & Templates (❌ Currently in the Wrong Place)

This is the **problem section** in your file:

```html
<!-- Premade Static HTML Elements (for templating) -->
<div class="container mx-auto p-8 my-8 bg-base-200 rounded-box">
  ...
</div>
```

### What this content actually is:

* HTML Templates
* Demo Cards
* Export targets
* Content examples

### What it is NOT:

* App shell
* Editor UI
* Runtime preview

**Conclusion:**
This content **must not live in `index.html`**.

---

## 3. Where That Static Content Belongs Instead

You have **three valid homes**, depending on intent:

---

### Option 1 — Kitchen Sink (Static Reference Only)

If the goal is:

> “Show what raw HTML + DaisyUI looks like”

Then:

* Static
* No JS
* No Preline behavior
* Clearly labeled **Reference Only**

---

### Option 2 — Template Gallery (Feeds the Builder)

If the goal is:

> “These are droppable HTML structures”

Then:

* Stored as **template definitions**
* Rendered by the builder
* Never mounted directly in DOM
* Serialized for export

---

### Option 3 — Preview / Playground Page (Runtime Allowed)

If the goal is:

> “Show how this behaves when live”

Then:

* Separate route
* Preline JS allowed
* Applets mount
* Charts animate
* Clearly marked **Runtime**

---

## 4. The Refactor in One Sentence

> **`index.html` should only bootstrap Loom — never demonstrate Loom.**

Demonstrations belong to **pages**, not the shell.

---

## 5. How This Enables Go Templates Cleanly

Once decomposed:

* `index.html` → **Editor shell**
* Export → **Go template**
* Templates → **data**
* Static cards → **materials**
* Applets → **runtime nodes**

This avoids the fatal anti-pattern:

> “Export and authoring sharing the same HTML surface”

---

## 6. Recommended Decomposition Summary

| Responsibility     | Where it should live |
| ------------------ | -------------------- |
| App bootstrap      | `index.html`         |
| Design systems     | Head loaders         |
| Editor UI          | React only           |
| Static UI examples | Kitchen Sink         |
| Droppable HTML     | Template registry    |
| Interactive demos  | Preview / Playground |
| Export formatting  | Go templates         |

---

## 7. Final Sanity Check Rule

If you ask:

> “Should this HTML exist if Loom had zero UI?”

If the answer is **no**, it doesn’t belong in `index.html`.

---

If you want next, I can:

* propose a **clean index.html contract**
* design the **Template Gallery mental model**
* define **Applet mounting lifecycle**
* or map this directly to **Export → Go template structure**

You’re refactoring in exactly the right direction.
