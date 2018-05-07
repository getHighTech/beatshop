import { APP_REDIRECT_PATH, APP_SHOW_MSG_AND_READIRECT_PATH, APP_SHOW_MSG_AND_INJECT_DATA_REACT } from "../actions/app";
import { USER_LOG_OUT_SUCCESS } from "../actions/users";
import { ADD_PRODUCTS_TO_APP_CART, addProductsToAppCart } from "../actions/app_cart";
import { PASS_ACCESS } from "../actions/check_access";

export default function AppTrigger(
    state={
        isActive: false,
        type: "",
        actionFunction: function(){console.log("no active")},
        pathname: "/",
        params: [],
        msgReason: ""
    }, action
){

    switch (action.type) {
        case USER_LOG_OUT_SUCCESS:
            return Object.assign({}, state, {
                isActive: true,
                type: APP_SHOW_MSG_AND_READIRECT_PATH,
                pathname: "/login",
                msgReason: "LOGOUT",
                
            });
       
        case PASS_ACCESS:
            console.log(action.passAccessAction);
            
            return Object.assign({}, state, {
                isActive: true,
                type: APP_SHOW_MSG_AND_INJECT_DATA_REACT,
                actionFunction: action.passAccessAction,
                params: {
                    product: action.product,
                    additional: action.additional
                },
                msgReason: action.reason,
                
            });
            
    
        default:
            return state;
    }

}