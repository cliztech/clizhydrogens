# Cheeky Prints Component Library

_All components reference values from `DesignTokens.json`. Use semantic HTML elements and ensure WCAG AA compliance._

## Tokens at a Glance
- Primary UI hex: `colorPrimary` (#FF4F7B) on `colorPrimaryOn` (#FFFFFF)
- Text color: `colorNeutral900` on `colorBackground`
- Interactive spacing: `spacingSm` horizontal / `spacingXs` vertical minimum
- Focus style: apply `shadowFocus` with `colorFocusRing`

---

## Atoms

### Buttons (`<button>` / `<a role="button">`)
- **Variants**: primary, secondary, ghost, destructive.
- **Default styles**:
  - Padding: `spacingXs` vertical × `spacingLg` horizontal.
  - Border-radius: `radiusFull` for pill silhouette.
  - Type scale: `fontSizeScale.sizeMd`, `fontWeightSemiBold`, `lineHeightSnug`.
- **Color mapping**:
  - Primary: background `colorPrimary`, text `colorPrimaryOn`.
  - Secondary: background `colorNeutral100`, text `colorNeutral900`, border `colorNeutral300`.
  - Ghost: transparent background, text `colorSecondary`, underline on hover.
  - Destructive: background `colorDanger`, text `colorDangerOn`.
- **States**:
  - Hover: lighten background 4%, maintain accessible contrast.
  - Focus: apply `shadowFocus`, keep outline visible.
  - Disabled: background `colorDisabledSurface`, text `colorDisabledOn`, reduce opacity to 0.6.
- **ARIA**: `aria-live="polite"` for loading text if asynchronous; ensure `aria-label` for icon-only buttons.

### Inputs (`<input>`, `<select>`, `<textarea>`)
- Border: 1px solid `colorNeutral300`; radius `radiusSm`.
- Padding: `spacingXs` vertical × `spacingSm` horizontal.
- Font: `fontFamilyBase`, `fontSizeScale.sizeMd`.
- Focus: border color `colorSecondary`, focus ring `shadowFocus`.
- Error state: border/background tinted with `colorDanger`/`colorDangerOn`.
- Associate `<label>` using `for` + `id`; include `aria-describedby` pointing to help/error text.

### Badges (`<span role="status">`)
- Variants: promo (`colorAccent` background, `colorAccentOn` text), new (`colorSecondary`), sold-out (`colorNeutral300`, text `colorNeutral700`).
- Padding: `spacing3xs` vertical × `spacing2xs` horizontal.
- Radius: `radiusFull`.
- Use for inline statuses (PLP, PDP, cart).

### Price (`<p class="price">`)
- Primary price: `fontFamilyDisplay`, `fontSizeScale.sizeXl`, `fontWeightBold`.
- Compare-at: `fontSizeScale.sizeSm`, `colorNeutral500`, strike-through.
- Currency localized via `Intl.NumberFormat` per market.
- Add `aria-label` announcing discount percentage when compare-at price exists.

### Breadcrumb (`<nav aria-label="Breadcrumb">`)
- Layout: inline flex with `spacingXs` gap.
- Links styled with `colorNeutral700`; current page uses `<span aria-current="page">`.
- Always include root “Home”.

### Iconography
- Use 24px grid; color inherits from text by default.
- Provide `<title>` element inside `<svg>` for screen readers when icon is standalone.

---

## Molecules

### Card
- Structure: `<article>` with optional media `<figure>`, content `<div>` slots.
- Padding: `spacingLg`; background `colorSurface`; radius `radiusLg`; shadow `elevationRaised`.
- Hover: elevate to `elevationOverlay`; ensure interactive area includes entire card via `<a class="stretched-link">` pattern.
- Use for blog articles, featured tiles (Home, Blog Index).

### Navigation Bar
- Semantic `<header>` containing `<nav aria-label="Primary">`.
- Layout: horizontal flex with left logo slot, center nav links, right utility actions (search, cart, account).
- Link spacing `spacingLg`; focus ring per token.
- Mobile: collapse to menu button (aria-controls on disclosure panel).
- Sticky version uses `elevationOverlay` and background `colorSurface` with 95% opacity.
- Include live cart count `<span aria-live="polite">`.

### Hero Banner
- Template for Home and Blog Index.
- Composition: `<section>` with background `colorSurfaceAlt`, optional background image.
- Slots: `eyebrow`, `heading`, `body`, `primaryAction`, `secondaryAction`, `media`.
- Typography: heading uses `fontFamilyDisplay`, `size3Xl`; body `sizeLg`.
- Buttons follow primary/ghost tokens. Maintain 4.5:1 contrast between text and background.
- Provide `aria-labelledby` referencing heading id for screen reader context.

### Product Card (PLP/Search)
- Container `<article>` with `role="group" aria-labelledby` linking to product title.
- Slots: `media`, `badgeStack`, `title`, `price`, `swatches`, `quickAdd`.
- Media uses responsive `<Image>` with aspect ratio 4:5, lazy loading after first row.
- Quick add button uses `aria-label="Add {product} to cart"`.
- Display badges per availability using tokens.

### Product Details (PDP)
- Layout: two-column grid (media + summary) with `spacingXl` gap; stack on < 1024px.
- Key subcomponents:
  - Media Gallery: `<div role="group" aria-label="Product gallery">` with accessible thumbnails.
  - Product Title Price block: uses Price atom.
  - Options: `<fieldset>` with `<legend>` for each variant group, radio buttons `role="radiogroup"`.
  - Add-to-cart form: `<form>` with disabled state while pending. Include `aria-live="polite"` for inventory messages.
  - Social Proof: rating stars with `<span aria-hidden>` and `<span class="sr-only">` for accessible text.

### Modal
- Use `<dialog>` where supported; fallback `<div role="dialog" aria-modal="true">`.
- Background overlay: `colorOverlay` with fade `durationFast`.
- Surface: `colorSurface`, `radiusLg`, `elevationModal`.
- Trap focus; close button top-right (ghost icon button with `aria-label="Close"`).

### Toast
- Container `<section role="status" aria-live="polite">` pinned bottom center.
- Background `colorNeutral900`, text `#FFFFFF`, radius `radiusSm`, shadow `elevationToast`.
- Include icon + message + optional action button (ghost style).
- Auto-dismiss after 5s but allow manual close; respect reduced motion by fading without slide.

### Breadcrumb Banner (Policies, Blog Article)
- Combine Breadcrumb atom with page title. Provide `aria-label` and ensure last crumb is `aria-current`.

### Filter Drawer (Collection/Search)
- `<aside>` with `role="dialog"` on mobile and `aria-labelledby` for heading.
- Content slots: `filterGroupList`, `sort`, `apply`, `clearAll`.
- Checkboxes default to `fontSizeScale.sizeSm`. Provide summary of active filters for screen readers.

---

## Templates & Route Mapping
| Route (SiteSpec.id) | Template | Key Components & Slots |
|---------------------|----------|------------------------|
| home | hero-featured | navigationBar, heroBanner, featuredCollectionGrid (list of Card), productCard carousel, newsletterSignup (form with inputs), toast for promo consent |
| collectionIndex | collection-directory | breadcrumb, pageHeader, card list (collections), promo badge, footer nav |
| collectionDetail | plp | navigationBar, breadcrumb, filterDrawer, productCard grid, badge, pagination controls |
| productDetail | pdp | hero nav (breadcrumb), mediaGallery, productTitlePrice, badge, productDescriptionTabs, complementary productCard list, modal (size guide) |
| cart | cart | cartLineItems (cards), priceSummary (totals), freeShippingBadge, checkout button, promo input, toast for coupon result |
| search | search | search header (nav + searchInput), filterDrawer, productCard grid, emptyState card |
| blogIndex | blog-index | heroBanner, articleCard grid, badge (category), newsletterSignup |
| blogArticle | blog-article | breadcrumb, articleHeader, richTextBody, inline productCard, modal for subscribe |
| account | account-hub | accountNav (tabs), accountOverviewCards, orderList (cards), toast for updates |
| policies | policy | breadcrumb banner, longFormContent, callout card |
| 404 | not-found | heroBanner variant (message), searchInput, button group |

---

## Accessibility Checklist
- Ensure every interactive element has a visible focus outline using `colorFocusRing`.
- Provide skip-to-content link at top of page using button tokens.
- Maintain heading hierarchy (`h1` per page template). Hero uses `<h1>`; sections use `<h2>`.
- Use `aria-live="assertive"` for error toasts, `polite` for confirmations.
- Validate color contrast of badges and banners with tokens; fallback to neutral if ratio < 4.5:1.
- For carousels, include next/prev buttons with `aria-controls` and visually hidden instructions.

## Example Snippets
- **Primary Button**: `<button class="btn btn--primary">Add to Cart</button>`.
- **Input with label**: `<label for="email">Email</label><input id="email" name="email" type="email" aria-describedby="emailHelp" />`.
- **Product Card**: `<article aria-labelledby="prod-1-title"><a id="prod-1-title" href="/products/cheeky-poster">Cheeky Poster</a><p class="price">$24.00</p><span class="badge badge--new">New</span></article>`.
- **Breadcrumb**: `<nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/collections">Collections</a></li><li aria-current="page">Bold Botanicals</li></ol></nav>`.
- **Modal Trigger**: `<button aria-haspopup="dialog" aria-controls="size-guide">Size Guide</button>`.
- **Toast**: `<section role="status" aria-live="polite"><p>Added to cart!</p><button>Undo</button></section>`.
