# 🎭 Playwright AI-Driven Automation

A modern **end-to-end test automation framework built with Playwright and TypeScript**, designed around structured test planning, reusable Page Object Models, cross-browser execution, and maintainable automated regression coverage.

The project currently automates functional scenarios for the **CloudBerry Store** e-commerce application, covering product discovery, cart behavior, checkout access, and other critical user journeys.

---

## 🚀 Project Overview

This repository demonstrates an approach to building scalable web UI automation with **Microsoft Playwright**.

The framework combines:

* 📋 Structured test planning
* 🧪 End-to-end functional testing
* 🎭 Playwright Test
* 🧩 Page Object Model (POM)
* 🌐 Cross-browser testing
* 🔄 CI-aware retries and parallel execution
* 📊 HTML test reporting
* 🔍 Trace collection for failed/retried tests
* 🛒 E-commerce workflow validation

The test plan is maintained separately under the `specs/` directory and serves as the foundation for implementing automated regression scenarios.

---

## 🛠️ Tech Stack

| Technology            | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| **Playwright**        | Browser automation and end-to-end testing       |
| **TypeScript**        | Test and framework development                  |
| **Node.js**           | JavaScript runtime                              |
| **Playwright Test**   | Test runner, assertions, fixtures and reporting |
| **Page Object Model** | Reusable page interactions and maintainability  |
| **HTML Reporter**     | Test execution reporting                        |

### Supported Browsers

The framework is configured to run against:

* Chromium
* Firefox
* WebKit

---

## 📁 Project Structure

```text
Playwright-AI-Driven-Automation/
│
├── specs/
│   ├── README.md
│   └── cloudberry-store-test-plan.md
│
├── tests/
│   ├── account/
│   ├── catalog/
│   ├── checkout/
│   │   ├── cart-lifecycle.spec.ts
│   │   ├── checkout-gating.spec.ts
│   │   └── pom-placeholder.spec.ts
│   │
│   ├── pages/
│   │   ├── cart-page.ts
│   │   ├── checkout-page.ts
│   │   └── product-page.ts
│   │
│   └── seed.spec.ts
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

## 🧪 Test Coverage

The current test strategy is organized around the major areas of an e-commerce application.

### 🏠 Storefront

Planned coverage includes:

* Homepage navigation
* Featured products
* Category navigation
* Product search
* Empty search results
* Currency selection
* Global navigation controls

### 🛍️ Product Catalog

Coverage includes scenarios around:

* Category browsing
* Product sorting
* Product comparison
* Product details
* Product images
* Product specifications
* Product reviews
* Wishlist actions
* Quantity validation

### 🛒 Cart & Checkout

The framework covers:

* Add-to-cart behavior
* Cart persistence
* Cart refresh behavior
* Quantity updates
* Product removal
* Empty-cart handling
* Checkout access restrictions
* Checkout flow validation

### 👤 Account & Support

The test plan also defines scenarios for:

* Account login
* Registration
* Password recovery
* Contact/support forms
* Customer-facing informational pages

---

## 🧩 Page Object Model

The framework uses the **Page Object Model** to separate test intent from page-specific implementation details.

For example:

```text
tests/
├── checkout/
│   └── checkout-gating.spec.ts
│
└── pages/
    ├── cart-page.ts
    ├── checkout-page.ts
    └── product-page.ts
```

A test can interact with a page through reusable methods instead of duplicating selectors and navigation logic.

Example:

```typescript
const productPage = new ProductPage(page);

await productPage.openMacBook();
await productPage.addToCart();
```

This makes the tests easier to read, maintain, and extend as the application evolves.

---

## 📋 Test Planning

Detailed test scenarios are maintained in:

```text
specs/cloudberry-store-test-plan.md
```

The test plan defines the intended functional coverage before automation implementation.

Each scenario includes:

* Test objective
* Preconditions/seed
* File mapping
* Execution steps
* Expected results
* Regression considerations

This separation between **test planning** and **test implementation** makes it easier to track automation coverage and identify scenarios that still need to be automated.

---

## ⚙️ Installation

### Prerequisites

Make sure you have:

* **Node.js 20+**
* npm
* Git

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Playwright-AI-Driven-Automation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

### Run all tests

```bash
npm test
```

or:

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npm run test:headed
```

### Run using Playwright UI Mode

```bash
npm run test:ui
```

UI Mode is particularly useful when developing or debugging tests interactively.

---

## 🌐 Run Tests Against a Specific Browser

### Chromium

```bash
npx playwright test --project=chromium
```

### Firefox

```bash
npx playwright test --project=firefox
```

### WebKit

```bash
npx playwright test --project=webkit
```

---

## 🎯 Run a Specific Test

Run a specific test file:

```bash
npx playwright test tests/checkout/checkout-gating.spec.ts
```

Run tests matching a keyword:

```bash
npx playwright test -g "Checkout"
```

---

## 🐛 Debugging

Playwright provides several tools for debugging failed tests.

### Debug mode

```bash
npx playwright test --debug
```

### Playwright Inspector

```bash
npx playwright test --debug tests/checkout/checkout-gating.spec.ts
```

### Trace Viewer

The framework is configured to collect a trace on the first retry:

```javascript
trace: 'on-first-retry'
```

After a test produces a trace, it can be inspected with:

```bash
npx playwright show-trace <trace-file>.zip
```

Trace data can help investigate:

* Browser actions
* DOM state
* Network activity
* Screenshots
* Test timing
* Assertion failures

---

## 📊 Test Reports

The project uses Playwright's HTML reporter.

After a test run, open the report with:

```bash
npx playwright show-report
```

The report provides an overview of:

* Passed tests
* Failed tests
* Skipped tests
* Test duration
* Browser/project results
* Failure details

---

## 🔄 CI Behavior

The Playwright configuration is designed to behave differently when running in CI.

When the `CI` environment variable is enabled:

* Tests are retried up to **2 times**
* Test workers are limited to **1**
* `test.only` causes the build to fail

This helps prevent accidental partial test execution and provides additional resilience against transient failures.

---

## 🧱 Configuration

The main Playwright configuration is located at:

```text
playwright.config.js
```

Key configuration includes:

```javascript
testDir: './tests',
fullyParallel: true,
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 1 : undefined,
reporter: 'html'
```

The configured browser projects are:

```text
chromium
firefox
webkit
```

---

## 🧠 AI-Driven Automation Approach

The project follows an **AI-assisted test automation workflow** where test scenarios can be derived from application behavior and structured into a reusable test plan before implementation.

The general workflow is:

```text
Application
     │
     ▼
Exploration & Analysis
     │
     ▼
Test Scenario Generation
     │
     ▼
Structured Test Plan
     │
     ▼
Playwright Test Implementation
     │
     ▼
Page Object Model
     │
     ▼
Cross-Browser Execution
     │
     ▼
HTML Report / Trace
```

The goal is to make automation development more systematic by separating:

**What should be tested**
from
**How the test is implemented**

---

## 🔍 Example Test Flow

A simplified cart workflow looks like:

```text
Open CloudBerry Store
        │
        ▼
Open MacBook product
        │
        ▼
Add product to cart
        │
        ▼
Open Shopping Cart
        │
        ▼
Verify cart state
        │
        ▼
Refresh page
        │
        ▼
Verify cart state persists
```

The implementation uses reusable page objects:

```typescript
const productPage = new ProductPage(page);
const cartPage = new CartPage(page);

await productPage.openMacBook();
await productPage.addToCart();

await productPage.openCartFromSuccessNotification();
await cartPage.expectShoppingCartPage();
await cartPage.expectEmptyOrProduct('MacBook');

await cartPage.refreshAndExpectEmptyOrProduct('MacBook');
```

---

## 📈 Roadmap

Planned improvements include:

* [ ] Expand automation coverage to all scenarios in the test plan
* [ ] Complete account and authentication scenarios
* [ ] Expand catalog and product validation
* [ ] Add comprehensive cart lifecycle tests
* [ ] Add checkout form validation
* [ ] Add API testing where appropriate
* [ ] Add environment-based configuration
* [ ] Add CI/CD pipeline integration
* [ ] Improve test data management
* [ ] Add screenshots/videos for failed scenarios
* [ ] Add richer AI-assisted test generation
* [ ] Add automated regression reporting

---

## ⚠️ Test Environment

The current automated scenarios target the CloudBerry Store application:

```text
https://cloudberrystore.services/
```

Because this is an external application, test results may depend on:

* Application availability
* Network conditions
* Changes to the application's UI
* Changes to product data
* Changes to application behavior

Tests should therefore be treated as integration/end-to-end tests against the configured environment.

---

## 🤝 Contributing

Contributions and improvements are welcome.

When adding a new test:

1. Define the scenario in the test plan.
2. Identify the appropriate test area.
3. Create or update the relevant Page Object.
4. Implement the Playwright test.
5. Run the test locally.
6. Verify the HTML report.
7. Ensure the test passes across the required browsers.
8. Keep selectors and page interactions reusable.

---

## 📄 License

This project is currently distributed under the **ISC License** as specified in `package.json`.

---

## 👨‍💻 Author

**Affan Ahmed**

Built with ❤️ using Playwright and TypeScript.

---

## ⭐ Why This Project?

This repository demonstrates practical skills in:

* End-to-end test automation
* Playwright
* TypeScript
* Page Object Model
* Test planning
* Regression testing
* Cross-browser testing
* Test reporting
* CI-oriented automation
* AI-assisted automation workflows

If you find the project useful, consider giving the repository a ⭐.
