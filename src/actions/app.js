import createHistory from 'history/createHashHistory';
import { closeAppMsg } from "./app_msg";
import { addProductsToAppCart } from './app_cart';
import { createOneOrderByProduct, createOneOrder } from './orders';
import { userLogout } from './users';
import { createNewContact } from './contacts';
import { loadOneProduct } from './products';
import { userLogin } from './process/login';
import { createNewBankCard } from './bankcards';
import { withdrawMoney } from './balances.js'
import { removeStore } from '../tools/localStorage.js';
export const history = createHistory();


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
    //此处转换和注册每个方法和类型
    switch (actionName) {
        case "add_product_to_cart":
            return {
                action: addProductsToAppCart,
                type: APP_SHOW_MSG_AND_INJECT_DATA_REACT
            };
        case "create_one_order_by_product":
            return {
                action: createOneOrderByProduct,
                type: APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH
            };
        case "logout":
            return {
                action: userLogout,
                type: APP_SHOW_MSG_AND_INJECT_DATA_REACT
            }

        case "create_order_from_cart":
            return {
                action: createOneOrder,
                type: APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH
            }
        case 'save_user_contact':
            return {
                action: createNewContact,
            };

        case 'load_one_order':
            return {
                action: loadOneProduct
            }

        case 'user_mobile_login':
            return {
                action: (actionParams) => userLogin("mobileSMS", actionParams)
            }

        case 'save_user_bankcard':
            return {
                action: createNewBankCard
            }
        case 'revoke_withdraw':
            return {
                action: withdrawMoney
            }
        
      
        
        default:
            return;
    }
}

function msgSwitchByReason(reason, option={}){
    switch (reason) {
        case "login_user MISSING":
            
            return {
                content: "需要先登录",
                actionText: "",
                href: "#/login",
            };
        case "blackcard_holder MISSING":
            return {
                content: "需要黑卡会员权限，才能购买",
                actionText: "立即成为会员",
                href: "#/products_by_rolename/blackcard/"+option.name
            }
        case "add_cart_success":
            return {
                content: "加入购物成功！",
                actionText: "立刻查看",
                href: "#/cart"
            }

        case "logout_success":
            return {
                content: "您已安全登出",
                actionText: "",
                href: ""
            }

        case "generate_order":
            return {
                content: "正在生成订单",
                actionText: "",
                href: "#/"
            }

        case "save_contact_success":
            return {
                content: "新建地址成功"
            };

        case "update_order_success":
            return {
                content: "订单地址已经确认"
            }

        case "car_number_need":
            return {
                content: "您购买的黑卡,需要您选择带车牌号的地址"
            }

        case "mobile_login":
            return {
                content: "登录成功"
            }

        case "open_shop_fail":
            return {
                content: "若您需要开店， 需要先购买会员卡，一旦成为黑卡会员后可以立刻开店咯"
            }

        case "save_bankcard_success":
            return {
                content: "绑定银行卡成功"
            }
        case "revoke_withdraw_success":
            return {
                content: "提现发起成功"
            }
        case "too_monay_withdraw_allow":
            return {
                content: "提现金额大于可提现金额"
            }

        case "withdraw_mustbe_persent":
            return {
                content: "提现金额必须是100元的倍数"
            }
        case "withdraw_must":
            return {
                content: "必须填写正确金额"
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


export function appShowMsgAndRedirectPath(path, reason, msgSurvive, option){
    let msgParams = msgSwitchByReason(reason, option)
    return dispatch => {
        dispatch(closeAppMsg(msgSurvive));
        history.push(path);
        return dispatch({
            type: APP_SHOW_MSG_AND_READIRECT_PATH,
            msgParams
        })
    }

}


export function appInjectDataReact(actionName, actionParams={}){
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
        removeStore("Goto")
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
        dispatch(switchActionNames(actionName).action(actionParams));        
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
