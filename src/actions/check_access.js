import { appShowMsgAndInjectDataReact, switchActionNames, APP_SHOW_MSG_AND_INJECT_DATA_REACT, appShowMsgAndRedirectPath, APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH, appShowMsgAndInjectDataReactWithPath } from "./app";

export const CHECK_ACCESS_BUY = "CHECK_ACCESS_BUY";
export const PASS_ACCESS = "PASS_ACCESS";
export const PASS_ACCESS_DONE = "PASS_ACCESS_DONE";
export const DENY_ACCESS_DONE = "DENY_ACCESS_DONE";
export const DENY_ACCESS = "DENY_ACCESS";
export const EXPECT_CHECK_ACCESS="EXPECT_CHECK_ACCESS";

function expectCheckAccess(accessName){
    return  {
        type: EXPECT_CHECK_ACCESS,
        accessName
    }
}



export function checkAccess(opera, product, accessName){
    let acl = product.acl;

    return (dispatch, getState) => {
        dispatch(expectCheckAccess(accessName));
        if(!acl){
            acl = getState().ProductShow.product.acl
        }
        let access = false;
        let productRoleTemp = "nobody";
        getState().AppUser.roles.forEach(role=>{
            if(!acl){
                return dispatch(denyAccess(role+" MISSING"));
            }
            
            acl[opera].roles.forEach((productRole)=>{
                
                if (productRole===role) {
                    productRoleTemp = productRole;
                    access = true;
                }else{
                    productRoleTemp = productRole;
                }
            })
           
        });
        
        if(access){
            console.log(accessName)
            return dispatch(passAccess(productRoleTemp+" PASS", product, accessName));
            
        }else{
            
            return dispatch(denyAccess(productRoleTemp+" MISSING", product));
            
        }
    }
}

export function passAccess(reason, product, accessName){
    console.log(accessName)
    let action = switchActionNames(accessName);
    
    return dispatch => {
        switch (action.type) {
            case APP_SHOW_MSG_AND_INJECT_DATA_REACT:
               return dispatch(appShowMsgAndInjectDataReact(accessName, "add_cart_success", 2360, product)); 
            case APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH:
                return dispatch(appShowMsgAndInjectDataReactWithPath(
                    accessName, "generate_order", 2230, product
                ));
            default:
            console.log(reason)
                return {
                    type: PASS_ACCESS,
                    reason,
                    product, accessName
                }
        }
    }
    
}



export function denyAccess(reason, product){
    console.log(reason)
    return dispatch=> {
        switch(reason){
            case "login_user MISSING":
                return dispatch(appShowMsgAndRedirectPath("/login", reason, 2560));

            case "blackcard_holder MISSING":
                return dispatch(appShowMsgAndRedirectPath(
                    "/products_by_rolename/blackcard/"+product.name, 
                    reason, 2560, product));
            
            default:
                return {
                    type: DENY_ACCESS,
                    reason,
                }
                
        }
    }
    
}

