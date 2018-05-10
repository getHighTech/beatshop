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


export const EXPECT_ADD_BANKCARD = 'EXPECT_ADD_BANKCARD'
export const ADD_BANKCARD_SUCCESS = 'ADD_BANKCARD_SUCCESS'
export const ADD_BANKCARD_FAIL = 'ADD_BANKCARD_FAIL'

export function expectAddBankcard(){
    return {
        type:EXPECT_ADD_BANKCARD
    }
}

export function addBankcardSuccess(msg){
    return {
        type: ADD_BANKCARD_SUCCESS,
        msg
    }
}
export function addBankcardFail(reason){
    return {
        type: ADD_BANKCARD_SUCCESS,
        reason
    }
}

export function addBankcard(userId,realName,accountNumber,bankAddress){
    return (dispatch,getState) => {
        dispatch(expectAddBankcard())
        return getRemoteMeteor(dispatch,getState,'bankcards','app.user.create.bankcard',[userId,realName,accountNumber,bankAddress],addBankcardSuccess,addBankcardFail)
    }
}



export const EXPECT_GET_BANKCARD_LIST = 'EXPECT_GET_BANKCARD_LIST'
export const GET_BANKCARD_LIST_SUCCESS = 'GET_BANKCARD_LIST_SUCCESS'
export const GET_BANKCARD_LIST_FAIL = 'GET_BANKCARD_LIST_FAIL'

export function expectGetBankcardList(){
    return {
        type:EXPECT_GET_BANKCARD_LIST
    }
}

export function getBankcardListSuccess(msg){
    return {
        type: GET_BANKCARD_LIST_SUCCESS,
        msg
    }
}
export function getBankcardListFail(reason){
    return {
        type: GET_BANKCARD_LIST_FAIL,
        reason
    }
}

export function getBankcardList(userId){
    return (dispatch,getState) => {
        dispatch(expectGetBankcardList())
        return getRemoteMeteor(dispatch,getState,'bankcards','app.get.user.bankcards',[userId],getBankcardListSuccess,getBankcardListFail)
    }
}


export const EXPECT_REMOVE_BANKCARD = 'EXPECT_REMOVE_BANKCARD'
export const REMOVE_BANKCARD_SUCCESS = 'REMOVE_BANKCARD_SUCCESS'
export const REMOVE_BANKCARD_FAIL = 'REMOVE_BANKCARD_FAIL'

export function expectRemoveBankcard(){
    return {
        type:EXPECT_REMOVE_BANKCARD
    }
}

export function removeBankcardSuccess(msg){
    return {
        type: REMOVE_BANKCARD_SUCCESS,
        msg
    }
}
export function removeBankcardFail(reason){
    return {
        type: REMOVE_BANKCARD_FAIL,
        reason
    }
}

export function removeBankcard(bankcardId){
    return (dispatch,getState) => {
        dispatch(expectRemoveBankcard())
        return getRemoteMeteor(dispatch,getState,'bankcards','app.user.remove.bankcards',[bankcardId],removeBankcardSuccess,removeBankcardFail)
    }
}