import React, { Component } from 'react';
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({})

class PayResult extends React.Component{

  componentDidMount(){
    const { dispatch, match, layout } = this.props;
    let title = '';
    if(match.params.status === "success"){
        title = "支付成功";
        
    }
    if(match.params.status === "cancel"){
        title = "支付已经取消";
        
    }
    if(match.params.status === "fail"){
        title = "支付失败";
        
    }
    
    if(layout.title!==title){
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/my/orders", 
                title, 
                hasCart: false, 
                hasBottomNav: false, 
                hasGeoLoc: false,
                hasEditor: false, 
                hasSearch: false,
            }
        ));
    }

  }
  render (){
      const { layout } = this.props;
    return(
      <div>
        <h1>{layout.title}</h1>
            我的所有订单
      </div>
    )
  }
}


function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(PayResult));