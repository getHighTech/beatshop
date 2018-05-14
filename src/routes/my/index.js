import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MyItems from '../../components/my/MyItems';
import cyan from 'material-ui/colors/cyan';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { appShowMsgAndInjectDataReact } from '../../actions/app';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    backgroundSize: '100%',
    backgroundColor: cyan[100],
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
    user: state.AppUser
  }
}

export default connect(mapUserToState)(withStyles(styles)(MyIndex));
