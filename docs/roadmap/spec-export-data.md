
# Specification: Data & Schema Export

**Type:** Interchange Format
**Fidelity:** Absolute (State Dump)
**Target Audience:** CI/CD, Archival, Inter-Tool Operation

## 1. Overview
These exports provide raw access to the data structures defining the Loom project. They are non-visual and intended for machine consumption.

## 2. JSON Blueprint (Loom IR)
- **File:** `project-blueprint.json`
- **Content:** The canonical `BuilderState` node tree.
- **Use Case:**
    - Version control of designs.
    - Hydrating the builder in a different environment.
    - Programmatic generation of pages via scripts.
- **Schema:** Adheres strictly to `projectSchema` defined in `spec-persistence-workflow.md`.

## 3. Design Tokens (Theme JSON)
- **File:** `design-tokens.json`
- **Content:** A standardized dictionary of style variables extracted from the Theme Engine.
- **Structure:**
    ```json
    {
      "colors": {
        "primary": "#570df8",
        "secondary": "#f000b8"
      },
      "typography": {
        "fontFamily": "Inter, sans-serif",
        "scale": 1.2
      },
      "shape": {
        "radius": "0.5rem"
      }
    }
    ```
- **Use Case:** Importing theme values into Figma, Style Dictionary, or other design tools.

## 4. UX Contract
- **[UX-EXP-DT-01]** Blueprint export must be valid, parseable JSON.
- **[UX-EXP-DT-02]** Importing a Blueprint back into Loom must yield an identical project state (lossless round-trip).
