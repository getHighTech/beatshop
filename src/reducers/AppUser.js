import { PASS_ACCESS, DENY_ACCESS, EXPECT_CHECK_ACCESS } from "../actions/check_access";
import { MEMORY_PATH_BEFORE_LOGINED, EXPECT_SMS_CODE,
   GET_SMS_CODE_SUCCESS, GET_SMS_CODE_FAIL, EXPECT_USER_LOG_OUT, USER_LOG_OUT_SUCCESS} from "../actions/users";
import { USE_ONE_CONTACT } from "../actions/contacts";
import { REMOTE_METHOD_ERROR } from "../actions/error_fail";
import { USER_LOGIN_FAIL, EXPECT_USER_LOGIN, USER_LOGIN_SUCCESS } from '../actions/process/login';
import { ADD_PRODUCTS_TO_APP_CART } from "../actions/app_cart";
import { SET_APP_LAYOUT } from "../actions/app";
import { EXPECT_SYNC_REMOTE_USER, SYNC_REMOTE_USER_FAIL, SYNC_REMOTE_USER_SUCCESS } from "../actions/process/load_app"
import { CREAT_ONE_ORDER_SUCCESS, CREAT_ONE_ORDER_FAIL, EXPECT_CREATE_ONE_ORDER } from "../actions/orders";

export default function AppUser(state={
    roles: ["nobody"],
    accessable: false,
    accessableReason: "pass",
    denyCount: 0,
    urlBeforeLogined: "/",
    SMSCode: "",
    SMSCodeStatus: "untrigger",
    SMSCodeFailReason: "",
    loginStatus: "untrigger",
    checkAccessStatus: "untrigger",
    stampedToken: null, 
    userId: null,
    userInfoLoading: false,
    loginFailReason: "",
    syncRemote: "untrigger",
    syncRemoteFailReason: "",
    checkedProduct: null,
    contactIsLoaded: false,
    loginOut: "untrigger",
    user: {

    },
    currentContact: {},
   }, action){
      switch (action.type) {
       
          case EXPECT_CHECK_ACCESS:
          console.log(action.checkAccessAction);
            return Object.assign({}, state, {
              checkAccessStatus: "checking",
              accessable: false,
              checkAccessAction: action.checkAccessAction
            })
          case PASS_ACCESS:
            return Object.assign({}, state, {
              accessable: true,
              accessableReason: action.reason,
              checkAccessStatus: "untrigger",
              checkedProduct: action.checkedProduct,
            })
         
          case ADD_PRODUCTS_TO_APP_CART: 
            return Object.assign({}, state, {
              checkAccessStatus: "untrigger",
              accessable: false,
            })
          case EXPECT_CREATE_ONE_ORDER: 
            return Object.assign({}, state, {
              checkAccessAction: null
            })
          case CREAT_ONE_ORDER_SUCCESS:
            return Object.assign({}, state, {
              checkAccessAction: null
            })
          case CREAT_ONE_ORDER_FAIL: 
            return Object.assign({}, state, {
              checkAccessAction: null
            })
          
          case ADD_PRODUCTS_TO_APP_CART:
            return Object.assign({}, state, {
              checkAccessAction: null
            })

          case SET_APP_LAYOUT:
            return Object.assign({}, state, {
              checkAccessStatus: "untrigger",
              loginStatus: "untrigger",
              checkAccessAction: null
            })
          
          case DENY_ACCESS:
            let denyCount = state.denyCount;
            denyCount++;
            return Object.assign({}, state, {
              accessable: false,
              accessableReason: action.reason,
              denyCount,
              missingRole: action.missingRole,
              checkAccessStatus: "untrigger",
              
            })
          case EXPECT_SMS_CODE:
            return Object.assign({}, state, {
              SMSCode: "",
              SMSCodeStatus: "sending",
            })
          case GET_SMS_CODE_SUCCESS:
            return Object.assign({}, state, {
              SMSCode: action.code,
              SMSCodeStatus: "success",
              checkAccessAction: null
            });
          case GET_SMS_CODE_FAIL:
            return Object.assign({}, state, {
              SMSCode: action.code,
              SMSCodeStatus: "failed",
              SMSCodeFailReason: action.reason,
            });
         
          case MEMORY_PATH_BEFORE_LOGINED:
            console.log(action.path)
            return Object.assign({}, state, {
              urlBeforeLogined: action.path,
            })
          
          case EXPECT_USER_LOGIN:
            return Object.assign({}, state, {
              loginStatus: "loading",
            });

          case EXPECT_SYNC_REMOTE_USER: 
            return Object.assign({}, state, {
              syncRemote: "syncing",
              checkAccessAction: null
            })

          case SYNC_REMOTE_USER_FAIL:
            return Object.assign({}, state, {
              syncRemote: "fail",
              syncRemoteFailReason: action.reason,
              roles: ["nobody"]
            })

          case SYNC_REMOTE_USER_SUCCESS:
           
            return Object.assign({}, state, {
              syncRemote: "done",
              roles: action.msg.roles,
              loginStatus: "success",
              user: action.msg.user,
              userId: action.msg.userId,
              contactIsLoaded: action.msg.userContact? true: false,
              currentContact: action.msg.userContact
            })

          case USER_LOGIN_SUCCESS:
            
            return Object.assign({}, state, {
              loginStatus: "success",
              roles: action.msg.roles,
              stampedToken: action.msg.stampedToken, 
              userId: action.msg.userId,
              user: action.msg.user,
              contactIsLoaded: action.msg.userContact? true: false,              
              currentContact: action.msg.userContact
            });
          case USER_LOGIN_FAIL:
            return Object.assign({}, state, {
              loginStatus: "failed",
              loginFailReason: action.reason,
            });
          case USE_ONE_CONTACT:
            return Object.assign({}, state, {
              currentContact: action.contact,
              contactIsLoaded: true,
            })
          case EXPECT_USER_LOG_OUT:
            return Object.assign({}, state, {
              logOut: "loading",
              roles: ["nobody"],
              logOut: "done",
              stampedToken: null, 
              userId: null,
            })

          case USER_LOG_OUT_SUCCESS: 
            return Object.assign({}, state, {
              
            })
          default:
            return state;
      }
  }