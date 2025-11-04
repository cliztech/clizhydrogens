# Accessibility Report — Cheeky Prints Preview
_Method: Manual heuristics + axe-core ruleset review of design specs._

## Summary
- **Critical issues**: 0
- **Serious issues**: 3
- **Moderate issues**: 2
- **Minor issues**: 2

## Findings
| Severity | Location | Issue | Recommendation |
|----------|----------|-------|----------------|
| Serious | `/` hero banner | Background image + `colorPrimary` headline yields 3.8:1 contrast on mobile. | Switch hero text to `colorNeutral900` or darken overlay to `rgba(16,24,40,0.55)`.
| Serious | `/products/:handle` personalization iframe | Missing accessible name; screen readers announce "frame" only. | Add `title="Customize Cheeky Print"` and ensure focus is trapped inside iframe controls.
| Serious | `/account` | Login submit button lacks discernible text when icon-only (eye icon). | Provide text label or `aria-label="Sign in"`.
| Moderate | `/collections` filter drawer | Close icon not reachable via keyboard due to `tabindex="-1"`. | Remove negative tabindex; manage focus via JS when drawer opens.
| Moderate | `/cart` free shipping badge | Communicates shipping threshold via color only. | Add text "Spend $15 more for free shipping" and `role="status"`.
| Minor | `/search` results | Decorative SVG icons missing `aria-hidden="true"`. | Add `aria-hidden` and `focusable="false"`.
| Minor | Global | Skip link present but visually hidden focus offset misaligned. | Apply `top: spacingSm` and `left: spacingSm` when focused.

## Remediation Plan
1. Update hero overlay tokens to enforce 4.5:1 contrast within `ComponentLibrary` guidelines.
2. Collaborate with Printify integration to ensure iframe titles/localization support.
3. Add automated axe-core scan in CI (see `tests/e2e/accessibility.spec.ts`).
4. Re-test after fixes; no deploy to production until serious issues resolved.
