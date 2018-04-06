export const SET_APP_CITY = "SET_APP_CITY";
export const SET_APP_LAYOUT = "SET_APP_LAYOUT";

export function setAppCity(city){
    return {
        type: SET_APP_CITY,
        city
    }
}

export function setAppLayout(
    layout ){
        return {
            type: SET_APP_LAYOUT,
            layout,
        }
    }