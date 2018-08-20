import URI from 'urijs';
import axios from 'axios';
import { setStore } from '../tools/localStorage.js'
export const generateGetCodeUrl = (redirectURL) =>  {
    return new URI("https://open.weixin.qq.com/connect/oauth2/authorize")
        .addQuery("appid", "wx0564668ed5671740")
        .addQuery("redirect_uri", redirectURL)
        .addQuery("response_type", "code")
        .addQuery("scope", "snsapi_userinfo")
        .addQuery("response_type", "code")
        .hash("wechat_redirect")
        .toString();
};

export const  wechatAuth = () =>{
    const uri = new URI(document.location.href);
    const query = uri.query(true);
    const {code} = query;
    if(code) {
       axios.get(`http://test1.10000.cards.cn//api/info?code=${code}`)
            .then((res)=>{
               setStore("WechatProfile",res.data)
            })
    } else {
        document.location = generateGetCodeUrl(document.location.href);
    }

}