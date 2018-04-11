
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { setAppLayout } from '../../actions/app';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import NumberInput from '../../components/public/NumberInput';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { changeProductFromCartChecked } from '../../actions/app_cart';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
});

class AppCart extends React.Component {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(setAppLayout(
      {
          isBack: true, 
          backTo: "/", 
          title: "购物车", 
          hasCart: false, 
          hasBottomNav: false, 
          hasGeoLoc: false,
          hasEditor: true,
          editorType: "cart", 
          hasSearch: false,
      }
  ));
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
                        <NumberInput initNumber={cart.productCounts[product._id]}/>
                        <div style={{width: "auto", textAlign: "center", flex: 0.25}}>delte</div>
               
                    </ListItem>
                   })
                   
               }
               
                
            </List>
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
  }
}

export default connect(mapToState)(withStyles(styles)(AppCart));