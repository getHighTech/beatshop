import getRemoteMeteor from "../services/meteor/methods";
import { getStore } from "../tools/localStorage";

export const  EXPECT_LOAD_USER_BANK_CARDS = "LOAD_USER_BANK_CARDS";
export const  LOAD_USER_BANK_CARDS_FAIL = "LOAD_USER_BANK_CARDS_FAIL";
export const  LOAD_USER_BANK_CARDS_SUCCESS = "LOAD_USER_BANK_CARDS_SUCCESS";
export const  LOAD_USER_BANK_CARDS = "LOAD_USER_BANK_CARDS";

let sendTimer = 0;
export function expectLoadUserBankcards(){
    return {
        type: EXPECT_LOAD_USER_BANK_CARDS,
    }
}
export function loadUserBankcardsFail(reason){
    console.log(reason);
    
    return {
        type: LOAD_USER_BANK_CARDS_FAIL,
        reason
    }
}
export function loadUserBankcardsSuccess(msg){
    sendTimer = 0;
    console.log("bankcards", msg);
    
    return {
        type: LOAD_USER_BANK_CARDS_SUCCESS,
        msg
    }
}
export function loadUserBankcards(){
    return (dispatch, getState) => {
        sendTimer ++;
        if(sendTimer>1){
            return dispatch(loadUserBankcardsFail())
        }
        
        dispatch(expectLoadUserBankcards());
        return getRemoteMeteor(dispatch, getState, 
            "bankcards", "app.get.user.bankcards", 
            [getStore("userId")], 
            loadUserBankcardsSuccess, loadUserBankcardsFail)
    }

}


export const EXPECT_CREATE_NEW_BANKCARD ="EXPECT_CREATE_NEW_BANKCARD";
export const CREATE_NEW_BANKCARD_FAIL ="CREATE_NEW_BANKCARD_FAIL";
export const CREATE_NEW_BANKCARD_SUCCESS ="CREATE_NEW_BANKCARD_SUCCESS";

export function createNewBankCardFail(reason){
    return {
        type: CREATE_NEW_BANKCARD_FAIL,
        reason
    }
}
export function createNewBankCardSuccess(msg){
    return {
        type: CREATE_NEW_BANKCARD_SUCCESS,
        msg
    }
}
export function expectCreateNewBankCard(){
    return {
        type: EXPECT_CREATE_NEW_BANKCARD
    }
}
export function createNewBankCard(bankCardParams){
    return (dispatch, getState) => {
        dispatch(expectCreateNewBankCard());
        return getRemoteMeteor(dispatch, getState, 'bankcards', "app.created.bankcard", [])
    }
}