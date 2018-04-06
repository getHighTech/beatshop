import { EXPECT_ONE_PRODUCT, LOAD_ONE_PRODUCT_SUCCESS } from "../actions/products";

export default function ProductShow
(
    state={
        loading: true,
        product: {

        }
    }, 
    action
)
{
    switch (action.type) {
        case EXPECT_ONE_PRODUCT:
            return Object.assign({}, state, {
                loading: true,
                product: {

                }
            });
        
        case LOAD_ONE_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                product: action.product
            });
    
        default:
            return state;
    }
}