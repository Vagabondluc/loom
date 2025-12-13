
# Vision: Procedural Website Templates

### “What kind of website are you building?”

## 1. The Core Idea

A **Procedural Template** in Loom is not just a UI layout—it is a **mental model**, a **recommended structure**, and a **semantic guide**.

Instead of merely offering "a generic Hero component," Loom offers a guided course disguised as a template system. It answers the question:

> *“What sections should this kind of website have, and why?”*

This aligns with the Loom mission: **To teach people how the web is structured while letting them build it visually.**

---

## 2. Level 1: Website Archetypes (The Course Chapters)

These are top-level intents, not just visual themes. Selecting an archetype defines the "syllabus" for the wizard.

### 1. Presentation Website (Baseline)
*   **Intent:** Persuade, Introduce, Convert.
*   **Examples:** Personal site, Portfolio, Product landing page, Corporate homepage.
*   **Key Dynamic:** Visual impact + Clear value proposition.

### 2. Content Website
*   **Intent:** Inform, Educate, Archive.
*   **Examples:** Blog, Documentation, Knowledge base, Magazine.
*   **Key Dynamic:** Readability + Navigation depth.

### 3. Shop / Commerce Website
*   **Intent:** Transact, Browse.
*   **Examples:** Product catalog, Checkout flow, Subscription site.
*   **Key Dynamic:** Trust + Frictionless action.

### 4. Application Website
*   **Intent:** Perform, Manage.
*   **Examples:** SaaS dashboard, Admin panel, Tool interface.
*   **Key Dynamic:** Density + State management.

### 5. Campaign / Event Website
*   **Intent:** Hype, Register.
*   **Examples:** Conference, Fundraiser, Product launch.
*   **Key Dynamic:** Urgency + Singular focus.

---

## 3. Level 2: Canonical Sections (The Lessons)

Each archetype consists of **Required**, **Recommended**, and **Optional** sections. Below is the canonical definition for the **Presentation Website**.

### 1. Page Root (Always Present)
> *“This is a document, not an app.”*
*   **Role:** The container for vertical flow.
*   **Teaching Moment:** "Most websites grow vertically. This page expands with content."

### 2. Header (Required)
*   **Role:** Identity and Wayfinding.
*   **Contains:** Logo, Primary Nav, CTA.
*   **Constraint:** Appears once, always at the top.
*   **Teaching Moment:** "Headers orient users. Don't overload them."

### 3. Hero Section (Strongly Recommended)
*   **Role:** Immediate Clarity.
*   **Contains:** Headline (What), Subheadline (Why), Primary CTA.
*   **Teaching Moment:** "If users don't understand this section within 3 seconds, they leave."

### 4. Value Proposition (Recommended)
*   **Role:** Explanation of Benefits.
*   **Variants:** Feature Grid, Problem/Solution, Before/After.
*   **Teaching Moment:** "Focus on benefits, not just features."

### 5. Social Proof (Optional but Powerful)
*   **Role:** Trust Building.
*   **Examples:** Testimonials, Logo Clouds, Metrics.
*   **Teaching Moment:** "People trust people."

### 6. Call To Action / Footer (Required)
*   **Role:** Conversion and Closure.
*   **Teaching Moment:** "The footer answers 'what else?' and provides legal/contact closure."

---

## 4. Level 3: Procedural Guidance (The Instructor Voice)

Loom templates include "Instructor Voice" microcopy. This text explains *why* a section exists.

**Example (Hero Section):**
> "This section exists to immediately explain the value of the website. If users scroll past without understanding, your message failed."

This data feeds into:
1.  **AI Prompts:** The AI explains its choices using this voice.
2.  **Step Inspector:** Logic nodes related to these sections reference these goals.
3.  **Wizard UI:** Users read these tips while selecting sections.

---

## 5. AI as the Instructor

When generating a procedural template, the AI does **not** invent arbitrary structure. It fills the procedural guide.

**AI Persona Rule:**
> "You are assisting a Presentation Website. Explain each section’s role. Do not add sections not typical for this archetype."

This ensures:
*   **Inspectable Logic:** The user knows why the AI chose a layout.
*   **No Hallucinations:** The structure is deterministic.
*   **Education:** The user learns web standards by observing the AI.
