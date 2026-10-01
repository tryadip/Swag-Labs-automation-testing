import { test, expect } from '@playwright/test';
import { doLogin } from '../Action/Login.js';
import { addToCart } from '../Action/Inventory.js';
import { proceedToCheckout } from '../Action/Cart.js';
import { fillCheckoutInfo, finishCheckout } from '../Action/Checkout.js';
import { getInventoryRepo } from '../Repository/Inventory.js';
import { getCartRepo } from '../Repository/Cart.js';
import { getCheckoutRepo } from '../Repository/Checkout.js';

test.describe('Feature 3: Checkout', () => {
    
    test.beforeEach(async ({ page }) => {
        await doLogin(page, 'standard_user', 'secret_sauce');
    });

    test('TC-24: Checkout happy path (1 item)', async ({ page }) => {
        const invRepo = getInventoryRepo(page);
        const checkRepo = getCheckoutRepo(page);
        
        await addToCart(page, 0);
        await invRepo.cartLink.click();
        await proceedToCheckout(page);
        
        await fillCheckoutInfo(page, 'Adhitya', 'Febhi', '12345');
        await finishCheckout(page);
        
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(checkRepo.completeHeader).toHaveText('Thank you for your order!');
    });

    test('TC-25: Checkout multi item + Back Home', async ({ page }) => {
        const invRepo = getInventoryRepo(page);
        const checkRepo = getCheckoutRepo(page);
        
        await addToCart(page, 0);
        await addToCart(page, 1);
        await invRepo.cartLink.click();
        await proceedToCheckout(page);
        
        await fillCheckoutInfo(page, 'Adhitya', 'Febhi', '12345');
        await finishCheckout(page);
        
        await checkRepo.btnBackHome.click();
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(invRepo.cartBadge).toBeHidden();
    });

    test('TC-26: Checkout empty First Name', async ({ page }) => {
        const invRepo = getInventoryRepo(page);
        const checkRepo = getCheckoutRepo(page);
        
        await addToCart(page, 0);
        await invRepo.cartLink.click();
        await proceedToCheckout(page);
        
        await fillCheckoutInfo(page, '', 'Febhi', '12345');
        await expect(checkRepo.errorMessage).toContainText('First Name is required');
    });

    test('TC-27: Checkout empty Last Name', async ({ page }) => {
        const invRepo = getInventoryRepo(page);
        const checkRepo = getCheckoutRepo(page);
        
        await addToCart(page, 0);
        await invRepo.cartLink.click();
        await proceedToCheckout(page);
        
        await fillCheckoutInfo(page, 'Adhitya', '', '12345');
        await expect(checkRepo.errorMessage).toContainText('Last Name is required');
    });

    test('TC-28: Checkout empty Postal Code', async ({ page }) => {
        const invRepo = getInventoryRepo(page);
        const checkRepo = getCheckoutRepo(page);
        
        await addToCart(page, 0);
        await invRepo.cartLink.click();
        await proceedToCheckout(page);
        
        await fillCheckoutInfo(page, 'Adhitya', 'Febhi', '');
        await expect(checkRepo.errorMessage).toContainText('Postal Code is required');
    });

    test('TC-29: Overview shows totals', async ({ page }) => {
        const invRepo = getInventoryRepo(page);
        
        await addToCart(page, 0);
        await invRepo.cartLink.click();
        await proceedToCheckout(page);
        
        await fillCheckoutInfo(page, 'Adhitya', 'Febhi', '12345');
        await expect(page.locator('.summary_subtotal_label')).toBeVisible();
        await expect(page.locator('.summary_tax_label')).toBeVisible();
        await expect(page.locator('.summary_total_label')).toBeVisible();
    });

    test('TC-30: Cancel step one', async ({ page }) => {
        const invRepo = getInventoryRepo(page);
        const cartRepo = getCartRepo(page);
        const checkRepo = getCheckoutRepo(page);
        
        await addToCart(page, 0);
        await invRepo.cartLink.click();
        await proceedToCheckout(page);
        
        await checkRepo.btnCancel.click();
        await expect(page).toHaveURL(/.*cart.html/);
        await expect(cartRepo.cartItem).toHaveCount(1);
    });
});