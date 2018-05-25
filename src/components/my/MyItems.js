import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CreditCard from '@material-ui/icons/CreditCard';
import FeaturedPlayList from '@material-ui/icons/FeaturedPlayList';
import Contacts from '@material-ui/icons/Contacts';
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





const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 560,
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor:'red'
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  listIcon:{
      color:'#ff5722'
  }
});
class MyItems extends React.Component{
    state = { open: false };
    handleClick = () => {
        this.setState({ open: !this.state.open });
      };
    
    render(){
        const { classes } = this.props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem button>
                    <Avatar
                            alt="个人头像"
                            src={userImg}
                            className={classNames(classes.bigAvatar)}
                        />
                <ListItemText primary="昵称" secondary="用户名" />
                <ListItemText primary="个性签名"  />
                </ListItem>
                <ListItem button>
                <ListItemIcon className={classes.listIcon}>
                    <Face />
                </ListItemIcon>
                <ListItemText primary="我的资料" />
                </ListItem>
            </List>
            <Divider />
            <ListItem button onClick={this.handleClick}>
            <ListItemIcon className={classes.listIcon}>
              <Shop  />
            </ListItemIcon>
            <ListItemText inset primary="我的店铺" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} component="a" href="#/products">
                <ListItemIcon className={classes.listIcon}>
                  <AddToQueue />
                </ListItemIcon>
                <ListItemText inset primary="新加商品"  />
              </ListItem>
              <ListItem button className={classes.nested}  component="a" href="#/my/products">
                <ListItemIcon className={classes.listIcon}>
                  <Stars />
                </ListItemIcon>
                <ListItemText inset primary="正在出售的商品" />
              </ListItem>
            </List>
          </Collapse>
            <Divider />    
            <List component="nav">
                <ListItem button component="a" href="#/my/orders">
                <ListItemIcon className={classes.listIcon}>
                    <FeaturedPlayList />
                </ListItemIcon>
                <ListItemText primary="我的订单" />
                </ListItem>

                <Divider />
                
                <ListItem button component="a" href="#/my/bankcards_list">
                <ListItemIcon className={classes.listIcon}>
                    <CreditCard />
                </ListItemIcon>
                <ListItemText primary="我的银行卡" />
                </ListItem>
            </List>
        </div>
            );
        }
}

MyItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapUserToState(state){
    return {
        user: state.AppUser
    }
}

export default connect(mapUserToState)(withStyles(styles)(MyItems));