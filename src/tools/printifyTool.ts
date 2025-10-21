import type {Tool} from '@openai/agents';

export const printifyTool: Tool = {
  name: 'printify',
  description: 'Call Printify REST API for product/catalog actions.',
  inputSchema: {
    type: 'object',
    properties: {
      path: {type: 'string', description: 'e.g., /shops/{shop_id}/products.json'},
      method: {type: 'string', enum: ['GET', 'POST', 'PUT', 'DELETE'], default: 'GET'},
      body: {type: 'object', additionalProperties: true},
    },
    required: ['path'],
  },
  async execute({path, method = 'GET', body}) {
    const key = process.env.PRINTIFY_API_KEY!;
    const res = await fetch(`https://api.printify.com/v1${path}`, {
      method,
      headers: {'content-type': 'application/json', Authorization: `Bearer ${key}`},
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`Printify ${res.status}`);
    return res.json();
  },
};
