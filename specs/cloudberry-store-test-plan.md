# CloudBerry Store Test Plan

## Application Overview

End-to-end functional test plan for https://cloudberrystore.services/, an OpenCart-based electronics storefront. Coverage includes storefront navigation and search, category/product discovery, product actions, cart and checkout gating, account registration/login/recovery, contact/support forms, informational links, currency controls, and empty/error states. Each scenario assumes a fresh browser context and must be independently executable. Exploratory note: the MacBook add-to-cart action displayed a success message, but a subsequent cart navigation reported an empty cart; this is explicitly covered as a high-priority regression check.

## Test Scenarios

### 1. Storefront Navigation and Search

**Seed:** `tests/seed.spec.ts`

#### 1.1. Browse homepage navigation and featured products

**File:** `tests/storefront/homepage-navigation.spec.ts`

**Steps:**
  1. Open https://cloudberrystore.services/ in a fresh browser context.
    - expect: The page title is "Your store of fun".
    - expect: The header shows currency, phone/contact, account, wishlist, shopping cart, checkout, logo, search, and cart summary controls.
    - expect: The main category navigation shows Desktops, Laptops & Notebooks, Components, Tablets, Software, Phones & PDAs, Cameras, and MP3 Players.
    - expect: Featured product links and the footer sections are visible.
  2. Select the Laptops & Notebooks category from the main navigation.
    - expect: The Laptops & Notebooks category page opens.
    - expect: The category heading and product count are displayed.
    - expect: Breadcrumb navigation includes Home and Laptops & Notebooks.
  3. Return to the homepage and open a featured product such as MacBook.
    - expect: The selected product detail page opens with the correct product name and product imagery.

#### 1.2. Search for matching and non-matching products

**File:** `tests/storefront/search.spec.ts`

**Steps:**
  1. Open the homepage and submit the search term "MacBook" using the header search.
    - expect: A search results page opens with the heading "Search - MacBook".
    - expect: The search field retains the query.
    - expect: Products meeting the criteria are listed and the result count is shown.
  2. Submit a search containing a term that does not match any catalog item, such as "no-such-product-xyz".
    - expect: The page remains usable and identifies that no products meet the search criteria or shows an empty result set.
    - expect: No unrelated product is presented as a match.
  3. Submit an empty search query.
    - expect: The application handles the empty query without an unhandled error.
    - expect: The user receives a meaningful validation, default search page, or empty-result response.

#### 1.3. Currency and global navigation controls

**File:** `tests/storefront/global-controls.spec.ts`

**Steps:**
  1. Open the currency selector from a fresh homepage session.
    - expect: The currency menu opens and lists the configured currency options, or the control provides a clear response if currency switching is unavailable.
  2. Select each available currency and open a product page.
    - expect: The selected currency is reflected in product and cart prices consistently.
    - expect: The selection persists while navigating between the homepage, category, product, and cart pages.
  3. Open the My Account, Wish List, Shopping Cart, and Checkout header controls while unauthenticated.
    - expect: My Account routes to the login experience.
    - expect: Wish List opens the empty wishlist or login-gated state.
    - expect: Shopping Cart opens the empty-cart state in a fresh session.
    - expect: Checkout opens a clear login/cart requirement rather than exposing an invalid payment flow.

### 2. Catalog and Product Details

**Seed:** `tests/seed.spec.ts`

#### 2.1. Browse categories, sorting, and product comparison

**File:** `tests/catalog/category-browse.spec.ts`

**Steps:**
  1. Open each top-level category from the main navigation, including categories with zero products.
    - expect: Each category loads with the correct heading and breadcrumb.
    - expect: Product counts and empty-category messaging, where applicable, are accurate.
    - expect: No category page displays a server error or broken navigation.
  2. On a populated category page, change the sort order and products-per-page options if available.
    - expect: The selected options are accepted.
    - expect: The displayed product order/count changes accordingly and remains consistent after refresh.
  3. Select Product Compare for two products, then open the comparison page.
    - expect: The comparison count updates without duplicating a product.
    - expect: The comparison page contains both selected products and comparable attributes.
    - expect: Removing a product updates the comparison list and count.

#### 2.2. Validate product detail content and tabs

**File:** `tests/catalog/product-detail.spec.ts`

**Steps:**
  1. Open the MacBook product page.
    - expect: The page shows product name, images, product code, reward points, availability, price/ex-tax price, quantity input, Add to Cart, wishlist, and compare controls.
    - expect: Description is selected by default and product description text is visible.
  2. Open each product gallery thumbnail.
    - expect: The primary product image changes to the selected image without navigating away or distorting the layout.
  3. Open Specification and Reviews tabs.
    - expect: The Specification tab displays specification content or an intentional empty state.
    - expect: The Reviews tab displays the current review count and review content/form state.
  4. Enter zero, a negative value, a decimal, non-numeric text, and a large quantity in the quantity field, then attempt Add to Cart for each value.
    - expect: Invalid quantities are rejected with clear validation and do not create an invalid cart line.
    - expect: A valid positive integer is accepted and the resulting quantity is reflected in the cart.

#### 2.3. Product wishlist and review actions

**File:** `tests/catalog/product-actions.spec.ts`

**Steps:**
  1. From a fresh unauthenticated product page, select Add to Wishlist.
    - expect: The product is added to the wishlist or the user is clearly prompted to log in.
    - expect: The wishlist count/state does not silently claim success when the action is not persisted.
  2. Select Add to Compare for the same product.
    - expect: A confirmation or count update is shown and the product appears in Product Compare.
  3. Attempt to submit a product review with empty and malformed fields.
    - expect: Required review fields are validated.
    - expect: Invalid content is not submitted and validation feedback is accessible.

### 3. Cart and Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add, persist, update, and remove cart items

**File:** `tests/checkout/cart-lifecycle.spec.ts`

**Steps:**
  1. Open the MacBook product page and click Add to Cart once.
    - expect: A success notification names MacBook and links to the shopping cart.
    - expect: The header cart summary updates to one item and the correct total.
  2. Open the shopping cart through the success notification and refresh the page.
    - expect: The cart contains MacBook with the selected quantity, unit price, subtotal, and total.
    - expect: The item and total persist after refresh.
  3. Change the cart quantity to two and apply the update.
    - expect: The quantity is updated to two.
    - expect: Line subtotal, total, and header summary recalculate correctly.
  4. Remove the item from the cart.
    - expect: The item is removed and the cart shows an empty-cart message with a continue-shopping action.
  5. Repeat add-to-cart with a second product and verify the cart after navigating to another page and back.
    - expect: The cart preserves the item across normal navigation and displays accurate totals.

#### 3.2. Checkout access and empty-cart behavior

**File:** `tests/checkout/checkout-gating.spec.ts`

**Steps:**
  1. In a fresh browser context with no cart items, open Checkout directly and through the header.
    - expect: The application does not allow payment or order submission with an empty cart.
    - expect: The user sees a clear empty-cart message or is redirected to the cart/login flow.
  2. Add a valid product, open Checkout, and inspect the checkout steps.
    - expect: The checkout presents the configured guest/login and customer details, address, shipping, payment, terms, and order confirmation steps as applicable.
    - expect: Required fields and terms acceptance are clearly indicated.
  3. Attempt to continue checkout with required fields empty, invalid email/address data, and without accepting terms.
    - expect: The user remains on the relevant step.
    - expect: Field-level validation explains what must be corrected and no order is created.
  4. Complete checkout only with approved test payment data if the environment provides a safe test gateway.
    - expect: A successful order confirmation shows an order identifier, totals, and customer/order details.
    - expect: The order is not duplicated on refresh or repeated submission.

### 4. Accounts and Customer Support

**Seed:** `tests/seed.spec.ts`

#### 4.1. Validate account login and password recovery

**File:** `tests/account/login-recovery.spec.ts`

**Steps:**
  1. Open My Account in a fresh unauthenticated session.
    - expect: The user is redirected to Account Login.
    - expect: New Customer registration and Returning Customer login options are visible.
  2. Submit the login form empty, with malformed email, and with invalid credentials.
    - expect: Required-field and email-format validation appears.
    - expect: Invalid credentials produce a clear error without revealing whether an account exists.
    - expect: The user is not authenticated.
  3. Open Forgotten Password and submit empty, malformed, unknown, and valid test-account email values.
    - expect: The form validates required and email-format rules.
    - expect: The response does not disclose sensitive account existence unnecessarily.
    - expect: A valid test account receives the configured reset response or email.

#### 4.2. Register and verify a customer account

**File:** `tests/account/registration.spec.ts`

**Steps:**
  1. Open Register Account and submit the form with all fields empty.
    - expect: Required validation appears for first name, last name, email, password, and any required policy agreement.
  2. Submit values at minimum/maximum boundaries, invalid email, mismatched or weak password where applicable, and unchecked required agreement.
    - expect: Invalid values are rejected with field-specific messages.
    - expect: The form preserves valid entered values where appropriate and does not create an account.
  3. Submit unique valid test customer details and choose newsletter subscription on and off in separate independent runs.
    - expect: A successful registration confirmation is shown and the user is authenticated or directed to login.
    - expect: Newsletter preference matches the selected option.
    - expect: The duplicate email attempt is rejected with a clear account-exists message.

#### 4.3. Contact and support forms

**File:** `tests/account/contact-support.spec.ts`

**Steps:**
  1. Open Contact Us and inspect the location and telephone information.
    - expect: Contact details and the Contact Form are displayed.
    - expect: The form contains required name, email, enquiry, and Submit controls.
  2. Submit the contact form empty, with malformed email, and with boundary-length or script-like enquiry text.
    - expect: Required and email-format validation appears.
    - expect: Unsafe markup is treated as text or rejected; it is not executed or rendered as active HTML.
    - expect: No request is submitted until validation passes.
  3. Submit valid test contact details.
    - expect: A success confirmation is displayed or the user is redirected to a clear confirmation state.
    - expect: The submitted enquiry is not duplicated by refreshing the confirmation page.
  4. Open Terms & Conditions, Delivery Information, About Us, Privacy Policy, Returns, Site Map, Brands, and Specials from the footer.
    - expect: Each link resolves to the expected page with a meaningful title and content.
    - expect: No footer link leads to a broken page or unrelated route.
