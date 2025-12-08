import {Await, Link, useLoaderData} from 'react-router';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [
    {title: 'Cheeky Prints | The Drop'},
    {name: 'description', content: 'Hottest drops. Obsess. Own it.'},
  ];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  const {storefront} = args.context;
  const {bestSelling} = await storefront.query(HOMEPAGE_QUERY);
  const featuredProduct = bestSelling?.nodes?.[0] ?? null;
  return {featuredProduct};
}

export default function Homepage() {
  const {featuredProduct} = useLoaderData();

  return (
    <div className="home">
      <section className="hero">
        <div className="tag tag--pill currently-browsing">
          🔥 CURRENTLY BROWSING
        </div>

        <h1>THE DROP</h1>

        <div className="tag" style={{border: 'none', background: 'white', fontSize: '1.1rem'}}>
          Hottest drops. Obsess. Own it.
        </div>

        <Link
          to={featuredProduct ? `/products/${featuredProduct.handle}` : '/collections/all'}
          className="button button--primary"
          style={{marginTop: '1rem', marginBottom: '1rem'}}
        >
          SHOP NOW →
        </Link>

        <div className="hero-product-card">
          <div className="sticker-new-drop">
            NEW<br/>DROP
          </div>
          {featuredProduct?.featuredImage ? (
            <Image
              data={featuredProduct.featuredImage}
              sizes="(min-width: 45em) 400px, 90vw"
            />
          ) : (
            <img
              src="https://cdn.shopify.com/s/files/1/0550/0000/0001/files/placeholder.jpg"
              alt="Placeholder"
              style={{width: '100%', height: '100%', objectFit: 'cover', background: '#ccc'}}
            />
          )}
        </div>
      </section>
    </div>
  );
}

const HOMEPAGE_QUERY = `#graphql
  query Homepage($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    bestSelling: products(first: 1, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        featuredImage {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`;
