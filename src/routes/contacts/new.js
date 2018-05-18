
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAppLayout, appShowMsgAndInjectDataReactWithPath } from '../../actions/app';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    padding: 6,
    maxWidth: 450,
    backgroundColor: "white",
    flexDirection: "column"
  },  
});


class NewContact extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     name: "",
     mobile: "",
     address: "",
     carNumber: "",
     nameHelperText: "",
     mobileHelperText: "",
     addressHelperText: "",
     carNumberHelperText: "",
     nameFeildError: true,
     mobileFeildError: true,
     addressFeildError: true,
     carNumberFeildError: true,
    }
  }

  componentDidMount(){
    const { dispatch, layout } = this.props;
    if(layout.title!=="新建联系方式"){
      dispatch(setAppLayout(
        {
            isBack: true, 
            backTo: "/my/contacts/orderuse", 
            title: "新建联系方式", 
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
     if(!contact.mobile){
      this.setState({
        nameHelperText: "此处为必须项",
        mobileFeildError: true,
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
    let contactParams = {
      name: contact.name,
      mobile: contact.mobile,
      address: contact.address,
      carNumber: contact.carNumber
    }
    
    dispatch(appShowMsgAndInjectDataReactWithPath(
      "save_user_contact", "save_contact_success",1350, contactParams, "/my/contacts/orderuse"));
      this.setState({
        name: "",
        mobile: "",
        address: "",
        carNumber: "",
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
          label="您的姓名"
          fullWidth required error={this.state.nameFeildError}
          margin="normal"
          value={this.state.name}
          helperText={this.state.nameHelperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "name")}
          
        />
        <TextField
          id="full-width"
          label="电话号码"
          fullWidth required  error={this.state.mobileFeildError}
          margin="normal"
          value={this.state.mobile}
          helperText={this.state.mobileHelperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "mobile")}
          
        />
        <TextField
          id="full-width"
          label="收获地址"
          fullWidth required  error={this.state.addressFeildError}
          margin="normal"
          value={this.state.address}
          helperText={this.state.addressHelperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "address")}
        />
        <TextField
          id="full-width"
          label="车牌号码(如购买黑卡，此项目必须填写)"
          fullWidth  error={this.state.carNumberFeildError}
          margin="normal"
          value={this.state.carNumber}
          helperText={this.state.carNumberHelperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "carNumber")}
        /><br/>
        <Button type="button" onClick={this.handleSubmitBtn.bind(this)} variant="raised" fullWidth={true}>保存</Button>        
        </form>
      </div>
    )
  }
  
}

NewContact.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
  return {
    user: state.AppUser,
    userContacts: state.UserContacts,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(NewContact));