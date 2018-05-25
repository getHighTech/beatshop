import { ADD_PRODUCTS_TO_APP_CART, CHANGE_PRODUCT_FROM_CART_CHECKED, SYNC_REMOTE_CART_LOCAL_SUCCESS, DELETE_PRODUCT_FROM_CART, PLUS_PRODUCT_FROM_CART, MINUS_PRODUCT_FROM_CART, CHANGE_PRODUCT_COUNT_FROM_CART, UNSELECT_SELECT_ALL_ITEMS_FROM_CART } from "../actions/app_cart";
import { removeItem } from "./arrays";
import { CREATE_ONE_ORDER_SUCCESS } from "../actions/orders";

function calNeedToPay(state){
    let products = state.products;
    let productChecks = state.productChecks;
    let productCounts = state.productCounts
    let money = 0;
    for (let index = 0; index < products.length; index++) {
        let check = productChecks[products[index]._id];
        if(check!==0 && check){
            let count = productCounts[products[index]._id];
            
            money+=products[index].endPrice*count;
            
        }
                
    }
    return money
}


function checkCartChecked(productChecks){
    let allUnselected = true;
    let allSelected = true;
    let empty = 0;
    //对全空选判断
    for (const key in productChecks) {
        
        if (productChecks.hasOwnProperty(key)) {

           
            const check = productChecks[key];
            if(check !== 0){
                empty = empty + 1;
            }
            if(check === 0) {
                continue;
            }
            
            allUnselected = allUnselected && !check;
            allSelected = allSelected && check;
        }
    }
   

    if(empty===0){
        return "all-unselected";
    }
    
    if(allSelected){
        return "all-selected";
    }
    if(allUnselected){
        return "all-unselected";
    }
    return "part-selected"
}


// EDIT BY SIMON
export default function AppCart
(
    state={
        count: 0,
        productIds: [],//[id, id, id]
        products: [],
        shopIds:[],//[shopId, shopId, shopId]
        shopNames: [],
        shopProducts: {},//"shopId": [1,2,3]
        productCounts: {},//"productId": countNumber,
        productChecks: {},//"productId": "false",
        shopChecks: {},//"shopId": "false",
        status: "all-unselected",
        orderStatus: "notFinish",
        allChecked: false,
        isCurrent: false,
        userId: null,
        newComing: "false",
        mode: "default",
        needToCal: "false",
        totalAmount: 0,
    },action
)
{

    switch (action.type) {
        case SYNC_REMOTE_CART_LOCAL_SUCCESS:
            return Object.assign({}, state, {
                ...action.msg
            })
        case ADD_PRODUCTS_TO_APP_CART:
            let productIds = state.productIds;
            let products = state.products;
            let shopIds = state.shopIds;
            let shopNames = state.shopNames;

            let newProductId = action.product._id;
            let newProduct = action.product;
            let newShopId = action.product.shopId;
            let newShopName = action.shopName;
            let productCounts = state.productCounts;
            if(!productCounts[newProductId] || productCounts[newProductId]===0){
                productIds.push(newProductId);
                products.push(newProduct);
                shopIds.push(newShopId);
                shopNames.push(newShopName);
                productCounts[newProductId]=1;
                 
            }else{
                productCounts[newProductId]++;
            }
             //deal shopProducts
             let shopProducts = state.shopProducts;
             let productIndexs = shopProducts[newShopId];
             
             let newProductIndex = productIds.indexOf(newProductId);             
             let shopHasSameProduct = false;
             if(!productIndexs){
                productIndexs=[];
             }else{
                for (let index = 0; index < productIndexs.length; index++) {
                    if(newProductIndex === productIndexs[index]){
                        shopHasSameProduct = true;
                        break;
                    }
                   
               }
             }
            
             
             if (!shopHasSameProduct) {
                productIndexs.push(newProductIndex);
             }
             shopProducts[newShopId] = productIndexs;
            //init check

            let shopChecks = state.shopChecks;
            shopChecks[newShopId] = false;

            let productChecks = state.productChecks;
            productChecks[newProductId] = false;

            //other

            let count = state.count;

            count += action.count;




            return Object.assign({}, state, {
                count,
                productIds,
                products,
                shopIds,
                shopNames,
                shopProducts,
                productCounts,
                productChecks,
                shopChecks,
                status: "all-unselected",
                totalAmount: 0,
                userId: action.userId
            })
        case CHANGE_PRODUCT_FROM_CART_CHECKED: 
            productChecks = state.productChecks;
            let checked = productChecks[action.productId];
            productChecks[action.productId] = !checked;
            products = state.products;
            productIds = state.productIds;

            let status = checkCartChecked(productChecks);
            let totalAmount = calNeedToPay(state);
            return Object.assign({}, state, {   
                productChecks,
                status,
                totalAmount
            });

        case PLUS_PRODUCT_FROM_CART:
            productCounts = state.productCounts;
            productChecks = state.productChecks;
            let number = productCounts[action.productId];
            productCounts[action.productId] = number+1;
            count  = state.count;
            count++;
            totalAmount = calNeedToPay(state);
            return Object.assign({},state, {
                productCounts,
                count,
                totalAmount
            })
        case MINUS_PRODUCT_FROM_CART:
            count  = state.count;
            totalAmount = 0;
            
            productCounts = state.productCounts;
            productChecks = state.productChecks;
            number = productCounts[action.productId];
            if(number === 1){
                return state;
            }
            productCounts[action.productId] = number-1;
            totalAmount = calNeedToPay(state);
            count--;
            return Object.assign({},state, {
                productCounts,
                count,
                totalAmount
            })
        case DELETE_PRODUCT_FROM_CART:
            productIds = state.productIds;
            let productId = productIds[action.index];
            
            productChecks = state.productChecks;
            productCounts = state.productCounts;
            productCounts[productId]=0;
            productChecks[productId]=0;
            count = 0
            for (const key in productCounts) {
                if (productCounts.hasOwnProperty(key)) {
                    count += productCounts[key];
                }
            }
            let shopId = state.products[action.index].shopId;
            shopProducts = state.shopProducts;
            for(const shop in shopProducts){
                if (shopProducts.hasOwnProperty(shopId)) {
                    if(shopProducts[shopId].length === 1){
                        shopProducts[shopId]=[];
                        break;
                    }
                    shopProducts[shopId] = shopProducts[shopId].slice(action.index-1,1);
                }
            }
            //再判断一下check

            status = checkCartChecked(productChecks);
            
            totalAmount = calNeedToPay(state);
            
            return Object.assign({}, state, {
                productIds: removeItem(state.productIds, action),
                productChecks,
                productCounts,
                shopProducts,
                products: removeItem(state.products, action),
                status,
                count,
                totalAmount
            });

        case CHANGE_PRODUCT_COUNT_FROM_CART:
            productCounts = state.productCounts;
            productChecks = state.productChecks;
            productCounts[action.productId] = parseInt(action.number,0);
            count = 0
            for (const key in productCounts) {
                if (productCounts.hasOwnProperty(key)) {
                    count += productCounts[key];
                }
            }
            totalAmount = calNeedToPay(state);
            return Object.assign({},state, {
                productCounts,
                count,
                totalAmount
            })


        case UNSELECT_SELECT_ALL_ITEMS_FROM_CART:
            productChecks = state.productChecks;
            if(state.status === "all-unselected"){
                for (const key in productChecks) {
                    if (productChecks.hasOwnProperty(key)) {
                        productChecks[key]=true;
                    }
                }
            }
            if(state.status === "all-selected"){
                for (const key in productChecks) {
                    if (productChecks.hasOwnProperty(key)) {
                        productChecks[key]=false;
                    }
                }
            }
            totalAmount = calNeedToPay(state);
            status = checkCartChecked(productChecks);
            return Object.assign({}, state, {
                productChecks,
                totalAmount,
                status
            })
            
        case CREATE_ONE_ORDER_SUCCESS:
            return {
                count: 0,
                productIds: [],//[id, id, id]
                products: [],
                shopIds:[],//[shopId, shopId, shopId]
                shopNames: [],
                shopProducts: {},//"shopId": [1,2,3]
                productCounts: {},//"productId": countNumber,
                productChecks: {},//"productId": "false",
                shopChecks: {},//"shopId": "false",
                status: "all-unselected",
                orderStatus: "notFinish",
                allChecked: false,
                isCurrent: false,
                userId: null,
                newComing: "false",
                mode: "default",
                needToCal: "false",
                totalAmount: 0,
            };
        default:
            return state;
    }


}
