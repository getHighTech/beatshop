import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setAppLayout } from '../../actions/app';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  card:{
    width:'92%',
    marginLeft:'4%',
    marginTop:'4%',
    borderRadius:8
  },
});
class Withdraw extends React.Component{
  state = {
  number: '',

  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount(){
    const { dispatch, layout } = this.props;
    console.log(this.props);
    
    if(layout.title!=='提现界面'){
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/money", 
                title: "提现界面", 
                hasCart: false, 
                hasBottomNav: false, 
                hasGeoLoc: false,
                hasEditor: false, 
                hasSearch: false,
            }
        ));
    }
  }
  render(){
    const { classes } = this.props;

    return(
      <div>
        <Card className={classes.card}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
            id="number"
            label="Number"
            value={this.state.number}
            onChange={this.handleChange('number')}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          </form>
        </Card>
        <Card className={classes.card}>
          提现记录
        </Card>
      </div>
    )
  }
}

function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

Withdraw.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapToState)(withStyles(styles)(Withdraw))
