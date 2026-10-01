import { test, expect } from '@playwright/test';
import { doLogin } from '../Action/Login.js';
import { addToCart, removeFromCart, sortProducts } from '../Action/Inventory.js';
import { logout, resetAppState } from '../Action/Menu.js';
import { removeItemFromCartPage } from '../Action/Cart.js';
import { getInventoryRepo } from '../Repository/Inventory.js';
import { getCartRepo } from '../Repository/Cart.js';

test.describe('Feature 2: Product Inventory & Cart', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page, 'standard_user', 'secret_sauce');
    });

    test('TC-03: Add product to cart', async ({ page }) => {
        const repo = getInventoryRepo(page);
        await addToCart(page, 0);
        await expect(repo.cartBadge).toHaveText('1');
    });

    test('TC-04: Remove product from cart (inventory)', async ({ page }) => {
        const repo = getInventoryRepo(page);
        await addToCart(page, 0);
        await removeFromCart(page, 0);
        await expect(repo.cartBadge).toBeHidden();
    });

    test('TC-05: Logout via Menu Burger', async ({ page }) => {
        await logout(page);
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('TC-13: Add multiple products', async ({ page }) => {
        const repo = getInventoryRepo(page);
        await addToCart(page, 0);
        await addToCart(page, 1);
        await addToCart(page, 2);
        await expect(repo.cartBadge).toHaveText('3');
    });

    test('TC-14: Cart page shows product', async ({ page }) => {
        const invRepo = getInventoryRepo(page);
        const cartRepo = getCartRepo(page);
        await addToCart(page, 0);
        await invRepo.cartLink.click();
        await expect(cartRepo.cartItem).toHaveCount(1);
    });

    test('TC-15: Remove from cart page', async ({ page }) => {
        const invRepo = getInventoryRepo(page);
        const cartRepo = getCartRepo(page);
        await addToCart(page, 0);
        await addToCart(page, 1);
        await invRepo.cartLink.click();

        await removeItemFromCartPage(page, 0);
        await expect(cartRepo.cartItem).toHaveCount(1);
    });

    test('TC-16: Continue shopping', async ({ page }) => {
        const invRepo = getInventoryRepo(page);
        const cartRepo = getCartRepo(page);
        await invRepo.cartLink.click();
        await cartRepo.btnContinueShopping.click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('TC-17: Sort Name A to Z', async ({ page }) => {
        const repo = getInventoryRepo(page);
        await sortProducts(page, 'az');
        await expect(repo.itemName.first()).toHaveText('Sauce Labs Backpack');
    });

    test('TC-18: Sort Name Z to A', async ({ page }) => {
        const repo = getInventoryRepo(page);
        await sortProducts(page, 'za');
        await expect(repo.itemName.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    });

    test('TC-19: Sort Price low to high', async ({ page }) => {
        const repo = getInventoryRepo(page);
        await sortProducts(page, 'lohi');
        await expect(repo.itemPrice.first()).toHaveText('$7.99');
    });

    test('TC-20: Sort Price high to low', async ({ page }) => {
        const repo = getInventoryRepo(page);
        await sortProducts(page, 'hilo');
        await expect(repo.itemPrice.first()).toHaveText('$49.99');
    });

    test('TC-21: Product catalog size', async ({ page }) => {
        const repo = getInventoryRepo(page);
        await expect(repo.inventoryItem).toHaveCount(6);
    });

    test('TC-22: Reset App State', async ({ page }) => {
        const repo = getInventoryRepo(page);
        await addToCart(page, 0);
        await resetAppState(page);
        await expect(repo.cartBadge).toBeHidden();
    });

    test('TC-23: Protected route after logout', async ({ page }) => {
        await logout(page);
        await page.goto('https://www.saucedemo.com/cart.html');
        // Should redirect to login and show error
        const loginRepo = require('../Repository/Login.js').getLoginRepo(page);
        await expect(loginRepo.errorMessage).toContainText('Epic sadface: You can only access ' + "'/cart.html'" + ' when you are logged in.');
    });
});