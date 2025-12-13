
# Vision: Loom Component Taxonomy (Builder-Safe Atomic Design)

This document adapts the "Atomic Design" methodology for the Loom builder, defining a clear component hierarchy that respects the project's static-first, runtime-boundary architecture.

---

## 1. Atoms ("Cannot be broken meaningfully")

-   **Definition:** A single HTML element or primitive with no layout authority.
-   **Examples:** `<button>`, `<input>`, `<img>`, `<span>`, `<svg>`, `<label>`, `<badge>`, `<avatar>`.
-   **Builder Rule:** Atoms have no children slots (or only accept a text label).

---

## 2. Molecules ("Small functional groups")

-   **Definition:** A small, fixed cluster of atoms forming a single, reusable function.
-   **Examples:** Input with a Label, Button with an Icon, Search Field (input + button), Card Header (title + action).
-   **Builder Rule:** Molecules typically expose one primary content slot or a small, fixed internal structure.

---

## 3. Organisms ("Meaningful UI blocks")

-   **Definition:** A self-contained section of an interface that has layout authority, contains multiple molecules/atoms, and expresses clear semantic intent.
-   ✅ **Yes, a Card is a textbook Organism.** It typically contains a container, an image (atom), a title (atom), body text (atom), and actions (molecules).

### Canonical List of HTML Organisms

#### Content Organisms
- Card
- Hero Section
- Feature Block
- Call-to-Action (CTA)
- Testimonial / Quote
- Pricing Tier / Plan

#### Navigation Organisms
- Navbar
- Sidebar
- Footer
- Breadcrumbs
- Pagination

#### Form Organisms
- Login Form
- Signup Form
- Settings Panel
- Search Panel

#### Data Organisms
- Table
- Data Grid
- List View
- Chart Container (⚠ runtime-bound)

#### Feedback Organisms
- Alert Box
- Modal Dialog
- Drawer / Off-canvas Panel
- Popover
- Empty State Panel

#### Layout Organisms
- Section
- Container / Wrapper
- Stack / Grid Region

---

## 4. Templates ("Page Skeletons")

-   **Definition:** Organisms arranged into a complete page layout, but with no real, specific content yet.
-   **Examples:** Landing Page Template, Dashboard Template, Blog Post Layout.
-   **Builder Rule:** Templates define structure, not data. They are used to spawn new pages, not dropped into existing ones.

---

## 5. Pages ("Bound to real data")

-   **Definition:** The final instance of a template, populated with actual content and bound to logic. This is the root of the builder's canvas.

---

## The JavaScript Axis: Applets (Runtime-Bound Organisms)

This concept sits parallel to the Atomic Design taxonomy and is crucial for Loom.

-   **Definition:** A node whose interactive behavior exists **only in Preview Mode or the final export**, never in the editor.
-   **Examples:** A JS-driven Preline accordion, a Chart.js widget, a video player.
-   **Rule:** Applets render as static placeholders in Design Mode and execute only in a live runtime environment. They are essentially **runtime-bound organisms**.

---

## Classification Cheat Sheet

| Question | If YES → |
| :--- | :--- |
| Single element? | **Atom** |
| Small functional group? | **Molecule** |
| Meaningful UI block with layout? | **Organism** |
| Skeleton of a page? | **Template** |
| Executable / JS behavior? | **Applet** |
| Bound to content + logic? | **Page** |
