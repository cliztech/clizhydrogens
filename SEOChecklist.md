# SEO Checklist — Cheeky Prints Hydrogen Storefront

## Global
- [ ] Ensure `<html lang>` dynamically matches locale (en-US, en-GB, en-AU).
- [ ] Use descriptive `<title>` (55–60 chars) and meta descriptions (150–160 chars) per route.
- [ ] Configure canonical tags per localized route (US canonical, UK/AU alternate with hreflang).
- [ ] Generate XML sitemap via Hydrogen route `/sitemap.xml`; include images for PDPs.
- [ ] Provide `/robots.txt` allowing `User-agent: *` with disallow for admin, cart Ajax endpoints.
- [ ] Load structured data via JSON-LD: Organization, Product, Breadcrumb, FAQ (if content available).
- [ ] Ensure noindex on customer account routes and cart drawer overlays.
- [ ] Serve preconnects to `cdn.shopify.com`, `fonts.gstatic.com`, `algolia.net`, `printify.com`.

## Route-specific Metadata
| Route | Title Recommendation | Meta Description | Canonical | Structured Data |
|-------|----------------------|------------------|-----------|-----------------|
| `/` | "Cheeky Prints | Custom Wall Art & Gifts" | "Shop playful, sustainable print-on-demand posters, apparel, and gifts tailored to your personality." | `https://www.cheekyprints.com/` | Organization + WebSite search action |
| `/collections` | "Shop All Cheeky Prints Collections" | "Browse bold art themes, from botanicals to pop culture mashups. Free carbon-neutral shipping over $75." | `https://www.cheekyprints.com/collections` | BreadcrumbList |
| `/collections/:handle` | "{Collection Title} | Cheeky Prints" | "Explore {Collection Title} designs printed on premium, eco-conscious materials." | Canonical to localized collection URL | BreadcrumbList + CollectionPage |
| `/products/:handle` | "Buy {Product Title} | Cheeky Prints" | "Customize {Product Title} with colors, sizes, and frames. Printed on demand in under 72 hours." | Canonical to localized PDP | Product + BreadcrumbList |
| `/cart` | "Your Cart | Cheeky Prints" | "Review your prints, enter promo codes, and get ready for secure checkout." | `https://www.cheekyprints.com/cart` | None (noindex) |
| `/search` | "Search Cheeky Prints" | "Find art and gifts that match your vibe by keyword or filter." | `https://www.cheekyprints.com/search` | WebSite search action |
| `/blogs` | "Cheeky Prints Blog" | "Design inspo, artist collabs, and tips for styling your space." | `https://www.cheekyprints.com/blogs` | ArticleList |
| Blog article | "{Article Title} | Cheeky Prints Blog" | First 150 chars of intro | Article canonical | Article + Breadcrumb |
| `/account` | "Account | Cheeky Prints" | "Sign in to track orders, saved designs, and rewards." | `https://www.cheekyprints.com/account` (noindex) | None |
| `/policies/:handle` | "{Policy Title} | Cheeky Prints" | "Read our {Policy Title} to shop with confidence." | Policy URL | Breadcrumb |
| `/404` | "Page Not Found | Cheeky Prints" | "Whoops! Let's get you back to art you love." | 404 URL (noindex) | None |

## Hreflang & Localization
- Publish hreflang tags for US (`en-US`), UK (`en-GB`), AU (`en-AU`) plus `x-default` to `/`.
- Example: `<link rel="alternate" hreflang="en-GB" href="https://www.cheekyprints.co.uk{path}" />`.
- Mirror localized URLs: `/uk/{path}`, `/au/{path}` using Hydrogen market routes.

## Content Hygiene
- Maintain 1 primary `<h1>` per page.
- Use descriptive anchor text (no "click here").
- Compress inline SVG icons; include `role="img"` with `<title>` for accessibility + SEO.
- Provide alt text for all imagery referencing product/material details.
- Keep PDP copy at least 150 words with keywords around style, material, sustainability.

## Monitoring
- Configure Google Search Console for each market domain/hostname.
- Submit sitemap after each significant content release.
- Track Core Web Vitals via CrUX and GA4 `web_vitals` events.
- Audit structured data in Search Console Rich Results report monthly.
