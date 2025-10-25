# Cheeky Prints Hydrogen Storefront – Code Review (2024-06-05)

## Overall impression
The current stylesheet establishes a cohesive palette and typographic tone, but several implementation choices still undermine responsiveness, accessibility, and perceived polish. Addressing the issues below will get the build closer to a boutique-level execution.

## High-priority issues
1. **Off-canvas aside sizing breaks on narrow viewports.** The cart/aside panel fixes its `right` offset and overlay hit area to `var(--aside-width)` even when the element clamps to `100vw`. On screens smaller than the 320px minimum, this leaves a gap when hidden and produces a negative width for the click shield, so tapping outside the drawer no longer closes it. Use the actual computed width (e.g., translateX with `100%`) instead of the token for positioning.【F:app/styles/app.css†L233-L318】
2. **Firefox still lacks `:has()` support by default.** Tying scroll locking and button fallbacks to `html:has(.overlay.expanded)` and `button.reset:not(:has(> *))` means those behaviors fail silently for Firefox <121. Provide non-`:has` fallbacks or progressive-enhancement guards to avoid scroll bleed and missing hover affordances.【F:app/styles/app.css†L233-L237】【F:app/styles/app.css†L352-L357】

## Design/UX opportunities
1. **Hero still reads heavy and low contrast.** The stacked border, drop shadow, radial pseudo-element, and stat card shadows add up to visual noise, and body copy sits at ~1.08rem in a muted color on a soft beige gradient. Lighten the treatment by reducing shadow depth, simplifying the background, and bumping supporting text contrast/size to approach the reference boutique’s airy aesthetic.【F:app/styles/app.css†L569-L719】
2. **Secondary CTAs skew earthy but fail AA on light surfaces.** The burnt orange gradient with dark text only yields ~3.2:1 contrast on the lightest state of the gradient. Consider deepening the gradient or using light text to meet accessibility requirements without sacrificing the warm palette.【F:app/styles/app.css†L93-L110】

## Polish suggestions
- Audit duplicated shadows (`box-shadow` defined twice across hero/card components) and align them to a smaller token set to trim CSS weight and achieve consistent depth.【F:app/styles/app.css†L569-L719】
- Extend the shared focus outline to other interactive elements (links, cards, nav toggles) so keyboard users receive consistent cues beyond buttons.【F:app/styles/app.css†L69-L110】

## Next steps
Prioritize fixing the off-canvas logic and `:has()` reliance to restore reliable cart interactions across browsers, then iterate on the hero/CTA styling for contrast and refinement. Once those are in place, ship another pass to consolidate shadows and focus states for a more professional finish.
