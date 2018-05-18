
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Add from "material-ui-icons/Add";

import Remove from "material-ui-icons/Remove";
import Input from "@material-ui/core/Input";
import { connect } from 'react-redux';
import { plusProductFromCart, minusProductFromCart, changeProductCountFromCart } from '../../actions/app_cart';

const styles = theme => ({
  root: {
    flex: 0.3,
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  input: {
      width: "40px",
      fontSize: "1.8rem",
      textAlign: "center",
  }
});

class NumberInput extends React.Component {
  constructor(props){
      super(props);
      this.state ={
          number: this.props.initNumber,
          min: this.props.minMumber,
          max: this.props.maxNumber,
      }
      this.handleOnChange = this.handleOnChange.bind(this);
      this.onRemoveClick = this.onRemoveClick.bind(this);
      this.onAddClick = this.onAddClick.bind(this);
  }


  handleOnChange(e){
    const {dispatch, productId} = this.props;
    
    if(e.target.value < 1){
      return this.setState({
        number: 1
      })
    }else{
      dispatch(changeProductCountFromCart(productId, e.target.value));
    }
    return this.setState({
      number: e.target.value
    })
    
    
    
  }

  onRemoveClick(){
    const {dispatch, productId} = this.props;
    let number =  this.state.number;
    number--;
    dispatch(minusProductFromCart(productId));
    if(number<1){
      return this.setState({
        number: 1
      })
    }
    return this.setState({
      number
    })
  }

  onAddClick(){
    const {dispatch, productId} = this.props;
    let number =  this.state.number;
    number++;
    dispatch(plusProductFromCart(productId));
    if(number<1){
      return this.setState({
        number: 1
      })
    }
    return this.setState({
      number
    })
  }

  render(){
      const {classes} = this.props;
    return (
      <div className={classes.root}>
          <Remove onClick={this.onRemoveClick}/>
          <Input
            id="number"
            
            value={this.state.number}
            type="number"
            min="1"
            onChange={(e)=>{this.handleOnChange(e)}}
            classes = {{input:classes.input}}
            style={{
                textAlign: "center",
                flex: 1
            }}
          
        />
        <Add onClick={this.onAddClick}/>
      </div>
    );
  }
  
}

NumberInput.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
  return {
    cart: state.AppCart,
  }
}

export default connect(mapToState)(withStyles(styles)(NumberInput));