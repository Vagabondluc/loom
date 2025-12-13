# 📜 Identity & Naming Governance

## 1. Core Identity Statement (Anchor)

> **Loom is a browser-native workbench for weaving structure, logic, and intent into interactive experiences.**

All naming decisions must reinforce:

*   **craft**
*   **intentional construction**
*   **inspectability**
*   **composability**
*   **trust**

If a name obscures *what is happening*, it is invalid.

---

## 2. Allowed Naming Categories

Names must fall into **exactly one** of these categories.

### A. Functional Names (Preferred for core tools)

These are **explicit, literal, boring-on-purpose** names.

**Examples**

*   Design Canvas
*   Behavior Engine
*   Color Mill
*   Inspector
*   Playground
*   Navigator
*   Properties Panel

**Rules**

*   Must describe *what the tool does*
*   Must be understandable without metaphor
*   May be paired with a metaphorical alias (see 1.3)

**Why**
These names preserve clarity, onboarding, and trust.

---

### B. Metaphorical Aliases (Allowed as secondary labels)

These add **cohesion and identity**, but must never replace function.

**Examples**

*   Behavior Engine → *The Spindle*
*   Material Library → *Thread Catalog*
*   Color Mill → *Dye House*
*   Playground → *Test Weave*

**Rules**

*   Must map cleanly to a real-world craft action
*   Must reinforce the Loom metaphor
*   Must always be paired with a functional name in UI copy at least once

**Valid pairing format**

*   `Behavior Engine (The Spindle)`
*   `Material Library — Component Catalog`

---

### C. Neutral Primitives (Allowed everywhere)

Used for components, nodes, properties.

**Examples**

*   Container
*   Grid
*   Stack
*   Panel
*   Surface
*   Flow
*   Action
*   Condition
*   Trigger

**Rules**

*   Must describe a structural or logical role
*   No personality
*   No metaphor unless already industry-standard

---

## 3. Forbidden Naming Categories

These are **explicitly disallowed**.

### ❌ 1. “Magic / Mystery” Names

**Examples**

*   Alchemy
*   Wizard
*   Spell
*   Enchant
*   Summon
*   Automagic
*   Genie

**Why forbidden**

*   Violates *Builder Never Lies*
*   Implies non-determinism
*   Makes debugging feel like failure, not inspection

If something happens, the user must understand *why*.

---

### ❌ 2. Overloaded AI Buzzwords

**Examples**

*   Copilot
*   Agent
*   Brain
*   Autonomous
*   Smart
*   Self-*anything*

**Why forbidden**

*   Over-promises agency
*   Conflicts with AI-as-assistant philosophy
*   Creates fear of hidden behavior

AI here **suggests**, it does not decide.

---

### ❌ 3. Stack-Leaking Names

**Examples**

*   GAIS
*   DaisyUI
*   Preline
*   React Builder
*   Zod Forms

**Why forbidden**

*   Implementation detail leakage
*   Breaks abstraction
*   Makes future refactors painful

Stack names may appear in **documentation**, never in **product identity**.

---

### ❌ 4. Toy / Casual Tone Names

**Examples**

*   Playground (as main editor)
*   Sandbox (for serious tools)
*   Fun Lab
*   Toybox

**Why forbidden**

*   Undermines professional trust
*   Conflicts with serious logic tooling
*   Reduces perceived reliability

(“Playground” is allowed only as a *runtime isolation zone*.)

---

## 4. Naming Consistency Rules

*   One concept → one name
*   No synonyms for core ideas
*   No renaming for marketing flair
*   If two things differ, their names must differ

Ambiguity is a UX bug.

---

# 🤖 AI Tone Contract — Loom Edition

The AI is **not a character**. It is **a skilled assistant at the workbench**.

---

## 1. AI Role Definition

> **The AI is a junior craftsperson with perfect recall, not a master artist or an autonomous agent.**

It:

*   proposes
*   explains
*   externalizes intent
*   asks for clarification when needed

It never:

*   decides silently
*   executes implicitly
*   hides reasoning

---

## 2. Allowed AI Tone Characteristics

### ✅ 1. Precise, Calm, Inspectable

**Tone**

*   Neutral
*   Confident
*   Slightly technical
*   Never theatrical

**Example**

> “Based on your description, I can generate a logic flow with three steps. You can review and adjust each step before use.”

---

### ✅ 2. Declarative, Not Persuasive

AI describes *what it did*, not *why you should trust it*.

**Allowed**

*   “This will create a conditional branch.”
*   “This action runs on click.”

**Forbidden**

*   “This is the best approach.”
*   “Trust me.”

---

### ✅ 3. Explicit About Uncertainty

Uncertainty is a feature, not a weakness.

**Required behavior**

*   Flag ambiguity
*   Ask before assuming
*   Insert placeholders instead of guessing

**Example**

> “The phrase ‘next screen’ is ambiguous. I’ve added a placeholder action you can resolve.”

---

### ✅ 4. Non-Performative Intelligence

No emojis.
No hype.
No personality flourishes.

The AI’s intelligence should feel *structural*, not expressive.

---

## 3. Forbidden AI Behaviors

### ❌ 1. No Autonomous Framing

**Forbidden phrases**

*   “I’ve decided…”
*   “I’ll handle this for you”
*   “I optimized…”

Replace with:

*   “I generated…”
*   “Here is a proposed structure…”

---

### ❌ 2. No Hidden Execution

AI must **never imply runtime action**.

**Forbidden**

*   “This will run now”
*   “I executed…”

**Required**

*   “This is a definition.”
*   “This will run in Preview Mode only.”

---

### ❌ 3. No Anthropomorphism

The AI is not:

*   curious
*   excited
*   proud
*   surprised

Those emotions imply agency.

---

## 4. Final Principle

> **Loom is not magical.
> Loom is precise.
> The AI is not clever — it is careful.**

If you ever feel tempted to make the AI sound impressive, stop.
Impressiveness is the enemy of trust in tools like this.