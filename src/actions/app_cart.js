import getRemoteMeteor from "../services/meteor/methods";
import { closeAppMsg } from "./app_msg";
import { getStore, setStore } from "../tools/localStorage";

export const ADD_PRODUCTS_TO_APP_CART ="ADD_PRODUCTS_TO_APP_CART";
export const CHANGE_PRODUCT_FROM_CART_CHECKED="CHANGE_PRODUCT_FROM_CART_CHECKED";


let  intervalTimers = [];
function clearAllInterval(){
    intervalTimers.forEach(i=>{
        clearInterval(i);
    });
}
export function repeatSyncLocalCartRemote(){
    return (dispatch, getState)=>{
        let i = 0;
        let cartId = getStore("cartId");
        if(!cartId){cartId = "000";}
        let intervalTimer = setInterval(()=>{
            console.log(i++);
            dispatch(syncLocalCartRemote(cartId, getState().AppCart));
        }, 1000)      
        intervalTimers.push(intervalTimer);
        dispatch({
            type: "REAPT_SYNC_LOCAL_CART_REMOTE"
        });
    }
}
export function addProductsToAppCart(product, count=1, shopName=product.shopName){
    return  (dispatch, getState) => {
        dispatch(repeatSyncLocalCartRemote());
        return dispatch({
            type: ADD_PRODUCTS_TO_APP_CART,
            product,
            count,
            shopName,
            userId: getState().AppUser.userId
        });
    }
    
}

export function changeProductFromCartChecked(productId){
    return dispatch => {
        dispatch(repeatSyncLocalCartRemote());
        return dispatch({
            type: CHANGE_PRODUCT_FROM_CART_CHECKED,
            productId,
        }  )
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
    console.log(reason);
    return {
        type: SYNC_REMOTE_CART_LOCAL_FAIL,
        reason
    }
}
export function syncRemoteCartlocalSuccess(msg){
    setStore("cartId", msg._id);
    return {
        type: SYNC_REMOTE_CART_LOCAL_SUCCESS,
        msg
    }
}
export function syncRemoteCartlocal(userId, cartId){
    return (dispatch, getState) => {
        dispatch(expectSyncRemoteCartlocal());
        return getRemoteMeteor(dispatch, getState, "app_carts",
    "app.sync.remote.cart.local", [userId, cartId], syncRemoteCartlocalSuccess,
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
    clearAllInterval();
    return {
        type: SYNC_LOCAL_CART_REMOTE_FAIL,
        reason
    }
}
export function syncLocalCartRemoteSuccess(msg){
    console.log(msg);
    if(msg!==1){
        setStore("cartId", msg);
    }
    clearAllInterval();
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

export const MINUS_PRODUCT_FROM_CART = "MINUS_PRODUCT_FROM_CART";
export const PLUS_PRODUCT_FROM_CART = "PLUS_PRODUCT_FROM_CART"; 
export const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";
export const CHANGE_PRODUCT_COUNT_FROM_CART = "CHANGE_PRODUCT_COUNT_FROM_CART";

export const UNSELECT_SELECT_ALL_ITEMS_FROM_CART = "UNSELECT_SELECT_ALL_ITEMS_FROM_CART";

export function minusProductFromCart(productId){
    return dispatch => {
        dispatch(repeatSyncLocalCartRemote());
        return dispatch({
            type: MINUS_PRODUCT_FROM_CART,
            productId
        })
    }
}


export function plusProductFromCart(productId){
    return dispatch => {
        dispatch(repeatSyncLocalCartRemote());
        return dispatch({
            type: PLUS_PRODUCT_FROM_CART,
            productId
        })
    }
}


export function deleteProductFromCart(index){
    return dispatch => {
        dispatch(repeatSyncLocalCartRemote());
        return dispatch({
            type: DELETE_PRODUCT_FROM_CART,
            index,
        })
    }
}

export function changeProductCountFromCart(productId, number){
    return dispatch => {
        dispatch(repeatSyncLocalCartRemote());
        return dispatch({
            type: CHANGE_PRODUCT_COUNT_FROM_CART,
            productId,
            number

        })
    }
}


export function unselectSelectAllItemsFromCart(){
    return dispatch => {
        dispatch(repeatSyncLocalCartRemote());
        return dispatch({
            type:  UNSELECT_SELECT_ALL_ITEMS_FROM_CART,
        })
    }
}