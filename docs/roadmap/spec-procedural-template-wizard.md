
# Specification: Procedural Template Wizard

## 1. Purpose & Core Principles
This document defines the contract for a "Template Wizard," a feature designed to guide users through the procedural generation of a complete website template. It leverages AI to translate high-level user requirements into a structured `BuilderNode` tree, providing a powerful starting point for customization in the Design Canvas.

**Guiding Principles:**
- **Guided Intent:** The wizard simplifies template creation by breaking it down into a series of clear, sequential choices based on web standards.
- **Templates as Teachers:** The wizard is an educational tool. It explains the *purpose* of each section it suggests.
- **AI as an Instructor:** The AI's role is to interpret user choices and output a valid, static `Template` object while strictly adhering to the architectural rules of the selected Website Archetype.
- **Seamless Integration:** The wizard's output is a standard `Template` object, making it fully compatible with the builder's existing `loadProject` action.

## 2. User Experience (UX) Flow

### 2.1 Trigger
- **Action:** The user initiates the wizard via a new "New Page with AI..." button, accessible from the `BuilderPalette` and/or the `CommandPalette`.
- **Feedback:** A full-screen modal opens, presenting the wizard interface.

### 2.2 Wizard Steps

#### Step 1: Define an Archetype (The Syllabus)
- **UI:** A selection of "Website Archetypes" rather than generic page types.
- **Options (Canonical):**
    1.  **Presentation Website** (Portfolio, Landing Page) - *Focus: Persuasion*
    2.  **Content Website** (Blog, Docs) - *Focus: Information*
    3.  **Shop / Commerce** (Catalog, Checkout) - *Focus: Transaction*
    4.  **Application** (Dashboard, Admin) - *Focus: Utility*
    5.  **Campaign / Event** (Launch, Conference) - *Focus: Urgency*
- **Visual Style (Tags):** "Minimalist," "Corporate," "Bold & Vibrant," "Dark & Moody," "Playful."
- **Description:** A natural language input for specific context (e.g., "A portfolio for a landscape photographer").

#### Step 2: Select Sections (The Lessons)
- **UI:** A checklist of sections dynamically suggested based on the Archetype selected in Step 1.
- **Guidance:** Each section includes **"Instructor Voice"** microcopy explaining its role.
- **Example (for "Presentation Website"):**
    - [x] **Header** (Required) - *Identity & Navigation*
    - [x] **Hero Section** (Recommended) - *Immediate value proposition. Don't let them scroll past without understanding.*
    - [x] **Value Proposition** (Recommended) - *Explain the benefits, not just features.*
    - [ ] **Social Proof** (Optional) - *Testimonials build trust.*
    - [x] **Call to Action** (Required) - *The primary conversion goal.*
    - [x] **Footer** (Required) - *Closure and secondary links.*
- **Behavior:** The user can select/deselect optional sections. Required sections are locked or strongly encouraged.

#### Step 3: Generation
- **UI:** A loading state is displayed.
- **Process (Internal):**
    1.  The user's choices are compiled into a prompt that enforces the **Archetype's structure**.
    2.  The prompt includes the "Instructor Voice" context so the AI fills content appropriate for the section's *purpose*.
    3.  This prompt is sent to the Gemini API with a strict JSON `responseSchema`.
    4.  The AI returns a complete `Template` object in JSON format.
- **Feedback:** Success message or error retry.

#### Step 4: Confirmation & Commit
- **UI:** A success message is displayed.
- **Controls:**
    - **"Create Page" (Primary Action):** Closes the wizard, clears the current canvas, and loads the newly generated template.
    - **"Cancel" (Secondary Action):** Discards the generated template.

## 3. Architectural Contract

- **Component:** `demo/builder/TemplateWizard.tsx` (React, local state).
- **AI Service:** `/services/promptBuilder.ts` will be updated to include Archetype definitions and Instructor prompts.
- **State Mutation:** Calls `loadProject(nodes, rootId)` from `treeSlice`.
- **Destructive Action:** The UI must warn that creating a new page replaces the current canvas content.

## 4. UX Contract Addendum: Wizard Guarantees

- **[UX-WIZ-01] Generation is a Starting Point:** The wizard communicates that output is a fully editable template.
- **[UX-WIZ-02] Process is Cancellable:** Safe exit at any step.
- **[UX-WIZ-03] Educational Value:** The wizard must explain *why* it suggests specific sections (e.g., "A Hero section is critical for first impressions").
- **[UX-WIZ-04] Deterministic Structure:** The AI must not hallucinate structural elements outside the requested Archetype (e.g., adding a "Checkout" to a "Blog" unless explicitly requested).
