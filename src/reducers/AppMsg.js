import { ADD_PRODUCTS_TO_APP_CART } from "../actions/app_cart";

export function AppMsg(state={
    open: false,
    content: "",
    actionText: "",
    href: "",
}, action){
    switch (action.type) {
        case ADD_PRODUCTS_TO_APP_CART:
            return {
                open: true 
            }
                
        default:
            return state;
    }
}