# Cheeky Prints Hydrogen Redesign Plan

## Vision and Experience Pillars
- **Organic warmth with modern cheekiness**: blend tactile textures, botanical motifs, and playful microcopy while keeping UX refined.
- **Story-driven commerce**: guide visitors from inspiration to purchase with storytelling sections, interactive product discovery, and social proof.
- **Conversion-centric performance**: ensure accessibility, speed, and clear CTAs throughout the experience.

## Multi-Phase Roadmap
1. **Discovery & Foundations**
   - Audit existing Hydrogen storefront structure, routes, server components, and theme tokens.
   - Gather brand assets (logo, color palette, typography) and establish design tokens in `/app/styles/tokens.css`.
   - Define analytics, localization, and metafield requirements for products and collections.
2. **Design System & Global Chrome**
   - Build a token-driven design system (colors, spacing, typography, shadows) and document in Storybook or internal preview route.
   - Rebuild header, footer, navigation mega-menu, and announcements with responsive layouts and high-quality imagery.
   - Implement global loading states, skeletons, and modal primitives.
3. **Homepage & Landing Sections**
   - Reimagine hero with layered imagery, animated botanical SVGs, and primary CTA.
   - Create storytelling sections (origin story, ritual guide, ingredient spotlight) with scroll-based interactions.
   - Develop modular content blocks for testimonials, press logos, featured bundles, and educational blog teasers.
4. **Product Discovery**
   - Enhance collection pages with faceted filtering, quick-add, and lifestyle imagery banners.
   - Craft product detail pages featuring brewing guides, flavor notes, ingredient sourcing maps, and UGC carousel.
   - Integrate subscription options, bundle builders, and cross-sell recommendations.
5. **Checkout & Post-Purchase Touchpoints**
   - Harmonize cart drawer, checkout app extensions, and order status page visuals with the new palette.
   - Add post-purchase flows: upsell modals, refer-a-friend prompts, and packaging unboxing tips.
6. **Optimization & Launch**
   - Run lighthouse audits, a11y tests, and hydration benchmarks.
   - Prepare content authoring guidelines and CMS blocks.
   - Launch with phased rollout, monitor analytics, iterate via A/B tests.

## Modular Workstreams & Specialized Agents

### 1. **Art Direction & Design System Agent**
- Establish token architecture in `/app/styles/tokens.css` and map to CSS modules.
- Deliver Figma mockups and motion specs for hero, collection, and PDP templates.
- Define illustration style (botanical line art) and micro-interaction guidelines.

### 2. **Global Layout & Navigation Agent**
- Refactor `/app/components/Header.jsx`, `/app/components/Footer.jsx`, and layout wrappers.
- Implement sticky navigation, locale/currency selectors, and predictive search overlay.
- Coordinate accessibility features (keyboard nav, ARIA landmarks).

### 3. **Homepage Experience Agent**
- Build hero, ritual storytelling, bundle showcase, and testimonial sections with reusable blocks under `/app/components/home/`.
- Introduce scroll-triggered reveals using intersection observers and CSS transitions.
- Collaborate with Content authoring agent for CMS schema.

### 4. **Collection & Product Agent**
- Enhance `/app/routes/collections.$handle.jsx` and `/app/routes/products.$handle.jsx` with metafield-driven content.
- Implement advanced filtering, variant swatches, subscription toggles, and cross-sell components.
- Ensure media galleries support video, 3D, and zoom interactions.

### 5. **Checkout & Cart Agent**
- Style cart drawer (`/app/components/cart/`) and checkout extension UI with new tokens.
- Build post-purchase upsell modules and loyalty integration hooks.
- Coordinate with Shopify Functions for discounts and shipping logic.

### 6. **Content & Storytelling Agent**
- Draft branded copy, brewing rituals, and origin stories aligning with Cheeky Prints voice.
- Define metafield structures for storytelling modules and configure CMS integration.
- Prepare blog templates and email capture flows.

### 7. **Performance & QA Agent**
- Set up automated testing (Playwright, Lighthouse CI) and monitor hydration timings.
- Implement bundle splitting, image optimization, and caching strategies.
- Run accessibility audits (axe-core) and ensure WCAG compliance.

### 8. **Automation & DevOps Agent**
- Maintain CI/CD pipelines, manage environments, and orchestrate preview deployments.
- Integrate with GitHub Actions for linting, testing, and visual regression suites.
- Coordinate with MCP servers for specialized tooling (design tokens, translations).

## Proposed MCP Servers
- **design-tokens-mcp**: manages centralized color, typography, spacing tokens and syncs with both Figma and `/app/styles/tokens.css`.
- **content-schema-mcp**: exposes APIs to define and version metafield definitions, CMS blocks, and sample content payloads.
- **image-optimization-mcp**: automates generation of responsive image sets, AVIF/WebP conversions, and placeholder blur hashes.
- **localization-mcp**: handles translations, currency formatting, and market-specific content variations.
- **analytics-mcp**: standardizes event taxonomy, funnels, and integrates with GA4/Klaviyo for reporting.
- **qa-automation-mcp**: orchestrates Playwright scenarios, Lighthouse runs, and visual regression snapshots across deployments.

## Execution Roadmap

### Sprint 0 – Alignment & Foundations (Week 1)
- [ ] **Kickoff workshop**: walk stakeholders through experience pillars, target metrics, and inspiration references.
- [ ] **Agent onboarding**: brief each agent on remit, deliverables, and shared Definition of Done.
- [ ] **Environment readiness**: provision dev/staging Hydrogen instances, Storybook, and analytics sandboxes.
- [ ] **MCP bootstrap**: deploy `design-tokens-mcp`, `content-schema-mcp`, and `analytics-mcp` with baseline schemas.

### Sprint 1 – Tokens & Global Chrome (Weeks 2–3)
- [ ] **Token authoring**: Art Direction Agent publishes v1 tokens (color, typography, spacing) into `/app/styles/tokens.css` via `design-tokens-mcp` sync.
- [ ] **Header/Footer revamp**: Global Layout Agent implements responsive header/footer against tokens, with accessibility audit.
- [ ] **Navigation QA**: Performance & QA Agent validates keyboard support, color contrast, and bundle sizes; log findings in QA tracker.
- [ ] **Content alignment**: Content Agent drafts navigation labels, tagline, and callouts for approval.

### Sprint 2 – Homepage Narrative (Weeks 4–5)
- [ ] **Hero module**: Homepage Experience Agent ships layered hero with imagery from Art Direction Agent and copy from Content Agent.
- [ ] **Story blocks**: Build ritual, ingredient, and testimonial blocks as reusable components in `/app/components/home/`.
- [ ] **CMS wiring**: Content Agent maps blocks to metafields via `content-schema-mcp`; Automation Agent ensures preview deploys nightly.
- [ ] **A/B test plan**: Analytics MCP defines hero CTA variants and tracking requirements.

### Sprint 3 – Product Discovery Enhancements (Weeks 6–7)
- [ ] **Collection upgrades**: Collection & Product Agent implements faceted filters, quick-add, and editorial banners.
- [ ] **PDP storytelling**: Integrate brewing guides, sourcing maps, and UGC carousel with performance budget sign-off.
- [ ] **Subscription/Bundles**: Checkout Agent wires Shopify Functions for bundle pricing, surfaces toggles in PDP.
- [ ] **Visual regression suite**: QA Agent expands Playwright + Percy baselines covering homepage and PDP states.

### Sprint 4 – Checkout & Post-Purchase (Weeks 8–9)
- [ ] **Cart drawer polish**: Ensure styling parity with new palette, add cross-sell modules informed by Analytics MCP insights.
- [ ] **Post-purchase flows**: Implement referral prompts, packaging tips, and email follow-up triggers.
- [ ] **Localization**: Localization MCP rolls out key translations and currency formatting.
- [ ] **Accessibility sign-off**: Run axe-core, manual screen-reader passes; remediate blockers.

### Sprint 5 – Launch & Optimization (Week 10+)
- [ ] **Lighthouse & Web Vitals**: Performance Agent ensures Core Web Vitals thresholds met on staging and live.
- [ ] **Stakeholder UAT**: Facilitate guided walkthroughs; capture feedback in issue tracker.
- [ ] **Rollout checklist**: DevOps Agent orchestrates launch plan, smoke tests, rollback strategy, and comms.
- [ ] **Post-launch retrospectives**: Capture learnings, backlog future enhancements, recalibrate KPIs.

## Operational Rituals
- **Weekly design critique** (Art Direction, Homepage, Collection agents) to maintain cohesive look & feel.
- **Bi-weekly delivery sync** covering progress vs. roadmap, blocked tasks, MCP updates.
- **Quality gates** enforced via GitHub Actions: lint, type-check, unit tests, Playwright smoke, Lighthouse thresholds.
- **Documentation cadence**: Every agent updates `/guides/cheeky-prints-redesign-log.md` with decisions, links, and outstanding questions.

