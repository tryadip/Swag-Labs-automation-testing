import { menu } from '../Repository/Menu.js';

export const logout = async (page) => {
    const repo = menu(page);
    await repo.buttonMenu.click();
    await repo.lougoutMenu.click();
};

export const resetAppState = async (page) => {
    const repo = menu(page);
    await repo.buttonMenu.click();
    await repo.resetAppState.click();
    await page.locator('#react-burger-cross-btn').click();
};