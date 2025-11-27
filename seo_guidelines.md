# SEO Guidelines

## 1. Technical SEO
- **Framework**: Hydrogen/Remix handles Server-Side Rendering (SSR). Ensure `robots.txt` and `sitemap.xml` are generated.
- **Structured Data**: Use JSON-LD for all Products, Collections, and Articles.
  - Schema: `Product`, `BreadcrumbList`, `Organization`.
- **Canonical URLs**: Ensure every page has a self-referencing canonical tag to prevent duplicate content issues.

## 2. Metadata
- **Title**: `[Page Title] | Cheeky Prints`.
- **Description**: 150-160 chars. Action-oriented.
- **Open Graph**: `og:image`, `og:title`, `og:description` must be set for social sharing.

## 3. Performance (Core Web Vitals)
SEO is heavily dependent on speed.
- **LCP** (Largest Contentful Paint): < 2.5s.
- **CLS** (Cumulative Layout Shift): < 0.1 (Reserve space for images).
- **INP** (Interaction to Next Paint): < 200ms.

## 4. URL Structure
- Clean, descriptive slugs.
- `/products/neon-cat-poster` (Good).
- `/products?id=123` (Bad).
