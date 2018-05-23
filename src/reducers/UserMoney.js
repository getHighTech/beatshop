import { LOAD_MONEY_PAGE_SUCCESS, GET_INCOMES_WITHIN_TIME_SUCCESS, EXPECT_GET_INCOMES_WITHIN_TIME } from "../actions/balances";

export default function UserMoney(state={
    loading: false,
    balance: {},
    balance_incomes: [],
    balance_charges: [],
    todayTotalAmount: NaN,
    weekTotalAmount: NaN,
    monthTotalAmount: NaN,
    staticDone: false,
    unit: [],
}, action){
    switch(action.type){
        case LOAD_MONEY_PAGE_SUCCESS:
            return Object.assign({}, state, {
                loading: true,
                balance: action.msg.balance,
                balance_incomes: action.msg.balance_incomes,
                balance_charges: action.msg.balance_charges
            });
        case EXPECT_GET_INCOMES_WITHIN_TIME:
            return Object.assign({}, state, {
                unit: action.unit
            })
        case GET_INCOMES_WITHIN_TIME_SUCCESS: 
            let unitAmount = action.msg.totalAmount;
            let unit = action.msg.unit;
            if(state.todayTotalAmount && state.weekTotalAmount && state.monthTotalAmount){
                
                return Object.assign({}, state, {
                    staticDone: true
                })
            }
            
            if(unit === "days"){
                return Object.assign({}, state, {
                    todayTotalAmount: unitAmount
                })
            }
            if(unit === "weeks"){
                return Object.assign({}, state, {
                    weekTotalAmount: unitAmount
                })
            }
            if(unit === "months"){
                return Object.assign({}, state, {
                    monthTotalAmount: unitAmount,
                    staticDone:true
                })
            }
        default:
            return state
    }
}