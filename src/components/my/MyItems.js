import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CreditCard from '@material-ui/icons/CreditCard';
import FeaturedPlayList from '@material-ui/icons/FeaturedPlayList';
import Avatar from '@material-ui/core/Avatar';
import userImg from '../imgs/timg.jpg';
import { connect } from "react-redux";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Shop from '@material-ui/icons/Shop';
import Stars from '@material-ui/icons/Stars';
import AddToQueue from '@material-ui/icons/AddToQueue';
import Face from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import styled from 'styled-components';
import { getStore } from '../../tools/localStorage.js';
class MyItems extends React.Component{
  state = {
    open: false,
    confirmContent: "开店需要购买优选会员卡，是否立即购买？",
    confirmOpen: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };


  handleConfirmCancel = () => {
    this.setState({
      confirmOpen: false,
    })
  }

  handleConfirm = () => {
    this.props.history.push('/products_by_rolename/blackcard/open');
    this.setState({
      confirmOpen: false,
    })
  }

  handleGoToShop = (my='') => {
    const { user, history  } = this.props;
    console.log('my:'+ my);



    if(user.agencyRole!==false){
      console.log(`走这里`)
        history.push(my+"/products");
    }else{
      console.log("no access");

      this.setState({
        confirmOpen: true,
      })

    }

  }

  render(){
    const { user } = this.props;
    let  profile = getStore("WechatProfile");
    if(profile){
      profile = JSON.parse(profile).userInfo
    }
    return (
        <Wrap >
        <List component="nav">
        <ListItem>
        { profile 
          ? 
      <div>
      <ReAvatar
      alt="个人头像"
      src={profile.headimgurl}
    />
      <ListItemText primary={profile.nickname}
    secondary={user.user.username} />
      </div>
      :
      <div>
      <ReAvatar
      alt="个人头像"
      src={userImg}
    />
      <ListItemText primary={user.user.nickname}
    secondary={user.user.username} />
      </div>
        }
    <ListItemText primary={user.user.dataAutograph}  />
      </ListItem>
      {user.roles.includes("blackcard_holder") &&
        <ListItem button component="a" href="#/my/blackcard_holder">
          <ReListItemIcon >
          <Face />
          </ReListItemIcon>
          <ListItemText primary="鲜至店长" />
          </ListItem>}
    </List>
      <Divider />
      {
        user.user.username !== "wanchehui" &&
          <div>
          <ListItem button onClick={this.handleClick}>
          <ReListItemIcon >
          <Shop  />
          </ReListItemIcon>
          <ListItemText inset primary="我的店铺" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItem button  onClick={()=>this.handleGoToShop()} component="button">
          <ReListItemIcon >
          <AddToQueue />
          </ReListItemIcon>
          <ListItemText inset primary="新加商品"  />
          </ListItem>
          <ListItem button  onClick={()=>this.handleGoToShop("/my")}  component="button" href="#/my/products">
          <ReListItemIcon >
          <Stars />
          </ReListItemIcon>
          <ListItemText inset primary="正在出售的商品" />
          </ListItem>
          </List>
          </Collapse>
          <Divider />
          </div>
      }


    <List component="nav">
    {
      user.senior === true ?
        <div>
        <ListItem button component="a" href="#/my/team">
        <ReListItemIcon >
        <PersonPinIcon/>
        </ReListItemIcon>
        <ListItemText primary="我的团队" />
        </ListItem>

        <Divider />
        </div>
        :
        null

    }


    <ListItem button component="a" href="#/my/orders">
      <ReListItemIcon >
      <FeaturedPlayList />
      </ReListItemIcon>
      <ListItemText primary="我的订单" />
      </ListItem>

      <Divider />



      <ListItem button component="a" href="#/my/bankcards_list">
      <ReListItemIcon >
      <CreditCard />
      </ReListItemIcon>
      <ListItemText primary="我的银行卡" />
      </ListItem>
      </List>
      <Dialog
      open={this.state.confirmOpen}
    onClose={this.handleClose}
    aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title"></DialogTitle>
      <DialogContent>
      <DialogContentText>
      {this.state.confirmContent}
    </DialogContentText>

      </DialogContent>
      <DialogActions>
      <Button onClick={this.handleConfirmCancel} color="primary">
      残忍拒绝
      </Button>
      <Button onClick={this.handleConfirm} color="primary">
      立即购买
      </Button>
      </DialogActions>
      </Dialog>
      </Wrap>
      );
  }
}

const Wrap = styled.div`
width: 100%,
  max-width: 560,
  `

const ReListItemIcon = styled(ListItemIcon)`
  && {
    color: #ff5722;
  }
`

const ReAvatar = styled(Avatar)`
width: 60;
height: 60;
`



function mapUserToState(state){
  return {
    user: state.AppUser
  }
}

export default connect(mapUserToState)(MyItems);
