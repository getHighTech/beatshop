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
    state = { open: false,
         confirmContent: "开店需要万人车汇黑卡权限，是否立即购买黑卡？", 
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
        console.log('my', my);
        
        let roles = user.roles;
        
        if(roles.includes("blackcard_holder")){
            history.push(my+"/products");
        }else{
            console.log("no access");

            this.setState({
                confirmOpen: true,
            })

            
            
        }
        
    }

    handleGoToMemeberCenter(){
        
    }
    
    render(){
        const { classes, user } = this.props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem button>
                    <Avatar
                            alt="个人头像"
                            src={userImg}
                            className={classNames(classes.bigAvatar)}
                        />
                <ListItemText primary={this.props.user.user.nickname} 
                secondary={this.props.user.user.username} />
                <ListItemText primary={this.props.user.user.dataAutograph}  />
                </ListItem>
                {this.props.user.roles.includes("blackcard_holder") && 
                    <ListItem button component="a" href="#/my/blackcard_holder">
                    <ListItemIcon className={classes.listIcon}>
                        <Face />
                    </ListItemIcon>
                    <ListItemText primary="黑卡尊享会员" />
                    </ListItem>}
            </List>
            <Divider />
            {
                user.user.username !== "wanchehui" && 
                <div>
                    <ListItem button onClick={this.handleClick}>
                    <ListItemIcon className={classes.listIcon}>
                    <Shop  />
                    </ListItemIcon>
                    <ListItemText inset primary="我的店铺" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={()=>this.handleGoToShop()} component="button">
                            <ListItemIcon className={classes.listIcon}>
                            <AddToQueue />
                            </ListItemIcon>
                            <ListItemText inset primary="新加商品"  />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={()=>this.handleGoToShop("/my")}  component="button" href="#/my/products">
                            <ListItemIcon className={classes.listIcon}>
                            <Stars />
                            </ListItemIcon>
                            <ListItemText inset primary="正在出售的商品" />
                        </ListItem>
                        </List>
                    </Collapse>
                    <Divider />    
                </div>
        }
         
       
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
            <Dialog
                open={this.state.confirmOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">推荐购买黑卡</DialogTitle>
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