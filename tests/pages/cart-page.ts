import { expect, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly emptyCartMessage;
  readonly productOutput;

  constructor(page: Page) {
    this.page = page;
    this.emptyCartMessage = page.locator('#shopping-cart').getByText('Your shopping cart is empty!');
    this.productOutput = page.locator('#output-cart');
  }

  async expectShoppingCartPage() {
    await expect(this.page).toHaveTitle('Shopping Cart');
  }

  async expectEmptyOrProduct(productName: string) {
    const product = this.productOutput.getByText(productName, { exact: true });
    await expect(this.emptyCartMessage.or(product)).toBeVisible();
  }

  async refreshAndExpectEmptyOrProduct(productName: string) {
    await this.page.reload();
    await this.expectEmptyOrProduct(productName);
  }

  async expectEmptyCart() {
    await expect(this.emptyCartMessage).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Continue', exact: true })).toBeVisible();
  }
}