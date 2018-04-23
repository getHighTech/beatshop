import getRemoteMeteor from "../services/meteor/methods";

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

export const SYNC_REMOTE_CART_LOCAL = "SYNC_REMOTE_CART_LOCAL";
export const EXPECT_SYNC_REMOTE_CART_LOCAL = "EXPECT_SYNC_REMOTE_CART_LOCAL";
export const SYNC_REMOTE_CART_LOCAL_FAIL = "SYNC_REMOTE_CART_LOCAL_FAIL";
export const SYNC_REMOTE_CART_LOCAL_SUCCESS = "SYNC_REMOTE_CART_LOCAL_SUCCESS";


export function expectSyncRemoteCartlocal(){
    return {
        type: EXPECT_SYNC_REMOTE_CART_LOCAL
    }
}
export function syncRemoteCartlocalFail(reason){
    return {
        type: SYNC_LOCAL_CART_REMOTE_FAIL,
        reason
    }
}
export function syncRemoteCartlocalSuccess(msg){
    return {
        type: SYNC_LOCAL_CART_REMOTE_SUCCESS,
        msg
    }
}
export function syncRemoteCartlocal(cartId){
    return (dispatch, getState) => {
        dispatch(expectSyncRemoteCartlocal());
        return getRemoteMeteor(dispatch, getState, "app_carts",
    "app.sync.local.cart.remote", [cartId], syncRemoteCartlocalSuccess,
    syncRemoteCartlocalFail);
    }
}


export const SYNC_LOCAL_CART_REMOTE = "SYNC_LOCAL_CART_REMOTE";
export const EXPECT_SYNC_LOCAL_CART_REMOTE = "EXPECT_SYNC_LOCAL_CART_REMOTE";
export const SYNC_LOCAL_CART_REMOTE_FAIL = "SYNC_LOCAL_CART_REMOTE_FAIL";
export const SYNC_LOCAL_CART_REMOTE_SUCCESS = "SYNC_LOCAL_CART_REMOTE_SUCCESS";


export function expectSyncLocalCartRemote(){
    return {
        type: EXPECT_SYNC_LOCAL_CART_REMOTE
    }
}
export function syncLocalCartRemoteFail(reason){
    return {
        type: SYNC_LOCAL_CART_REMOTE_FAIL,
        reason
    }
}
export function syncLocalCartRemoteSuccess(msg){
    return {
        type: SYNC_LOCAL_CART_REMOTE_SUCCESS,
        msg
    }
}
export function syncLocalCartRemote(cartId, cartParams){
    return (dispatch, getState) => {
        dispatch(expectSyncLocalCartRemote());
        return getRemoteMeteor(dispatch, getState, "app_carts",
        "app.sync.local.cart.remote", [cartId, cartParams], syncLocalCartRemoteSuccess,
syncLocalCartRemoteFail);
    }
}
