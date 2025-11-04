import {test, expect} from '@playwright/test';

const BASE_URL = process.env.PREVIEW_URL || 'https://preview.cheekyprints.shop';

test.describe('Cheeky Prints shopper journeys', () => {
  test('home → collection → PDP → cart → checkout redirect', async ({page}) => {
    await page.goto(`${BASE_URL}/`);
    await page.getByTestId('featured-collection-link').click();
    await expect(page.getByTestId('collection-heading')).toBeVisible();
    await page.getByTestId('product-card').first().getByRole('link').click();
    await expect(page.getByTestId('pdp-title')).toBeVisible();
    const frameSelect = page.locator("select[name='Frame Color']");
    if (await frameSelect.isVisible()) {
      await frameSelect.selectOption({label: 'Natural'});
    }
    await page.getByTestId('add-to-cart').click();
    await expect(page.getByTestId('toast-message')).toContainText('Added to cart');
    await page.getByTestId('view-cart').click();
    await expect(page.getByTestId('cart-line-item')).toBeVisible();
    const [checkout] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByTestId('checkout').click(),
    ]);
    await expect(checkout).toHaveURL(/checkout\.shopify\.com/);
    await checkout.close();
  });

  test('search with filters', async ({page}) => {
    await page.goto(`${BASE_URL}/search`);
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('print');
    await searchInput.press('Enter');
    await expect(page.getByTestId('result-count')).toBeVisible();
    await page.getByTestId('filter-toggle').click();
    await page.getByTestId('facet-color').getByLabel('Pink', {exact: false}).check();
    await page.getByTestId('apply-filters').click();
    await expect(page.getByTestId('active-filters')).toContainText('Pink');
  });

  test('switch market to UK', async ({page}) => {
    await page.goto(`${BASE_URL}/`);
    await page.getByTestId('market-selector').click();
    await page.getByTestId('market-option-UK').click();
    await expect(page).toHaveURL(`${BASE_URL}/uk`);
    await expect(page.getByTestId('price').first()).toContainText('£');
  });

  test('account login form', async ({page}) => {
    await page.goto(`${BASE_URL}/account`);
    await page.getByTestId('login-email').fill('qa+cheeky@prints.com');
    await page.getByTestId('login-password').fill('TestPassword123');
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('account-dashboard')).toBeVisible();
  });

  test('404 fallback', async ({page}) => {
    await page.goto(`${BASE_URL}/not-a-page`, {waitUntil: 'domcontentloaded'});
    await expect(page.getByTestId('not-found-message')).toBeVisible();
    await expect(page.getByTestId('search-input')).toBeVisible();
  });
});
