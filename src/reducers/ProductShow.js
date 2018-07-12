import {
     EXPECT_ONE_PRODUCT,
     LOAD_ONE_PRODUCT_SUCCESS,
     EXPECT_AGENCY_PRODUCTS,
     LOAD_AGENCY_PRODUCTS_FAILD,
     LOAD_AGENCY_PRODUCTS_SUCCESS,
     SHARE_PRODUCT
    } from "../actions/products";
export default function ProductShow
(
    state={
        loading: true,
        product: {

        },
        products: [

        ],
        cover: ""
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
        case   EXPECT_AGENCY_PRODUCTS:
            return Object.assign({}, state, {
                loading: true,
            });
        case LOAD_AGENCY_PRODUCTS_FAILD:
            return Object.assign({}, state, {
                loading: false,
            });
        case LOAD_AGENCY_PRODUCTS_SUCCESS:
        console.log(`怎么没来`)
            return Object.assign({}, state, {
                loading: false,
                products: action.msg.products
            });
        case SHARE_PRODUCT:
            return Object.assign({}, state, {
                cover: action.product.cover
            });
    
        default:
            return state;
    }
}