export const menu = (page) => {
    return {
        buttonMenu: page.locator('#react-burger-menu-btn'),
        allitemMenu: page.locator('#inventory_sidebar_link'),
        dynamicCatalogMenu: page.locator('#dynamic_catalog_sidebar_link'),
        aboutMenu: page.locator('#about_sidebar_link'),
        lougoutMenu: page.locator('#logout_sidebar_link'),
        resetAppState: page.locator('#reset_sidebar_link')
    }
}