import getRemoteMeteor from "../../services/meteor/methods";
import { dealWithError } from "../error_fail";
import { getAddress } from "../../services/http/amap";
import { getStore, removeStore } from "../../tools/localStorage";
import { syncRemoteCartlocal } from "../app_cart";

export const  EXPECT_LOAD_APP = "EXPECT_LOAD_APP";
export const LOAD_APP_SUCCESS = "LOAD_APP_SUCCESS";
export const SYNC_REMOTE_USER_FAIL = "SYNC_REMOTE_USER_FAIL";
export const EXPECT_SYNC_REMOTE_USER = "EXPECT_SYNC_REMOTE_USER";
export const EXPECT_LOAD_GEO_ADDRESS = "EXPECT_LOAD_GEO_ADDRESS";
export const LOAD_GEO_ADDRESS_SUCCESS = "LOAD_GEO_ADDRESS_SUCCESS";
export const SYNC_REMOTE_USER_SUCCESS = "SYNC_REMOTE_USER_SUCCESS";
export function expectLoadApp(){
    return {
        type: EXPECT_LOAD_APP
    }
}

export function loadAppSuccess(appInfo){
    return {
        type: LOAD_APP_SUCCESS,
        appInfo,
    }
}

export function loadApp(){
    return (dispatch, getState) => {
        dispatch(expectLoadApp());
        return getRemoteMeteor(
            dispatch,
            getState,
            'app',
            'app.load.app.info',
            [],
            loadAppSuccess,
            dealWithError,

        );
    }
}

export function syncRemoteUserFail(reason){
    
    return {
        type: SYNC_REMOTE_USER_FAIL,
        reason
    }
}

export function syncRemoteUserSuccess(msg){
    
    return {
        type: SYNC_REMOTE_USER_SUCCESS,
        msg
    }
}
export function expectSyncRemoteUser(){
    
    return {
        type: EXPECT_SYNC_REMOTE_USER
    }
}
export function syncRemoteUser(){
    
    let userId = getStore("userId");
    let stampedToken = getStore("stampedToken")
    let expiredTime = getStore("expiredTime");
    let cartId = getStore("cartId");
    return (dispatch, getState) => {
        if(cartId){
            dispatch(syncRemoteCartlocal(userId, cartId));
        }
        if(!userId){
            dispatch(syncRemoteUserFail("LOCAL USERID NOT FOUND"));
        }
        if(!stampedToken){
            dispatch(syncRemoteUserFail("LOCAL STAMPEDTOKEN NOT FOUND"));
        }
        if(!expiredTime){
            dispatch(syncRemoteUserFail("LOCAL EXPIREDTIME NOT FOUND"));
        }
        let newDate = new Date();
        if(expiredTime < newDate.getTime()){
            removeStore("userId");
            removeStore("stampedToken");
            removeStore("expiredTime");
            dispatch(syncRemoteUserFail("TOKEN EXPIRED"));
        }
        dispatch(expectSyncRemoteUser());
       
        return getRemoteMeteor(dispatch, getState, "users", "app.syncRemote.user",[userId], syncRemoteUserSuccess, syncRemoteUserFail)
    }
}




export function expectLoadGeoAddress(){
    return {
        type: EXPECT_LOAD_GEO_ADDRESS
    }
}

export function loadGeoAddressSuccess(amap){
    return {
        type: LOAD_GEO_ADDRESS_SUCCESS,
        amap
    }
}

export function loadGeoAddress(){
    return (dispatch, getState) =>{
        dispatch(expectLoadGeoAddress());
        getAddress(dispatch, getState);
    }
}