import getRemoteMeteor from "../services/meteor/methods";
import axios from 'axios';
import serverConfig  from '../config/server';

export const EXPECT_SHOP_PRODUCTS_LIMIT = "EXPECT_SHOP_PRODUCTS_LIMIT";
export const GET_SHOP_PRODUCTS_LIMIT_SUCCESS = "GET_SHOP_PRODUCTS_LIMIT_SUCCESS";
export const GET_SHOP_PRODUCTS_LIMIT_FAIL = "GET_SHOP_PRODUCTS_LIMIT_FAIL";
export const SHOP_PRODUCTS_PAGE = "SHOP_PRODUCTS_PAGE";


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

export function getShopProductsPage(page) {
    console.log(page)
    return {
        type: SHOP_PRODUCTS_PAGE,
        page
    }
}




export function getShopProductsLimit(shopId,page, pagesize){
    return (dispatch, getState) => {
        dispatch(expectShopProductsLimit())
        return axios.get(`${serverConfig.server_url}/api/products`,{
          params:{
            shopId,page,pagesize
          }
        }).then((res)=>{
            console.log(res.data)
            dispatch(getShopProductsLimitSuccess(res.data))
        }).catch((err)=>{
            console.log(err)
        })
            // return getRemoteMeteor(
            //     dispatch,getState, "shops",
            //     "app.get.shop.products.limit",
            //     [shopId,page, pagesize],
            //     getShopProductsLimitSuccess, getShopProductsLimitFail
            // );
    }
}
