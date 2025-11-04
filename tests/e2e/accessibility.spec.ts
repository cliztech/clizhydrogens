import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = process.env.PREVIEW_URL || 'https://preview.cheekyprints.shop';

const routes = [
  '/',
  '/collections/bold-botanicals',
  '/products/cheeky-botanical-print',
  '/cart',
];

test.describe('axe-core accessibility scan', () => {
  for (const path of routes) {
    test(`no critical violations on ${path}`, async ({page}) => {
      await page.goto(`${BASE_URL}${path}`);
      const accessibilityScanResults = await new AxeBuilder({page})
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      const critical = accessibilityScanResults.violations.filter(
        (violation) => violation.impact === 'critical',
      );
      expect(critical, `${path} has critical axe violations`).toHaveLength(0);
    });
  }
});
