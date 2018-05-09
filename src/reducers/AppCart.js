import { ADD_PRODUCTS_TO_APP_CART, CHANGE_PRODUCT_FROM_CART_CHECKED } from "../actions/app_cart";

function checkCartChecked(productChecks){
    let allUnselected = true;
    let allSelected = true;
    console.log(productChecks);
    for (const key in productChecks) {
        if (productChecks.hasOwnProperty(key)) {
            const check = productChecks[key];
            console.log(check);
            allUnselected = allUnselected && !check;
            allSelected = allSelected && check;
        }
    }
   
    console.log("allUnselected",allUnselected);
    console.log("allSelected",allSelected);
    
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
        totalAmount: 0,
    },action
)
{

    switch (action.type) {
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
            console.log(productChecks);
            
            let status = checkCartChecked(productChecks);
            return Object.assign({}, state, {   
                productChecks,
                status
            })

        default:
            return state;
    }


}
