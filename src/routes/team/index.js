import React from 'react';
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import styled from 'styled-components';
class Team extends React.Component{
  componentDidMount() {
    const { dispatch } = this.props;
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
      return(
       <Wrap>
        <BgWrap>

        </BgWrap>

        <TitleWrap>
            <Title>
              我的下级
              <ReBadge badgeContent={4} >
              </ReBadge>
            </Title>
        </TitleWrap> 

        <ListWrap>
        <List>
            <UserName>
              名称
            </UserName>
            <JoinTime>
             加入时间
            </JoinTime>
          </List>
          <List>
            <UserName>
              李雷
            </UserName>
            <JoinTime>
              2018-6-10
            </JoinTime>
          </List>
          <List>
            <UserName>
              李雷
            </UserName>
            <JoinTime>
              2018-6-10
            </JoinTime>
          </List>
          <List>
            <UserName>
              李雷
            </UserName>
            <JoinTime>
              2018-6-10
            </JoinTime>
          </List>
        </ListWrap>
       </Wrap>
      )
  }
}

const Wrap = styled.div`

`

const BgWrap = styled.div`
  height: 180px;
  background: #1986B7;
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



export default connect()(Team)