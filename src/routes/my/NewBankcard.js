
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAppLayout, appShowMsgAndInjectDataReactWithPath } from '../../actions/app';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getStore } from '../../tools/localStorage';

const styles = theme => ({
  container: {
    display: 'flex',
    padding: 6,
    maxWidth: 450,
    backgroundColor: "white",
    flexDirection: "column"
  },  
});


class NewBankcard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     name: "",
     cardNumber: "",
     address: "",
     nameHelperText: "",
     cardNumberHelperText: "",
     addressHelperText: "",
     nameFeildError: true,
     cardNumberFeildError: true,
     addressFeildError: true,
    }
  }

  componentDidMount(){
    const { dispatch, layout } = this.props;
    if(layout.title!=="新建银行卡"){
      dispatch(setAppLayout(
        {
            isBack: true, 
            backTo: "/my/bankcards_list", 
            title: "新建银行卡", 
            hasCart: false, 
            hasBottomNav: false, 
            hasGeoLoc: false,
            hasSearch: false,
            hasNewCreate: false,
        }
      ));
    }
   
  }

  handleSubmitBtn(){
       let contact = this.state;
       const { dispatch } = this.props;
       
 
      if(!contact.name){
       this.setState({
         nameHelperText: "此处为必须项",
         nameFeildError: true,
        });
       return false;
     }
     if(!contact.cardNumber){
      this.setState({
        nameHelperText: "此处为必须项",
        cardNumberFeildError: true,
       });
      return false;
    }
    if(!contact.address){
      this.setState({
        addressHelperText: "此处为必须项",
        addressFeildError: true,
       });
      return false;
    }
    let bankCardParams = {
      realName: contact.name,
      accountNumber: contact.cardNumber,
      bankAddress: contact.address,
      userId: getStore("userId"),
    }
    
    dispatch(appShowMsgAndInjectDataReactWithPath(
      "save_user_bankcard", "save_bankcard_success",1350, bankCardParams, "/my/bankcards_list"));
      this.setState({
        name: "",
        cardNumber: "",
        address: "",
        helperText: ""
       });
  }

  handleInputChange(e, feild){
    let inputObj = {};
    inputObj[feild] = e.target.value;
    this.setState(inputObj);

  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="full-width"
          label="开户户头姓名"
          fullWidth required error={this.state.nameFeildError}
          margin="normal"
          value={this.state.name}
          helperText={this.state.nameHelperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "name")}
          
        />
        <TextField
          id="full-width"
          label="银行卡号"
          fullWidth required  error={this.state.cardNumberFeildError}
          margin="normal"
          value={this.state.cardNumber}
          helperText={this.state.cardNumberHelperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "cardNumber")}
          
        />
        <TextField
          id="full-width"
          label="银行开户行（具体到支行）"
          fullWidth required  error={this.state.addressFeildError}
          margin="normal"
          value={this.state.address}
          helperText={this.state.addressHelperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "address")}
        />
        <br/>
        <Button type="button" onClick={this.handleSubmitBtn.bind(this)} variant="raised" fullWidth={true}>保存</Button>        
        </form>
      </div>
    )
  }
  
}

NewBankcard.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
  return {
    user: state.AppUser,
    userContacts: state.UserContacts,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(NewBankcard));