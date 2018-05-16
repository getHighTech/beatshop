
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ShoppingCart from 'material-ui-icons/ShoppingCart';
import Badge from 'material-ui/Badge';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
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
      const { snackOpen } = this.state;
      const { classes } = this.props;
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