
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Add from "material-ui-icons/AddCircle";
import Remove from "material-ui-icons/RemoveCircle"
import Input from "material-ui/Input";
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
      this.onChange = this.onChange.bind(this);
  }
  onChange(){

  }
  onRemoveClick(){
      console.log(this.refs);
      
  }
  render(){
      const {classes} = this.props;
    return (
      <div className={classes.root}>
          <Remove onClick={this.onRemoveClick.bind(this)}/>
          <Input
            id="number"
            
            value={this.state.number}
            type="number"
            classes = {{input:classes.input}}
            style={{
                textAlign: "center",
                flex: 1
            }}
          
        />
        <Add/>
      </div>
    );
  }
  
}

NumberInput.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(NumberInput);