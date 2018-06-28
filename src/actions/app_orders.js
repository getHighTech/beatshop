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

export const EXPECT_CANCEL_ORDER = "EXPECT_CANCEL_ORDER"
export const CANCEL_ORDER_FAIL = "CANCEL_ORDER_FAIL"
export const CANCEL_ORDER_SUCCESS = "CANCEL_ORDER_SUCCESS"


export function expectCancelOrder(){
    return {
        type: EXPECT_CANCEL_ORDER
    }
}


export function cancelOrderFail(reason){
    return {
        type: CANCEL_ORDER_FAIL,
        reason
    }
}


export function cancelOrderSuccess(msg){
    return {
        type: CANCEL_ORDER_SUCCESS,
        msg
    }
}

export function cancelOrder(orderId,userId,page, pagesize) {
    return (dispatch, getState) => {
        dispatch(expectCancelOrder());
        return getRemoteMeteor(
            dispatch, getState, "orders", "app.cancel.one.order",
            [orderId,userId,1,4],
            cancelOrderSuccess,
            cancelOrderFail
        )
    }
}




