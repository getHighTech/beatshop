import { LOAD_MONEY_PAGE_SUCCESS,GET_INCOMES_LIMIT, GET_INCOMES_WITHIN_TIME_SUCCESS, EXPECT_GET_INCOMES_WITHIN_TIME, GET_INCOMES_LIMIT_SUCCESS, EXPECT_GET_INCOMES_LIMIT } from "../actions/balances";

export default function UserMoney(state={
    loading: false,
    balance: {},
    balance_incomes: [],
    balance_charges: [],
    todayTotalAmount: NaN,
    weekTotalAmount: NaN,
    monthTotalAmount: NaN,
    staticDone: false,
    agencies: [],
    unit: [],
    loadingMore: false,
}, action){
    switch(action.type){
        case LOAD_MONEY_PAGE_SUCCESS:
            return Object.assign({}, state, {
                loading: true,
                balance: action.msg.balance,
                balance_incomes: action.msg.balance_incomes,
                balance_charges: action.msg.balance_charges,
                agencies: action.msg.agencies,
                users: action.msg.users
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
        case EXPECT_GET_INCOMES_LIMIT:
            return Object.assign({}, state, {
                loadingMore: true
            })
        case GET_INCOMES_LIMIT_SUCCESS:
            let incomes = state.balance_incomes;
            incomes = incomes.concat(action.msg.incomes);
            let users = state.users;
            users = users.concat(action.msg.users);
            return Object.assign({}, state, {
                balance_incomes: incomes,
                users,
                loadingMore: false,
            })

        default:
            return state;
    }
}