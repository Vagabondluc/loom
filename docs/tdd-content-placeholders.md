
# TDD — Content Placeholders

**Feature:** Lorem Ipsum & Picsum Image Components
**Subsystem:** Builder Library / Add Panel
**UX Contract Sections Covered:**
1.1 (Builder Never Lies)
4.x (Structure & Inspectability)
6.x (Static vs Runtime Boundary)
9.x (Export Safety)

**Primary User Intent:**
To rapidly scaffold realistic-looking pages using safe placeholder content that can later be replaced with real text or images, without introducing runtime dependencies or hidden behavior.

---

## 0. Component Classification (Non-Negotiable)

| Component    | Node Kind                      | Runtime Behavior |
| ------------ | ------------------------------ | ---------------- |
| Lorem Ipsum  | **Static HTML / Content Node** | None             |
| Picsum Image | **Static Media Node**          | None             |

These are **authoring aids**, not widgets.

---

## 1. Library & Add Panel Integration

### Layer 1 — Mechanical TDD

* **[M-LIB-01]** The Component Registry includes a `loremText` entry.
* **[M-LIB-02]** The Component Registry includes a `picsumImage` entry.
* **[M-LIB-03]** Both components appear in the **Add Panel** under a category labeled **Content / Placeholders**.
* **[M-LIB-04]** Both components render correctly in the UI Kitchen Sink (static preview only).
* **[M-LIB-05]** Dragging either component from the Add Panel produces a valid BuilderNode.

---

### Layer 2 — Behavioral TDD

* **[BT-LIB-01]** Dragging *Lorem Ipsum* inserts a text-based node containing placeholder copy.
* **[BT-LIB-02]** Dragging *Picsum Image* inserts an image node with a valid placeholder image source.
* **[BT-LIB-03]** Dropped components are immediately selectable and editable in the Properties panel.
* **[BT-LIB-04]** Both components can be placed inside containers, cards, sections, and documents without layout breakage.
* **[BT-LIB-05]** Replacing placeholder content does not alter the node’s structural identity.

---

### Layer 3 — UX Contract TDD

* **[UX-LIB-01] Builder Never Lies**
  The UI must clearly label these components as **placeholders** (e.g. “Lorem Ipsum (Placeholder)”).

* **[UX-LIB-02] No Hidden Behavior**
  Neither component triggers network requests beyond static image loading.

* **[UX-LIB-03] Inspectability**
  The Inspector explicitly shows:

  * “This is placeholder content”
  * What will be exported

---

## 2. Lorem Ipsum Component

### Intent

Provide fast, realistic text scaffolding for layouts and documents.

---

### Layer 1 — Mechanical TDD

* **[M-LOR-01]** The Lorem Ipsum node stores its content as static text.
* **[M-LOR-02]** The node supports configuration for length (short / paragraph / long).
* **[M-LOR-03]** The content is fully editable after insertion.
* **[M-LOR-04]** The component does not depend on external libraries or APIs.

---

### Layer 2 — Behavioral TDD

* **[BT-LOR-01]** Changing the text converts it from “placeholder” to “user-authored”.
* **[BT-LOR-02]** Editing text does not regenerate placeholder content automatically.
* **[BT-LOR-03]** The component behaves identically to normal text nodes after editing.

---

### Layer 3 — UX Contract TDD

* **[UX-LOR-01] Explicit Placeholder State**
  The Inspector shows a badge: **Placeholder Text** until edited.

* **[UX-LOR-02] No Surprise Regeneration**
  Placeholder text never reappears after user edits.

* **[UX-LOR-03] Export Truthfulness**
  Exported HTML contains only the visible text—no placeholder markers.

---

## 3. Picsum Image Component

### Intent

Provide fast visual scaffolding with safe, swappable imagery.

---

### Layer 1 — Mechanical TDD

* **[M-PIC-01]** The Picsum Image node renders an `<img>` element.
* **[M-PIC-02]** Default source uses a deterministic Picsum URL.
* **[M-PIC-03]** The node exposes an `imageSourceMode`:

  * `picsum`
  * `customUrl`
* **[M-PIC-04]** Switching to `customUrl` disables Picsum generation.

---

### Layer 2 — Behavioral TDD

* **[BT-PIC-01]** The image renders immediately after drop.
* **[BT-PIC-02]** Changing the image URL updates the rendered image.
* **[BT-PIC-03]** Switching source mode preserves sizing and layout.
* **[BT-PIC-04]** The component supports responsive sizing rules.

---

### Layer 3 — UX Contract TDD

* **[UX-PIC-01] Placeholder Visibility**
  Inspector clearly indicates when the image source is Picsum.

* **[UX-PIC-02] No Runtime Mutation**
  Image source does not change automatically at runtime.

* **[UX-PIC-03] Export Safety**
  Export contains:

  * Picsum URL if still placeholder
  * Custom URL if replaced
    No Loom-specific metadata.

---

## 4. Structure Mode Behavior

### Layer 2 — Behavioral TDD

* **[BT-STR-01]** Both components show clear boundaries in Structure Mode.
* **[BT-STR-02]** Placeholder status is visible as a badge or icon.
* **[BT-STR-03]** Empty image alt text is flagged visually.

---

### Layer 3 — UX Contract TDD

* **[UX-STR-01] Structure Never Lies**
  The structure overlay matches the actual HTML envelope.

---

## 5. Export Guarantees

### Layer 3 — UX Contract TDD

* **[UX-EXP-01] Static Export Only**
  No scripts, fetches, or placeholders logic are included.

* **[UX-EXP-02] Deterministic Output**
  Exported HTML matches Preview exactly.

* **[UX-EXP-03] Intent Preservation**
  Placeholder usage remains visible only in Builder, never in runtime unless explicitly kept.

---

## 6. Library Categorization Contract

* **Category:** Content → Placeholders
* **Icons:**

  * Lorem Ipsum → text / paragraph icon
  * Picsum Image → image / photo icon
* **Microcopy:**
  “Use for layout scaffolding. Replace before production.”

---

## Final Loom Rule (Placeholders)

> **Placeholders help you think faster — they must never think for you.**
