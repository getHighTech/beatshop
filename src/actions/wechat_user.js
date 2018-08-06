export const GET_USERINFO_SUCCESS = "GET_USERINFO_SUCCESS"


export function getUserInfo(user) {
    return {
        type:  GET_USERINFO_SUCCESS,
        user
    }
}


