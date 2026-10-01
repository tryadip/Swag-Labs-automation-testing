import { getInventoryRepo } from '../Repository/Inventory.js';

export const addToCart = async (page, index = 0) => {
    const repo = getInventoryRepo(page);
    await repo.btnAddToCart.nth(index).click();
};

export const removeFromCart = async (page, index = 0) => {
    const repo = getInventoryRepo(page);
    await repo.btnRemove.nth(index).click();
};

export const sortProducts = async (page, optionValue) => {
    const repo = getInventoryRepo(page);
    await repo.sortDropdown.selectOption(optionValue);
};