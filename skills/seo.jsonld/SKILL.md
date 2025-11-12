---
name: seo.jsonld
description: Add JSON-LD Product/Collection schema and canonical links.
version: 1
owner: supervisor.dev
inputs:
  - key: routes
    required: false
outputs:
  - key: schema_snippets
    path: reports/jsonld.txt
  - key: canonical_links
    path: reports/canonicals.txt
acceptance:
  - "JSON-LD present on PDP/Collection"
  - "Canonical link present"
---
## Procedure
- Add helper `app/lib/seo.ts`.
- Inject script[type=application/ld+json] on PDP/collections.
- Add `<link rel="canonical">` using request URL.
- Write report files above.
