
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import {connect} from 'react-redux';
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});
let timerVal = null;
class CartTop extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        snackOpen: false,
        timer: null,
      }
    }
    handleSnackClose = () => {
      this.setState({ snackOpen: false });
    };
    
    componentWillUnmount(){
      clearTimeout(timerVal);
    }
 
    render(){
      
      return (
        <div>
        <IconButton onClick={()=>this.props.history.push('/cart')}  color="secondary" aria-label="Menu">
          <Badge badgeContent={this.props.cart.count} color="primary">
            <ShoppingCart />
            </Badge>
            
        </IconButton>
        
        </div>
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