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
      title: 'Cheeky Prints | Playful art prints for bold spaces',
    },
    {
      name: 'description',
      content:
        'Discover limited edition art prints, vibrant gallery walls, and cheeky colour stories handcrafted for joyful homes.',
    },
  ];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
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
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const newArrivals = context.storefront
    .query(NEW_ARRIVALS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
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
  const heroProduct = data.bestSellers?.[0] ?? null;
  return (
    <div className="home">
      <Hero collection={data.heroCollection} featuredProduct={heroProduct} />
      <Highlights />
      <CollectionsSpotlight collections={data.spotlightCollections} />
      <ProductGridSection
        title="Bestselling prints"
        subtitle="Fan-favourite colour stories that sell out fast."
        products={data.bestSellers}
      />
      <StorySection />
      <ValuesSection />
      <Suspense
        fallback={
          <SectionSkeleton
            title="Fresh off the press"
            subtitle="New arrivals are lining up in the studio."
          />
        }
      >
        <Await resolve={data.newArrivals}>
          {(response) => (
            <ProductGridSection
              title="Fresh off the press"
              subtitle="Limited runs that just dropped—grab your favourites before they disappear."
              products={response?.products?.nodes ?? []}
              variant="secondary"
            />
          )}
        </Await>
      </Suspense>
      <Testimonials />
      <Callout />
      <InstagramSection />
      <NewsletterSection />
    </div>
  );
}

function Hero({collection, featuredProduct}) {
  const heroHandle = collection?.handle ? `/collections/${collection.handle}` : '/collections';
  const heroDescription = collection?.description?.trim()
    ? collection.description
    : 'Bold lines, playful palettes, and tongue-in-cheek phrases crafted to spark conversations in every room.';

  return (
    <section className="homepage-section hero">
      <div className="hero-media" aria-hidden="true">
        {collection?.image ? (
          <Image
            className="hero-image"
            data={collection.image}
            loading="eager"
            sizes="100vw"
          />
        ) : (
          <div className="hero-image hero-image--placeholder" />
        )}
        <div className="hero-overlay" />
      </div>
      <div className="page-width hero-content">
        <p className="eyebrow">Cheeky Prints Studio</p>
        <h1>Colorful art for playful souls</h1>
        <p className="hero-intro">{heroDescription}</p>
        <div className="hero-actions">
          <Link className="button button--primary" prefetch="intent" to={heroHandle}>
            Shop the collection
          </Link>
          <Link className="button button--ghost" prefetch="intent" to="/collections">
            Browse all prints
          </Link>
        </div>
        <div className="hero-stat-grid">
          <div className="hero-stat">
            <span className="hero-stat-title">100% recycled</span>
            <p>Planet-friendly paper &amp; water-based inks</p>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-title">Artist-made</span>
            <p>Dreamed up in our East London studio</p>
          </div>
          <div className="hero-highlight">
            <span className="hero-stat-title">Collector favourite</span>
            {featuredProduct ? (
              <Link
                to={`/products/${featuredProduct.handle}`}
                prefetch="intent"
                className="hero-highlight-card"
              >
                <p>{featuredProduct.title}</p>
                <Money data={featuredProduct.priceRange.minVariantPrice} />
              </Link>
            ) : (
              <p>Limited editions drop every month—join the club.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="homepage-section highlights">
      <div className="page-width">
        <div className="section-heading">
          <h2>Why you&apos;ll love Cheeky Prints</h2>
          <p>Design-forward artwork that makes every corner feel like the fun table.</p>
        </div>
        <div className="highlight-cards">
          {HIGHLIGHT_CARDS.map((item) => (
            <article className="highlight-card" key={item.title}>
              <span aria-hidden className="highlight-icon">
                {item.icon}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionsSpotlight({collections}) {
  if (!collections?.length) return null;
  return (
    <section className="homepage-section collections-spotlight">
      <div className="page-width">
        <div className="section-heading">
          <h2>Curated walls, ready to hang</h2>
          <p>Mix-and-match sets styled to brighten your studio, hallway, or favourite reading nook.</p>
        </div>
        <div className="spotlight-grid">
          {collections.map((collection) => {
            const handle = collection.handle ? `/collections/${collection.handle}` : '/collections';
            return (
              <Link className="spotlight-card" key={collection.id} prefetch="intent" to={handle}>
                {collection.image ? (
                  <Image
                    className="spotlight-image"
                    data={collection.image}
                    loading="lazy"
                    sizes="(min-width: 48em) 33vw, 90vw"
                  />
                ) : (
                  <div className="spotlight-image spotlight-image--placeholder" aria-hidden />
                )}
                <div className="spotlight-content">
                  <span className="eyebrow">Collection</span>
                  <h3>{collection.title}</h3>
                  <p>{getCollectionExcerpt(collection.description)}</p>
                  <span className="spotlight-link">Shop now →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductGridSection({title, subtitle, products, variant = 'primary'}) {
  const sectionClassName = `homepage-section product-section ${
    variant === 'secondary' ? 'product-section--secondary' : ''
  }`;

  return (
    <section className={sectionClassName}>
      <div className="page-width">
        <div className="section-heading">
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {products?.length ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="section-empty">Check back soon for more cheeky creations.</p>
        )}
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="homepage-section story-section">
      <div className="page-width story-grid">
        <div className="story-card story-card--image" aria-hidden="true">
          <img
            alt="Colorful gallery wall featuring vibrant prints."
            loading="lazy"
            src="https://images.unsplash.com/photo-1524230567005-1c1f48f64ab7?auto=format&fit=crop&w=1200&q=80"
          />
        </div>
        <div className="story-card story-card--content">
          <p className="eyebrow">Meet the studio</p>
          <h2>Cheeky by name, joyful by nature</h2>
          <p>
            We&apos;re a women-led illustration studio celebrating bold colour combos, unapologetic humour, and the little moments
            that make homes feel alive. Every print is designed, printed, and packed in-house with meticulous attention to
            detail—because your walls deserve nothing less.
          </p>
          <ul className="story-list">
            <li>Limited edition drops with numbered certificates</li>
            <li>Archival, museum-grade stock sourced from recycled fibres</li>
            <li>Packaging that&apos;s plastic-free and ready to gift</li>
          </ul>
          <Link className="button button--secondary" prefetch="intent" to="/collections/all">
            Explore the studio best-sellers
          </Link>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="homepage-section values-section">
      <div className="page-width">
        <div className="section-heading">
          <h2>Our promises</h2>
          <p>Because art should be kind to people and the planet.</p>
        </div>
        <div className="values-grid">
          {VALUES.map((value) => (
            <article className="value-card" key={value.title}>
              <span className="value-icon" aria-hidden>
                {value.icon}
              </span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="homepage-section testimonials-section">
      <div className="page-width">
        <div className="section-heading">
          <h2>Loved by collectors worldwide</h2>
          <p>Real words from the vibrant homes of the Cheeky Prints community.</p>
        </div>
        <div className="testimonials-grid">
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

function Callout() {
  return (
    <section className="homepage-section callout-section">
      <div className="page-width callout-card">
        <div>
          <p className="eyebrow">Custom gallery walls</p>
          <h2>Need help curating the perfect trio?</h2>
          <p>
            Book a 20-minute styling session with our in-house team for a personalised art edit tailored to your palette and
            space.
          </p>
        </div>
        <Link className="button button--light" prefetch="intent" to="/pages/contact">
          Book a styling chat
        </Link>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="homepage-section instagram-section">
      <div className="page-width">
        <div className="section-heading">
          <h2>Cheeky prints IRL</h2>
          <p>Tag @cheekyprints for a chance to be featured on our wall of fame.</p>
        </div>
        <div className="instagram-grid">
          {INSTAGRAM_IMAGES.map((image) => (
            <figure className="instagram-card" key={image.alt}>
              <img alt={image.alt} loading="lazy" src={image.src} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="homepage-section newsletter-section">
      <div className="page-width newsletter-card">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2>Get a first look at new drops</h2>
          <p>We send delightfully infrequent emails packed with colour inspiration, playlists, and secret previews.</p>
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
            Join the club
          </button>
        </form>
      </div>
    </section>
  );
}

function SectionSkeleton({title, subtitle}) {
  return (
    <section className="homepage-section product-section">
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

const HIGHLIGHT_CARDS = [
  {
    title: 'Vibrant by design',
    description: 'A curated mix of maximalist colour palettes and tongue-in-cheek phrases for statement-making walls.',
    icon: '🎨',
  },
  {
    title: 'Limited runs',
    description: 'Small-batch releases keep each artwork special—once a print sells out, it stays legendary.',
    icon: '✨',
  },
  {
    title: 'Ready to gift',
    description: 'Premium wrapping, handwritten notes, and optional frames make gifting delightfully easy.',
    icon: '🎁',
  },
];

const VALUES = [
  {
    title: 'Sustainably sourced',
    description: 'We print on FSC-certified, 100% recycled stock using water-based inks.',
    icon: '🌱',
  },
  {
    title: 'Artist supported',
    description: 'Every purchase directly funds independent illustrators and collaborative projects.',
    icon: '🤝',
  },
  {
    title: 'Worldwide shipping',
    description: 'Tracked, planet-conscious delivery from our UK studio to your door.',
    icon: '✈️',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sophie, Manchester',
    quote: 'The colours are even richer in person. My hallway has never looked this alive.',
  },
  {
    name: 'Alex, Berlin',
    quote: 'Cheeky Prints nailed the custom trio for our living room—playful without feeling childish.',
  },
  {
    name: 'Priya, Toronto',
    quote: 'Beautiful quality and sustainably packaged. The personal note was such a thoughtful touch.',
  },
];

const INSTAGRAM_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
    alt: 'Cheeky Prints styled above a workspace with colourful accessories.',
  },
  {
    src: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80',
    alt: 'A cosy reading corner featuring stacked art prints.',
  },
  {
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    alt: 'Gallery wall of bright, playful artwork in a modern living room.',
  },
  {
    src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
    alt: 'Close-up of art prints being framed with colourful mats.',
  },
];

const SKELETON_KEYS = ['skeleton-a', 'skeleton-b', 'skeleton-c', 'skeleton-d'];

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('react-router').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
