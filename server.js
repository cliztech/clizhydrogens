// Virtual entry point for the app
import {createRequestHandler} from '@shopify/hydrogen/oxygen';

export default {
  async fetch(request, env, executionContext) {
    try {
      const handleRequest = createRequestHandler({
        build: await import('virtual:react-router/server-build'),
        mode: process.env.NODE_ENV,
        getLoadContext: () => ({
          storefront: {},
        }),
      });

      return await handleRequest(request);
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};