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
        <BannerImg alt=""   src={require("../../components/imgs/teams.jpg")}/>

        </BgWrap>



        <TitleWrap>
            <Title>
              我的下级个数:
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

          {teams.map((team,key) => {
            return (
              <List key={key}>
                <UserName>
                  {team.name}
                </UserName>
                <JoinTime>
                  {team.jointime!==undefined&&team.jointime!=='加入时间有误' ? moment(team.jointime).format("YYYY-MM-DD HH:mm:ss"): '未能获取其加入时间'}
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
  height:20%;
  margin-top:7px;
`
const BgWrap = styled.div`
  height: 20%;
`

const TitleWrap = styled.div`
  margin-top:15px;
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
  font-size:14px
`

const JoinTime = styled.div`
  text-align: right;
  font-size:14px
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
