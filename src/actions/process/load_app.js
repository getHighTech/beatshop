import getRemoteMeteor from "../../services/meteor/methods";
import app from '../../config/app.json';
import { dealWithError } from "../error_fail";
import { getAddress } from "../../services/http/amap";

export const  EXPECT_LOAD_APP = "EXPECT_LOAD_APP";
export const LOAD_APP_SUCCESS = "LOAD_APP_SUCCESS";


export const EXPECT_LOAD_GEO_ADDRESS = "EXPECT_LOAD_GEO_ADDRESS";
export const LOAD_GEO_ADDRESS_SUCCESS = "LOAD_GEO_ADDRESS_SUCCESS";

export function expectLoadApp(){
    return {
        type: EXPECT_LOAD_APP
    }
}

export function loadAppSuccess(appInfo){
    return {
        type: LOAD_APP_SUCCESS,
        appInfo,
    }
}

export function loadApp(){
    return (dispatch, getState) => {
        dispatch(expectLoadApp());
        return getRemoteMeteor(
            dispatch,
            getState,
            'app',
            'app.load.app.info',
            [app.name],
            loadAppSuccess,
            dealWithError,

        );
    }
}

export function expectLoadGeoAddress(){
    return {
        type: EXPECT_LOAD_GEO_ADDRESS
    }
}

export function loadGeoAddressSuccess(amap){
    return {
        type: LOAD_GEO_ADDRESS_SUCCESS,
        amap
    }
}

export function loadGeoAddress(){
    return (dispatch, getState) =>{
        dispatch(expectLoadGeoAddress());
        getAddress(dispatch, getState);
    }
}