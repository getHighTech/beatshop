import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MyItems from '../../components/my/MyItems';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { appShowMsgAndInjectDataReact } from '../../actions/app';
import { loadOneOrder } from '../../actions/orders';
import { setAppLayout } from '../../actions/app';

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
  }
};


class MyIndex extends React.Component{
  componentDidMount(){
    const { dispatch, match, layout } = this.props;
    console.log(this.props);
    
    if(layout.title!=='个人中心'){
        dispatch(loadOneOrder(match.params.id));
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
    const { classes, dispatch } = this.props;
    return (
      <div className={classes.row}>

        <br/>
        <MyItems /><br/>
        
        <Button onClick={()=>{
          console.log("logout");
          dispatch(appShowMsgAndInjectDataReact("logout", "logout_success", 2360))
          
        }}  variant="raised" color="primary" className={classes.button} fullWidth={true}>退出登录</Button>
        
      </div>
    );
  }
}

MyIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapUserToState(state){
  return {
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapUserToState)(withStyles(styles)(MyIndex));
