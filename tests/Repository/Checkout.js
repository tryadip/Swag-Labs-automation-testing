export const getCheckoutRepo = (page) => {
    return {
        fieldFirstName: page.locator('[data-test="firstName"]'),
        fieldLastName: page.locator('[data-test="lastName"]'),
        fieldPostalCode: page.locator('[data-test="postalCode"]'),
        btnContinue: page.locator('[data-test="continue"]'),
        btnCancel: page.locator('[data-test="cancel"]'),
        btnFinish: page.locator('[data-test="finish"]'),
        btnBackHome: page.locator('[data-test="back-to-products"]'),
        errorMessage: page.locator('[data-test="error"]'),
        completeHeader: page.locator('.complete-header')
    }
}