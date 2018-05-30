import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setAppLayout } from '../../actions/app';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  card:{
    width:'92%',
    marginLeft:'4%',
    marginTop:'4%',
    borderRadius:8,
    textAlign:'center'
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  totolMoney:{
    width:'100%',
    backgroundColor:'#FFD740',
    display:'flex',
    justifyContent:'space-between',
    paddingLeft:'4%',
    paddingRight:'4%',
    height:50,
    color:'#fff',
    alignItems:'center',
    paddingLeft:'4%',
    paddingRight:'4%',
    fontWeigh:900
    },
    textField:{
      marginLeft:'4%',
      marginTop:'4%',
      width:'92%'
    }
});
const bankcard = [
  { 
    id:1,
    number: '6226898939191111',
  },
  {
    id:2,
    number: '6226898939192222',
  },
  {
    id:3,
    number: '6226898939193333',
  },
  {
    id:4,
    number: '6226898939194444',
  },
];
class Withdraw extends React.Component{
  state = {
  number: '',
  bankcard:'JPY'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.number,
    });
  };
  withdraw(){
    alert('调取申请提现接口')
  }

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
            <div className={classes.totolMoney}>
              <div className={classes.moneyText}>可提现金额</div>
              <div className={classes.moneyNumber}>￥100</div>
            </div>
            <TextField
            id="number"
            label="提现金额"
            defaultValue={this.state.number}
            onChange={this.handleChange('number')}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
            <TextField
              id="select-currency-native"
              select
              label="银行卡"
              className={classes.textField}
              value={this.state.bankcard}
              onChange={this.handleChange('bankcard')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              helperText="请选择银行卡"
              margin="normal"
            >
              {bankcard.map(option => (
                <option key={option.id} value={option.number}>
                  {option.number}
                </option>
              ))}
            </TextField>
            <Button onClick={this.withdraw} variant="raised" color="primary" className={classes.button}>
              提现
            </Button>
          </form>
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
