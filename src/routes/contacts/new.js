
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAppLayout, appShowMsgAndInjectDataReactWithPath } from '../../actions/app';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import isEmpty from 'lodash.isempty'

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
     nameFeildError: true,
     mobileFeildError: true,
     addressFeildError: true,
     carNumberFeildError: true,
     errors: {},
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

  handleSubmitBtn = e => {
    e.preventDefault()
    let contact = this.state;
    console.log(contact);
    const { dispatch,match } = this.props;
    console.log(match)
    const errors = this.validate()
    if (!isEmpty(errors)) {
      this.setState({
        errors: {...errors}
      })
      return
    }

    delete contact.errors
       
    let contactParams = {
      name: contact.name,
      mobile: contact.mobile,
      address: contact.address,
      carNumber: contact.carNumber
    }
    
    dispatch(appShowMsgAndInjectDataReactWithPath(
      "save_user_contact", "save_contact_success",1350, contactParams, `/my/contacts/orderuse/${match.params.orderId}`));
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
    console.log('inputObj')
    console.log(inputObj)
    this.setState(inputObj);

  }


  validate = () => {
    const {name, mobile , address } = this.state

    const errors = {}
    if (!name || !/^[\u4e00-\u9fa5]{1}\S/.test(name)) {
      errors.name = '用户名格式错误'
    }
    if (!mobile || !/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile)) {
      errors.mobile = '手机号格式不正确'
    }
    if (!address || !/^[\u4e00-\u9fa5]{1}\S/.test(address)) {
      errors.address = '地址输入格式错误'
    }
    return errors
  }

  render(){
    const { classes } = this.props;
    const { errors } = this.state;
    console.log(this.state)
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="full-width"
          label="您的姓名"
          fullWidth required error={this.state.nameFeildError}
          margin="normal"
          value={this.state.name}
          helperText={errors.name}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "name")}
        />
        <TextField
          id="full-width"
          label="电话号码"
          fullWidth required  error={this.state.mobileFeildError}
          margin="normal"
          value={this.state.mobile}
          helperText={errors.mobile}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "mobile")}
          
        />
        <TextField
          id="full-width"
          label="收货地址"
          fullWidth required  error={this.state.addressFeildError}
          margin="normal"
          value={this.state.address}
          helperText={errors.address}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "address")}
        />
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