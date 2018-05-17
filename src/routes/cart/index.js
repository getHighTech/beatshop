
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { setAppLayout } from '../../actions/app';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import NumberInput from '../../components/public/NumberInput';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { changeProductFromCartChecked, deleteProductFromCart, repeatSyncLocalCartRemote } from '../../actions/app_cart';
import Clear from "material-ui-icons/Clear"
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
           <List>
               {
                 cart.products.length === 0? <ListItem key="0" component="a" href="#/">
                
                      <ListItemText style={{width: "auto", flex: 0.4, textAlign: "center"}}  primary="空空如也,再去逛逛" />
               
        
                  </ListItem> :
                   cart.products.map((product, index)=>{
                    return <ListItem key={index}>
                        <Checkbox
                            checked={cart.productChecks[product._id]}
                            onClick={()=>dispatch(changeProductFromCartChecked(product._id))}
                            color="primary"
                            />
                        <Avatar onClick={this.handleProductShow.bind(this, product._id)}>
                            <img style={{width: "100%"}} src={product.cover} alt={product.name_zh} />
                        </Avatar>
                        <ListItemText style={{width: "auto", flex: 0.4}} onClick={this.handleProductShow.bind(this, product._id)} primary={product.name_zh} secondary={"¥"+product.endPrice/100} />
                        <NumberInput productId={product._id} initNumber={cart.productCounts[product._id]}/>
                        <div  style={{width: "auto", textAlign: "center", flex: 0.25}}>
                          <Clear onClick={()=>dispatch(deleteProductFromCart(index))} />
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