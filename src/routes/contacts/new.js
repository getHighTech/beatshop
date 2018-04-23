
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
     carNumber: ""
    }
  }

  componentDidMount(){
    const { dispatch } = this.props;
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

  handleSubmitBtn(){
       let contact = this.state;
       if(
         !contact.name || !contact.address
         || !contact.mobile || !contact.carNumber
      ){
        console.error("fields require", contact);
        
        return false;
      }
      const { dispatch } = this.props;
      console.log("多次执行？");
      
      dispatch(createNewContact(contact));
      this.setState({
        name: "",
        mobile: "",
        address: "",
        carNumber: ""
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
          fullWidth required
          margin="normal"
          value={this.state.name}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "name")}
          
        />
        <TextField
          id="full-width"
          label="电话号码"
          fullWidth required
          margin="normal"
          value={this.state.mobile}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "mobile")}
          
        />
        <TextField
          id="full-width"
          label="收获地址"
          fullWidth required
          margin="normal"
          value={this.state.address}
          onChange={(e)=>this.handleInputChange.bind(this)(e, "address")}
        />
        <TextField
          id="full-width"
          label="车牌号码"
          fullWidth required
          margin="normal"
          value={this.state.carNumber}
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
    userContacts: state.UserContacts
  }
}

export default connect(mapToState)(withStyles(styles)(NewContact));