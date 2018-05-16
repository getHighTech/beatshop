import getRemoteMeteor from "../../services/meteor/methods";
import { setStore, removeStore, getStore } from "../../tools/localStorage";
import { syncRemoteUser } from "./load_app";
import { syncRemoteCartlocal } from "../app_cart";
export const EXPECT_USER_LOGIN = "EXPECT_USER_LOGIN";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";

//硬编码过期时间
const EXPIRED_LOGIN_TIME = 1814400000;

export function expectUserLogin(){
    return {
        type: EXPECT_USER_LOGIN
    }
}
export function userLoginFail(reason){
    console.log("userLoginFail");
    
    console.log(reason)
    return {
        type: USER_LOGIN_FAIL,
        reason
    }
}
export function userLoginSuccess(msg){
    
    setStore("stampedToken", msg.stampedToken);
    setStore("userId", msg.userId);
    setStore("expiredTime", msg.stampedToken.when["$date"]+EXPIRED_LOGIN_TIME)
    console.log(getStore('cartId'));
    
    return dispatch => {
       
        dispatch(syncRemoteCartlocal(msg.userId, getStore('cartId')));
        
        dispatch( {
            type: USER_LOGIN_SUCCESS,
            msg,
        })
    }
    
}
export function userLogin(type, loginParams){
    return (dispatch, getState) => {
        dispatch(expectUserLogin());
        return getRemoteMeteor(
            dispatch, getState,"users", "app.user.login",
            [type, loginParams], userLoginSuccess, userLoginFail
        );
    }
}


export const EXPECT_USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export function expectUserLogout(){
    return {
        type: EXPECT_USER_LOGOUT
    }
}

export function userLogoutSuccess(){
    return {
        type: USER_LOGOUT_SUCCESS
    }
}
export function userLogout(){
    return (dispatch, getState) => {
        dispatch(expectUserLogout());
        removeStore("stampedToken");
        removeStore("userId");
        removeStore("expiredTime");
        dispatch(syncRemoteUser());
        return dispatch(userLogoutSuccess);
    }
}