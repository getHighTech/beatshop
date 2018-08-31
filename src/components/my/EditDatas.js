import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAppLayout } from '../../actions/app';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
class EditDatas extends Component {
  constructor(props) {
    super(props);
    this.state = { 
                  userOpen: false, 
                  signOpen: false, 
                  passwordOpen: false
                 }
  }
  handleClick = (key) => {
    console.log(key)
    console.log(this.state)
    console.log(this.state[key])
    this.setState(state => ({ [key]: !state[key] }));
  };
  changeCover = () => {
    console.log('上传头像方法在此');
  };
  componentDidMount(){
    console.log(this.props)
    const { dispatch, layout } = this.props;
    if(layout.title!=='编辑资料'){
        dispatch(setAppLayout(
            {
                isBack: true,
                backTo: "/my",
                title:'编辑资料',
                hasCart: false,
                hasBottomNav: false,
                hasGeoLoc: false,
                hasEditor: false,
                hasSearch: false,
            }
        ));
    }
  }
  render(){
    const { user } = this.props;
    return(
      <Wrap>
      <List>
        <ReListItem  button onClick={this.changeCover}>
          <ListItemText primary="头像"  />
          <ReAvatar
            alt="Adelle Charles"
            src={user.headurl}
          />
        </ReListItem>
        <ReListItem  button onClick={()=> this.handleClick('userOpen')}>
          <ListItemText primary="用户名"  />
          {user.username}
          {this.state.userOpen? <ExpandLess /> : <ExpandMore />}
        </ReListItem>



          <ReCollapse in={this.state.userOpen} timeout="auto" unmountOnExit >
            <ReList component="div" disablePadding >
            <TextField
                id="with-placeholder"
                label="设置新名字"
                placeholder="长度不要大于10个字符"
                margin="normal"
              />
              <ReButton variant="contained" color="primary" >
                确认
              </ReButton>
            </ReList>

          </ReCollapse>

          <ReListItem  button onClick={() => this.handleClick("signOpen")}>
          <ListItemText primary="签名"  />
          周世雄
          {this.state.signOpen ? <ExpandLess /> : <ExpandMore />}
        </ReListItem>
          <ReCollapse in={this.state.signOpen} timeout="auto" unmountOnExit >
            <ReList component="div" disablePadding >
            <TextField
                id="with-placeholder"
                label="设置新名字"
                placeholder="长度不要大于10个字符"
                margin="normal"
              />
              <ReButton variant="contained" color="primary" >
                确认
              </ReButton>
            </ReList>

          </ReCollapse>

          <ReListItem  button onClick={()=> this.handleClick('passwordOpen')}>
          <ListItemText primary="修改密码"  />
          周世雄
          {this.state.passwordOpen ? <ExpandLess /> : <ExpandMore />}
        </ReListItem>
          <ReCollapse in={this.state.passwordOpen} timeout="auto" unmountOnExit >
            <ReList component="div" disablePadding >
            <TextField
                id="with-placeholder"
                label="设置新名字"
                placeholder="长度不要大于10个字符"
                margin="normal"
              />
              <br />
               <TextField
                id="with-placeholder"
                label="设置新名字"
                placeholder="长度不要大于10个字符"
                margin="normal"
              />
                <br />
               <TextField
                id="with-placeholder"
                label="设置新名字"
                placeholder="长度不要大于10个字符"
                margin="normal"
              />
                <br />
            
              <ReButton variant="contained" color="primary" >
                确认
              </ReButton>
            </ReList>

          </ReCollapse>


      </List>
      </Wrap>
    )
  }
}


const Wrap = styled.div`
  width: "100%"
`

const ReListItem = styled(ListItem)`
   &&{
     border-bottom: 1px solid #aaa;
   }
`

const ReAvatar = styled(Avatar)`
  width: 65;
  height: 65;
`

const ReCollapse = styled(Collapse)`
  &&{
    border-bottom: 1px solid #aaa;
  }
`

const ReList = styled(List)`
  text-align: center;
`

const ReButton = styled(Button)`
 && {
   margin-left: 20px;
 }

`
/* function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
} */


export default EditDatas;
