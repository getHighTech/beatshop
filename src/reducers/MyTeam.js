import {EXPECT_GET_MYTEAM_LIMIT,GET_MYTEAM_LIMIT_SUCCESS,GET_MYTEAM_LIMIT_FAIL} from "../actions/my_team";



export default function MyTeam(
  state={
    loading: false,
    loadFailReason: "",
    teams:[]
  },action
){
  switch (action.type) {
    case EXPECT_GET_MYTEAM_LIMIT:
      return Object.assign({}, state, {
          loading: true,
      });
    case GET_MYTEAM_LIMIT_FAIL:
      return Object.assign({}, state, {
          loadFailReason: action.reason,
      })
    case GET_MYTEAM_LIMIT_SUCCESS:
    console.log(action.msg);
    return Object.assign({}, state, {
        loading: false,
        teams: action.msg.myteams,
    })
    default:
        return state;
  }
}
