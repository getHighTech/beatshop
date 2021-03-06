import getRemoteMeteor from "../services/meteor/methods";
import { dealWithError } from "./error_fail";
import app from '../config/app.json'
export const EXPECT_ONE_PRODUCT = "EXPECT_ONE_PRODUCT";
export const LOAD_ONE_PRODUCT_SUCCESS = "LOAD_ONE_PRODUCT_SUCCESS";
export const EXPECT_AGENCY_PRODUCTS = "EXPECT_AGENCY_PRODUCTS"
export const  LOAD_AGENCY_PRODUCTS_FAILD = "LOAD_AGENCY_PRODUCTS_FAILD ";
export const LOAD_AGENCY_PRODUCTS_SUCCESS = "LOAD_AGENCY_PRODUCTS_SUCCESS";
export const SHARE_PRODUCT = "SHARE_PRODUCT"

export function shareProduct(product) {
    return {
        type: SHARE_PRODUCT,
        product
    }
}

export function expectAgencyProducts(){
    return {
        type: EXPECT_ONE_PRODUCT,
    }
}
export function loadAgencyProductsFaild(reason){
    return {
        type: LOAD_AGENCY_PRODUCTS_FAILD,
        reason
    }
}

export function loadAgencyProductsSuccess(msg){
    return {
        type: LOAD_AGENCY_PRODUCTS_SUCCESS,
        msg
    }
}


export function loadShareProdcut(id){
    return (dispatch, getState) => {
        dispatch(expectOneProduct(id))
        return getRemoteMeteor(dispatch, getState,"products", "app.get.one.product.id", [id], shareProduct, dealWithError);
    }
}

export function loadAgencyProducts(shopId){
    return (dispatch, getState) => {
        dispatch(expectAgencyProducts())
        console.log(shopId)
        return getRemoteMeteor(dispatch, getState,"products", "app.agency.products", [shopId], loadAgencyProductsSuccess, loadAgencyProductsFaild);
    }
}


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
export const SHOP_PRODUCTS_PAGE = "SHOP_PRODUCTS_PAGE";

export function getShopProductsPage(page) {
    return {
        type: SHOP_PRODUCTS_PAGE,
        page
    }
}

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



export function getShopProductsLimit(){
    return (dispatch, getState) => {
        dispatch(expectGetShopProductsLimit());
        return getRemoteMeteor(
            dispatch,getState, "products", 
            "app.get.products.shop.limit",
            [],
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
export function agencyOneProductSuccess(products){
    return {
        type: AGENCY_ONE_PRODUCT_SUCCESS,
        products
    }
}
export function agencyOneProduct(product, userId,appNameShopId,shopId){
    return (dispatch, getState) => {
        dispatch(expectAgencyOneProduct());
        return getRemoteMeteor(dispatch, getState,
             "shops", "app.agency.one.product",
                [product, userId,appNameShopId,shopId], agencyOneProductSuccess, 
                agencyOneProductFail
            )
    }
}