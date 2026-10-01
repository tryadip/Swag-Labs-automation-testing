export const getLoginRepo = (page) => {
    return {
        fieldUsername: page.locator('[data-test="username"]'),
        fieldPassword: page.locator('[data-test="password"]'),
        buttonAction: page.locator('[data-test="login-button"]'),
        errorMessage: page.locator('[data-test="error"]')
    }
}