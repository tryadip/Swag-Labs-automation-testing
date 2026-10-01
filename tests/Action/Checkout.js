import { getCheckoutRepo } from '../Repository/Checkout.js';

export const fillCheckoutInfo = async (page, firstName, lastName, postalCode) => {
    const repo = getCheckoutRepo(page);
    if (firstName) await repo.fieldFirstName.fill(firstName);
    if (lastName) await repo.fieldLastName.fill(lastName);
    if (postalCode) await repo.fieldPostalCode.fill(postalCode);
    await repo.btnContinue.click();
};

export const finishCheckout = async (page) => {
    const repo = getCheckoutRepo(page);
    await repo.btnFinish.click();
};