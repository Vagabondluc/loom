
# 🧠 Loom Mental Model Manifest

## 1. The North Star

This document defines the core mental models that the builder must consistently reinforce. All design and implementation decisions must align with this primary goal:

> **At all times, the user must be able to confidently answer: ‘What am I about to change, and why?’**

---

## 2. The Core Models

Each part of the Loom suite has a distinct conceptual role. The system's predictability relies on never mixing these roles.

### 2.1 The Canvas is **Reality**
*   The canvas shows the user's creation as it truly is.
*   It is the WYSIWYG representation of the current state.
*   It is never an approximation.

### 2.2 The Navigator is **Truth**
*   The navigator displays the absolute, unambiguous hierarchical structure of the node tree.
*   If the canvas feels confusing, the navigator is the definitive source of truth for hierarchy and parent-child relationships.
*   It is the "DOM Inspector" for the builder's state.

### 2.3 The Add Panel is **Creation**
*   This is the wellspring of all new elements.
*   Its purpose is to make finding and initiating the creation of a new node as fast and low-friction as possible.
*   It is a tool of pure addition.

### 2.4 Drag-and-Drop is **Planning**
*   The act of dragging an object is a "what-if" scenario.
*   The user is planning a structural change, and the system provides ephemeral visual feedback (ghosts, highlights) to help them.
*   No permanent change is ever made until the final "commit" (the drop).

### 2.5 Structure Mode is **Clarity & Safety**
*   This mode is an X-Ray that makes the invisible visible.
*   Its purpose is to remove all ambiguity from layout and selection.
*   It is a safer, more precise environment for complex structural work, prioritizing clarity over aesthetics.

### 2.6 The Properties Panel is **Inspection & Refinement**
*   This panel is for observing and fine-tuning the attributes of a *single, selected node*.
*   It is a tool of precise adjustment, not broad structural change.
*   It answers the question: "What is this thing, and how can I change it?"

### 2.7 Preview Mode is **Execution**
*   This is the only mode where the creation comes to life.
*   It disables all builder chrome and enables user-defined logic (events, data fetching, navigation).
*   It answers the question: "How does this actually behave?"

### 2.8 The Material Library is a **Static Catalog**
*   It answers the question: *"What kinds of 'threads' can I use, and how do they exist in the system?"*
*   It does **not** show behavior; it shows **structure, syntax, and boundaries**.
*   Its tabbed organization (DaisyUI, Preline, Patterns, Logic) teaches the project's architecture.

### 2.9 The Behavior Engine is **Intent Inspection**
*   It answers the question: *"Why does this logic exist, and what is its role?"*
*   It is a **design-time reasoning tool** that makes logic flows self-documenting, inspectable, and teachable.
*   It visualizes abstract logic flows and allows the user to inspect the narrative explanation for each step.
*   It works with abstract events and design intent, not concrete execution.

### 2.10 The Playground is **Runtime Specialization**
*   It answers the question: *"What does this abstract logic node do when executed by a specific runtime engine (like Preline.js)?"*
*   It is the **visual debugger for concrete runtime adapters**.
*   It exists to validate and demonstrate the effects of logic on live, interactive components in a safe, isolated environment.

### 2.11 Templates are **Teachers**
*   They answer the question: *"What is the correct structure for this type of website?"*
*   A procedural template is a guided course. It teaches the user about **Archetypes** (e.g., Presentation vs. Commerce) and **Canonical Sections** (e.g., "Why do I need a Hero section?").
*   It guides the user toward architectural best practices before they even place a node.

---

## 3. The Unifying Principle

These models work together to create a trustworthy system. A user can **Learn** from a template, **Create** an item from the catalog, **Plan** its placement, see the **Reality** of that placement on the canvas, inspect the **Truth** of its hierarchy in the navigator, and **Refine** its details in the properties panel—all with the confidence that **Clarity** is one click away. They can then orchestrate its **Behavior** abstractly and test its **Execution** with a specific runtime.
