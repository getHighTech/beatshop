import { EXPECT_LOAD_APP, LOAD_APP_SUCCESS, LOAD_GEO_ADDRESS_SUCCESS } from "../actions/process/load_app";
import { APP_LOAD_FAIL, REMOTE_METHOD_ERROR, PRODUCT_NOT_FOUND_ERROR } from "../actions/error_fail";
import { SET_APP_CITY, SET_APP_LAYOUT } from "../actions/app";

export default function AppInfo
(
    state=
    {
        init: false,
        currentCity: "北京市",
        amap: {

        },
        layout: {
            isBack: false,
            title: "",
            hasCart: true,
            hasBottomNav: true,
            backTo: "/",
            hasGeoLoc: true,
            hasEditor: false,
            hasSearch: false,

        }
    },
    action
){
    switch (action.type) {
        case EXPECT_LOAD_APP:
            return  Object.assign({}, state, {
                init: false,
            });
        case LOAD_APP_SUCCESS: 
            return Object.assign({}, state, {
                init: true,
                appInfo: action.appInfo,
            })
        case APP_LOAD_FAIL:
            return Object.assign({}, state, {
                init: true,
                fail: true,
                reason: action.reason,
            })
        case REMOTE_METHOD_ERROR: 
            return Object.assign({}, state, {
                init: true,
                error: true,
                reason: action.reason
            })
        case PRODUCT_NOT_FOUND_ERROR: 
            return Object.assign({}, state, {
                init: true,
                error: true,
                reason: action.reason
            })
        case SET_APP_CITY:
            return Object.assign({},state, {
                currentCity: action.city
            });
        case LOAD_GEO_ADDRESS_SUCCESS: 
            let currentCity = "北京市";
            if(action.amap.info==="FAILED"){
                currentCity = "北京市";
            }

            if(action.amap.info==="SUCCESS"){
                currentCity = action.amap.addressComponent.city
            }
            return Object.assign({}, state, {
                amap: action.amap,
                currentCity
            })

        case SET_APP_LAYOUT:
            return Object.assign({}, state, {
                layout: action.layout
            })
        default:
            return state;
    }
}