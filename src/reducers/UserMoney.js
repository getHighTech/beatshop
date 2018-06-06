import { LOAD_MONEY_PAGE_SUCCESS,GET_INCOMES_LIMIT, GET_INCOMES_WITHIN_TIME_SUCCESS, EXPECT_GET_INCOMES_WITHIN_TIME, GET_INCOMES_LIMIT_SUCCESS, EXPECT_GET_INCOMES_LIMIT, LOAD_MONEY_PAGE_FAIL, GET_INCOMES_WITHIN_TIME_FAIL, GET_INCOMES_LIMIT_FAIL, EXPECT_LOAD_MONEY_PAGE } from "../actions/balances";
import { APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH } from '../actions/app.js'

export default function UserMoney(state={
    loading: false,
    balance: {},
    balance_incomes: "unloaded",
    balance_charges: "unloaded",
    todayTotalAmount: NaN,
    weekTotalAmount: NaN,
    monthTotalAmount: NaN,
    staticDone: false,
    agencies: [],
    unit: [],
    loadingMore: false,
}, action){
    switch(action.type){
        case APP_SHOW_MSG_AND_INJECT_DATA_REACT_WITH_PATH:
            return Object.assign({}, state, {
                    loading: false,
                    todayTotalAmount: NaN,
                    balance_incomes: "unloaded",
                    weekTotalAmount: NaN,
                    monthTotalAmount: NaN,
                    staticDone: false,
                    loadingMore: false,
            })
        case LOAD_MONEY_PAGE_SUCCESS:
            return Object.assign({}, state, {
                loading: true,
                balance: action.msg.balance,
                balance_incomes: action.msg.balance_incomes,
                balance_charges: action.msg.balance_charges,
                agencies: action.msg.agencies,
                users: action.msg.users,
                staticDone: true
            });
        case EXPECT_LOAD_MONEY_PAGE:
            return Object.assign({}, state, {
                    loading: false,
                    balance: {},
                    balance_incomes: "unloaded",
                    balance_charges: "unloaded",
                    todayTotalAmount: NaN,
                    weekTotalAmount: NaN,
                    monthTotalAmount: NaN,
                    staticDone: false,
                    agencies: [],
                    unit: [],
                    loadingMore: false,
            })
        case LOAD_MONEY_PAGE_FAIL:
            return Object.assign({}, state, {
                staticDone: true,
            })
        case EXPECT_GET_INCOMES_WITHIN_TIME:
            return Object.assign({}, state, {
                unit: action.unit,
                staticDone: false,
            })
        case GET_INCOMES_WITHIN_TIME_FAIL:
            return Object.assign({}, state, {
                staticDone: true,
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
                    todayTotalAmount: unitAmount,
                    staticDone: true
                })
            }
            if(unit === "weeks"){
                return Object.assign({}, state, {
                    weekTotalAmount: unitAmount,
                    staticDone: true
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
                loadingMore: true,
                staticDone: false,
            })
        case GET_INCOMES_LIMIT_FAIL:
            return Object.assign({}, state, {
                loadingMore: false,
                staticDone: true,
            })
        case GET_INCOMES_LIMIT_SUCCESS:
            let incomes = state.balance_incomes;
            incomes = incomes.concat(action.msg.incomes);
            let users = state.users;
            users = users.concat(action.msg.users);
            return Object.assign({}, state, {
                balance_incomes: incomes,
                users,
                staticDone: false,
                loadingMore: false,
            })

        default:
            return state;
    }
}