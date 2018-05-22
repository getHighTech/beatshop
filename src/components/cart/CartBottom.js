import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { unselectSelectAllItemsFromCart } from '../../actions/app_cart';
import { connect } from 'react-redux';
import { checkAccess } from '../../actions/check_access';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createOneOrder } from '../../actions/orders';
const styles = theme => ({
    root: {
        flexGrow: 1,
        position: "fixed",
        // width: "100%",
        zIndex: '1000',
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up('md')]: {
            position: "fixed",
            width: "100%",
            zIndex: '1000',
            bottom: 50,
          },
        
      },
      appbar: {
        backgroundColor: "rgba(4, 4, 4, 0.1)",
        width: "100%",
        [theme.breakpoints.down('md')]: {
          width: "100%",
          backgroundColor: "rgba(4, 4, 4, 0.76)",
        },
      },
        flex: {
            flex: 1,
        },
    
});
let timer = null;
class CartBottom extends React.Component{

    componentWillUnMount(){
      clearTimeout(timer);
    }
    handleSnackClose = () => {
      this.setState({ snackOpen: false });
    };
    handleAddToCart(product, count, shopId){
        const {dispatch } = this.props;
        dispatch(checkAccess("buy", product, "add_product_to_cart"))
      }
    
    render(){
      const { classes, cart, dispatch } = this.props;
      console.log(cart.status);
      
      return (
        <div className={classes.root}>
        
        <AppBar position="static" className={classes.appbar} color="default">
          <Toolbar style={{backgroundColor: "rgba(4, 4, 4, 0.3)", color: "white"}}>
          <FormControlLabel style={{color: "white"}}
          
          control={ 
            <Checkbox
              checked={cart.status === "all-selected"?  true : false}
              color="secondary"
              onClick={()=>{dispatch(unselectSelectAllItemsFromCart())}}
              style={{color: "white"}}
            />
          }
          label={
              <span  style={{color: "white"}}>全选</span>
          }
        />
               <Button color="inherit" className={classes.flex}>合计: ￥{cart.totalAmount/100}</Button>
              <Button onClick={()=>dispatch(createOneOrder(cart))} disabled={cart.status==="all-unselected"? true : false} color="inherit">结算</Button>
          </Toolbar>
        </AppBar>
        
        </div>
    );  
  }
  
}

CartBottom.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
    return {
      cart: state.AppCart,
    }
  }

export default connect(mapToState)(withStyles(styles)(CartBottom))

