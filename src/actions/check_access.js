import getRemoteMeteor from "../services/meteor/methods";
import { appShowMsgAndInjectDataReact, switchActionNames, APP_SHOW_MSG_AND_INJECT_DATA_REACT, appShowMsg, appShowMsgAndRedirectPath } from "./app";

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
        console.log(access);
        
        if(access){
            return dispatch(passAccess(productRoleTemp+" PASS", product, accessName));
            
        }else{
            console.log(productRoleTemp+" MISSING");
            
            return dispatch(denyAccess(productRoleTemp+" MISSING", product));
            
        }
    }
}

export function passAccess(reason, product, accessName){
    let action = switchActionNames(accessName);
    console.log(action);
    
    return dispatch => {
        switch (action.type) {
            case APP_SHOW_MSG_AND_INJECT_DATA_REACT:
               return dispatch(appShowMsgAndInjectDataReact(accessName, "add_cart_success", 2360, product)); 
            default:
                return {
                    type: PASS_ACCESS,
                    reason,
                    product, accessName
                }
        }
    }
    
}



export function denyAccess(reason, product){

    return dispatch=> {
        switch(reason){
            case "login_user MISSING":
                return dispatch(appShowMsgAndRedirectPath("/login", reason, 2560));

            case "black_card MISSING":
                return dispatch(appShowMsgAndRedirectPath(
                    "/products_by_rolename/black_card_holder/black_card", 
                    reason, 2560));
            
            default:
                return {
                    type: DENY_ACCESS,
                    reason,
                }
                
        }
    }
    
}

