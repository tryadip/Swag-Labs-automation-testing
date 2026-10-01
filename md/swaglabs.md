Test Plan: SwagLabs Web Automation
1. Objective
Memastikan fitur utama aplikasi SwagLabs / Sauce Demo (Login, Inventory, Cart, Checkout, Session) berjalan sesuai ekspektasi bisnis, dan seluruh skenario kritis terotomasi dengan Playwright.
2. Test Environment
Item	Value
URL Target	https://www.saucedemo.com/
Browser	Chromium, Firefox, WebKit
Framework	Playwright (Node.js / Bun)
Project path	`Downloads/swaglabs-playwright/`
Credentials (public demo)	username: lihat TC; password: `secret_sauce`
Known demo users	`standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`
3. Scope
In scope
Authentication (valid / invalid / locked / empty fields)
Inventory listing, sort, add/remove, cart badge
Cart page (view, remove, continue shopping)
Checkout (info validation, overview, complete)
Session (logout, reset app state, protected route)
Out of scope
Visual / pixel regression (`visual_user`)
Deep performance SLA besides glitch-user reachability
Mobile viewport matrix (can extend via Playwright projects)
Backend / API contracts (UI E2E only)
4. Architecture
```
swaglabs-playwright/
├── playwright.config.js          # baseURL, browsers, reporters
├── package.json
└── tests/
    ├── Repository/               # Locators only
    │   ├── Login.js
    │   ├── Inventory.js
    │   ├── Menu.js
    │   ├── Cart.js
    │   └── Checkout.js
    ├── Action/                   # Reusable flows / assertions helpers
    │   ├── Login.js
    │   ├── Inventory.js
    │   ├── Menu.js
    │   ├── Cart.js
    │   └── Checkout.js
    └── TestCase/                 # Playwright specs (runners)
        ├── Login.spec.js         # TC-01,02,06–12
        ├── InventoryCart.spec.js # TC-03–05,13–23
        └── Checkout.spec.js      # TC-24–30
```
Rule: Repository = selector; Action = step; TestCase = scenario + expect.
5. Test Scenarios & Cases
Feature 1: Login Authentication
Test ID	Skenario	Langkah-langkah	Expected Result	Status Automasi	Spec
TC-01	Login sukses (Valid Credential)	1. Buka URL<br>2. Input username `standard_user`<br>3. Input password `secret_sauce`<br>4. Klik Login	URL mengandung `/inventory.html`; title Products	[x] Selesai	`Login.spec.js`
TC-02	Login gagal (Invalid Password)	1. Buka URL<br>2. Username `standard_user`<br>3. Password `salah`<br>4. Klik Login	Error mengandung `Username and password do not match`; tetap di login	[x] Selesai	`Login.spec.js`
TC-06	Login gagal (Invalid Username)	Username `invalid_user`, password valid	Error match credentials; tetap di login	[x] Selesai	`Login.spec.js`
TC-07	Login gagal (Empty Username)	Username kosong, password diisi	Error `Username is required`	[x] Selesai	`Login.spec.js`
TC-08	Login gagal (Empty Password)	Username diisi, password kosong	Error `Password is required`	[x] Selesai	`Login.spec.js`
TC-09	Login gagal (Empty both)	Submit tanpa isi	Error `Username is required`	[x] Selesai	`Login.spec.js`
TC-10	Login `locked_out_user`	Login dengan locked user	Error `Sorry, this user has been locked out`	[x] Selesai	`Login.spec.js`
TC-11	Login `problem_user`	Login problem_user	Tetap masuk inventory (auth OK; bug UI terpisah)	[x] Selesai	`Login.spec.js`
TC-12	Login `performance_glitch_user`	Login glitch user (timeout long)	Akhirnya reach `/inventory.html`	[x] Selesai	`Login.spec.js`
Feature 2: Product Inventory & Cart
Test ID	Skenario	Langkah-langkah	Expected Result	Status Automasi	Spec
TC-03	Add product to cart	1. Login<br>2. Add Sauce Labs Backpack	Badge cart = `1`	[x] Selesai	`InventoryCart.spec.js`
TC-04	Remove product from cart (inventory)	1. Login<br>2. Add product<br>3. Klik Remove	Badge hilang / count 0	[x] Selesai	`InventoryCart.spec.js`
TC-05	Logout via Menu Burger	1. Login<br>2. Buka burger menu<br>3. Logout	Kembali halaman login	[x] Selesai	`InventoryCart.spec.js`
TC-13	Add multiple products	Add 3 produk berbeda	Badge = `3`	[x] Selesai	`InventoryCart.spec.js`
TC-14	Cart page shows product	Add → buka cart	Produk tampil di cart; item count 1	[x] Selesai	`InventoryCart.spec.js`
TC-15	Remove from cart page	Add 2 → cart → remove 1	Sisa 1 produk benar	[x] Selesai	`InventoryCart.spec.js`
TC-16	Continue shopping	Cart → Continue Shopping	Kembali inventory; badge tetap	[x] Selesai	`InventoryCart.spec.js`
TC-17	Sort Name A→Z	Pilih sort Name (A to Z)	Nama produk ascending	[x] Selesai	`InventoryCart.spec.js`
TC-18	Sort Name Z→A	Pilih sort Name (Z to A)	Nama produk descending	[x] Selesai	`InventoryCart.spec.js`
TC-19	Sort Price low→high	Pilih Price (low to high)	Harga ascending	[x] Selesai	`InventoryCart.spec.js`
TC-20	Sort Price high→low	Pilih Price (high to low)	Harga descending	[x] Selesai	`InventoryCart.spec.js`
TC-21	Product catalog size	Login → inventory	6 products visible	[x] Selesai	`InventoryCart.spec.js`
TC-22	Reset App State	Add items → Reset App State	Badge cart cleared	[x] Selesai	`InventoryCart.spec.js`
TC-23	Protected route after logout	Logout → navigate `/cart.html`	Redirect / stay di login; bukan cart authenticated	[x] Selesai	`InventoryCart.spec.js`
Feature 3: Checkout
Test ID	Skenario	Langkah-langkah	Expected Result	Status Automasi	Spec
TC-24	Checkout happy path (1 item)	Add → Cart → Checkout → isi info → Finish	`/checkout-complete.html`; text thank you / dispatched	[x] Selesai	`Checkout.spec.js`
TC-25	Checkout multi item + Back Home	2 items → complete → Back Home	Inventory; badge empty	[x] Selesai	`Checkout.spec.js`
TC-26	Checkout empty First Name	Step one kosong first name	Error `First Name is required`	[x] Selesai	`Checkout.spec.js`
TC-27	Checkout empty Last Name	Step one kosong last name	Error `Last Name is required`	[x] Selesai	`Checkout.spec.js`
TC-28	Checkout empty Postal Code	Step one kosong postal	Error `Postal Code is required`	[x] Selesai	`Checkout.spec.js`
TC-29	Overview shows totals	Reach step two	Item list + subtotal/tax/total visible	[x] Selesai	`Checkout.spec.js`
TC-30	Cancel step one	Step one → Cancel	Kembali `/cart.html`; item masih ada	[x] Selesai	`Checkout.spec.js`
6. Traceability
Area	Test IDs	Count
Login	TC-01,02,06–12	9
Inventory / Cart / Session	TC-03–05,13–23	14
Checkout	TC-24–30	7
Total	TC-01 … TC-30	30
Original plan had TC-01–05 (2 unfinished). Enhancement: complete TC-02 & TC-05, add TC-06–30.
7. How to Run
```bash
cd ~/Downloads/swaglabs-playwright

# install deps (once)
bun install
# or: npm install

# browsers (once)
bunx playwright install
# or: npx playwright install

# all cases × 3 browsers
bun test
# or: npx playwright test

# single browser
bun run test:chromium

# by feature
bun run test:login
bun run test:inventory
bun run test:checkout

# by Test ID
bun run test:tc01
bunx playwright test -g "TC-24"

# headed / UI mode
bun run test:headed
bun run test:ui

# HTML report
bun run test:report
```
8. Data & Conventions
Constant	Value
Default password	`secret_sauce`
Primary product	Sauce Labs Backpack
Checkout sample	First=`Adhitya`, Last=`Febhi`, Zip=`12345`
Locator strategy	Prefer `[data-test=…]` (stable Sauce Demo hooks)
Assertion style	Playwright `expect` auto-wait
9. Risks & Notes
Risk	Mitigation
`performance_glitch_user` slow	TC-12 timeout 60s / expect 45s
Demo site downtime / rate limit	Retry on CI (`retries: 2`); screenshot+video on fail
`problem_user` / `error_user` intentional bugs	Only auth reachability automated; UI bug matrix optional follow-up
Parallel workers share no server state	Each test uses fresh browser context
10. Exit Criteria
[ ] All 30 automated cases green on Chromium (local smoke minimum)
[ ] Full matrix Chromium + Firefox + WebKit green before demo/handoff
[ ] Failures attach screenshot + trace (config already on)
[ ] Test plan IDs match `-g "TC-XX"` titles in specs
11. Maintenance
New UI control → update Repository only.
New business flow → add Action method, then TestCase.
After locator/DOM change on saucedemo, re-run affected feature script first.