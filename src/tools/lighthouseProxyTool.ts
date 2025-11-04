import type {Tool} from '@openai/agents';

export const lighthouseProxyTool: Tool = {
  name: 'lighthouseAudit',
  description: 'Request a Lighthouse/SEO audit for a URL via your CI or internal service.',
  inputSchema: {
    type: 'object',
    properties: {url: {type: 'string'}},
    required: ['url'],
  },
  async execute({url}) {
    // Replace with your CI endpoint or a local runner; return shape {lcp_ms, cls, inp_ms, details}
    return {url, lcp_ms: 1900, cls: 0.04, inp_ms: 160, details: 'stubbed-ok'};
  },
};
