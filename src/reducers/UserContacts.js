import { EXPECT_CREATE_NEW_CONTACT, CREATE_NEW_CONTACT_FAIL, CREATE_NEW_CONTACT_SUCCESS, GET_USER_CONTACTS_SUCCESS } from "../actions/contacts";

export default function UserContacts(state={
    userId: "",
    status: "untrigger",
    createStatus: "untrigger",
    editStatus: "untrigger",
    createFail: "noReason",
    contacts:[],
    contactChecks: {

    }
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
            let contacts = state.contacts;
            contacts.push(action.msg);
            return Object.assign({}, state, {
                createStatus: "success",
                contacts
            });
        case GET_USER_CONTACTS_SUCCESS:
            return Object.assign({}, state, {
                contacts: action.msg
            });
    
        default:
            return state;
    }
}