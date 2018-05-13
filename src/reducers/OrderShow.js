import { EXPECT_CREATE_ONE_ORDER, CREATE_ONE_ORDER_FAIL, CREATE_ONE_ORDER_SUCCESS, EXPECT_LOAD_ONE_ORDER, LOAD_ONE_ORDER_FAIL, LOAD_ONE_ORDER_SUCCESS } from "../actions/orders";
import { USE_ONE_CONTACT } from "../actions/contacts";

export default function  OrderShow(
    state={
        orderId: null,
        id: null,
        loading: false,
        loadFailReason: "",
        order: null,
        createStatus: "untrigger",//创建过程，
        loadUserFailReason: "",
        updated: false,
    }, action
){
    switch (action.type) {
        case EXPECT_CREATE_ONE_ORDER:
            return Object.assign({}, state, {
                loading: true,
            });
        case CREATE_ONE_ORDER_FAIL:
            return Object.assign({}, state, {
                loadFailReason: action.reason,
            })
        case CREATE_ONE_ORDER_SUCCESS:
            return Object.assign({}, state, {
                id: action.msg,
                loading: false,
                createStatus: "success",
                updated: false,
            })
        case EXPECT_LOAD_ONE_ORDER:
            return Object.assign({}, state, {
                createStatus: "untrigger",
                loading: false,
                updated: false,
            });
        case LOAD_ONE_ORDER_FAIL:
            return Object.assign({}, state, {
                createStatus: "untrigger",
                loadUserFailReason: action.reason,
                updated: false,
            });
        case LOAD_ONE_ORDER_SUCCESS:
            return Object.assign({}, state, {
                createStatus: "untrigger",
                order: action.msg,
                updated: true,
            });
        case USE_ONE_CONTACT:
            
            return Object.assign({}, state, {
                order: Object.assign({}, state.order, {
                    contact: action.contact,
                })
            })
        default:
            return state;
    }
}