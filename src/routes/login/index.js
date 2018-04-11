
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { setAppLayout } from '../../actions/app';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { getSMSCode } from '../../actions/users';
import {testPhone} from '../../tools/regValid'
import Snackbar from "material-ui/Snackbar";
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "white",
    width: "100%",
    maxWidth: "400px",
    position: "relative",
    top: "30px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "90%",

  },button: {
    margin: theme.spacing.unit,
    color: "white",
  },
});
//倒计时
let timers =[]

class AppLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      validDisabled: false,
      currentTime: 60,
      mobile: "",
      mobileError: false,
      SMSError: false,
      mobileLabel: "手机号",
      SMSLabel: "验证码",
      SMSCode: "",
    }
  }

  
  componentDidMount(){
    const { dispatch, user } = this.props;
    dispatch(setAppLayout(
      {
          isBack: true, 
          backTo: "/", 
          title: "手机验证码登录", 
          hasCart: false, 
          hasBottomNav: false, 
          hasGeoLoc: false,
          hasEditor: false, 
          hasSearch: false,
          snackContent: "",
          snackOpen: false
      }
  ));
  }
  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };
  startValidtimeOut(){
    if(!testPhone(this.state.mobile)){
      this.setState({
        mobileError: true,
        mobileLabel: "手机号格式错误" 
      })

      return false;
    }
    const { dispatch }  = this.props;
    this.setState({
      validDisabled: true,
    })
    dispatch(getSMSCode(this.state.mobile));
    for(var i = 0; i < 60; i++ ){
        
        let timer = setTimeout(() => {
          console.log(i--);
          this.setState({
            currentTime: i,
          })
          if(i===0){
            this.setState({
              currentTime: 60,
              validDisabled: false,
            })
            
          }
        }, 1000*i);
        timers.push(timer);
     
    }
  }

  componentWillUnmount(){
    timers.forEach(timer => {
      clearTimeout(timer);
    })
  }
  componentWillReceiveProps(nextProps){
    const {user} = nextProps;
    if(user.SMSCodeStatus === "sending"){
      return this.setState({
        snackOpen: true,
        snackContent: "正在发送验证码"
      })
      
    }
    if(user.SMSCodeStatus === "success"){
      return this.setState({
        snackOpen: true,
        snackContent: "验证码发送成功"
      })
    }
    if(user.SMSCodeStatus === "failed"){
      return this.setState({
        snackOpen: true,
        snackContent: "验证码获取太频繁，请稍后重试"
      })
    }
    
  }
  handleOnChange(e, item){
    this.setState({
      mobileError: false,
      mobileLabel: "手机号",
      SMSError: false,
      SMSLabel: "验证码" 
    })
    if(item === "mobile"){
      this.setState({
        mobile: e.target.value
      })
    }
    if(item === "SMS"){
      this.setState({
        SMSCode: e.target.value
      })
    }
    
    
  }
  handleLoginBtnClick(){
    this.setState({
      mobileError: false,
      mobileLabel: "手机号",
      SMSError: false,
      SMSLabel: "验证码" 
    })
    if(!testPhone(this.state.mobile)){
      this.setState({
        mobileError: true,
        mobileLabel: "手机号格式错误" 
      })

      return false;
    }
    if(this.state.SMSCode===""){
      this.setState({
        SMSError: true,
        SMSLabel: "验证码不得为空" 
      })

      return false;
    }
    
  }
  render(){
    const { classes, history } = this.props;
    const { 
      validDisabled, currentTime, mobileError,
       SMSError, mobileLabel, SMSLabel, snackOpen, snackContent } = this.state;
    return (
      <div style={{
            display: 'flex',
          flexWrap: 'wrap',
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: "5px"
          }}>
          <form className={classes.container} noValidate autoComplete="off">
          <TextField required={!mobileError} error={mobileError}
            id="mobile-input"
            label={mobileLabel}
            className={classes.textField}
            type="text"
            autoComplete="current-password"
            onChange={(e)=>this.handleOnChange.bind(this)(e, "mobile")}
          /><br/>
         <div style={{width: "93%", display: "flex"}}>
         <TextField required={!SMSError} error={SMSError}
            style={{width: "50%"}}
            id="sms-code-input"
            label={SMSLabel}
            className={classes.textField}
            type="text"
            autoComplete="current-password"
            onChange={(e)=>this.handleOnChange.bind(this)(e, "SMS")}
          />
            <Button style={{color: validDisabled? "black": "white"}} 
            disabled={validDisabled} variant="raised" color="secondary" size="small"
             className={classes.button} onClick={()=>this.startValidtimeOut()}>
             {validDisabled? currentTime+"秒后重新获取": "获取验证码"}
             </Button><br/>
         </div><br/>
         <Button onClick={this.handleLoginBtnClick.bind(this)} variant="raised" color="primary" className={classes.button} fullWidth={true}>登录/注册</Button>
         <div><br/>使用密码用户名方式登录?<Button onClick={()=>history.push("/login/password")}  color="secondary">前往</Button></div>
         <div><br/>使用密码用户名注册?<Button  color="secondary">立刻注册</Button></div>
         
          
          </form>
          <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={snackOpen}
              onClose={this.handleSnackClose}
              SnackbarContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span style={{width: "40%"}} id="message-id">{snackContent}</span>} 
             
          />
      </div>
    );
  }
  
}

AppLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
  return {
    user: state.AppUser
  }
}

export default connect(mapToState)(withStyles(styles)(AppLogin));