import React from 'react'
import Bankcard from '../../components/bankcard/'
import { loadOneOrder } from '../../actions/orders';
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
const styles = theme => ({})

class BankcardsList extends React.Component{

  componentDidMount(){
    const { dispatch, match, layout } = this.props;
    console.log(this.props);
    
    if(layout.title!=='我的银行卡'){
        dispatch(loadOneOrder(match.params.id));
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/my", 
                title: "我的银行卡", 
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
        <Bankcard isBankcard={true} cardData={{title:"储蓄卡",subtitle:'支行地址:厦门松柏支行',carNumber:'565223268689562356',}}/>
        <Bankcard isBankcard={false} cardData={{title:"杨志强",subtitle:'已在万人车汇获得佣金',carNumber:'￥9562356',}}/>
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

export default connect(mapToState)(withStyles(styles)(BankcardsList));