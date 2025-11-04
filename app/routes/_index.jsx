import {Await, Link, useLoaderData} from 'react-router';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {ProductItem} from '~/components/ProductItem';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [
    {
      title: 'Cheeky Prints | Colour-drenched art for modern walls',
    },
    {
      name: 'description',
      content:
        'A collector-worthy Hydrogen storefront celebrating playful illustration, limited edition art prints, and joyful interiors.',
    },
  ];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const {storefront} = context;
  const {collections, bestSelling} = await storefront.query(HOMEPAGE_QUERY);

  const heroCollection = collections?.nodes?.[0] ?? null;
  const spotlightCollections = collections?.nodes?.slice(1) ?? [];
  const bestSellers = bestSelling?.nodes ?? [];

  return {
    heroCollection,
    spotlightCollections,
    bestSellers,
  };
}

/**
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const newArrivals = context.storefront
    .query(NEW_ARRIVALS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    newArrivals,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  const bestSellers = data.bestSellers ?? [];
  const heroProduct = bestSellers[0] ?? null;
  const bestsellerSpotlight = bestSellers[1] ?? heroProduct ?? null;
  const supportingBestSellers = bestSellers
    .filter((product) => product.id !== bestsellerSpotlight?.id)
    .slice(0, 4);

  return (
    <div className="home">
      <Hero collection={data.heroCollection} featuredProduct={heroProduct} />
      <TrustBar />
      <SignatureCollections collections={data.spotlightCollections} />
      <BestsellerShowcase featured={bestsellerSpotlight} products={supportingBestSellers} />
      <StudioSpotlight />
      <ProcessSection />
      <Suspense
        fallback={
          <SectionSkeleton
            title="Fresh from the studio"
            subtitle="The latest colour stories are being curated."
          />
        }
      >
        <Await resolve={data.newArrivals}>
          {(response) => (
            <ProductShelf
              title="Fresh from the studio"
              subtitle="Limited-run arrivals released every Friday at 10am."
              products={response?.products?.nodes ?? []}
            />
          )}
        </Await>
      </Suspense>
      <GallerySection />
      <TestimonialsSection />
      <StylingCallout />
      <NewsletterSection />
    </div>
  );
}

function Hero({collection, featuredProduct}) {
  const heroHandle = collection?.handle ? `/collections/${collection.handle}` : '/collections';
  const heroDescription = collection?.description?.trim()
    ? collection.description
    : 'Bold lines, cheeky statements, and palettes that feel like sunshine—each piece is crafted to transform everyday walls into a gallery moment.';
  const heroImage = featuredProduct?.featuredImage ?? collection?.image ?? null;
  const featuredPrice = featuredProduct?.priceRange?.minVariantPrice ?? null;
  const productHandle = featuredProduct?.handle ? `/products/${featuredProduct.handle}` : heroHandle;

  return (
    <section aria-labelledby="homepage-hero-heading" className="hero" id="hero">
      <div aria-hidden className="hero__background" />
      <div className="hero__inner page-width">
        <div className="hero__copy">
          <p className="eyebrow">Cheeky Prints Studio</p>
          <h1 id="homepage-hero-heading">Colour made for conversation</h1>
          <p className="hero__description">{heroDescription}</p>
          <div className="hero__actions">
            <Link className="button button--primary" prefetch="intent" to={heroHandle}>
              Shop the latest drop
            </Link>
            <Link className="button button--outline" prefetch="intent" to="/collections">
              Explore all artwork
            </Link>
          </div>
          <dl className="hero__stats">
            {HERO_STATS.map((stat) => (
              <div className="hero__stat" key={stat.title}>
                <dt>{stat.title}</dt>
                <dd>{stat.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero__media">
          <div className="hero__image-frame">
            {heroImage ? (
              <Image
                alt={
                  heroImage.altText ??
                  featuredProduct?.title ??
                  collection?.title ??
                  'Featured artwork from Cheeky Prints'
                }
                className="hero__image"
                data={heroImage}
                loading="eager"
                sizes="(min-width: 62em) 38vw, 90vw"
              />
            ) : (
              <div aria-hidden className="hero__image hero__image--placeholder" />
            )}
          </div>
          {featuredProduct ? (
            <Link className="hero__product" prefetch="intent" to={productHandle}>
              <span className="eyebrow">Collector highlight</span>
              <h3>{featuredProduct.title}</h3>
              {featuredPrice ? (
                <div className="hero__product-meta">
                  <Money data={featuredPrice} />
                  <span className="hero__product-link">View art print →</span>
                </div>
              ) : (
                <span className="hero__product-link">View art print →</span>
              )}
            </Link>
          ) : (
            <div className="hero__product hero__product--placeholder">
              <span className="eyebrow">Collector highlight</span>
              <h3>Hand-picked weekly</h3>
              <p>New editions drop every Friday at 10am with only 250 prints per run.</p>
            </div>
          )}
        </div>
      </div>
      <div className="hero__foot">
        <div className="page-width">
          <div className="hero__foot-grid">
            {HERO_FEATURES.map((feature) => (
              <article className="hero__feature" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Cheeky Prints highlights">
      <div className="page-width trust-bar__inner">
        {TRUST_BADGES.map((badge) => (
          <div className="trust-badge" key={badge.title}>
            <span className="trust-badge__icon" aria-hidden>
              {badge.icon}
            </span>
            <div>
              <p>{badge.title}</p>
              <small>{badge.description}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SignatureCollections({collections}) {
  if (!collections?.length) return null;
  const curatedCollections = collections.slice(0, 3);
  return (
    <section className="homepage-section signature-section">
      <div className="page-width">
        <div className="section-heading section-heading--left">
          <h2>Signature colour stories</h2>
          <p>Handpicked sets styled to make an entrance in your hallway, lounge, or creative studio.</p>
        </div>
        <div className="signature-grid">
          {curatedCollections.map((collection, index) => {
            const handle = collection.handle ? `/collections/${collection.handle}` : '/collections';
            return (
              <Link className="signature-card" key={collection.id} prefetch="intent" to={handle}>
                <div className="signature-card__media" aria-hidden>
                  {collection.image ? (
                    <Image
                      className="signature-card__image"
                      data={collection.image}
                      loading="lazy"
                      sizes="(min-width: 60em) 30vw, 90vw"
                    />
                  ) : (
                    <div className="signature-card__image signature-card__image--placeholder" />
                  )}
                </div>
                <div className="signature-card__content">
                  <span className="signature-card__index">0{index + 1}</span>
                  <h3>{collection.title}</h3>
                  <p>{getCollectionExcerpt(collection.description)}</p>
                  <span className="signature-card__link">Shop this vibe →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BestsellerShowcase({featured, products}) {
  if (!featured && (!products || products.length === 0)) return null;
  const handle = featured?.handle ? `/products/${featured.handle}` : '/collections/best-sellers';
  return (
    <section className="homepage-section bestseller-section">
      <div className="page-width">
        <div className="section-heading section-heading--left">
          <h2>Most-loved prints this week</h2>
          <p>Editioned artwork on archival stock, signed and shipped straight from our East London studio.</p>
        </div>
        <div className="bestseller-grid">
          {featured ? (
            <Link className="bestseller-spotlight" prefetch="intent" to={handle}>
              <div className="bestseller-spotlight__media" aria-hidden>
                {featured.featuredImage ? (
                  <Image
                    className="bestseller-spotlight__image"
                    data={featured.featuredImage}
                    loading="lazy"
                    sizes="(min-width: 60em) 40vw, 90vw"
                  />
                ) : (
                  <div className="bestseller-spotlight__image bestseller-spotlight__image--placeholder" />
                )}
                <div className="bestseller-spotlight__overlay" />
              </div>
              <div className="bestseller-spotlight__content">
                <span className="eyebrow">Limited release</span>
                <h3>{featured.title}</h3>
                <p>{BESTSELLER_BLURB}</p>
                <div className="bestseller-spotlight__cta">
                  <Money data={featured.priceRange.minVariantPrice} />
                  <span>View details</span>
                </div>
              </div>
            </Link>
          ) : null}
          <div className="bestseller-list">
            {(products ?? []).map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductShelf({title, subtitle, products}) {
  return (
    <section className="homepage-section product-shelf">
      <div className="page-width">
        <div className="section-heading">
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {products?.length ? (
          <div className="product-shelf__grid">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="section-empty">More goodness is on the way—check back soon.</p>
        )}
      </div>
    </section>
  );
}

function StudioSpotlight() {
  return (
    <section className="homepage-section studio-section">
      <div className="page-width studio-grid">
        <div className="studio-media" aria-hidden>
          <img
            alt="Artist arranging colourful prints inside the Cheeky Prints studio."
            loading="lazy"
            src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80"
          />
        </div>
        <div className="studio-content">
          <p className="eyebrow">Inside the studio</p>
          <h2>Mischief meets meticulous craft</h2>
          <p>
            Every Cheeky Prints edition starts as a sketchbook riff before evolving into richly textured illustration. We
            mix custom colour palettes, print on archival cotton stock, and sign each piece by hand.
          </p>
          <ul className="studio-list">
            <li>Edition sizes capped at 250 per artwork</li>
            <li>Water-based inks with museum-grade vibrancy</li>
            <li>Plastic-free packaging, ready to gift</li>
          </ul>
          <Link className="button button--secondary" prefetch="intent" to="/pages/about">
            Tour the studio
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="homepage-section process-section">
      <div className="page-width">
        <div className="section-heading">
          <h2>What makes Cheeky Prints different?</h2>
          <p>Designed for modern collectors who care about story, sustainability, and serious colour pay-off.</p>
        </div>
        <div className="process-grid">
          {PROCESS_POINTS.map((point) => (
            <article className="process-card" key={point.title}>
              <span className="process-card__icon" aria-hidden>
                {point.icon}
              </span>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="homepage-section gallery-section">
      <div className="page-width">
        <div className="section-heading">
          <h2>Styled in joyful homes</h2>
          <p>Collect interior inspiration from the Cheeky Prints community and see how they layer our art.</p>
        </div>
      </div>
      <div className="gallery-grid" aria-hidden>
        {GALLERY_IMAGES.map((image) => (
          <figure className="gallery-card" key={image.src}>
            <img alt={image.alt} loading="lazy" src={image.src} />
          </figure>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="homepage-section testimonials-section">
      <div className="page-width testimonials-inner">
        <div className="testimonials-intro">
          <p className="eyebrow">Collector reviews</p>
          <h2>Homes that glow with personality</h2>
          <p>
            From Berlin lofts to Melbourne bungalows, collectors trust Cheeky Prints to deliver statement art that feels
            personal, premium, and planet-conscious.
          </p>
        </div>
        <div className="testimonials-stack">
          {TESTIMONIALS.map((testimonial) => (
            <blockquote className="testimonial-card" key={testimonial.name}>
              <p>“{testimonial.quote}”</p>
              <cite>{testimonial.name}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function StylingCallout() {
  return (
    <section className="homepage-section styling-callout">
      <div className="page-width styling-card">
        <div>
          <p className="eyebrow">Personalised styling</p>
          <h2>Curate your dream gallery wall</h2>
          <p>
            Book a complimentary 20-minute consultation and we&apos;ll mock up colour stories tailored to your palette,
            lighting, and vibe.
          </p>
        </div>
        <Link className="button button--light" prefetch="intent" to="/pages/contact">
          Schedule a styling chat
        </Link>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="homepage-section newsletter-section">
      <div className="page-width newsletter-card">
        <div className="newsletter-card__intro">
          <p className="eyebrow">Stay in the know</p>
          <h2>Unlock studio playlists, colour recipes, and early access drops.</h2>
          <p>We email sparingly—only when something delightfully bold is about to launch.</p>
        </div>
        <form className="newsletter-form" method="post" name="newsletter">
          <label className="visually-hidden" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            autoComplete="email"
            id="newsletter-email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
          <button className="button button--primary" type="submit">
            Join the list
          </button>
        </form>
      </div>
    </section>
  );
}

function SectionSkeleton({title, subtitle}) {
  return (
    <section className="homepage-section product-shelf">
      <div className="page-width">
        <div className="section-heading">
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <div className="skeleton-grid">
          {SKELETON_KEYS.map((key) => (
            <div className="skeleton-card" key={key} />
          ))}
        </div>
      </div>
    </section>
  );
}

function getCollectionExcerpt(description) {
  if (!description) return 'Discover a fresh palette of cheeky statements and colour-forward pairings.';
  const trimmed = description.trim();
  if (trimmed.length <= 140) return trimmed;
  return `${trimmed.slice(0, 137).trim()}…`;
}

const HOMEPAGE_QUERY = `#graphql
  fragment HomepageCollection on Collection {
    id
    title
    handle
    description
    image {
      id
      url
      altText
      width
      height
    }
  }

  fragment HomepageProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }

  query Homepage($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...HomepageCollection
      }
    }
    bestSelling: products(first: 8, sortKey: BEST_SELLING) {
      nodes {
        ...HomepageProduct
      }
    }
  }
`;

const NEW_ARRIVALS_QUERY = `#graphql
  fragment NewArrivalProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }

  query NewArrivals($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 6, sortKey: CREATED_AT, reverse: true) {
      nodes {
        ...NewArrivalProduct
      }
    }
  }
`;

const HERO_STATS = [
  {
    title: 'Limited editions',
    description: 'Every run capped at 250 signed prints.',
  },
  {
    title: 'Sustainable stock',
    description: 'Printed on FSC-certified cotton paper.',
  },
  {
    title: 'Worldwide shipping',
    description: 'Arrives ready to hang in 3–7 days.',
  },
];

const HERO_FEATURES = [
  {
    title: 'Archival giclée quality',
    description: 'Printed on 320gsm cotton rag with water-based inks so the palette stays luminous for decades.',
  },
  {
    title: 'Design-led styling support',
    description: 'Complimentary layout sketches help you pair pieces for gallery walls and statement corners.',
  },
  {
    title: 'Responsible production',
    description: 'Small-batch runs, recycled packaging, and carbon-neutral delivery keep collecting planet-friendly.',
  },
];

const TRUST_BADGES = [
  {
    title: 'Artist-founded & women-led',
    description: 'Independent studio crafting colour-rich statements.',
    icon: '🌈',
  },
  {
    title: 'Framing options available',
    description: 'Choose oak, walnut, or white gallery frames.',
    icon: '🖼️',
  },
  {
    title: '5k+ happy collectors',
    description: 'Rated 4.9/5 for quality and service.',
    icon: '⭐',
  },
];

const PROCESS_POINTS = [
  {
    title: 'Illustrated with attitude',
    description: 'Each concept is sketched by hand before being translated into playful digital compositions.',
    icon: '✏️',
  },
  {
    title: 'Crafted consciously',
    description: 'Water-based inks, recycled stock, and carbon-neutral delivery keep things planet-positive.',
    icon: '🌍',
  },
  {
    title: 'Styled for real homes',
    description: 'We test every palette with real furniture and lighting so your prints arrive ready to shine.',
    icon: '🏡',
  },
];

const TESTIMONIALS = [
  {
    name: 'Aisha — Melbourne',
    quote: 'The colours are even richer in person. Our entryway finally has the personality it deserved.',
  },
  {
    name: 'Marco — Lisbon',
    quote: 'Cheeky Prints made it so easy to curate a gallery wall that feels both artful and cheeky.',
  },
  {
    name: 'Rowan — Brooklyn',
    quote: 'Exceptional quality, beautifully packaged, and the customer care was next level.',
  },
];

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cheeky Prints artwork styled above a vintage credenza.',
  },
  {
    src: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bright living room featuring a trio of colourful art prints.',
  },
  {
    src: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Gallery wall moment with playful typography artwork.',
  },
  {
    src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
    alt: 'Studio desk with art prints, paint swatches, and styling props.',
  },
];

const BESTSELLER_BLURB =
  'An archival giclée print with a velvet-matte finish and cheeky colour blocking made to anchor any room.';

const SKELETON_KEYS = ['skeleton-a', 'skeleton-b', 'skeleton-c', 'skeleton-d'];

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('react-router').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
