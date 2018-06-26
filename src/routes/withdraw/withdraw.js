import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setAppLayout, appShowMsgAndInjectDataReactWithPath, appShowMsg } from '../../actions/app';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { loadUserBankcards } from '../../actions/bankcards';
import LoadingItem from '../../components/public/LoadingItem';
import { getStore } from '../../tools/localStorage';
import { loadMoneyPage } from '../../actions/balances';


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
    fontWeigh:900
    },
    textField:{
      marginLeft:'4%',
      marginTop:'4%',
      width:'92%'
    }
});

class Withdraw extends React.Component{
  state = {
  number: '',
  bankcard: '1',
  balanceLoad: false,
  ableToWithDrawAmount: 0,
  };

  handleChange = (name, event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  withdraw = () => {
    const {dispatch, bankcards} = this.props;
    console.log(bankcards);
    
    let bankcard = bankcards[parseInt(this.state.bankcard, 10)];
    if(bankcards.length === 1){
      bankcard = bankcards[0];
    }
    let amount = this.state.number;

    if(amount > this.state.ableToWithDrawAmount){
      dispatch(appShowMsg("too_monay_withdraw_allow", 1200));
      return false;
    }

    if(amount%100 !== 0) {
      dispatch(appShowMsg("withdraw_mustbe_persent", 1200));
      return false
    }

     let  withdrawParams = {
       bank: bankcard,
       amount, 
       userId: getStore("userId"),
       bankId: bankcard._id
     }
    dispatch(appShowMsgAndInjectDataReactWithPath(
      "revoke_withdraw",
     "revoke_withdraw_success",
    1500, withdrawParams, "/money"))
     

  }


  componentDidMount(){
    const { dispatch, layout, bankcards, money } = this.props;
    
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
    if(money.balance.amount){
      this.setState({
        balanceLoad: true,
        ableToWithDrawAmount: this.ableToWithDrawAmount()
      })
    }
    if(bankcards === "unloaded" && !this.state.balanceLoad){
        dispatch(loadMoneyPage(getStore('userId')));
        dispatch(loadUserBankcards());
        
      }
  }
  ableToWithDrawAmount= () =>{
    const { money } = this.props;
    let amount = money.balance.amount;
    console.log(amount);
    
    amount = amount - (amount%10000);
    console.log(amount);
    
    return amount/100
  }
  render(){
    const { classes, bankcards } = this.props;
    console.log(this.state);
    
    if(bankcards === "unloaded" || !this.state.balanceLoad){
        return <LoadingItem />
    }
    return(
      <div>
        <Card className={classes.card}>
          <form className={classes.container} noValidate autoComplete="off">
            <div className={classes.totolMoney}>
              <div className={classes.moneyText}>可提现金额</div>
              <div className={classes.moneyNumber}>￥{this.state.ableToWithDrawAmount}</div>
            </div>
            <TextField
            id="number"
            label="提现金额"
            defaultValue={this.state.number}
            onChange={(e)=>this.handleChange('number', e)}
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
              onChange={(e)=>this.handleChange('bankcard', e)}
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
              {bankcards.map((option, index) => (
                <option key={index} value={index}>
               {option.accountNumber}
                  
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
    user: state.AppUser,
    layout: state.AppInfo.layout,
    bankcards: state.UserBankcards.cards,
    money: state.UserMoney,
  }
}

Withdraw.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapToState)(withStyles(styles)(Withdraw))