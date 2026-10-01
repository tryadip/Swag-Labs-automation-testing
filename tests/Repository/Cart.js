export const getCartRepo = (page) => {
    return {
        cartItem: page.locator('.cart_item'),
        btnRemove: page.locator('button:has-text("Remove")'),
        btnContinueShopping: page.locator('[data-test="continue-shopping"]'),
        btnCheckout: page.locator('[data-test="checkout"]')
    }
}