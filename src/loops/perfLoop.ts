import {Runner} from '@openai/agents';
import {PerformanceSEOAgent} from '../agents/perf-seo.js'; // create an Agent() with the instructions above

type PerfContext = {
  preview_url: string;
  performance_budget: {lcp_ms: number; cls: number; inp_ms?: number};
};

export async function runPerfLoop(ctx: PerfContext, maxIterations = 3) {
  let iteration = 0;
  let lastReport: any = null;

  while (iteration < maxIterations) {
    const runner = new Runner({startingAgent: PerformanceSEOAgent});

    const {output} = await runner.run({
      input: `Audit ${ctx.preview_url} against budgets.`,
      context: ctx,
    });

    lastReport = output;
    if (output?.status === 'pass') return {passed: true, report: output};
    iteration += 1;

    // Optional: auto-apply safe fixes suggested by Perf agent (image widths, cache TTL tweaks).
    // You can wire tiny code mods or config edits here before next loop.
  }

  return {passed: false, report: lastReport};
}
