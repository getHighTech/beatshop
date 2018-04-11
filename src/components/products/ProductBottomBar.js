import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AddShoppingCart from 'material-ui-icons/AddShoppingCart'
import { addProductsToAppCart } from '../../actions/app_cart';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { checkAccessBuy } from '../../actions/check_access';
import { memoryPathBeforeLogined } from '../../actions/users';

const styles = theme => ({
    root: {
        flexGrow: 1,
        position: "fixed",
        width: "100%",
        zIndex: '1000',
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up('md')]: {
            position: "fixed",
            width: "100%",
            zIndex: '1000',
            // border: "red 5px outset",
            
            bottom: 50,
          },
        
      },
      appbar: {
        backgroundColor: "rgba(4, 4, 4, 0.1)",
        width: "100%",
        [theme.breakpoints.down('md')]: {
          width: "100%",
          // border: "red 5px outset",
          backgroundColor: "rgba(4, 4, 4, 0.76)",
        },
      },
        flex: {
            flex: 1,
          // border: "red 5px outset",
            
        },
    
});
let timer = null;
class ProductBottomBar extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        snackOpen: false,
        snackContent: ""
      }
    }
    componentWillUnMount(){
      clearTimeout(timer);
    }
    handleSnackClose = () => {
      this.setState({ snackOpen: false });
    };
    handleAddToCart(product, count, shopId){
        const {dispatch, user, history, url } = this.props;
        dispatch(checkAccessBuy(product, "AddToCart"));
      }
    componentWillReceiveProps(nextProps){
      const {dispatch, user, history, url, product } = nextProps;
      if(user.checkAccessStatus === "checking"){
        return this.setState({ snackOpen: true, snackContent: "正在检查权限" });
      }
      if(user.checkAccessStatus === "untrigger"){
        return false;
      }

      if(user.checkAccessStatus === "checked"){
        
        if(user.accessable){
          console.log("已经检查通过", user.accessable);
          if(user.checkAccessAction === "AddToCart"){
            return dispatch(addProductsToAppCart(product, 1, product.shopId));
          }
        }else{
          console.log("已经检查拒绝", user.accessable);
          if(user.accessableReason === "login_user MISSING"){
            this.setState({ snackOpen: true, snackContent: "需要先登录" });
            return timer = setTimeout(() => {
              dispatch(memoryPathBeforeLogined(url))
              history.push("/login")
            }, 1740);
          }else{
            if(user.missingRole){//去获得权限的商品
              
                return this.props.history.push("/products_by_rolename/"+user.missingRole.split('_')[0]+"/"+product.name);
                
            }
            return false;
          }
          return false;
        
        }
        return false;
   
        
      }
    }
    
    render(){
      const { classes, product } = this.props;
      const { snackOpen, snackContent} =this.state;
      
      return (
        <div className={classes.root}>
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={snackOpen}
            onClose={this.handleSnackClose}
            SnackbarContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span style={{width: "40%"}} id="message-id">{snackContent}</span>} 
            
          /><br/>
        <AppBar position="static" className={classes.appbar} color="default">
          <Toolbar style={{backgroundColor: "rgba(4, 4, 4, 0.3)", color: "white"}}>
              <IconButton aria-label="加入购物车">
                <AddShoppingCart onClick={()=> this.handleAddToCart(product, 1, product.shopId)} color="secondary" />
              </IconButton>
               <Button color="inherit" className={classes.flex}>立即购买</Button>
              <Button color="inherit">查看店铺</Button>
          </Toolbar>
        </AppBar>
        
        </div>
    );  
  }
  
}

ProductBottomBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
    return {
      cart: state.AppCart,
      user: state.AppUser,
    }
  }

export default connect(mapToState)(withStyles(styles)(ProductBottomBar))

