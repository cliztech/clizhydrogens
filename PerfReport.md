status: "fail"

# Performance Audit — Cheeky Prints Preview
_Target budgets: LCP < 2000ms, CLS < 0.1, INP < 200ms (mobile)._  Metrics gathered with Lighthouse mobile profile against `https://preview.cheekyprints.shop`.

| Route | LCP (ms) | CLS | INP (ms) | Budget Met? | Notes |
|-------|---------:|-----:|---------:|-------------|-------|
| `/` (home) | 2320 | 0.05 | 168 | ❌ | Hero background served as 2400px JPEG, delay on hydration.
| `/collections/bold-botanicals` | 1980 | 0.04 | 182 | ✅ | Meets budgets but close on LCP; product card images unoptimized.
| `/products/cheeky-botanical-print` | 2560 | 0.07 | 214 | ❌ | 3D variant viewer blocking main thread; render-blocking CSS bundle.
| `/cart` | 1840 | 0.02 | 156 | ✅ | Within budget after skeleton display.
| `/search?q=print` | 2210 | 0.06 | 205 | ❌ | Facet panel loads full Algolia bundle upfront.

## Priority Fixes (auto-applicable)
- **Convert hero and PLP hero images to AVIF/WebP responsive sets** with `sizes="(max-width: 768px) 100vw, 1200px"` and limit width to 1600px.
- **Defer Printify personalization iframe** behind `loading="lazy"` and placeholder to cut PDP main-thread work by ~180ms.
- **Split filters bundle**: lazy-load Algolia facets when drawer opens; ship 2kb stub by default.
- **Inline critical CSS** for nav + hero via Vite plugin; defer rest of stylesheet with `media="print"` swap.
- **Increase CDN cache TTL** for `/collections` JSON to 10 minutes with stale-while-revalidate to reduce TTFB.

## Additional Recommendations
1. Introduce `prefetch="intent"` for PDP CTA to warm `/cart` route.
2. Implement `Priority Hints (fetchpriority="high")` on primary hero image after converting to AVIF.
3. Monitor INP across personalization flows using `web-vitals` library + GA4 custom event.
4. Add skeleton states for PDP gallery thumbnails to minimize CLS during hydration.

## Image Policy
- Author product imagery at 2400px max width.
- Generate AVIF + WebP + JPEG fallbacks via Shopify media transforms.
- Use `sizes` attribute tuned per template (e.g., PLP cards `sizes="(max-width: 768px) 50vw, 25vw"`).
- Enforce lazy loading on images below the fold; `loading="eager"` only for first hero asset.

## Cache & Delivery
- HTML: `Cache-Control: max-age=0, s-maxage=60, stale-while-revalidate=300`.
- JSON/GraphQL responses: `s-maxage=600`.
- Static assets: hashed filenames with `max-age=31536000, immutable`.
- Enable `Early Hints (103)` for hero CSS chunk and primary font preload.
