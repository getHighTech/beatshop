import { CLOSE_APP_MSG_DONE, EXPECT_OPEN_APP_MSG, OPEN_APP_MSG_DONE } from "../actions/app_msg";
import { APP_SHOW_MSG_AND_INJECT_DATA_REACT, APP_SHOW_MSG_AND_READIRECT_PATH, APP_SHOW_MSG, APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH } from "../actions/app";

export default function AppMsg(state={
    open: false,
    content: "",
    actionText: "",
    href: "",
}, action){
    switch (action.type) {

        case CLOSE_APP_MSG_DONE:
            return Object.assign({}, state, {
                open: false
            });

        case APP_SHOW_MSG:
            return Object.assign({}, state, {
                ...action.msgParams,
                open: true,
            });
        
        case EXPECT_OPEN_APP_MSG:
            
            return Object.assign({}, state, {
                ...action.msgParams
            });
        case OPEN_APP_MSG_DONE:
            return Object.assign({}, state, {
                open: true,
            });
        case APP_SHOW_MSG_AND_INJECT_DATA_REACT:
            return Object.assign({}, state, {
                open: true,
                ...action.msgParams
            });
        case APP_SHOW_MSG_AND_READIRECT_PATH:
            return Object.assign({}, state, {
                open: true,
                ...action.msgParams
            });
        case APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH:
            return Object.assign({}, state, {
                open: true,
                ...action.msgParams
            });
                
        default:
            return state;
    }
}