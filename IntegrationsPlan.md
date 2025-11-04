# Integrations Plan — Cheeky Prints Hydrogen Storefront

## Overview
This plan covers fulfillment, analytics, reviews, search, and payment integrations aligned with the Cheeky Prints roadmap. All connectors follow least-privilege credentials stored as Oxygen environment secrets.

## 1. Printify (Print-on-Demand Fulfillment)
- **App**: Printify API v1
- **Use cases**: Product catalog sync, variant media mapping, inventory updates, order submission (future phase).
- **Environment variables**:
  - `PRINTIFY_API_KEY` — private API key with read/write to selected shop.
  - `PRINTIFY_SHOP_ID` — numeric identifier for Cheeky Prints catalog.
- **Sync Strategy**:
  - Nightly cron (Oxygen scheduled job or GitHub Action) pulls Printify products → transforms to Shopify metafields.
  - Map variant options (`Size`, `Color`, `Material`) to Hydrogen PDP selectors.
  - Store Printify mockup URLs in metafield `custom.printifyMockups` for hero/product gallery.
  - Inventory updates: Poll `/shops/{id}/products.json` every 30 minutes; apply exponential backoff starting at 30s on 429.
- **Rate Limits**: 60 requests/min. Batch operations and cache responses for 15 minutes in KV store.
- **Webhooks**: Subscribe to `order:sent_to_production` for order status messaging (future).

## 2. Analytics
### Google Analytics 4
- **Property**: `GA4-CheekyPrints`
- **Env variables**: `GA4_MEASUREMENT_ID`, `GA4_API_SECRET` (server-side events), `GA4_DEBUG=false`.
- **Event Model**:
  - `view_item_list` (Collection/Search) — send `item_list_name`, `items[]` with `item_id`, `item_name`, `price`.
  - `view_item` (PDP) — include variant `item_variant`, currency from active market.
  - `add_to_cart` — triggered on quick-add and PDP. Include `quantity`, `coupon` if present.
  - `begin_checkout` — cart CTA, attach `shipping_tier` (estimated) and `items`.
  - `purchase` — captured via Shopify Web Pixel server callback with order id.
- **Implementation**: Use Hydrogen analytics API + GA4 Web Pixel + server-side measurement for purchase dedupe.

### Klaviyo
- **Env variables**: `KLAVIYO_PUBLIC_KEY`, `KLAVIYO_PRIVATE_KEY`.
- **Events**: Mirror GA4 events to Klaviyo `Viewed Product`, `Added to Cart`, `Started Checkout`, `Placed Order`.
- **Flows**: Triggered by serverless functions posting to `/client/events`. Throttle by user ID, 1 event per 30 seconds.

## 3. Reviews Platform
- **App**: Okendo
- **Env variables**: `OKENDO_API_KEY`, `OKENDO_BRAND_ALIAS`.
- **Integration Points**:
  - PDP: Embed Okendo widget via Hydrogen component; lazy load script after `requestIdleCallback`.
  - Post-purchase: Webhook from Shopify to Okendo for order sync.
- **Rate Limits**: 120 requests/min; use cached GraphQL query for aggregated ratings to avoid per-request fetch.

## 4. Search
- **Provider**: Algolia Search + Recommend
- **Env variables**: `ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_KEY` (public), `ALGOLIA_ADMIN_KEY` (write-only in CI), `ALGOLIA_INDEX_PREFIX`.
- **Implementation**:
  - Sync Shopify products via Shopify → Algolia app or custom indexer triggered nightly.
  - Use InstantSearch for search page; lazy-load heavy widgets to satisfy performance budget.
  - Configure rules for synonyms ("poster" ↔ "print") and trending queries per market.
- **Rate Limits**: 1,500 ops/min; ensure caching via Algolia `cacheableRequests` plugin on server.

## 5. Payments
- **Processor**: Shopify Payments (via Hydrogen checkout redirect).
- **Config**:
  - Maintain market-specific payment methods (Apple Pay, Shop Pay, Afterpay).
  - Display payment badges using `config/integrations/payments.json` for localized copy.
- **Security**: All checkout flows redirect to Shopify, no card data stored.

## Governance & Monitoring
- Rotate API keys every 90 days.
- Log all integration errors to Oxygen logging with `integration` label.
- Include synthetic monitors verifying Printify + Algolia availability hourly.
- Document fallback messaging when integrations fail (e.g., disable quick personalization if Printify down).
