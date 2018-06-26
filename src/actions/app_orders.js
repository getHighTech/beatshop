import { getStore } from '../tools/localStorage';
import getRemoteMeteor from "../services/meteor/methods";
export const EXPECT_ORDERS_LIMIT = "EXPECT_ORDERS_LIMIT";
export const GET_ORDERS_LIMIT_SUCCESS = "GET_ORDERS_LIMIT_SUCCESS";
export const GET_ORDERS_LIMIT_FAIL = "GET_ORDERS_LIMIT_FAIL";
export const GET_ORDER_CANCEL_SUCCESS = "GET_ORDER_CANCEL_SUCCESS";


export function expectGetOrdersLimit(){
    return {
        type: EXPECT_ORDERS_LIMIT,
    }
}


export function getOrdersLimitFail(reason){
    return {
        type: GET_ORDERS_LIMIT_FAIL,
        reason
    }
}


export function getOrdersLimitSuccess(msg){
    return {
        type: GET_ORDERS_LIMIT_SUCCESS,
        msg
    }
}

export function getOrderCancelSuccess(msg) {
    return {
        type: GET_ORDER_CANCEL_SUCCESS,
        msg
    }
}




export function getOrdersLimit(status,page, pagesize){
    return (dispatch, getState) => {
        dispatch(expectGetOrdersLimit());
        let userId = getStore("userId");
            return getRemoteMeteor(
                dispatch,getState, "orders", 
                "app.get.orders.limit",
                [userId, status,page, pagesize],
                getOrdersLimitSuccess, getOrdersLimitFail
            );
    }
}




