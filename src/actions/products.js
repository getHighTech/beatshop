import getRemoteMeteor from "../services/meteor/methods";
import { dealWithError } from "./error_fail";
import app from '../config/app.json'
export const EXPECT_ONE_PRODUCT = "EXPECT_ONE_PRODUCT";
export const LOAD_ONE_PRODUCT_SUCCESS = "LOAD_ONE_PRODUCT_SUCCESS";
export function expectOneProduct(id){
    return {
        type: EXPECT_ONE_PRODUCT,
        id,
    }
}

export function loadOneProductSuccess(product){
    return {
        type: LOAD_ONE_PRODUCT_SUCCESS,
        product
    }
}

export function loadOneProduct(id){
    return (dispatch, getState) => {
        dispatch(expectOneProduct(id))
        return getRemoteMeteor(dispatch, getState,"products", "app.get.one.product.id", [id, app.name], loadOneProductSuccess, dealWithError);
    }
}
export function loadOneProductByRolename(rolename){
    return (dispatch, getState) => {
        dispatch(expectOneProduct(rolename))
        return getRemoteMeteor(dispatch, getState,"products", "app.get.one.product.rolename", [rolename, app.name], loadOneProductSuccess, dealWithError);
    }
}


export const GET_SHOP_PRODUCTS_LIMIT = "GET_SHOP_PRODUCTS_LIMIT";
export const EXPECT_GET_SHOP_PRODUCTS_LIMIT = "EXPECT_GET_SHOP_PRODUCTS_LIMIT";
export const GET_SHOP_PRODUCTS_LIMIT_FAIL = "GET_SHOP_PRODUCTS_LIMIT_FAIL";
export const GET_SHOP_PRODUCTS_LIMIT_SUCCESS = "GET_SHOP_PRODUCTS_LIMIT_SUCCESS";



export function expectGetShopProductsLimit(){
    return {
        type: EXPECT_GET_SHOP_PRODUCTS_LIMIT,
    }
}


export function getShopProductsLimitFail(reason){
    console.log(reason);
    
    return {
        type: GET_SHOP_PRODUCTS_LIMIT_FAIL,
        reason
    }
}


export function getShopProductsLimitSuccess(msg){
    console.log(msg);
    
    return {
        type: GET_SHOP_PRODUCTS_LIMIT_SUCCESS,
        msg
    }
}



export function getShopProductsLimit(shopId, page, pagesize){
    return (dispatch, getState) => {
        dispatch(expectGetShopProductsLimit());
        return getRemoteMeteor(
            dispatch,getState, "products", 
            "app.get.products.shop.limit",
            [shopId, page, pagesize],
            getShopProductsLimitSuccess, getShopProductsLimitFail
        );
    }
}



export function getMoreShopProducts(shopId, page, pagesize){
    
}

export const EXPECT_AGENCY_ONE_PRODUCT = "EXPECT_AGENCY_ONE_PRODUCT"
export const AGENCY_ONE_PRODUCT_FAIL = "AGENCY_ONE_PRODUCT_FAIL"
export const AGENCY_ONE_PRODUCT_SUCCESS = "AGENCY_ONE_PRODUCT_SUCCESS";

export function expectAgencyOneProduct(){
    return {
        type: EXPECT_AGENCY_ONE_PRODUCT
    }
}
export function agencyOneProductFail(reason){
    return {
        type: AGENCY_ONE_PRODUCT_FAIL,
        reason
    }
}
export function agencyOneProductSuccess(msg){
    return {
        type: AGENCY_ONE_PRODUCT_SUCCESS,
        msg
    }
}
export function agencyOneProduct(product, userId){
    return (dispatch, getState) => {
        dispatch(expectAgencyOneProduct());
        return getRemoteMeteor(dispatch, getState,
             "shops", "app.agency.one.product",
                [product, userId], agencyOneProductSuccess, 
                agencyOneProductFail
            )
    }
}