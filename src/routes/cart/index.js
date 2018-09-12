
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { setAppLayout } from '../../actions/app';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import NumberInput from '../../components/public/NumberInput';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import { changeProductFromCartChecked, deleteProductFromCart, repeatSyncLocalCartRemote } from '../../actions/app_cart';
import Clear from "@material-ui/icons/Clear"
import CartBottom from '../../components/cart/CartBottom';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
});

class AppCart extends React.Component {
  componentDidMount(){
    const { dispatch, layout } = this.props;
    this.setState({
      productChecks: []
    })

    if(layout.title !== "购物车"){
      dispatch(setAppLayout(
        {
            isBack: true,
            backTo: "/",
            title: "购物车",
            hasCart: false,
            hasBottomNav: false,
            hasGeoLoc: false,
            editorType: "cart",
            hasSearch: false,
        }
      ));
    }


  }
  componentWillMount(){
    const { cart, dispatch } = this.props;
    console.log(cart);
    this.setState({
      productChecks: cart.productChecks
    });
    dispatch(repeatSyncLocalCartRemote());
  }
  handleProductShow(id){

    this.props.history.push("/products/"+id)
  }
  render(){
    const { classes, cart, dispatch } = this.props;


    return (
      <div className={classes.root}>
           <List className={classes.root} style={{width: "100%"}}>
               {
                 cart.products.length === 0? <ListItem key="0" component="a" href="#/">

                      <ListItemText style={{width: "auto", flex: 0.4, textAlign: "center"}}  primary="空空如也,再去逛逛" />


                  </ListItem> :
                   cart.products.map((product, index)=>{
                    return <ListItem key={index}>
                      <div style={{display: 'flex',flexFlow:'row',width:'100%'}}>
                        <div style={{display: 'flex',flexFlow:'row',width:'20%'}}>
                        <Checkbox
                            checked={cart.productChecks[product._id]}
                            onClick={()=>dispatch(changeProductFromCartChecked(product._id))}
                            color="primary"
                            />
                        <Avatar onClick={this.handleProductShow.bind(this, product._id)}>
                            <img style={{width: "100%"}} src={product.cover} alt={product.name_zh} />
                        </Avatar>
                        </div>
                        <div style={{marginLeft:'11%',width:'70%'}}>

                        <ListItemText style={{width: "100%", flex: 0.1,fontSize:12}} onClick={this.handleProductShow.bind(this, product._id)} primary={product.name_zh} secondary={"¥"+product.endPrice/100} />
                        <div style={{display: 'flex',flexFlow:'row',width:'100%'}}>
                        <NumberInput productId={product._id} initNumber={cart.productCounts[product._id]}/>
                        <div  style={{ textAlign: "center",marginLeft:'30%',paddingTop:5}} >
                          <Clear onClick={()=>dispatch(deleteProductFromCart(index))} />
                        </div>
                        </div>
                        </div>
                      </div>
                    </ListItem>
                   })

               }


            </List>
            <CartBottom />
      </div>
    );
  }

}

AppCart.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
  return {
    layout: state.AppInfo.layout,
    cart: state.AppCart,
    user: state.AppUser
  }
}

export default connect(mapToState)(withStyles(styles)(AppCart));
