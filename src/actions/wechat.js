import {setStore} from '../tools/localStorage.js';
export function isWeChat(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
}


export function logWechat(history){
  if(isWeChat()){
    setStore('pathBeforeLogin', history.location.pathname);

  }else{
    setStore('pathBeforeLogin', "/");

  }
  history.push('/wechat_checker/');

}
