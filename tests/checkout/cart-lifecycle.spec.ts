import { test } from '@playwright/test';
import { ProductPage } from '../pages/product-page';
import { CartPage } from '../pages/cart-page';

test.describe('Cart and Checkout', () => {
  test('Add to cart response and cart state', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // 1. Open the MacBook product page and click Add to Cart once.
    await productPage.openMacBook();
    await productPage.addToCart();

    // 2. Open the shopping cart through the success notification and refresh the page.
    await productPage.openCartFromSuccessNotification();
    await cartPage.expectShoppingCartPage();
    await cartPage.expectEmptyOrProduct('MacBook');
    await cartPage.refreshAndExpectEmptyOrProduct('MacBook');
  });
});