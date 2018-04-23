import { EXPECT_CREATE_NEW_CONTACT, CREATE_NEW_CONTACT_FAIL, CREATE_NEW_CONTACT_SUCCESS } from "../actions/contacts";
import { CREAT_ONE_ORDER_FAIL } from "../actions/orders";

export default function UserContacts(state={
    userId: "",
    status: "untrigger",
    createStatus: "untrigger",
    editStatus: "untrigger",
    createFail: "noReason",
    contacts:[],
}, action){
    switch (action.type) {
        case EXPECT_CREATE_NEW_CONTACT:
            console.log("expect create cont");
            
            return Object.assign({}, state, {
                createStatus: "loading",
            });
        case CREATE_NEW_CONTACT_FAIL:
            return Object.assign({},state, {
                createStatus: "fail",
                createFail: action.reason
            })
        case CREATE_NEW_CONTACT_SUCCESS:
            return Object.assign({}, state, {
                createStatus: "success",
                contacts: [action.msg, ...state.contacts]
            })
    
        default:
            return state;
    }
}