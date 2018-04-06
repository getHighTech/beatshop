import { EXPECT_HOME_INDEX_PRODUCTS, LOAD_HOME_INDEX_PRODUCTS_SUCCESS } from "../actions/process/home_index";

export default function ProductsList
(
    state=
    {
        loading: "true",
        products: [],
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
            })
    
        default:
            return state;
    }
}