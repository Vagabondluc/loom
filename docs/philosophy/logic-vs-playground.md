# Vision: Logic Lab vs. Playground (Runtime Specialization)

This document clarifies the distinct roles of the **Behavior Engine (Logic Lab)** and the **Runtime Workbench**, ensuring their purposes remain separate and complementary.

---

## The Core Distinction (Tight and Precise)

### Behavior Engine = **Author + Inspect Logic**

Answers:
> “What should happen, and in what order?”

*   **Owns:** flows, conditions, actions, branching, AI-generated logic.
*   **Works on:** abstract events, abstract targets, abstract side effects.
*   This is the **runtime-agnostic** orchestration layer.

---

### Playground = **Bind Logic to Concrete Runtimes**

Answers:
> “What does *this* logic node do when executed by *this* runtime engine?”

This is where **Preline, Chart.js, and custom runtimes** live. It is the visual debugger for concrete runtime adapters.

---

## Why the Behavior Engine alone is not enough

The Behavior Engine is runtime-agnostic by design. That’s good. But that means it *cannot* answer questions like:

*   What does “Open Modal” actually do visually?
*   How does a Preline Tabs controller behave with 3 tabs vs 5?
*   How does a Chart.js node render with missing data?
*   What does an error state look like?

Those are **runtime-specific concerns**, and mixing them into the Behavior Engine would break its clean abstraction.

---

## The Mental Model

### Layer 1 — Design Canvas (Structure)

*   Static nodes
*   HTML / DaisyUI / Preline *templates*
*   No behavior
*   No execution

---

### Layer 2 — Behavior Engine (Behavior Orchestration)

*   Triggers, Actions, Conditions
*   Flow graphs
*   AI-generated logic
*   Runtime-agnostic

---

### Layer 3 — Playground (Runtime Adapters)

*   Concrete executors for **one action type**
*   Examples:
    *   Preline Modal Action
    *   Preline Tabs Controller
    *   Chart.js Render Node
    *   Toast / Notification system
*   No graph editing
*   No structure editing

Think of the Playground as:
> **“Unit tests + visual inspector for a single Behavior Engine node type.”**

---

## How Preline fits *specifically* now

#### 1. Design Canvas

*   User drops a **static Preline template** (e.g., Tabs with one selected, Modal as an open shell).
*   This creates a **targetable node ID**.

#### 2. Behavior Engine

*   User adds a `PrelineTabsController` or `PrelineModalController` action.
*   The logic node references the target node ID and declares triggers (`onClick`, `onLoad`, etc.).
*   No DOM is involved.

#### 3. Playground

*   Select **one Behavior Engine node** (e.g., `PrelineTabsController`).
*   Choose runtime: `Preline`.
*   Playground renders a minimal DOM scaffold with the target element and the runtime JS.
*   It shows: “this is what this action actually does.”

This is **not duplication**. It’s **runtime specialization**.

## Final synthesis

*   The Behavior Engine is the *authoritative source of behavior*.
*   Preline, Chart.js, etc., are **runtime adapters**, not logic systems.
*   The Playground exists to:
    *   validate adapters
    *   demonstrate effects
    *   debug runtime behavior
*   The Design Canvas stays clean.
*   The Material Library stays static.
*   No crashes, no lies, no ambiguity.

We weren’t missing a logic lab. We were missing a **place to let logic touch reality without breaking the editor**.
