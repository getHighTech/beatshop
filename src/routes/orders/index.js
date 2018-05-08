
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { setAppLayout } from '../../actions/app';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import grey from 'material-ui/colors/grey';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { loadOneOrder } from '../../actions/orders';
import LoadingItem from '../../components/public/LoadingItem';
import Button from 'material-ui/Button'
const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        backgroundSize: '100%',
        backgroundColor: grey[100],
        paddingTop: "20px",
        flex: 1,
        height: "100%"
      },
      bigAvatar: {
        width: 60,
        height: 60,
      },
      button: {
          width: "90%"
      }
});

class Order extends React.Component {
  componentDidMount(){
    const { dispatch, match, layout } = this.props;
    console.log(this.props);
    
    if(layout.title!=='确认订单'){
        dispatch(loadOneOrder(match.params.id));
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/", 
                title: "确认订单", 
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
    const { classes, orderShow, user } = this.props;
    const custDivider = () => {
        return (
            <div style={{
                backgroundColor: "darkgrey", 
                height: 1, 
                width: "90%",
                margin: 2,
            }}>&nbsp;</div>
        )
    }

    if(!orderShow.order){
        return (
            <div style={{display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",}}><LoadingItem /></div>
        )
    }

    
    return (
      <div className={classes.row}>
     
          <div className={classes.row}>
              <Typography variant="subheading" gutterBottom>
                订单号:{orderShow.order.orderCode}
                </Typography>
            {custDivider()}
           
            <List component="nav">
                <ListItem button>
                    <Avatar
                            alt="商品"
                            src={orderShow.order.products[0].cover}
                        />
                <ListItemText primary={orderShow.order.products[0].name_zh}  />
                <ListItemText primary={"×"+orderShow.order.productCounts[orderShow.order.products[0]._id]}  />
                </ListItem>
           
            </List>
           {custDivider()}
          
            
            {!user.contactIsLoaded? 
            <div style={{display: "flex", padding: 7}}>
                <Typography variant="title" gutterBottom>
                无联系方式
            </Typography><Button 
                    className={classes.button} component="a" href="#/my/contacts/orderuse"
                    variant="raised" color="secondary" 
                    >立刻填写您的联系方式
                </Button> 
            </div>
                : 
             <List component="nav">
                <ListItem button>
                <ListItemText primary={user.currentContact.mobile.toString()}  />
                </ListItem>
                <ListItem button>
                <ListItemText primary={user.currentContact.address}  />
                </ListItem>
             </List>
            }
            {custDivider()}
            <Typography variant="title" gutterBottom>
            总计: <span style={{fontWeight: "bolder"}}>¥{orderShow.order.totalAmount/100}</span>
            </Typography>
            {custDivider()}
            <Button 
            className={classes.button}
            variant="raised" color="primary" 
             fullWidth={true}>确认订单并且支付
             </Button>
          </div>
            
      </div>
    );
  }
  
}

Order.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(Order));