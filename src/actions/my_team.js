import getRemoteMeteor from "../services/meteor/methods";
import axios from 'axios';
import serverConfig  from '../config/server';

export const EXPECT_GET_MYTEAM_LIMIT = "EXPECT_GET_MYTEAM_LIMIT";
export const GET_MYTEAM_LIMIT_SUCCESS = "GET_MYTEAM_LIMIT_SUCCESS";
export const GET_MYTEAM_LIMIT_FAIL = "GET_MYTEAM_LIMIT_FAIL";

export function expectGetMyteamLimit(){
  return {
    type:EXPECT_GET_MYTEAM_LIMIT
  }
}

export function getMyTeamLimitSuccess(msg){

  console.log(msg);
  return {
    type:GET_MYTEAM_LIMIT_SUCCESS,
    msg
  }
}

export function getMyTeamLimitFail(reason){
  console.log(reason);
  return {
    type:GET_MYTEAM_LIMIT_FAIL,
    reason
  }
}

export function getMyTeam(userId){
  console.log('先B');

  return (dispatch,getState) => {
    dispatch(expectGetMyteamLimit())
    //
    const SuserId = userId;
    return axios.get(`${serverConfig.server_url}/api/myteam`,{
      params:{
        SuserId
      }
    }).then((res)=>{
        console.log(res.data)
        dispatch(getMyTeamLimitSuccess(res.data))
    }).catch((err)=>{
        console.log(err)
    })

    // return getRemoteMeteor(
    //     dispatch,getState, "agency_relation",
    //     "get.agency_relation.my.teams",
    //     [userId],
    //     getMyTeamLimitSuccess, getMyTeamLimitFail
    // );
  }
}
