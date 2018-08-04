import { 
    GET_USERINFO_SUCCESS 
     } from "../actions/wechat_user";

export default function WechatUser(state={
    profile: ""
    
}, action){
    switch(action.type){
        case  GET_USERINFO_SUCCESS:
            return Object.assign({}, state, {
                   profile: action.user
            })
        default:
            return state;
    }
}