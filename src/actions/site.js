import { resolve } from "url";

export const  EXPECT_HOME_SITE_DATA =  "EXPECT_HOME_SITE_DATA";
export const LOAD_HOME_SITE_DATA = "LOAD_HOME_SITE_DATA";
export const LOAD_HOME_SITE_DATA_FAIL = "LOAD_HOME_SITE_DATA_FAIL";
export const LOAD_HOME_SITE_DATA_SUCCESS = "LOAD_HOME_SITE_DATA_SUCCESS";

export function expectHomeSiteData(){
    return {
        type: EXPECT_HOME_SITE_DATA
    }
}

export function loadHomeSiteData(){
    return dispatch => {
        dispatch(expectHomeSiteData());
        fetch('/api/v1/site/home').then(resolve=>{
            console.log(resolve);
            
        })
    }
}

