import { expect, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly macBookUrl = 'index.php?route=product/product&language=en-gb&product_id=43';

  constructor(page: Page) {
    this.page = page;
  }

  async openMacBook() {
    await this.page.goto(`https://cloudberrystore.services/${this.macBookUrl}`);
    await expect(this.page).toHaveTitle('MacBook');
  }

  async addToCart() {
    await this.page.locator('button:has-text(\'Add to Cart\')').click();
    await expect(this.page.getByText('Success: You have added')).toBeVisible();
  }

  async openCartFromSuccessNotification() {
    await this.page.getByRole('link', { name: 'shopping cart', exact: true }).click();
  }
}