import {runPerfLoop} from '../src/loops/perfLoop.ts';

async function main() {
  const preview = process.env.PREVIEW_URL;
  if (!preview) {
    console.error('PREVIEW_URL environment variable is required');
    process.exitCode = 1;
    return;
  }

  const budget = {
    lcp_ms: Number(process.env.PERF_BUDGET_LCP_MS ?? '2000'),
    cls: Number(process.env.PERF_BUDGET_CLS ?? '0.1'),
    inp_ms: Number(process.env.PERF_BUDGET_INP_MS ?? '200'),
  };

  const result = await runPerfLoop({
    preview_url: preview,
    performance_budget: budget,
  });

  console.log('Performance loop report:', JSON.stringify(result.report, null, 2));

  if (!result.passed) {
    console.error('Performance budgets were not met.');
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
