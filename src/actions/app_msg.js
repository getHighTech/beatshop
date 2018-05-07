export const EXPECT_CLOSE_APP_MSG = "EXPECT_CLOSE_APP_MSG";
export const CLOSE_APP_MSG = "CLOSE_APP_MSG";
export const CLOSE_APP_MSG_DONE = "CLOSE_APP_MSG_DONE";
export const OPEN_APP_MSG = "OPEN_APP_MSG";
export const OPEN_APP_MSG_DONE = "OPEN_APP_MSG_DONE";
export const EXPECT_OPEN_APP_MSG = "EXPECT_OPEN_APP_MSG";

export function expectCloseMsg(){
    return {
        type: EXPECT_CLOSE_APP_MSG,
    }
}
export function closeAppMsg(timer=3000){

    return (dispatch) => {
        dispatch(expectCloseMsg());
        setTimeout(() => {
            dispatch(closeAppMsgDone());
        }, timer);
    }
}

export function closeAppMsgDone(){
    return {
        type: CLOSE_APP_MSG_DONE
    }
}



export function expectOpenAppMsg(msgParams){
    return {
        type: EXPECT_OPEN_APP_MSG,
        msgParams
    }
}

export function openAppMsg(reason, msgSurvive=2000){
    return dispatch => {
        switch (reason) {
            case "NEED TO LOGIN":
                 dispatch(expectOpenAppMsg({
                    open: false,
                    content: "需要先登录",
                    actionText: "",
                    href: "",
                }));
                return dispatch(openAppMsgDone(msgSurvive));
            case "login_user MISSING":
                 dispatch(expectOpenAppMsg({
                    open: false,
                    content: "",
                    actionText: "",
                    href: "",
                }));
                return dispatch(openAppMsgDone(msgSurvive));
                
            case "LOGOUT":
                dispatch(expectOpenAppMsg({
                    open: false,
                    content: "您已经安全退出了",
                    actionText: "",
                    href: "",
                }));
                return dispatch(openAppMsgDone(msgSurvive));
            default:
                return false;
        }
        
        dispatch(openAppMsgDone(msgSurvive));
    }
   
}



export function openAppMsgDone(msgSurvive){
    return dispatch => {
        dispatch(closeAppMsg(msgSurvive));
        return dispatch({
            type: OPEN_APP_MSG_DONE
        })
    }
    
}
