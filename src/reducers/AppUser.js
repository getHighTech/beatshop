import { EXPECT_USER_REG, USER_REG_SUCCESS, USER_REG_FAIL, OPEN_USER_REG_WIN } from "../actions/users";

export default function AppUser(state={
    id: '',
    loading: false,
    username: "",
    regFailReason: "",
    openRegWin: false,
    balance: {
        incomes: [],
        charges: [],
        amount: {
            cny: 0,
            ftc: 0,
        }
    },
  }, action){
      switch (action.type) {
        case OPEN_USER_REG_WIN:
            return Object.assign({}, state, {
                loading: false,
                regFailReason: "",
                id: "",
                openRegWin: true,
            })
        case EXPECT_USER_REG:
            return Object.assign({}, state, {
                loading: true,
                regFailReason: "",
                id: "",
                openRegWin: true,
            })
        case USER_REG_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                id: action.userId,
                regFailReason: ""
            })
        case USER_REG_FAIL:
            return Object.assign({}, state, {
                loading: false,
                regFailReason: action.reson,
            })
          default:
            return state;
      }
  }