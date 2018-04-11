import getRemoteMeteor from "../services/meteor/methods";

export const CHECK_ACCESS_BUY = "CHECK_ACCESS_BUY";
export const PASS_ACCESS = "PASS_ACCESS";
export const  DENY_ACCESS = "DENY_ACCESS";
export const EXPECT_LOAD_USER__ROLES = "EXPECT_LOAD_USER__ROLES";
export const EXPECT_CHECK_ACCESS="EXPECT_CHECK_ACCESS";

function expectCheckAccess(checkAccessAction){
    return  {
        type: EXPECT_CHECK_ACCESS,
        checkAccessAction
    }
}

export function checkAccessBuy(product, checkAccessAction){
    let acl = product.acl;

    return (dispatch, getState) => {
        dispatch(expectCheckAccess(checkAccessAction));
        if(!acl){
            acl = getState().ProductShow.product.acl
        }
        let access = false;
        let productRoleTemp = "nobody";
        getState().AppUser.roles.forEach(role=>{
            if(!acl){
                return dispatch(denyAccess(role+" MISSING"));
            }
            
            acl.buy.roles.forEach((productRole)=>{
                console.log(productRole, role);
                
                if (productRole===role) {
                    productRoleTemp = productRole;
                    access = true;
                }else{
                    productRoleTemp = productRole;
                }
            })
           
        });
        if(access){
            return dispatch(passAccess(productRoleTemp+" PASS", product));
            
        }else{
            return dispatch(denyAccess(productRoleTemp+" MISSING",productRoleTemp));
            
        }
    }
}

export function passAccess(reason, checkedProduct){
    return {
        type: PASS_ACCESS,
        reason,
        checkedProduct
    }
}

export function denyAccess(reason, missingRole){
    return {
        type: DENY_ACCESS,
        reason, missingRole
    }
}

export function expectLoadUserRoles(productId){
    return {
        type: EXPECT_LOAD_USER__ROLES,
    }
}

export function loadUserRoles(productId){
    return (dispatch, getState) => {
        getRemoteMeteor(dispatch, getState,"roles")
    }
}