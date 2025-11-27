# Brand Guidelines — Cheeky Prints

This document defines the visual DNA of Cheeky Prints. All designs, code, and content must adhere to these principles.

## 1. Core Aesthetic
**"Brutalist / Irreverent / High-Energy"**
Inspired by [Touchy Coffee](https://touchycoffee.com/), we reject clean minimalism in favor of bold, raw, and highly contrasted visuals. We are not polite. We are cheeky.

## 2. Color Palette

### Primary (Backgrounds/Bases)
- **White**: `#FFFFFF` (Main background)
- **Black**: `#000000` (Text, Borders)

### Accents (The "Neon" Vibe)
Used for backgrounds, buttons, hover states, and decorative borders.
*Note: Do NOT use neon colors for body text against white backgrounds (fails WCAG).*

- **Hot Pink**: `#FF00FF`
- **Cyan**: `#00FFFF`

## 3. Typography

### Headings
- **Font**: **Space Grotesk**
- **Style**: Uppercase, Bold (700/900).
- **Usage**: Section headers, aggressive calls to action.

### Body / Code
- **Font**: **Courier Prime** (Monospace)
- **Style**: Regular.
- **Usage**: Product descriptions, specs, prices, buttons.

## 4. UI Elements

### Borders & Dividers
- Hard, solid black borders.
- Thickness: `1px` or `2px`.
- No soft shadows. No rounded corners (unless pill-shaped for specific tags).

### Layout
- **Verticality**: Section headers often rotated 90 degrees or stacked.
- **Marquee**: Infinite scrolling text for announcements.
- **Grid**: Visible grid lines are encouraged.

## 5. Accessibility (WCAG 2.1 AA)
- **Contrast**: Black text on Neon backgrounds passes. Neon text on White usually fails.
- **Focus States**: High-visibility outlines (Cyan/Pink) on focus.
- **Motion**: Respect `prefers-reduced-motion`. Disable marquees if requested.
