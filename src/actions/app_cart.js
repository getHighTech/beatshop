export const ADD_PRODUCTS_TO_APP_CART ="ADD_PRODUCTS_TO_APP_CART";

export function addProductsToAppCart(product, count, shopName){
    return {
        type: ADD_PRODUCTS_TO_APP_CART,
        product,
        count,
        shopName
    }
}