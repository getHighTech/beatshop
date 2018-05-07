import createHistory from 'history/createHashHistory';
import { closeAppMsg, openAppMsg } from "./app_msg";
import { addProductsToAppCart } from './app_cart';

const history = createHistory();


export const SET_APP_CITY = "SET_APP_CITY";
export const SET_APP_LAYOUT = "SET_APP_LAYOUT";

//APP的主要行为分类为以下：以下行为用于间接调用action 方法，比如权限判断后操作
//路由跳转,带参数URL
export const APP_SHOW_MSG = "APP_SHOW_MSG";
//显示通知
export const APP_REDIRECT_PATH = "APP_REDIRECT_PATH";
//显示通知并且跳转路由，带参数URL, 以及通知的参数
export const APP_SHOW_MSG_AND_READIRECT_PATH = "APP_SHOW_MSG_AND_READIRECT_PATH";
//数据交互,参数为执行的函数名称，以及函数的参数...params，执行其他action
export const APP_INJECT_DATA_REACT = "APP_INJECT_DATA_REACT";
//通知并且数据交互,参数为执行的函数名称，以及函数的参数...params，, 以及通知的参数, 执行其他action
export const APP_SHOW_MSG_AND_INJECT_DATA_REACT = "APP_SHOW_MSG_AND_INJECT_DATA_REACT";
//通知并且数据交互,参数为执行的函数名称，以及函数的参数...params，, 以及通知的参数, 执行其他action, 并且跳转
export const APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH = "APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH";


export function switchActionNames(actionName){
    //此处转换和注册每个方法和类型， 方法只能有一个参数
    switch (actionName) {
        case "add_product_to_cart":
            return {
                action: addProductsToAppCart,
                type: APP_SHOW_MSG_AND_INJECT_DATA_REACT
            };
        
        default:
            return;
    }
}

function msgSwitchByReason(reason){
    switch (reason) {
        case "login_user MISSING":
            
            return {
                content: "需要先登录",
                actionText: "立即登录",
                href: "/login",
            }
        case "add_cart_success":
            return {
                content: "加入购物成功！",
                actionText: "立刻查看",
                href: "/cart"
            }
    
        default:
            break;
    }
}




export function appShowMsg(reason, msgSurvive){
    let msgParams = msgSwitchByReason(reason);
    return dispatch => {
        dispatch(closeAppMsg(msgSurvive));
        return dispatch({
            type: APP_SHOW_MSG,
            msgParams,
        })
    }
}

export function appRedirectPath(path){
    return dispatch => {
        history(path);
        return dispatch({
            type: APP_REDIRECT_PATH,
            path,
        });
    }
}


export function appShowMsgAndRedirectPath(path, reason, msgSurvive){
    let msgParams = msgSwitchByReason(reason)
    return dispatch => {
        dispatch(closeAppMsg(msgSurvive));
        history.push(path);
        dispatch({
            type: APP_SHOW_MSG_AND_READIRECT_PATH,
            msgParams
        })
    }

}


export function appInjectDataReact(actionName, actionParams){
    return dispatch => {
        dispatch(switchActionNames(actionName).actionName);
        return dispatch({
            type: APP_INJECT_DATA_REACT,
        })
    }
}


export function appShowMsgAndInjectDataReact(actionName, reason, msgSurvive=2350, actionParams){
    let msgParams = msgSwitchByReason(reason);
    return dispatch => {
        dispatch(switchActionNames(actionName).action(actionParams));        
        dispatch(closeAppMsg(msgSurvive));
        //传入存活时间
        dispatch({
            type: APP_SHOW_MSG_AND_INJECT_DATA_REACT,
            msgParams,
        })
    }
}

export function appShowMsgAndInjectDataReactWithPath(
    actionName, reason, msgSurvive=2350, actionParams, path="/"){
        let msgParams = msgSwitchByReason(reason)
    return dispatch => {
        dispatch(switchActionNames(actionName).actionName(actionParams));        
        dispatch(closeAppMsg(msgSurvive));
        history.push(path);
        //传入存活时间
        dispatch({
            type: APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH,
            msgParams,
        })
    }
}


export function setAppCity(city){
    return {
        type: SET_APP_CITY,
        city
    }
}

export function setAppLayout(
    layout ){
        return {
            type: SET_APP_LAYOUT,
            layout,
        }
    }
