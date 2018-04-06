export const APP_LOAD_FAIL = "APP_LOAD_FAIL";
export const REMOTE_METHOD_ERROR = "REMOTE_METHOD_ERROR";
export const ERROR_SOMEHOW_UNKNOW = "ERROR_SOMEHOW_UNKNOW";
export const PRODUCT_NOT_FOUND_ERROR = "PRODUCT_NOT_FOUND_ERROR";
export function dealWithError(reason){
    console.log(reason);
    if (reason === "invalid app") {
        return {
            type: "APP_LOAD_FAIL",
            reason
        }
    }
    if(reason === 404 || reason === 500){
        return {
            type: REMOTE_METHOD_ERROR,
            reason,
        }
    }
    if(reason === "PRODUCT NOT FOUND"){
        return {
            type: PRODUCT_NOT_FOUND_ERROR,
            reason
        }
    }
    
    return {
        type: ERROR_SOMEHOW_UNKNOW,
        reason
    }
    
}