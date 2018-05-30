import { EXPECT_LOAD_USER_BANK_CARDS, LOAD_USER_BANK_CARDS_SUCCESS } from "../actions/bankcards";

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

        case LOAD_USER_BANK_CARDS_SUCCESS:
            return Object.assign({}, state, {
                cards: action.msg,
            })
    
        default:
            return state;
    }


}