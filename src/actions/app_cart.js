
export const ADD_PRODUCTS_TO_APP_CART ="ADD_PRODUCTS_TO_APP_CART";
export const CHANGE_PRODUCT_FROM_CART_CHECKED="CHANGE_PRODUCT_FROM_CART_CHECKED";

export function addProductsToAppCart(product, count, shopName){
    return {
        type: ADD_PRODUCTS_TO_APP_CART,
        product,
        count,
        shopName
    }
}

export function changeProductFromCartChecked(productId){
    return {
        type: CHANGE_PRODUCT_FROM_CART_CHECKED,
        productId,
    }           
}