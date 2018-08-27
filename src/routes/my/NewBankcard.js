
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
       let regname=/^([\u4e00-\u9fa5]){2,7}$/;
       let cardnumber = contact.cardNumber.replace(/\s/g,'');
       console.log(cardnumber);
       let num =/^\d*$/;
       let address = /^[\u2E80-\u9FFF]+$/;
       let strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";

      if(!contact.name){
       this.setState({
         nameHelperText: "此处为必须项",
         nameFeildError: true,
        });
       return false;
     }
     if (!regname.test(contact.name)) {
       this.setState({
         nameHelperText: "只能输入2-7位中文",
         nameFeildError: true,
        });
       return false;
     }
     if(!contact.cardNumber){
      this.setState({
        cardNumberHelperText: "此处为必须项",
        cardNumberFeildError: true,
       });
      return false;
    }
    if (cardnumber.length < 16 || cardnumber.length>19) {
      this.setState({
        cardNumberHelperText: "银行卡号长度必须在16到19之间",
        cardNumberFeildError: true,
       });
      return false;

    }
    if (!num.exec(cardnumber)) {
      this.setState({
        cardNumberHelperText: "银行卡号必须全为数字",
        cardNumberFeildError: true,
       });
      return false;
    }
    if (strBin.indexOf(cardnumber.substring(0,2))== -1) {
      this.setState({
        cardNumberHelperText: "银行卡号开头6位不符合规范",
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
    if(!address.test(contact.address)){
      this.setState({
        addressHelperText: "只能输入中文",
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
