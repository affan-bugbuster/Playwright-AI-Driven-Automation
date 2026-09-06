import { test } from '@playwright/test';
import { ProductPage } from '../pages/product-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';

test.describe('Cart and Checkout', () => {
  test('Checkout access and empty-cart behavior', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);

    // 1. In a fresh browser context with no cart items, open Checkout directly and through the header.
    await checkoutPage.openDirectly();
    await checkoutPage.expectEmptyCartGate();
    await cartPage.expectEmptyCart();

    await checkoutPage.openFromHeader();
    await checkoutPage.expectEmptyCartGate();
  });

  test('Checkout with a populated cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 2. Add a valid product, open Checkout, and inspect the checkout steps.
    await productPage.openMacBook();
    await productPage.addToCart();
    await checkoutPage.openFromHeader();
    await checkoutPage.expectCheckoutOrCart();
  });
});