import { addProductsToAppCart } from "../actions/app_cart";

export function loadApp(keyVal, instanct, history){
    if(keyVal){
       instanct.showSnackBar(3000, "欢迎访问");
        
    }
    
}

export function userLogined(keyVal, instanct, inject){
    if(keyVal==="success"){
        instanct.showSnackBar(3000, inject.snackContent, {text: "进入个人中心", href: "#/my"});
    }
}

export function checkAccessable(keyVal, instanct, inject){
    if(keyVal === "checking"){
        
        
        instanct.showSnackBar(3000, "正在检查权限" );
    }
    if(keyVal === "checked"){
        instanct.showSnackBar(3000, "权限检查完毕" );
        
    }
}

export function checkUserPass(keyVal, instanct, inject){
    console.log(keyVal);
    
    if(keyVal){
        let user = instanct.props.store.AppUser;
        if(user.checkAccessAction === "AddToCart"){
            let product = instanct.props.store.ProductShow.product;
            console.log(product); 
            console.log(instanct.props);
            
            instanct.props.dispatch(
                addProductsToAppCart(product, 1, product.shopId)
            );
          }
    }else{
        // instanct.showSnackBar(3000, "没有通过" );
    }
}