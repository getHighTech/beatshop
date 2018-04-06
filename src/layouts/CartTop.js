
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ShoppingCart from 'material-ui-icons/ShoppingCart';
import Badge from 'material-ui/Badge';
import {connect} from 'react-redux';


const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class CartTop extends React.Component{
 
    render(){
      return (
        
        <IconButton onClick={()=>this.props.history.push('/cart')}  color="inherit" aria-label="Menu">
          <Badge badgeContent={this.props.cart.count} color="primary">
            <ShoppingCart />
            </Badge>
        
        </IconButton>
      )
       
    }
}

CartTop.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
  return {
    cart: state.AppCart
  }
}


export default connect(mapToState)(withStyles(styles)(CartTop));