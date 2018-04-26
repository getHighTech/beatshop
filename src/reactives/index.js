import { loadApp, userLogined, checkAccessable, checkUserPass } from "./loadApp";

let tempTimes = 0
let WholeInstance = null;
let store = null;
let history = null;
//保证一次只能执行一个变化
function registerReativeFunction(callName, keyVal="untrigger", inject={}){
    //此处只能接受一个redux的对象，保持简单化，
    //这样redux结构上需要抽象一个健去完成一次或者多次UI的变化
    //尽量不去修改UI变化单一条件逻辑而是去组织修改 redux的状态
    tempTimes++;
    
    callName(keyVal, WholeInstance, inject);
}
export default function reactives(instance){
    WholeInstance = instance;
    store = instance.props.store;
    history = instance.props.history;
    registerReativeFunction(userLogined, store.AppUser.loginStatus, {
        snackContent: "欢迎回来!--" + store.AppUser.user.username,
    });
    registerReativeFunction(checkUserPass, store.AppUser.accessable,{})
    tempTimes = 0;

}