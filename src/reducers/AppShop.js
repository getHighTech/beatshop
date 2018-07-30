import {
    EXPECT_SHOP_PRODUCTS_LIMIT,
    GET_SHOP_PRODUCTS_LIMIT_SUCCESS,
    GET_SHOP_PRODUCTS_LIMIT_FAIL,
    SHOP_PRODUCTS_PAGE
} from "../actions/app_shop";

export default function  AppShop(
state={
   loading: false,
   loadFailReason: "",
   shop: {},
   products: [],
   page: 1,
}, action
){
switch (action.type) {
    case  EXPECT_SHOP_PRODUCTS_LIMIT:
        return Object.assign({}, state, {
            loading: true,
        });
    case  GET_SHOP_PRODUCTS_LIMIT_FAIL:
        return Object.assign({}, state, {
            loadFailReason: action.reason,
        })
    case GET_SHOP_PRODUCTS_LIMIT_SUCCESS:
        return Object.assign({}, state, {
            loading: false,
            shop: action.msg.shop,
            products: action.msg.products,
            page: action.page*1+1
        })
    case SHOP_PRODUCTS_PAGE:
    console.log(action)
    return Object.assign({}, state, {
        page: action.page*1+1
    })
    default:
        return state;
    }
}