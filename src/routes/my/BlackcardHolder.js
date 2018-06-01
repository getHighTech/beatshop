import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { setAppLayout } from '../../actions/app';


const styles = theme => ({
  root:{

  },
  card:{
    width:'92%',
    marginLeft:'4%',
    marginTop:'4%',
    paddingTop:10,
    paddingBottom:10,
    fontSize:13,
  },
  header:{
    display:'flex',
    alignItems:'center',
    fontSize:13,
    marginBottom:10,
    marginTop:10
  },
  headerText:{
    marginLeft:3
  },
  text:{
    marginBottom:10
  }
})
class BlackcardHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){
    const { dispatch, match, layout } = this.props;

    
    if(layout.title!=='我的卡包'){
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/my", 
                title:'我的卡包',
                hasCart: false, 
                hasBottomNav: false, 
                hasGeoLoc: false,
                hasEditor: false, 
                hasSearch: false,
            }
        ));
    }

  }
  render() {
    const { classes } = this.props
    return ( 
      <div className={classes.root}>
        <div className={classes.card}>
          <div className={classes.header}>
              <img alt='会员卡Icon' style={{height:17}} src={require('../../components/imgs/member.svg')}/>
              <div className={classes.headerText}>我的会员卡</div>
          </div>
          <div className={classes.img}>
            <img alt='会员卡图片' style={{height:'auto',width:'100%'}} src={require('../../components/imgs/blackcard.png')}/>
          </div>
          <div className={classes.header}>
              <img alt='会员信息Icon' style={{height:17}} src={require('../../components/imgs/data.svg')}/>
              <div className={classes.headerText} >会员资料</div>
          </div>
          <div className={classes.bottom}>
            <div className={classes.text}>
              成为尊享会员时间：2017-03-20 10:13
            </div>
            <div className={classes.text}>
              尊享会员车牌号：川A12345
            </div>
          </div>
          <div className={classes.header}>
              <img alt='会员说明Icon' style={{height:17}} src={require('../../components/imgs/explain.svg')}/>
              <div className={classes.headerText} >会员权益介绍</div>
          </div>
          <div className={classes.bottom}>
            <div className={classes.text}>
              1.可以在万人车汇平台上开设自己的店铺
            </div>
            <div className={classes.text}>
              2.尊享万车汇俱乐部及其联盟商家汽车服务最低价格优惠，产品服务特惠不定期更新
            </div>
            <div className={classes.text}>
              3.会员有效期从购卡当日算起，一年内有效，过期权益不可使用
            </div>
            <div className={classes.text}>
              4.会员卡所有的解释权最终归万人车汇所有
            </div>
          </div>
        </div>
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

export default connect(mapToState)(withStyles(styles)(BlackcardHolder));