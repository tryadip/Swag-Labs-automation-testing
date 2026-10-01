export const getInventoryRepo = (page) => {
    return {
        inventoryItem: page.locator('.inventory_item'),
        itemName: page.locator('.inventory_item_name'),
        itemPrice: page.locator('.inventory_item_price'),
        sortDropdown: page.locator('[data-test="product-sort-container"]'),
        btnAddToCart: page.locator('button:has-text("Add to cart")'),
        btnRemove: page.locator('button:has-text("Remove")'),
        cartLink: page.locator('.shopping_cart_link'),
        cartBadge: page.locator('.shopping_cart_badge')
    }
}