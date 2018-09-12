import {
         EXPECT_ORDERS_LIMIT,
         GET_ORDERS_LIMIT_SUCCESS,
         GET_ORDERS_LIMIT_FAIL,
         CANCEL_ORDER_SUCCESS,
         COLLECT_ORDER_SUCCESS,
         GET_CONFIRMED_ORDER,
         GET_PAID_ORDER,
         GET_RECEVIED_ORDER,
         GET_CANCEL_ORDER
        } from "../actions/app_orders";

export default function  AppOrders(
    state={
        loading: false,
        loadFailReason: "",
        orders: [
            { products: []}
        ],
        orders_cancel: [],
        orders_paid: [],
        orders_confirmed: [],
        orders_recevied: [],
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
                orders_confirmed: action.msg.orders_confirmed,
                loading:false
            })
        case COLLECT_ORDER_SUCCESS:
            return Object.assign({},state,{
                orders_paid: action.msg.orders_paid,
                loading:false
            })
        case GET_CONFIRMED_ORDER:
            return Object.assign({},state,{
              orders_confirmed:action.result
            })
        case GET_PAID_ORDER:
            return Object.assign({},state,{
              orders_paid:action.result
            })
        case GET_RECEVIED_ORDER:
            return Object.assign({},state,{
              orders_recevied:action.result
            })
        case GET_CANCEL_ORDER:
            return Object.assign({},state,{
              orders_cancel:action.result
            })
        default:
            return state;
    }
}
