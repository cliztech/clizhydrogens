import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from 'react-router-dom';
import favicon from '~/assets/favicon.svg';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import globalsStyles from '~/styles/globals.css?url';
import {RootLayout} from '~/components/layout/RootLayout';

export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
    {rel: 'stylesheet', href: resetStyles},
    {rel: 'stylesheet', href: appStyles},
    {rel: 'stylesheet', href: globalsStyles},
  ];
}

export function Layout({children}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}