import type {Tool} from '@openai/agents';

export const githubDispatchTool: Tool = {
  name: 'githubDispatch',
  description: 'Dispatch a GitHub Actions workflow (used for Oxygen build/deploy).',
  inputSchema: {
    type: 'object',
    properties: {
      owner: {type: 'string'},
      repo: {type: 'string'},
      workflow: {type: 'string', description: 'e.g., deploy.yml'},
      ref: {type: 'string', description: 'branch or tag', default: 'main'},
      inputs: {type: 'object', additionalProperties: true},
    },
    required: ['owner', 'repo', 'workflow'],
  },
  async execute({owner, repo, workflow, ref = 'main', inputs}) {
    const token = process.env.GITHUB_TOKEN!;
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`, {
      method: 'POST',
      headers: {'authorization': `Bearer ${token}`, accept: 'application/vnd.github+json'},
      body: JSON.stringify({ref, inputs}),
    });
    if (!res.ok) throw new Error(`GitHub dispatch ${res.status}`);
    return {ok: true};
  },
};
