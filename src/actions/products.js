import getRemoteMeteor from "../services/meteor/methods";
import { dealWithError } from "./error_fail";
import { appShowMsg } from './app.js'
import app from '../config/app.json'
import axios from 'axios';
import serverConfig  from '../config/server';
export const EXPECT_ONE_PRODUCT = "EXPECT_ONE_PRODUCT";
export const LOAD_ONE_PRODUCT_SUCCESS = "LOAD_ONE_PRODUCT_SUCCESS";
export const EXPECT_AGENCY_PRODUCTS = "EXPECT_AGENCY_PRODUCTS"
export const LOAD_AGENCY_PRODUCTS_FAILD = "LOAD_AGENCY_PRODUCTS_FAILD ";
export const LOAD_AGENCY_PRODUCTS_SUCCESS = "LOAD_AGENCY_PRODUCTS_SUCCESS";
export const SHARE_PRODUCT = "SHARE_PRODUCT"
export const REMOVE_AGENCY_PRODUCTS_SUCCESS = "REMOVE_AGENCY_PRODUCTS_SUCCESS"
export const REMOVE_AGENCY_PRODUCTS_FAILD = "REMOVE_AGENCY_PRODUCTS_FAILD"
export const EXPECT_REMOVE_AGENCY_PRODUCTS = "EXPECT_REMOVE_AGENCY_PRODUCTS"

export function expectRemoveAgencyProducts() {
    return {
        type: EXPECT_REMOVE_AGENCY_PRODUCTS
    }
}
export function removeAgencyProductsSuccess(msg) {
    return {
        type: REMOVE_AGENCY_PRODUCTS_SUCCESS,
        msg
    }
}

export function removeAgencyProductsFaild(reson) {
    return {
        type:  REMOVE_AGENCY_PRODUCTS_FAILD,
        reson
    }
}

export function removeAgencyProducts(shopId,productId) {
    console.log(`shopId: ${shopId}, productId: ${productId}`)
    return (dispatch, getState) => {
        dispatch(expectRemoveAgencyProducts())
        return getRemoteMeteor(dispatch, getState,"products", "app.cancel.agency.product", [shopId,productId], removeAgencyProductsSuccess, removeAgencyProductsFaild);
    }
}

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
        // console.log(shopId)
        // return axios.get(`${serverConfig.server_url}/api/selling_product`,{
        //   params:{
        //     shopId
        //   }
        // }).then((res)=>{
        //     console.log(res)
        //     dispatch(loadAgencyProductsSuccess(res.data))
        // }).catch((err)=>{
        //     console.log(err)
        //     dispatch(loadAgencyProductsFaild())
        // })
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
export function loadOneProductByRolename(rolename,shopId){
    return (dispatch, getState) => {
        dispatch(expectOneProduct(rolename))
        console.log(shopId)
        return getRemoteMeteor(dispatch, getState,"products", "app.get.one.product.rolename", [rolename, shopId], loadOneProductSuccess, dealWithError);
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



export function getShopProductsLimit(shopId,page){
  const appName = app.name;
  console.log(appName);
    return async (dispatch, getState) => {
        dispatch(expectGetShopProductsLimit());
        try{
           const result = await axios.get(`${serverConfig.server_url}/api/new_add_products`,{
                params:{
                  appName
                }
              })
            return dispatch(getShopProductsLimitSuccess(result.data.products))
        } catch( err) {
            return dispatch(getShopProductsLimitFail())
        }
        // return getRemoteMeteor(
        //     dispatch,getState, "products",
        //     "app.get.products.shop.limit",
        //     [],
        //     getShopProductsLimitSuccess, getShopProductsLimitFail
        // );
    }
}



export function getMoreShopProducts(shopId, page, pagesize){

}

export const EXPECT_AGENCY_ONE_PRODUCT = "EXPECT_AGENCY_ONE_PRODUCT"
export const AGENCY_ONE_PRODUCT_FAIL = "AGENCY_ONE_PRODUCT_FAIL"
export const AGENCY_ONE_PRODUCT_SUCCESS = "AGENCY_ONE_PRODUCT_SUCCESS";

export function expectAgencyOneProduct(){
  console.log('11111');
    return {
        type: EXPECT_AGENCY_ONE_PRODUCT
    }
}
export function agencyOneProductFail(reason){
  console.log('false');
  console.log(reason);
    // return {
    //     type: AGENCY_ONE_PRODUCT_FAIL,
    //     reason
    // }

    return dispatch => {
      dispatch(appShowMsg('agency_one_product_existed',1200))
      return dispatch({
        type: AGENCY_ONE_PRODUCT_FAIL,
        reason
      })
    }
}
export function agencyOneProductSuccess(products){
  console.log('success');
  return dispatch => {
    dispatch(appShowMsg('agency_one_product_success',1200))
    return dispatch({
        type: AGENCY_ONE_PRODUCT_SUCCESS,
        products
    })
  }
  // return {
  //     type: AGENCY_ONE_PRODUCT_SUCCESS,
  //     products
  // }

}
export function agencyOneProduct(product, userId,appNameShopId,shopId){
  console.log(product);
    return (dispatch, getState) => {
        dispatch(expectAgencyOneProduct());
        return getRemoteMeteor(dispatch, getState,
             "shops", "app.agency.one.product",
                [product, userId,appNameShopId,shopId], agencyOneProductSuccess,
                agencyOneProductFail
            )
    }
}
