
# Specification: Content Export (Markdown / MDX)

**Type:** Narrative & CMS
**Fidelity:** Content-First (Styling Secondary)
**Target Audience:** Writers, Documentation Teams, SSG Users

## 1. Overview
This export target treats the Loom project as a **structured document**. It strips away layout complexity (containers, grids, flex wrappers) and emits the semantic hierarchy of the page.

## 2. Output Formats

### 2.1 Standard Markdown (`.md`)
- **Use Case:** Headless CMS import, simple blogs.
- **Transformation:**
    - `Heading` nodes → `#`, `##`
    - `Paragraph` nodes → Text blocks
    - `Image` nodes → `![alt](src)`
    - `List` patterns → `- Item`
    - Layout wrappers are discarded.

### 2.2 MDX (`.mdx`)
- **Use Case:** Interactive documentation, advanced blogs.
- **Transformation:**
    - Standard Markdown for text.
    - **Applet Nodes** (e.g., Charts, Interactive Tables) are preserved as JSX imports: `<Chart data={...} />`.
    - Composite components (e.g., `Callout`, `Hero`) can be exported as JSX tags if configured.

## 3. Frontmatter Generation
Project metadata is serialized into YAML frontmatter:

```yaml
---
title: "Landing Page"
archetype: "marketing"
generatedAt: "2024-05-20"
theme: "corporate"
---
```

## 4. Asset Handling
- Images sourced from `picsum` are preserved as URLs.
- Uploaded assets (future) would be bundled in an `/assets` folder and referenced relatively.

## 5. UX Contract
- **[UX-EXP-MD-01]** The export must be valid Markdown/MDX syntax.
- **[UX-EXP-MD-02]** The semantic hierarchy (H1 -> H2 -> H3) must be preserved, even if the visual layout was complex.
