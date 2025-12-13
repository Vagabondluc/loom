
# TDD PACK — Document Authoring Engine

**Feature:** Markdown-Based Document Node
**Subsystem:** Core Engine / Content
**UX Contract Sections Covered:** [UX-DOC-01] to [UX-DOC-04] (Inspectability & Truthfulness)
**Primary User Intent:** To write structured content (headings, lists, text) that remains inspectable, export-safe, and visually rich.

---

## Layer 1: Mechanical TDD (Implementation Correctness)

*   **[M-DOC-01]** Document nodes store Markdown string as their canonical data in `node.data.label` (or dedicated field).
*   **[M-DOC-02]** Markdown parses into a stable AST (or valid HTML string) via `utils/markdown.ts`.
*   **[M-DOC-03]** Visual editor (Preview mode or Render) reflects the Markdown structure exactly.
*   **[M-DOC-04]** The Inspector or Structure Mode can enumerate headings (H1-H6) within the document node.
*   **[M-DOC-05]** Export pipeline produces clean HTML without editor-specific metadata.

---

## Layer 2: Behavioral TDD (User Reality)

*   **[BT-DOC-01] Live Update:** Editing the Markdown source in the properties panel updates the visual rendered view immediately.
*   **[BT-DOC-02] Deterministic Rendering:** The same Markdown string always produces the exact same HTML output.
*   **[BT-DOC-03] Structure Visualization:** In Structure Mode, a Document Node reveals its internal hierarchy (e.g., markers for H1, H2) rather than being an opaque box.
*   **[BT-DOC-04] Story Mode Integration:** The Story Creator can read/write to these nodes without data loss.

---

## Layer 3: UX Contract TDD (Promises to the User)

*   **[UX-DOC-01] Builder Never Lies (Inspectability):** The Structure view matches the parsed Markdown structure. Users aren't tricked into thinking a stylized paragraph is a heading.
*   **[UX-DOC-02] No Hidden State:** No formatting exists in the visual output that cannot be represented in the source Markdown.
*   **[UX-DOC-03] AI Transparency:** If AI generates a document, it generates Markdown. It does not generate opaque HTML blobs.
*   **[UX-DOC-04] Preview Integrity:** The HTML rendered in Preview Mode matches the exported HTML byte-for-byte (excluding global page wrappers).
