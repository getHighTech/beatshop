import getRemoteMeteor from "../../services/meteor/methods";
import app from '../../config/app.json';
import { dealWithError } from "../error_fail";

export const EXPECT_HOME_INDEX_PRODUCTS = "EXPECT_HOME_INDEX_PRODUCTS";
export const LOAD_HOME_INDEX_PRODUCTS_SUCCESS = "LOAD_HOME_INDEX_PRODUCTS_SUCCESS";
export function expectHomeIndexProducts(){
    return {
        type: EXPECT_HOME_INDEX_PRODUCTS,
    }
}

export function loadHomeIndexProductsSuccess(products){
    return {
        type: LOAD_HOME_INDEX_PRODUCTS_SUCCESS,
        products
    }
}

export function loadHomeIndexProducts(){
    return (dispatch, getState) => {
        dispatch(expectHomeIndexProducts());
        return getRemoteMeteor(dispatch, getState, "products","wanrenchehui.temp.home", [], loadHomeIndexProductsSuccess, dealWithError);
    }
}