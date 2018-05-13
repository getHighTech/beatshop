
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAppLayout } from '../../actions/app';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { createNewContact } from '../../actions/contacts';

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
     helperText: "",
     allFeildError: false,
    }
  }

  componentDidMount(){
    const { dispatch, layout } = this.props;
    if(layout.title!="新建联系方式"){
      dispatch(setAppLayout(
        {
            isBack: true, 
            backTo: "/my/contacts", 
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
       if(
         !contact.name || !contact.address
         || !contact.mobile || !contact.carNumber
      ){
        console.error("fields require", contact);
        this.setState({
          helperText: "此处为必须项",
          allFeildError: true,
         });
        return false;
      }
      const { dispatch } = this.props;
      console.log("多次执行？");
      
      dispatch(createNewContact(contact));
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
          fullWidth required error={this.state.allFeildError}
          margin="normal"
          value={this.state.name}
          helperText={this.state.helperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "name")}
          
        />
        <TextField
          id="full-width"
          label="电话号码"
          fullWidth required  error={this.state.allFeildError}
          margin="normal"
          value={this.state.mobile}
          helperText={this.state.helperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "mobile")}
          
        />
        <TextField
          id="full-width"
          label="收获地址"
          fullWidth required  error={this.state.allFeildError}
          margin="normal"
          value={this.state.address}
          helperText={this.state.helperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "address")}
        />
        <TextField
          id="full-width"
          label="车牌号码"
          fullWidth required  error={this.state.allFeildError}
          margin="normal"
          value={this.state.carNumber}
          helperText={this.state.helperText}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "carNumber")}
        /><br/>
        <Button onClick={this.handleSubmitBtn.bind(this)} variant="raised" fullWidth={true}>保存</Button>        
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