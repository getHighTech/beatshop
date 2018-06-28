import { getStore } from '../tools/localStorage';
import app from '../config/app.json';
import getRemoteMeteor from "../services/meteor/methods";
import { dealWithError } from "./error_fail";
export const EXPECT_SHOP_PRODUCTS_LIMIT = "EXPECT_SHOP_PRODUCTS_LIMIT";
export const GET_SHOP_PRODUCTS_LIMIT_SUCCESS = "GET_SHOP_PRODUCTS_LIMIT_SUCCESS";
export const GET_SHOP_PRODUCTS_LIMIT_FAIL = "GET_SHOP_PRODUCTS_LIMIT_FAIL";



export function expectShopProductsLimit(){
    return {
        type: EXPECT_SHOP_PRODUCTS_LIMIT,
    }
}


export function getShopProductsLimitFail(reason){
    return {
        type: GET_SHOP_PRODUCTS_LIMIT_FAIL,
        reason
    }
}


export function getShopProductsLimitSuccess(msg){
    return {
        type: GET_SHOP_PRODUCTS_LIMIT_SUCCESS,
        msg
    }
}




export function getShopProductsLimit(shopId,page, pagesize){
    return (dispatch, getState) => {
        dispatch(expectShopProductsLimit())
            return getRemoteMeteor(
                dispatch,getState, "shops", 
                "app.get.shop.products.limit",
                [shopId,page, pagesize],
                getShopProductsLimitSuccess, getShopProductsLimitFail
            );
    }
}










