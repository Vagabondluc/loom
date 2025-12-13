
# Specification: Procedural Page Wizard (Full-Page Modal)

## 1. Reframe: What This Wizard Is

This wizard is:

> **A guided course on what a web page is**, expressed as parameters.

It is **not**:

* an AI generator
* a theme picker
* a black box

It produces:

* a **complete page structure**
* **intentional placeholder content**
* **clear section boundaries**
* **editable, inspectable nodes**

---

## 2. Modal Scope & Presence

### 2.1 Full-Page Modal (Non-Negotiable)

**Why full-page:**

* This is a *mode*, not a dialog
* It defines the root page
* It prevents accidental canvas interaction
* It frames the action as “page generation”, not “component insert”

**Behavior:**

* Opens over the entire app
* Canvas is dimmed / inaccessible
* Clear exit paths: `Cancel`, `Generate`, `Save Preset`

---

## 3. Modal Structure (Top → Bottom)

### Header

* Title: **“Create a Page Layout”**
* Subtitle: *“Assemble a complete page from common web sections.”*
* Close (X) with confirmation if dirty

---

## 4. Section 1 — Page Archetype

### Label

**Page Archetype**

### Description

> “Choose the kind of page you are creating. This defines the default structure.”

### Options

* Landing Page
* Presentation / Marketing Page
* Documentation Page
* Blog / Article Page
* Shop / Product Page
* Dashboard / App Shell
* Blank Page (Advanced)

Each archetype:

* preselects sections
* sets sensible defaults
* remains fully editable after generation

---

## 5. Section 2 — Content Strategy (NEW)

This is where **Lorem Ipsum & Picsum belong** — explicitly.

### Group Title

**Placeholder Content**

> “Generate meaningful placeholders so you can focus on layout first.”

### 5.1 Text Content Mode

**Text Placeholder Style**

* ○ Realistic Marketing Copy (short, readable lorem)
* ○ Classic Lorem Ipsum
* ○ Headings Only (no body text)
* ○ Empty (structure only)

**Microcopy**

> “Text placeholders are static and safe. Replace them anytime.”

---

### 5.2 Image Content Mode

**Image Placeholder Source**

* ○ No Images
* ○ Solid Color Blocks
* ● Picsum Photos (random stock placeholders)
* ○ Custom Image URL

If **Picsum** selected:

* Aspect ratio inferred per section
* Images marked as `placeholder: true`
* Source visible in Inspector

If **Custom URL**:

* Single URL or per-section override
* Still treated as static HTML images

---

## 6. Section 3 — Visual Style (Existing, Clarified)

### Label

**Visual Style Preset**

### Description

> “Applies spacing, typography, and surface defaults. This is not a theme lock.”

Options:

* Default
* Minimal
* Editorial
* Bold / Marketing
* Dense / App-like

This:

* sets spacing scales
* sets section padding
* does NOT lock styles

---

## 7. Section 4 — Included Sections (Expanded)

### Label

**Page Sections**

> “Select which structural sections to include.”

Each section has:

* checkbox
* reorder handle
* short explanation

Example (Landing Page):

* ☑ Header
  *Navigation and branding*
* ☑ Hero
  *Primary message and call to action*
* ☑ Features
  *Value propositions*
* ☑ Testimonials
  *Social proof*
* ☑ Call to Action
  *Conversion focus*
* ☑ Footer
  *Secondary links*

---

## 8. Section 5 — Section Detail Overrides (NEW)

When a section is selected, it expands.

### Example: Hero Section

**Hero Content**

* Heading text source:
  ○ Generated headline
  ○ Lorem Ipsum
  ○ Empty

**Hero Media**

* ○ None
* ○ Picsum image
* ○ Color block

**CTA Buttons**

* ☑ Primary CTA
* ☐ Secondary CTA

This makes the wizard **educational**:

> “This is what a Hero section usually contains.”

---

## 9. Section 6 — Advanced (Collapsed by Default)

### Advanced Toggles

* ☑ Wrap page in `<main>`
* ☑ Semantic landmarks (`header`, `section`, `footer`)
* ☑ Generate accessibility attributes
* ☐ Generate logic hooks (Preview-only)

---

## 10. Generation Action

### Primary Button

**Generate Page Layout**

**Subtext**

> “Creates editable sections with placeholder content.”

### Secondary Actions

* Cancel
* Save as Template Preset

---

## 11. Output Guarantees (Critical)

When the page is generated:

* Every section becomes a **clear container node**
* Placeholder text is **static HTML**
* Picsum images are:

  * standard `<img>`
  * lazy-loaded
  * marked as placeholders
* No runtime JS is introduced
* Structure Mode shows clean hierarchy
* Inspector clearly labels placeholder content

---

## 12. UX Contract Addendum (Wizard)

* **No Hidden Logic**
  Wizard never injects runtime behavior.

* **Replaceability**
  All placeholder content is safe to delete.

* **Transparency**
  Picsum and Lorem are always visible as placeholders.

* **Teachability**
  The wizard teaches page anatomy through options.

---

## 13. Why This Is the Right Design

This turns the wizard into:

* a **procedural curriculum**
* a **page anatomy guide**
* a **safe layout accelerator**

Not:

* a prompt box
* a fake AI generator
* a magic button

---

## One-Sentence Rule

> **Procedural templates should explain the page they generate, not hide it.**

---

## 14. Contract Requirements (Inventory)

| Proposed REQ-ID | Title                   | Risk            |
| --------------- | ----------------------- | --------------- |
| REQ-WIZ-01      | Wizard Output Is Atomic | Undo corruption |
| REQ-WIZ-02      | Template Determinism    | AI drift        |
| REQ-WIZ-03      | Safety Guards Applied   | Runtime bugs    |
