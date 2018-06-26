import {
         EXPECT_ORDERS_LIMIT,
         GET_ORDERS_LIMIT_SUCCESS,
         GET_ORDERS_LIMIT_FAIL,
         GET_ORDER_CANCEL_SUCCESS,
         CHANGE_ORDER_STATUS,
         EXPECT_CANCEL_ORDER,
         CANCEL_ORDER_FAIL,
         CANCEL_ORDER_SUCCESS,
        } from "../actions/app_orders";

export default function  AppOrders(
    state={
        loading: false,
        loadFailReason: "",
        orders: [
            { products: []}
        ],
        orders_cancel: [],
        orders_paid: "unloaded",
        orders_confirmed: "unloaded",
        orders_recevied: "unloaded",
        order: {},
        orderStatus: "unloaded",
    }, action
){
    switch (action.type) {
        case EXPECT_ORDERS_LIMIT:
            return Object.assign({}, state, {
                loading: true,
            });
        case  GET_ORDERS_LIMIT_FAIL:
            return Object.assign({}, state, {
                loadFailReason: action.reason,
            })
        case GET_ORDERS_LIMIT_SUCCESS:
            return Object.assign({}, state, {
                orders_confirmed: action.msg.orders_confirmed,
                orders_paid: action.msg.orders_paid,
                orders_cancel: action.msg.orders_cancel,
                orders_recevied: action.msg.orders_recevied,
                loading: false,
                ordersStatus: "loaded"
            })
        case CANCEL_ORDER_SUCCESS:
            return Object.assign({}, state, {
                orders_cancel: action.msg.orders_cancel,
            })
        default:
            return state;
    }
}