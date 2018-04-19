import getRemoteMeteor from "../services/meteor/methods";

export const EXPECT_CREATE_NEW_CONTACT = "EXPECT_CREATE_NEW_CONTACT";
export const CREATE_NEW_CONTACT = "CREATE_NEW_CONTACT";
export const CREATE_NEW_CONTACT_FAIL = "CREATE_NEW_CONTACT_FAIL";
export const CREATE_NEW_CONTACT_SUCCESS = "CREATE_NEW_CONTACT_SUCCESS";


export function expectCreateNewContact(){
    return {
        type: EXPECT_CREATE_NEW_CONTACT
    }
}

export function createNewContact(contact){
    return (dispatch, getState) => {
        dispatch(expectCreateNewContact);
        return getRemoteMeteor(
            dispatch,
            getState, 
            "orders", 
            "app.create.user.contact", 
            [getState().AppUser.userId, contact],
            createNewContactSuccess,
            createNewContactFail,
        )
    }
}

export function createNewContactFail(reason){
    return {
        type: CREATE_NEW_CONTACT_FAIL,
        reason
    }
}

export function createNewContactSuccess(msg){
    return {
        type: CREATE_NEW_CONTACT_SUCCESS,
        msg
    }
}


export const DELETE_USER_CONTACT = "DELETE_USER_CONTACT";
export const EXPECT_DELETE_USER_CONTACT = "EXPECT_DELETE_USER_CONTACT";
export const DELETE_USER_CONTACT_FAIL = "DELETE_USER_CONTACT_FAIL";
export const DELETE_USER_CONTACT_SUCCESS = "DELETE_USER_CONTACT_SUCCESS";


export function deleteUserContact(contactId){
    return (dispatch, getState) => {
        return getRemoteMeteor(
            dispatch,
            getState,
            "contacts",
            "app.delete.user.contacts",
            [contactId]
        );
    }
}
export function expectDeleteUserContact(){
    return {
        type: EXPECT_DELETE_USER_CONTACT,
    }
}
export function deleteUserContactFail(reason){
    return {
        type: DELETE_USER_CONTACT_FAIL,
        reason
    }
}
export function deleteUserContactSuccess(msg){
    return {
        type: DELETE_USER_CONTACT_SUCCESS,
        msg
    }
}


export const SET_DEFAULT_CONTACT = "SET_DEFAULT_CONTACT";
export const EXPECT_SET_DEFAULT_CONTACT = "EXPECT_SET_DEFAULT_CONTACT";
export const SET_DEFAULT_CONTACT_FAIL = "SET_DEFAULT_CONTACT_FAIL";
export const SET_DEFAULT_CONTACT_SUCCESS = "SET_DEFAULT_CONTACT_SUCCESS";


export function expectSetDefaultContact(){
    return {
        type: EXPECT_SET_DEFAULT_CONTACT
    }
}
export function setDefaultContactFail(reason){
    return {
        type: SET_DEFAULT_CONTACT_FAIL,
        reason
    }
}
export function setDefaultContactSuccess(msg){
    return {
        type: SET_DEFAULT_CONTACT_SUCCESS,
        msg
    }
}
export function setDefaultContact(contactId){
    return (dispatch, getState) => {
        dispatch(expectSetDefaultContact());
        return getRemoteMeteor(dispatch, getState, "user_contact", 
        "app.set.user.contact,default", [contactId],
        setDefaultContactSuccess, setDefaultContactFail
    )
    }
}


export const EXPECT_GET_USER_CONTACTS = "EXPECT_GET_USER_CONTACTS";
export const GET_USER_CONTACTS_FAIL = "GET_USER_CONTACTS_FAILS";
export const GET_USER_CONTACTS_SUCCESS = "GET_USER_CONTACTS_SUCCESS";
export const GET_USER_CONTACTS = "GET_USER_CONTACTS";


export function expectGetUserContacts(){
    return {
        type: EXPECT_GET_USER_CONTACTS,
    }
}
export function getUserContactsFail(reason){
    return {
        type: GET_USER_CONTACTS_FAIL,
        reason
    }
}
export function getUserContactsSuccess(msg){
    return {
        type: GET_USER_CONTACTS_SUCCESS,
        msg
    }
}
export function getUserContacts(userId){
    return (dispatch, getState) => {
        dispatch(expectGetUserContacts());
        return getRemoteMeteor(dispatch, getState, 
            "user_contact", "app.get.user.contacts", [userId],
            getUserContactsSuccess, getUserContactsFail,
        )
    }
}
