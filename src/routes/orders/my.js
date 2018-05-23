import React from 'react'
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({})

class MyOrders extends React.Component{

  componentDidMount(){
    const { dispatch, layout } = this.props;
    
    if(layout.title!=='我的订单'){
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/my", 
                title: "我的订单", 
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
    return(
      <div>
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

export default connect(mapToState)(withStyles(styles)(MyOrders));