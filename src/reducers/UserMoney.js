import { LOAD_MONEY_PAGE_SUCCESS } from "../actions/balances";

export default function UserMoney(state={
    loading: false,
    balance: {},
    balance_incomes: [],
    balance_charges: []
}, action){
    switch(action.type){
        case LOAD_MONEY_PAGE_SUCCESS:
       
        
        return Object.assign({}, state, {
            loading: true,
            balance: action.msg.balance,
            balance_incomes: action.msg.balance_incomes,
            balance_charges: action.msg.balance_charges
        });
        default:
            return state
    }
}