# Localization Routing Notes

## Hreflang Matrix
| Market | Locale | Base URL | Hreflang | Example Route |
|--------|--------|----------|----------|----------------|
| United States | en-US | https://www.cheekyprints.com | en-US | `<link rel="alternate" hreflang="en-US" href="https://www.cheekyprints.com/products/cheeky-botanical-print" />` |
| United Kingdom | en-GB | https://www.cheekyprints.co.uk | en-GB | `<link rel="alternate" hreflang="en-GB" href="https://www.cheekyprints.co.uk/products/cheeky-botanical-print" />` |
| Australia | en-AU | https://www.cheekyprints.com.au | en-AU | `<link rel="alternate" hreflang="en-AU" href="https://www.cheekyprints.com.au/products/cheeky-botanical-print" />` |
| Default | — | https://www.cheekyprints.com | x-default | `<link rel="alternate" hreflang="x-default" href="https://www.cheekyprints.com/" />` |

## Market-aware Routing
- Use Hydrogen market-aware routes: `/` (US default), `/uk` (UK), `/au` (AU).
- Ensure navigation links swap domain/market prefix while preserving path:
  - Example: US PDP `/products/{handle}` ↔ UK `/uk/products/{handle}`.
- Persist selected market in `market` cookie (Shopify standard) with 30-day expiry.
- Redirect rules:
  - Detect locale via `Accept-Language`; show banner suggesting local site rather than auto-redirect.
  - If currency mismatch with shipping country at checkout, prompt to switch market.

## Fallbacks
- If localized string missing, fallback to `en-US` key.
- For non-translated structured data, output in `en-US` but set `inLanguage` accordingly.

## Sitemap
- Generate separate sitemap indexes per market: `/sitemap.xml` (default), `/uk/sitemap.xml`, `/au/sitemap.xml` with alternate links referencing each market.
