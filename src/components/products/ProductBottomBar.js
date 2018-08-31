import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import { connect } from 'react-redux';
import { checkAccess } from '../../actions/check_access';

const styles = theme => ({
    root: {
        flexGrow: 1,
        position: "fixed",
        width: "100%",
        zIndex: '1000',
        left: 0,
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
        const {dispatch} = this.props;
        dispatch(checkAccess("buy", product, "add_product_to_cart"))
      }

    render(){
      const { classes, product, dispatch } = this.props;

      return (
        <div className={classes.root}>

        <AppBar position="static" className={classes.appbar} color="default">
          <Toolbar style={{backgroundColor: "rgba(4, 4, 4, 0.3)", color: "white"}}>
          <div style={{width:'20%'}}>
          {
            this.props.isAppointment? "":
            <IconButton aria-label="加入购物车">
                <AddShoppingCart onClick={()=> this.handleAddToCart(product, 1, product.shopId)} color="secondary" />
              </IconButton>
          }
          </div>

          <div style={{width:'60%',textAlign:'center'}}>
               <Button onClick={()=> dispatch(checkAccess("buy", product, "create_one_order_by_product"))}  color="inherit" className={classes.flex}>
               {this.props.isAppointment? '立即预约' : '立即购买'}
               </Button>
            </div>
            <div style={{width:'20%',textAlign:'right'}}>
              <Button style={{padding:0}} color="inherit" href={'#/shops/'+ product.shopId}>查看店铺</Button>
            </div>
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
