# Dynamic vs Lazy vs Runtime Loading (Canonical Separation Model for Loom)

This document defines the behavioral contract boundaries for different loading strategies to prevent bugs, race conditions, and ambiguity.

---

## 1. The Core Problem
Without explicit separation, "loaded" can mean **imported**, **instantiated**, **executed**, **visible**, or **interactive**. These are five different states, and mixing them breaks Preview trust, Inspector truth, and runtime predictability. We solve this by defining four distinct loading domains.

---

## 2. The Four Loading Domains (Non-Negotiable)

### Domain A — **Static Presence**
> “This exists in the project.”

- The node exists in the tree; its schema and structure are defined.
- The Inspector can describe it.
- **It does NOT imply imports, execution, or side effects.**
- **Examples:** A Chart node placeholder, a Preline modal shell, a Logic step.
- **Inspector Language:** “This element is present in the structure.”

### Domain B — **Module Availability (Lazy / Dynamic Import)**
> “The code for this *can be loaded* if needed.”

- This is where **lazy loading** lives.
- A module may be imported later; the system knows how but hasn't done it yet.
- **It does NOT imply execution, DOM mutation, or listeners.**
- **Examples:** `Chart.js` library, Preline JS bundle, custom runtime adapters.
- **Inspector Language:** “This component requires a runtime module that is loaded on demand.”

### Domain C — **Runtime Activation**
> “The behavior is now live.”

- This is **execution territory**.
- Event listeners are attached, DOM is mutated, data flows, animations run.
- **Where Allowed:** Preview Mode, Playground, Exported build.
- **Where Forbidden:** Editor, Kitchen Sink, Logic Lab authoring view.
- **Inspector Language:** ▶️ “This behavior activates at runtime.”

### Domain D — **User-Triggered Activation**
> “The runtime behavior activates *because the user did something*.”

- This is **logic-level activation**, not loading.
- **Examples:** Click opens modal, hover shows tooltip, API response renders chart.
- This is orthogonal to loading; a module can be loaded but inactive, active but user-idle, or inactive and unloaded.
- **Inspector Language:** “This action triggers behavior when the event occurs.”

---

## 3. Contract Rules

> **UX-DL-01 — Lazy loading is not execution.** A module being loaded must not mutate state, alter the DOM, or attach listeners. Doing so violates the Editor contract.

> **UX-DL-02 — Lazy Loading Is Explicit.** Any node that relies on lazy loading must be labeled as such. No implicit imports.

> **UX-DL-03 — Runtime Activation Is Visible.** If behavior activates only at runtime, the UI must say so.

> **UX-DL-04 — Inspector Explains Loading.** The Inspector must explain whether code exists, whether code may load, whether behavior is active, and what triggers activation.

---

## 4. How This Prevents Crashes (e.g., The Preline Incident)

The previous crash occurred because Domain B (module availability) was treated as Domain C (runtime activation) inside the editor. By formalizing these domains:

- Preline JS lives in **Domain B**.
- The Preview toggle controls **Domain C**.
- The Kitchen Sink and Editor stay in **Domain A**.
- The Inspector explains the difference.

This prevents accidental execution and ensures editor stability.

---

## 5. The Mental Model (One Sentence)
> **Structure exists first. Code may become available. Behavior activates only at runtime. Logic defines when.**
