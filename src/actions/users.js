import { setStore, getStore, removeStore } from '../tools/localStorage';
import app from '../config/app.json'
import getRemoteMeteor from '../services/meteor/methods';
import { dealWithError } from "./error_fail";

export const MEMORY_PATH_BEFORE_LOGINED = "MEMORY_PATH_BEFORE_LOGINED";
export const EXPECT_SMS_CODE = "EXPECT_SMS_CODE";
export const GET_SMS_CODE_SUCCESS = "GET_LOGIN_SMS_CODE_SUCCESS";
export const GET_SMS_CODE_FAIL="GET_LOGIN_SMS_CODE_FAIL";

export const EXPECT_LOAD_DEFAULT_CONTACT = "EXPECT_LOAD_DEFAULT_CONTACT";
export const LOAD_DEFAULT_CONTACT_FAIL = "LOAD_DEFAULT_CONTACT_FAIL";
export const LOAD_DEFAULT_CONTACT_SUCCESS = "LOAD_DEFAULT_CONTACT_SUCCESS";

const crypto = require('crypto');

//============== 用户的注册登录 ======================

export function memoryPathBeforeLogined(path){
    return {
        type: MEMORY_PATH_BEFORE_LOGINED,
        path,
    }
}


export function expectSMSCode(){
    return {
        type: EXPECT_SMS_CODE,

    }
}

export function getSMSCodeSuccess(code){
    let hash = crypto.createHash('sha256');
    let cryptoCode = hash.update(code).digest('hex');
    return {
        type: GET_SMS_CODE_SUCCESS,
        code: cryptoCode
    }
}

export function getSMSCodeFail(reason){
    return {
        type: GET_SMS_CODE_FAIL,
        reason,
    }
}

export function getSMSCode(mobile){
    return (dispatch, getState) => {
        dispatch(expectSMSCode());
        return getRemoteMeteor(dispatch, getState, "SMS", 'app.get.phonesms',[mobile, app.name], getSMSCodeSuccess, dealWithError);        
    }
}

export function expectLoadDefaultContact(){
    return {
        type: EXPECT_LOAD_DEFAULT_CONTACT,
    }
}

export function loadDefaultContact(){
    return (dispatch, getState) => {
        let loginToken = getStore("stampedToken");
        let userId = getStore("userId");
        dispatch(expectLoadDefaultContact);
        return getRemoteMeteor(
            dispatch, getState, "user_contact", "app.get.user.default.contact", 
            [loginToken, app.name, userId],
            loadDefaultContactSuccess, loadDefaultContactFail
        )
    }
}

export function loadDefaultContactFail(reason){
    return {
        type: LOAD_DEFAULT_CONTACT_FAIL,
        reason
    }
}

export function loadDefaultContactSuccess(msg){
    return {
        type: LOAD_DEFAULT_CONTACT_SUCCESS,
        msg
    }
}



export const EXPECT_USER_LOG_OUT = "EXPECT_USER_LOG_OUT";
export const USER_LOG_OUT_FAIL = "USER_LOG_OUT_FAIL"
export const USER_LOG_OUT_SUCCESS = "USER_LOG_OUT_SUCCESS";
export const USER_LOG_OUT = "USER_LOG_OUT";



export function expectUserLogout(){
    return {
        type: EXPECT_USER_LOG_OUT,
    }
}
export function userLogoutFail(){
    return {
        type: USER_LOG_OUT_FAIL
    }
}
export function userLogoutSuccess(){
    return {
        type: USER_LOG_OUT_SUCCESS
    }
}
export function userLogout(){
    return dispatch => {
        dispatch(expectUserLogout());
        removeStore("expiredTime");
        removeStore("stampedToken");
        removeStore("userId");
        dispatch(userLogoutSuccess());
    }
}











