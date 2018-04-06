import { setStore, getStore, removeStore } from '../config/mUtils.js';

export const MEMORY_PATH_BEFORE_LOGINED = "MEMORY_PATH_BEFORE_LOGINED";
export const EXPECT_LOGIN = "EXPECT_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOAD_UNLOGINED_USER_INFO = "LOAD_UNLOGINED_USER_INFO"
//硬编码过期时间
const EXPIRED_LOGIN_TIME = 1814400000;
export const EXPECT_LOGOUT = "EXPECT_LOGOUT";
export const EXPECT_LOGIN_FINISHED = "EXPECT_LOGIN_FINISHED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const EXPECT_LOGIN_SMS_CODE = "EXPECT_LOGIN_SMS_CODE";
export const GET_LOGIN_SMS_CODE_SUCCESS = "GET_LOGIN_SMS_CODE_SUCCESS";
export const GET_LOGIN_SMS_CODE_FAIL="GET_LOGIN_SMS_CODE_FAIL";
export const LOGIN_SMS_CODE_FEED_BACK="LOGIN_SMS_CODE_FEED_BACK";
export const VALID_TOKEN_FAIL="VALID_TOKEN_FAIL";

export const EXPECT_LOGINED_USER_INFO="EXPECT_LOGINED_USER_INFO";
export const LOAD_USER_INFO_SUCCESS="LOAD_USER_INFO_SUCCESS";

export const EXPECT_USER_CARD="EXPECT_USER_CARD"
export const LOAD_USER_CAED_SUCCESS="LOAD_USER_CAED_SUCCESS";
export const EXPECT_REG_SMS_CODE="EXPECT_REG_SMS_CODE";
export const GET_REG_SMS_CODE_FAIL="GET_REG_SMS_CODE_FAIL";
export const GET_REG_SMS_CODE_SUCCESS="GET_REG_SMS_CODE_SUCCESS";

export const SET_CURRENT_USER="SET_CURRENT_USER";
export const SET_CURRENT_USER_ERROR="SET_CURRENT_USER_ERROR";
export const SHOW_LOGIN_PAGE ="SHOW_LOGIN_PAGE";

const crypto = require('crypto');

//============== 用户的注册登录 ======================
export function showLoginPage(msg){
    return {
        type: SHOW_LOGIN_PAGE,
        msg
    }
}
export function memoryPathBeforeLogined(path){
    return {
        type: MEMORY_PATH_BEFORE_LOGINED,
        path,
    }
}
export function expectLoginSMSCode(){
    return {
        type: EXPECT_LOGIN_SMS_CODE,
    }
}

export function expectRegSMSCode(){
    return {
        type: EXPECT_REG_SMS_CODE,
    }
}

export function getRegSMSCode(mobile){

        return dispatch => {
            dispatch(expectRegSMSCode());
            let methodId = MClient.method('get.reg.phonesms', [mobile]);
            MClient.on("result", message => {
                if (message.id === methodId && !message.error) {
                    if(message.result === "MOBILE TAKEN"){
                        console.error(message.result);
                        return dispatch(getRegSMSCodeFail(message.result));
                    }else{
                    //加密验证码                        
                        let hash = crypto.createHash('sha256');
                        let cryptoCode = hash.update(message.result).digest('hex');
                        return dispatch(getRegSMSCodeSuccess(cryptoCode));
                    }
                }
                if(message.id === methodId && message.error){
                    console.error(message.error);
                    dispatch(getRegSMSCodeFail(message.error));
                }
            });
        }
}

export function getRegSMSCodeSuccess(code){
    return {
        type: GET_REG_SMS_CODE_SUCCESS,
        code,
    }
}

export function getRegSMSCodeFail(reason){
    return {
        type: GET_REG_SMS_CODE_FAIL,
        reason,
    }
}

export function getLoginSMSCodeSuccess(code){
    return {
        type: GET_LOGIN_SMS_CODE_SUCCESS,
        code
    }
}
export function getLoginSMSCodeFail(){
    return {
        type: GET_LOGIN_SMS_CODE_FAIL,
    }
}

export function loginSMSCodeFeedBack(feedBackTimes){
  return {
    type: LOGIN_SMS_CODE_FEED_BACK,
    feedBackTimes
  }
}

export function validTokenFail(){
    return {
        type: VALID_TOKEN_FAIL,
    }
}

export function validLocalToken(token){
   return dispatch => {
    if(!token){
      return  dispatch(validTokenFail)
    }else{
      return 
    }
    
   }
}

export function expectUserCard(){
    return {
        type: EXPECT_USER_CARD,
    }
}

export function loadUserCardSuccess(card){
    return {
        type: LOAD_USER_CAED_SUCCESS,
        card
    }
}

export function loadUserCard(userId, token){
    return dispatch => {
        dispatch(expectUserCard());
        dispatch(validLocalToken(token));
        let methodId = MClient.method("get.user.product.card", [userId, token]);
        MClient.on("result", message => {
            console.log(message);
            if (message.id === methodId && !message.error) {
               if(!message.result.error){
                    if(message.result === "ACCESS DENY"){
                        dispatch(validTokenFail(token));
                    }else{
                        dispatch(loadUserCardSuccess(message.result));
                    }
               }
                
            }
            if(message.id === methodId && message.error){
                dispatch(validTokenFail(token));
            }
        });
        
    }
}

export function getLoginSMSCode(mobile){
    return dispatch => {
        dispatch(expectLoginSMSCode());
        dispatch(loginSMSCodeFeedBack(1));
        let methodId = MClient.method('get.phonesms', [mobile]);
        MClient.on("result", message => {
            if (message.id === methodId && !message.error) {
                //加密验证码
                let hash = crypto.createHash('sha256');
                let cryptoCode = hash.update(message.result).digest('hex');
                dispatch(getLoginSMSCodeSuccess(cryptoCode));
                dispatch(loginSMSCodeFeedBack(2));
                
            }
            if(message.id === methodId && message.error){
                dispatch(getLoginSMSCodeFail());
                dispatch(loginSMSCodeFeedBack(2));    
            }
        });
    }
}

export function expectLogin(){
    return {
        type: EXPECT_LOGIN,
    }
}

export function expectLoginFinished(){
    return {
        type: EXPECT_LOGIN_FINISHED
    }
}

export function login(loginType, loginParams){
    return dispatch => {
        dispatch(expectLogin());
        switch (loginType) {
            case "mobileSMS":
                dispatch(mobileLogin(loginParams));
                break;
            case "password":
                dispatch(passwordLogin(loginParams));
                break;
            default:
                break;
        }
    }
}

export function mobileLogin(loginParams){
    console.log(loginParams);
    return dispatch=>{
        let methodId = MClient.method('user.login.from.fancyshop', ['mobileSMS', loginParams]);
        MClient.on("result", message => {
          if(message.id === methodId && !message.error){
              if(message.result === "USER NOT FOUND"){
                  let reason = "手机号不存在";
                  return dispatch(loginFail(reason));
              }
              if(message.result.error){
                  if(message.result.error.reason === "Incorrect password"){
                      let reason = "密码错误！";
                      return dispatch(loginFail(reason));
                  }
              }else{
                  return dispatch(loginSuccess(message.result.stampedToken, message.result.userId));
              }
          }
          if(message.id===methodId && message.error){
              console.error("无法链接服务器")
              return "error";
          }
        })
    }
}

export function passwordLogin(loginParams){

    return dispatch=>{
      let methodId = MClient.method('user.login.from.fancyshop', ['password', loginParams]);
      MClient.on("result", message => {
        if(message.id === methodId && !message.error){
            if(message.result === "USER NOT FOUND"){
                let reason = "用户名或手机号不存在";
                return dispatch(loginFail(reason));
            }
            if(message.result.error){
                if(message.result.error.reason === "Incorrect password"){
                    let reason = "密码错误！";
                    return dispatch(loginFail(reason));
                }
            }else{
                return dispatch(loginSuccess(message.result.stampedToken, message.result.userId));
            }
        }
        if(message.id===methodId && message.error){
            console.error("无法链接服务器")
            return "error";
        }
      })
  }
}

export function loginFail(reason){
    return {
        type: LOGIN_FAIL,
        reason,
    }
}

export function loginSuccess(stampedToken, userId){
    let expiredLoginTime = stampedToken.when.$date+EXPIRED_LOGIN_TIME;
    setStore("stampedToken", stampedToken);
    setStore("stampedTokenExpired", expiredLoginTime);
    setStore("userId", userId);
    return {
        type: LOGIN_SUCCESS,
        stampedToken,
        userId,
        expiredLoginTime
    }
}

export function registerLogin(regParams){

}
export function expectLogout(){
    return {
        type: EXPECT_LOGOUT,
    }
}
export function logout(){
    return dispatch => {
        console.log(`退出登陆`)
        dispatch(expectLogout());
        let methodId = MClient.method('logout');
        console.log(`退出登陆id:`+ methodId)
        MClient.on('result', message=>{
            if(message.id === methodId && !message.error){
                console.log(`执行退出登陆`)
                dispatch(logoutSuccess());
            }else{
                console.log(`退出登陆失败`)
                console.error(message.error);
            }
        });
    }
}

export function logoutSuccess(){
    removeStore("stampedToken");
    removeStore("stampedTokenExpired");
    removeStore("userId");
    return {
        type: LOGOUT_SUCCESS,
    }
}

//=================================================
//============ 用户权限管理 ==========================
export function checkUserAccess(userId){
  
}

export function refuseUserAccess(userId){

}

export function acceptUserAccess(userId){
  
}

//===================================================

//===============获取登录用户的信息==========================
export function expectLoginedUserInfo(){
    return {
        type: EXPECT_LOGINED_USER_INFO,
    }
}

export function loadUnloginedUserInfo(){
    return {
        type: LOAD_UNLOGINED_USER_INFO,
    }
}

export function loadUserInfoSuccess(user, userId, stampedToken, expiredLoginTime){
    return {
        type: LOAD_USER_INFO_SUCCESS,
        user
    }
}
export function loadLoginedUserInfo(){
    return dispatch => {
        dispatch(expectLoginedUserInfo());
        let userId = getStore("userId");
        let stampedToken = getStore("stampedToken");
        let expiredLoginTime = getStore("stampedTokenExpired");
        let nowTime = new Date();
        nowTime = nowTime.getTime();
        if(!userId || !stampedToken || !expiredLoginTime ){
            return dispatch(loadUnloginedUserInfo());
        }else{
            let methodId = MClient.method('user.logined', [userId, JSON.parse(stampedToken)]);
            MClient.on('result', message=>{
                if(message.id === methodId && !message.error){
                    if(message.result !== null){
                        return dispatch(loadUserInfoSuccess(message.result, userId, stampedToken, expiredLoginTime));
                    }else{
                        return  dispatch(loadUnloginedUserInfo());
                    }
                }
            });
        }
        if(nowTime >= expiredLoginTime){
           return dispatch(loadUnloginedUserInfo());
        }
       
    }
   
}
//=========================================================
//===============载入用户信息==========================================
export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    } 
}
export function expectUserById(id){

}
export function loadUserById(id){

}
export function expectUsersAsFollows(){

}
export function getUserbyId(id){
    return dispatch => {
        const methodId = MClient.method("user.findUserById",[id])
        MClient.on('result', message => {
            if (message.id === methodId && !message.error &&  message.result.formMethod ==='user.findUserById'){
                dispatch(setCurrentUser(message.result))
                setStore('userInfo',message.result)
            }
            // if(message.result == undefined){
            //     return
            // }else{
            //     console.log(message.result)
            //     dispatch(setCurrentUser(message.result))
            // }
            // 
            // if(message.id === methodId && !message.error){
            //   console.log(message.result)
            //   console.log("获取到了当前用户对象")
            // }else{
            //     console.log(message.error)
            //     console.log("发生错误")
            // }
          })
    }
}
export function getUserbyName(username){
    return dispatch => {
        MClient.method("user.findUserByName",[username])
        MClient.on('result', message => {
            if(message.result === undefined){
                return
            }else{
                dispatch(setCurrentUser(message.result))
            }
          })
    }
}
export function updateNickname(value){
    return dispatch => {
        let userId = getStore("userId");
        MClient.method('user.changeNickname',[userId,value])
        MClient.on('result', message => {
            console.log(message);
            if(message.result!== undefined){
                console.log(message.result);
                dispatch(setCurrentUser(message.result))
            }
          })
    }
}
export function updateDataAutograph(value){
    return dispatch => {
        let userId = getStore("userId");
        MClient.method("user.changeDataAutograph",[userId,value])
        MClient.on('result', message => {
            if(message.result!== undefined){
                dispatch(setCurrentUser(message.result))
            }
          })
    }
}
export function updateSex(value){
    return dispatch => {
        let userId = getStore("userId");
        MClient.method('user.changeSex',[userId,value])
        MClient.on('result', message => {
            if(message.result!== undefined){
                dispatch(setCurrentUser(message.result))
            }
          })
    }
}
export function updateArea(value){
    return dispatch => {
        let userId = getStore("userId");
        MClient.method('user.changeArea',[userId,value])
        MClient.on('result', message => {
            if(message.result!== undefined){
                dispatch(setCurrentUser(message.result))
            }
          })
    }
}
export function updateBirthday(value){
    return dispatch => {
        let userId = getStore("userId");
        MClient.method('user.changeBirthday',[userId,value])
        MClient.on('result', message => {
            if(message.result!== undefined){
                dispatch(setCurrentUser(message.result))
            }
          })
    }
}
// export function getUserbyIdName(username){
//     return dispatch => {

//     }
// }
//=======================================


