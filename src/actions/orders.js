import app from '../config/app.json';
import { getStore } from '../tools/localStorage';
import getRemoteMeteor from '../services/meteor/methods';

export const EXPECT_CREATE_ONE_ORDER = "EXPECT_CREATE_ONE_ORDER";
export const CREAT_ONE_ORDER = "CREAT_ONE_ORDER";
export const CREAT_ONE_ORDER_FAIL = "CREAT_ONE_ORDER_FAIL";
export const CREAT_ONE_ORDER_SUCCESS = "CREAT_ONE_ORDER_SUCCESS";

export function expectCreateOneOrder(){
    return {
        type: EXPECT_CREATE_ONE_ORDER,
    }
}

function cartToOrderParams(cart){
    let productIds = cart.productIds
    let productIdsChecked = [];
     let productsChecked = [];
     let productCountsChecked={};
 
     for (let index = 0; index < productIds.length; index++) {
         let productId = productIds[index];
         if(cart.productChecks[productId]){
             productIdsChecked.push(productId);
             let productIndex = productIds.indexOf(productId);
             productsChecked.push(cart.products[productIndex]);
             productCountsChecked[productId] = cart.productCounts[productId];
         }
     }
     return {
        products: productsChecked,
        productIds: productIdsChecked,
        productCounts: productCountsChecked,
        totalAmount: cart.totalAmount,
     }
}
export function createOneOrder(cart, count){
    //以购物车的结构，完成商品的下单
    return (dispatch, getState) => {
        dispatch(expectCreateOneOrder());        
        let defaultContact = getState().AppUser.currentContact
        let orderParams = {
           ...cartToOrderParams(cart),
            contact: defaultContact,
        }
        let loginToken = getStore("stampedToken");
        return getRemoteMeteor(
            dispatch,
             getState, 
             "orders", 
             "app.create.order", 
             [loginToken, app.name, orderParams], 
             createOneOrderSuccess, createOneOrderFail)
    }
}

export function createOneOrderByProduct(product, count){
    return (dispatch, getState) => {
        let productCounts = {}
        productCounts[product._id] = 1;
        
        dispatch(expectCreateOneOrder());        
        let defaultContact = getState().AppUser.currentContact
        if(!defaultContact){
            defaultContact={}
        }
        let orderParams = {
            products: [product],
            productIds: [product._id],
            area: getState().AppInfo.currentCity,//兼容1.0
            productCounts,
            name: getState().AppUser.user.username,//兼容1.0
            totalAmount: product.endPrice,
            contact: defaultContact,
        }
        let loginToken = getStore("stampedToken");
        return getRemoteMeteor(
            dispatch,
             getState, 
             "orders", 
             "app.create.order", 
             [loginToken, app.name, orderParams], 
             createOneOrderSuccess, createOneOrderFail)
    }
}

export function createOneOrderFail(reason){
    
    return {
        type: CREAT_ONE_ORDER_FAIL,
        reason
    }
}

export function createOneOrderSuccess(msg){
    console.log(msg);
    
    return {
        type: CREAT_ONE_ORDER_SUCCESS,
        msg
    }
}

export const EXPECT_LOAD_ONE_ORDER = "EXPECT_LOAD_ONE_ORDER";
export const LOAD_ONE_ORDER_FAIL = "LOAD_ONE_ORDER_FAIL";
export const LOAD_ONE_ORDER_SUCCESS = "LOAD_ONE_ORDER_SUCCESS";


export function expectLoadOneOrder(){
    return {
        type: EXPECT_LOAD_ONE_ORDER
    }
}

export function loadOneOrder(orderId){
    return (dispatch, getState) => {
        dispatch(expectLoadOneOrder());
        let loginToken = getStore("stampedToken");
        return getRemoteMeteor(
            dispatch, getState, "orders", "app.load.one.order",
            [loginToken, app.name, orderId],
            loadOneOrderSuccess,
            loadOneOrderFail
        )
    }
}

export function loadOneOrderFail(reason){
    return {
        type: LOAD_ONE_ORDER_FAIL,
        reason
    }
}

export function loadOneOrderSuccess(msg){
    return {
        type: LOAD_ONE_ORDER_SUCCESS,
        msg
    }
}