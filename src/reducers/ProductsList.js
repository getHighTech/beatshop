import { EXPECT_HOME_INDEX_PRODUCTS, LOAD_HOME_INDEX_PRODUCTS_SUCCESS } from "../actions/process/home_index";
import { GET_SHOP_PRODUCTS_LIMIT_SUCCESS, EXPECT_GET_SHOP_PRODUCTS_LIMIT } from "../actions/products";

export default function ProductsList
(
    state=
    {
        loading: "true",
        products: [],
        shopProducts: "unloaded",
    },
    action
){
    switch (action.type) {
        case EXPECT_HOME_INDEX_PRODUCTS:
            return Object.assign({}, state, {
                loading: true,
                products: [],
            });
        case LOAD_HOME_INDEX_PRODUCTS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                products: action.products
            });

        case EXPECT_GET_SHOP_PRODUCTS_LIMIT: 
            return Object.assign({}, state, {
                loading: true,
                shopProducts: "unloaded",
                
            })
        case GET_SHOP_PRODUCTS_LIMIT_SUCCESS:
            
            return Object.assign({}, state, {
                loading: false,
                shopProducts: action.msg,
            })
    
        default:
            return state;
    }
}