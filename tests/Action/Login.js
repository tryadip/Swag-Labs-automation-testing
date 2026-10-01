import { getLoginRepo } from '../Repository/Login.js';

export const doLogin = async (page, username, password) => {
    const repo = getLoginRepo(page);
    await page.goto('https://www.saucedemo.com/');
    if (username) await repo.fieldUsername.fill(username);
    if (password) await repo.fieldPassword.fill(password);
    await repo.buttonAction.click();
};