
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { setAppLayout } from '../../actions/app';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getSMSCode } from '../../actions/users';
import {testPhone} from '../../tools/regValid'
import Snackbar from "@material-ui/core/Snackbar";
import { openAppMsg } from '../../actions/app_msg';
import { userLogin } from '../../actions/process/login';

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
      buttonText: "登录/注册"
    }
  }

  
  componentDidMount(){
    const { dispatch } = this.props;
    if (this.props.match.params.msg) {
      dispatch(openAppMsg("NEED TO LOGIN", 1200))
      
      
    }
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
    let timer = null;
    let countBack = 0
    let exeLoop = () => {
      if(countBack === 60){
        clearInterval(timer);
        this.setState({
          validDisabled: false,
        })
      }
      this.setState({
        currentTime: 60-countBack,
      })
     
    }
    timer = setInterval(()=>{
      exeLoop();
      countBack++;
    }, 1000);
  }

  componentWillUnmount(){
    timers.forEach(timer => {
      clearTimeout(timer);
    })
  }
  componentWillReceiveProps(nextProps){
    const {user, history} = nextProps;
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
    if(user.loginStatus === "untrigger"){
      return this.setState({
        buttonText: "登录/注册",
      })
    }
    if(user.loginStatus==="loading"){
      return this.setState({
        buttonText: "正在登录",
      })
    }
    if(user.loginStatus==="success"){
       this.setState({
        buttonText: "登录成功, 开始跳转",
      })
      return setTimeout(()=>{
        history.push("/");
      },1000)

    }

    if(user.loginStatus==="failed"){
      if(user.loginFailReason === "USER NOT FOUND"){
        return this.setState({
          usernameError: true,
          usernameLabel: "用户不存在" 
        })
      }
      if(user.loginFailReason === "LOGIN PASS WRONG"){
        return this.setState({
          passwordError: true,
          passwordLabel: "密码错误" 
        })
      }
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
    const { dispatch, location, currentCity } = this.props;
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
    let position = location.position;
    let address = location.addressComponent;
    let city = currentCity;
    let loginParams = {
      mobile: this.state.mobile,
      position,
      address,
      city,
    }
    return dispatch(userLogin("mobileSMS", loginParams));
  }
  render(){
    const { classes, history, user } = this.props;
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
         <Button onClick={this.handleLoginBtnClick.bind(this)} variant="raised" color="primary" className={classes.button} fullWidth={true}>
         {this.state.buttonText}
         </Button>
         <div><br/>使用密码用户名方式登录?<Button onClick={()=>history.push("/password-login")}  color="secondary">前往</Button></div>
         
          
          </form>
          <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={snackOpen}
              disabled={(user.loginStatus === "loading" || user.loginStatus === "success")? true : false}
              onClose={this.handleSnackClose}
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
    user: state.AppUser,
    location: state.AppInfo.amap,
    currentCity: state.AppInfo.currentCity
  }
}

export default connect(mapToState)(withStyles(styles)(AppLogin));