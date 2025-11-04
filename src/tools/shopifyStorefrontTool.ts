import type {Tool} from '@openai/agents';

export const shopifyStorefrontTool: Tool = {
  name: 'shopifyStorefront',
  description: 'Call Shopify Storefront GraphQL API (read-only storefront data).',
  inputSchema: {
    type: 'object',
    properties: {
      query: {type: 'string'},
      variables: {type: 'object', additionalProperties: true},
    },
    required: ['query'],
  },
  async execute({query, variables}) {
    const shop = process.env.SHOPIFY_STORE_DOMAIN!;
    const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;
    const res = await fetch(`https://${shop}/api/2024-07/graphql.json`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({query, variables}),
    });
    if (!res.ok) throw new Error(`Storefront API ${res.status}`);
    return res.json();
  },
};
