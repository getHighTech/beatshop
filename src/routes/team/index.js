import React from 'react';
import { setAppLayout } from '../../actions/app';
import { getMyTeam} from '../../actions/my_team'
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import styled from 'styled-components';
import { getStore } from '../../tools/localStorage';
import moment from 'moment';


class Team extends React.Component{
  componentDidMount() {
    const { dispatch } = this.props;
    let userId = getStore("userId");
    console.log(userId);
    dispatch(getMyTeam(userId))
    dispatch(setAppLayout(
        {
          isBack: true,
          backTo: "/my",
          title: "我的团队",
          hasCart: false,
          hasBottomNav: false,
          hasGeoLoc: false,
          hasEditor: false,
          hasSearch: false,
        }
    ));



  }


  render() {
    const { teams } = this.props;
    const count = teams.length;
    console.log(this.props.teams);
    console.log(count);
      return(
       <Wrap>
        <BgWrap>
        <BannerImg alt="新品上市"   src={require("../../components/imgs/team.jpg")}/>

        </BgWrap>



        <TitleWrap>
            <Title>
              我的下级
              <ReBadge badgeContent={count} >
              </ReBadge>
            </Title>
        </TitleWrap>

        <ListWrap>
        <List>
            <UserName>
              用户名
            </UserName>
            <JoinTime>
             加入时间
            </JoinTime>
          </List>

          {teams.map(team => {
            return (
              <List>
                <UserName>
                  {team.name}
                </UserName>
                <JoinTime>
                  {team.jointime!==undefined ? moment(team.jointime).format("YYYY-MM-DD HH:mm:ss"): null}
                </JoinTime>
              </List>
            )
          })}


        </ListWrap>
       </Wrap>
      )
  }
}

const Wrap = styled.div`

`
const BannerImg = styled.img`
  width:100%;
  height:180px;
`
const BgWrap = styled.div`
  height: 180px;
`

const TitleWrap = styled.div`
  background: #F4F8FB;
`
const Title = styled.div`
  color: #4E8BA2;
  padding: 5px 10px;
  font-weight: 700;
  font-size: 16px;
`

const ListWrap = styled.div`
  width: 90%;
  margin: 0 auto;
`

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`

const UserName = styled.div`
  text-align: left;
`

const JoinTime = styled.div`
  text-align: right;
`

const ReBadge = styled(Badge)`
  margin-left: 16px;
  margin-top: -2px;
  .MuiBadge-badge-27 {
    background: #2387B5;
    color: #fff;
  }
`
function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout,
    shop: state.AppShop,
    teams:state.MyTeam.teams
  }
}


export default connect(mapToState)(Team)
