import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MyItems from '../../components/my/MyItems';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { appShowMsgAndInjectDataReact } from '../../actions/app';
import { setAppLayout } from '../../actions/app';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { getStore } from '../../tools/localStorage.js';
// import {getMyOrder} from '../../services/http/axios.js';
const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    backgroundSize: '100%',
    // backgroundColor: cyan[100],
    paddingTop: "30px"
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  button: {
      width: "90%"
  },
  card:{
    width:'94%',
    marginLeft:'3%',
    marginTop:'3%',
    borderRadius:8,
    height:500

  },
  botton:{
    textAlign:'center'
  }
};


class MyIndex extends React.Component{
  componentDidMount(){
    // getMyOrder();
    const { dispatch, layout } = this.props;

    if(layout.title!=='个人中心'){
        dispatch(setAppLayout(
            {
                isBack: true,
                backTo: "/",
                title: "个人中心",
                hasCart: false,
                hasBottomNav: true,
                hasGeoLoc: false,
                hasEditor: false,
                hasSearch: false,
            }
        ));
    }

  }
  render(){
    const { classes, dispatch, user , wechat} = this.props;
   
    return (
      <Card className={classes.card}>
        <CardContent>
        <br/>
        <MyItems user={user} history={this.props.history} /><br/>

        <div className={classes.botton}>
          <Button onClick={()=>{
            dispatch(appShowMsgAndInjectDataReact("logout", "logout_success", 2360))

          }}  variant="raised" color="primary" className={classes.button} fullWidth={true}>退出登录</Button>
          <br/>
        <br/>
        <br/>
        <br/> <br/>
        <br/> <br/>
        <br/>
        </div>
        </CardContent>
        
      </Card>
    );
  }
}

MyIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapUserToState(state){
  return {
    user: state.AppUser,
    layout: state.AppInfo.layout,
    wechat: state.WechatUser.profile
  }
}

export default connect(mapUserToState)(withStyles(styles)(MyIndex));
