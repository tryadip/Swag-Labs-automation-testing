import { test, expect } from '@playwright/test';
import { doLogin } from '../Action/Login.js';
import { getLoginRepo } from '../Repository/Login.js';

test.describe('Feature 1: Login Authentication', () => {
    
    test('TC-01: Login sukses (Valid Credential)', async ({ page }) => {
        await doLogin(page, 'standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page).toHaveTitle('Swag Labs');
    });

    test('TC-02: Login gagal (Invalid Password)', async ({ page }) => {
        await doLogin(page, 'standard_user', 'salah');
        const repo = getLoginRepo(page);
        await expect(repo.errorMessage).toContainText('Username and password do not match');
    });

    test('TC-06: Login gagal (Invalid Username)', async ({ page }) => {
        await doLogin(page, 'invalid_user', 'secret_sauce');
        const repo = getLoginRepo(page);
        await expect(repo.errorMessage).toContainText('Username and password do not match');
    });

    test('TC-07: Login gagal (Empty Username)', async ({ page }) => {
        await doLogin(page, '', 'secret_sauce');
        const repo = getLoginRepo(page);
        await expect(repo.errorMessage).toContainText('Username is required');
    });

    test('TC-08: Login gagal (Empty Password)', async ({ page }) => {
        await doLogin(page, 'standard_user', '');
        const repo = getLoginRepo(page);
        await expect(repo.errorMessage).toContainText('Password is required');
    });

    test('TC-09: Login gagal (Empty both)', async ({ page }) => {
        await doLogin(page, '', '');
        const repo = getLoginRepo(page);
        await expect(repo.errorMessage).toContainText('Username is required');
    });

    test('TC-10: Login locked_out_user', async ({ page }) => {
        await doLogin(page, 'locked_out_user', 'secret_sauce');
        const repo = getLoginRepo(page);
        await expect(repo.errorMessage).toContainText('Sorry, this user has been locked out');
    });

    test('TC-11: Login problem_user', async ({ page }) => {
        await doLogin(page, 'problem_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('TC-12: Login performance_glitch_user', async ({ page }) => {
        test.setTimeout(60000); // Glitch user is slow
        await doLogin(page, 'performance_glitch_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/, { timeout: 45000 });
    });
});