
# Spec: Dynamic Theme Engine

## 1. Overview
Moving beyond simple DaisyUI preset selection ("light", "dark", "retro"), the Dynamic Theme Engine allows granular control over global design tokens including Typography (font families) and Shape (border radius, line width).

## 2. Architecture

### 2.1 The CSS Variable Bridge
Since we cannot recompile Tailwind in the browser, we rely on CSS Variables injected into `:root` or `html`. Tailwind is configured to use these variables.

**Typography Variables:**
*   `--font-theme`: The primary font stack used by `font-sans`.

**DaisyUI Shape Variables (Overridden):**
*   `--rounded-box`: Border radius for large cards/containers.
*   `--rounded-btn`: Border radius for buttons.
*   `--rounded-badge`: Border radius for badges.
*   `--tab-border`: Border width for tabs.
*   `--border-btn`: Border width for buttons.

### 2.2 Data Model (`ThemeConfig`)

```typescript
interface ThemeConfig {
  fontFamily: string; // e.g., "Inter", "Merriweather", "Fira Code"
  fontType: 'sans' | 'serif' | 'mono'; 
  
  // Shape
  radiusBase: string; // Multiplier or direct value for rounded-*
  borderWidth: string; // Direct px value
}
```

### 2.3 Store Strategy
The `themeStore` will hold both the `theme` (color preset) and the `config` (shape/type overrides). 
*   Persisted via `localStorage`.
*   Updates are applied synchronously to the DOM via `App.tsx` side effects.

## 3. Font Strategy
We will load a curated list of Google Fonts in `index.html` to ensure availability:
*   **Sans**: Inter, Roboto
*   **Serif**: Playfair Display, Merriweather
*   **Mono**: Fira Code, Roboto Mono

## 4. UI Implementation
The **Theme Generator** will evolve into a "Global Design Settings" panel featuring:
*   **Typography**: Dropdown selector for the supported fonts.
*   **Shape**: Range sliders for Radius and Border Width.
