import React from 'react';
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Result from './result';
const styles = theme => ({})

class PayResult extends React.Component{

  componentDidMount(){
    const { dispatch, match, layout } = this.props;

    
    if(layout.title!=='支付结果'){
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/my/orders", 
                title:'支付结果',
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
      const { layout,match} = this.props;
    return(
      <div>
          {match.params.status === "success"&&
            <div><Result status='success'/></div>
        }
        {match.params.status === "cancel"&&
            <div><Result status='cancel' /></div>
        }
        {match.params.status === "fail"&&
            <div><Result status='fail'/></div>
        }
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