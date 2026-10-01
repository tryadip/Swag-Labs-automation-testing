import { getCartRepo } from '../Repository/Cart.js';

export const removeItemFromCartPage = async (page, index = 0) => {
    const repo = getCartRepo(page);
    await repo.btnRemove.nth(index).click();
};

export const proceedToCheckout = async (page) => {
    const repo = getCartRepo(page);
    await repo.btnCheckout.click();
};