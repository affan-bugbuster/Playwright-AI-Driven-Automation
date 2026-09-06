import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openDirectly() {
    await this.page.goto('https://cloudberrystore.services/index.php?route=checkout/checkout&language=en-gb');
  }

  async openFromHeader() {
    await this.page.goto('https://cloudberrystore.services/index.php?route=common/home&language=en-gb');
    await this.page.getByRole('link', { name: /Checkout/ }).click();
  }

  async expectEmptyCartGate() {
    await expect(this.page).toHaveURL(/route=checkout\/cart/);
    await expect(this.page).toHaveTitle('Shopping Cart');
    await expect(this.page.locator('#shopping-cart').getByText('Your shopping cart is empty!')).toBeVisible();
  }

  async expectCheckoutOrCart() {
    await expect(this.page).toHaveURL(/route=checkout\/(cart|checkout)/);
    if (this.page.url().includes('route=checkout/cart')) {
      await expect(this.page).toHaveTitle('Shopping Cart');
      await expect(this.page.locator('#shopping-cart').getByText('Your shopping cart is empty!')).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Continue', exact: true })).toBeVisible();
      return;
    }

    await expect(this.page).toHaveTitle('Checkout');
    await expect(this.page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    await expect(this.page.getByRole('group', { name: 'Your Personal Details' })).toBeVisible();
    await expect(this.page.getByRole('group', { name: 'Shipping Address' })).toBeVisible();
  }
}