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
