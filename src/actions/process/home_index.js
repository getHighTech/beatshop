import getRemoteMeteor from "../../services/meteor/methods";
import { dealWithError } from "../error_fail";

export const EXPECT_HOME_INDEX_PRODUCTS = "EXPECT_HOME_INDEX_PRODUCTS";
export const LOAD_HOME_INDEX_PRODUCTS_SUCCESS = "LOAD_HOME_INDEX_PRODUCTS_SUCCESS";
export function expectHomeIndexProducts(){
    return {
        type: EXPECT_HOME_INDEX_PRODUCTS,
    }
}

export function loadHomeIndexProductsSuccess(products){
    console.log(products);
//     var map = {},
//     dest = [];
// for(var i = 0; i < products.length; i++){
//     var ai = products[i];
//     console.log('------------------');
//     console.log(!map[ai.name]);
//     if(!map[ai.name]){
//         dest.push({
//             id: ai.name,
//             data: [ai]
//         });
//         map[ai.name] = ai;
//     }else{
//         for(var j = 0; j < dest.length; j++){
//             var dj = dest[j];
//             if(dj.name == ai.name){
//                 dj.data.push(ai);
//                 break;
//             }
//         }
//     }
// }
//
// console.log(dest);
    return {
        type: LOAD_HOME_INDEX_PRODUCTS_SUCCESS,
        products
    }
}

export function loadHomeIndexProducts(){
    return (dispatch, getState) => {
        dispatch(expectHomeIndexProducts());
        return getRemoteMeteor(dispatch, getState, "products","wanrenchehui.temp.home", [], loadHomeIndexProductsSuccess, dealWithError);
    }
}
