import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { setAppLayout } from '../../actions/app';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Snackbar from "@material-ui/core/Snackbar";
import { userLogin } from '../../actions/process/login';
import  LinearProgress  from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import { getStore } from '../../tools/localStorage';

import InputAdornment from '@material-ui/core/InputAdornment';

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

  },  progress: {
    margin: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "90%",

  },button: {
    margin: theme.spacing.unit,
    color: "white",
  },
  root:{
    backgroundColor:'#A1C2B4',
    height:700
  },

  card:{
    width:'92%',
    marginLeft:'4%',
  }
});
//倒计时
let timers =[]

class ResetPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      validDisabled: false,
      currentTime: 60,
      username: "",
      password: "",
      usernameError: false,
      passwordError: false,
      usernameLabel: "用户名/手机号",
      passwordLabel: "密码",
    }
    this.handleLoginBtnClick = this.handleLoginBtnClick.bind(this);
  }


  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(setAppLayout(
      {
          isBack: true,
          backTo: "/",
          title: "重置密码",
          hasCart: false,
          hasBottomNav: false,
          hasGeoLoc: false,
          hasEditor: false,
          hasSearch: false,
          snackContent: "",
          snackOpen: false,
          buttonText: "登录"
      }
  ));
  }
  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  componentWillUnmount(){
    timers.forEach(timer => {
      clearTimeout(timer);
    })
  }

  handleOnChange(e, item){
    this.setState({
      usernameError: false,
      usernameLabel: "用户名/手机号",
      PasswordError: false,
      PasswordLabel: "密码"
    })
    if(item === "username"){
      this.setState({
        username: e.target.value
      })
    }
    if(item === "password"){
      this.setState({
        password: e.target.value
      })
    }


  }
  handleLoginBtnClick(){
    const {location, currentCity} = this.props
    this.setState({
      usernameError: false,
      usernameLabel: "用户名/手机号",
      passwordError: false,
      passwordLabel: "密码"
    })
    if(this.state.username===""){
      this.setState({
        usernameError: true,
        usernameLabel: "此项不得为空"
      })

      return false;
    }
    if(this.state.password===""){
      this.setState({
        passwordError: true,
        passwordLabel: "密码不得为空"
      })

      return false;
    }
    let position = location.position;
    let address = location.addressComponent;
    let city = currentCity;
    let loginParams = {
      username: this.state.username,
      password: this.state.password,
      position,
      address,
      city,
    }

    const { dispatch } = this.props;

    return dispatch(userLogin("password", loginParams));

  }
  componentWillReceiveProps(nextProps){
    const {user, history} = nextProps;
    if(user.loginStatus === "untrigger"){
      return this.setState({
        buttonText: "登录",
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
        let Goto = getStore('Goto');
        console.log(Goto)
        Goto ?  history.push(`/products/${Goto}`) : history.push(user.urlBeforeLogined)
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
  render(){
    const { classes, history, user } = this.props;
    const {
       usernameError,
       passwordError, usernameLabel, passwordLabel, snackOpen, snackContent } = this.state;
    return (
          <div className={classes.root}>
            <div className={classes.logo}>
              <img style={{width:'100%'}}alt="LOGO" src={require('../../components/imgs/xianzhilogo.jpg')}  />
            </div>
            <Card className={classes.card}>
              <CardContent>
                <div style={{
                    display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: "5px"
                  }}>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField required={!usernameError} error={usernameError}
                    id="username-input"
                    label={usernameLabel}
                    className={classes.textField}
                    type="text"
                    autoComplete="current-password"
                    onChange={(e)=>this.handleOnChange.bind(this)(e, "username")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}

                  /><br/>
                  <TextField required={!passwordError} error={passwordError}
                      id="password-input"
                      label={passwordLabel}
                      className={classes.textField}
                      type="password"
                      autoComplete="current-password"
                      onChange={(e)=>this.handleOnChange.bind(this)(e, "password")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),
                      }}
                    /><br/>
                  <div style={{ flexGrow: 1, width: "100%"}}>
                      {(user.loginStatus === "loading")&& <LinearProgress color="secondary" />}
                    </div>
                  <Button
                  onClick={this.handleLoginBtnClick}
                  disabled={(user.loginStatus === "loading" || user.loginStatus === "success")? true : false}
                  variant="raised" color="secondary"
                  style={{color: (user.loginStatus === "loading" || user.loginStatus === "success")? "black" : "white"}}
                  className={classes.button}
                  fullWidth={true}>
                  {this.state.buttonText}
                  </Button>


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
              </CardContent>
            </Card>
          </div>
    );
  }

}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
  return {
    user: state.AppUser,
    location: state.AppInfo.amap,
    currentCity: state.AppInfo.currentCity
  }
}

export default connect(mapToState)(withStyles(styles)(ResetPassword));
