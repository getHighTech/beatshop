import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CreditCard from 'material-ui-icons/CreditCard';
import CardMembership from 'material-ui-icons/CardMembership';
import LocalOffer from 'material-ui-icons/LocalOffer';
import FeaturedPlayList from 'material-ui-icons/FeaturedPlayList';
import PermIdentity from 'material-ui-icons/PermIdentity';
import Contacts from 'material-ui-icons/Contacts';
import Avatar from 'material-ui/Avatar';
import userImg from '../imgs/timg.jpg';
import { connect } from "react-redux";

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
});
class MyItems extends React.Component{
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
            <ListItemIcon>
                <PermIdentity />
            </ListItemIcon>
            <ListItemText primary="我的资料" />
            </ListItem>
        </List>
        <Divider />
        <ListItem button>
            <ListItemIcon>
                <CardMembership />
            </ListItemIcon>
            <ListItemText primary="我的卡片" />
        </ListItem>
                <Divider />
                
                <List component="nav">
                    <ListItem button>
                    <ListItemIcon>
                        <FeaturedPlayList />
                    </ListItemIcon>
                    <ListItemText primary="我的订单" />
                    </ListItem>

                    <ListItem button component="a" href="#simple-list">
                    <ListItemIcon>
                        <LocalOffer />
                    </ListItemIcon>

                    <ListItemText primary="券，道具，会员" />
                    </ListItem>

                    <ListItem button component="a" href="#/my/bankcards_list">
                    <ListItemIcon>
                        <CreditCard />
                    </ListItemIcon>
                    <ListItemText primary="我的银行卡" />
                    </ListItem>

                    <ListItem button component="a" href="#simple-list">
                    <ListItemIcon>
                        <Contacts />
                    </ListItemIcon>
                    <ListItemText primary="我的联系方式" />
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