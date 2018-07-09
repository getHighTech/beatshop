import { 
    EXPECT_LOAD_USER_BANK_CARDS,
    LOAD_USER_BANK_CARDS_SUCCESS ,
    EXPECT_DELETE_BANKCARD,
    DELETE_BANKCARD_FAIL,
    DELETE_BANKCARD_SUCCESS,
    } from "../actions/bankcards";
import { APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH } from "../actions/app";

export default function UserBankcards(
    state={
        cards: "unloaded",
        loading: false,
    },
    action
){
    switch (action.type) {
        case EXPECT_LOAD_USER_BANK_CARDS:
            
            return Object.assign({}, state, {
                cards: "unloaded"
            });
        case APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH:
            return Object.assign({}, state, {
                cards: "unloaded"
            });

        case LOAD_USER_BANK_CARDS_SUCCESS:
            return Object.assign({}, state, {
                cards: action.msg,
            })
        case DELETE_BANKCARD_SUCCESS: 
        return Object.assign({}, state, {
            cards: action.msg,
        })
    
        default:
            return state;
    }


}