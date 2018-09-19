import React from 'react';
import QRCode from 'qrcode-react'
import { setAppLayout } from '../../actions/app';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { loadShareProdcut } from '../../actions/products'
import {wechatShare} from '../../helper/wechatShare.js'

const styles = theme => ({
  header:{
    textAlign:'center'
  },
  root:{
    backgroundColor:'#fff'
  },
  slogon:{
    fontSize:13,
    fontWeight:900,
    paddingBottom:10,
    marginTop: -60
  },
  description:{
    fontSize:13,
    width:'60%',
    marginLeft:'20%',
    textAlign:'center',
    paddingTop:10,
    paddingBottom:10
  },
  qecode:{
    textAlign:'center',
    paddingTop:20,
    paddingBottom:20
  }
})


class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url:''
     }
  }


  componentDidUpdate() {
    this.update()
  }
  componentWillMount(){

    this.update()
  }
  componentDidMount(){
    this.update()
    const { dispatch, layout } = this.props;

    if(layout.title!=='分享页面'){
      if(this.props.match.params.id){
        dispatch(loadShareProdcut(this.props.match.params.id))
        // console.log(this.props.product);
        // wechatShare();
      }
      dispatch(setAppLayout(
          {
              isBack: true,
              backTo: "/my/products",
              title: "分享页面",
              hasCart: false,
              hasBottomNav: false,
              hasGeoLoc: false,
              hasEditor: false,
              hasSearch: false,
          }
      ));

  }
    // this.setState({
    //   url:'https://wanchehui/#/products/' + id
    // })


  }


  update() {
    const canvas = document.querySelector('.qrCode canvas');
    if(canvas){
      const img = new Image();
      console.log(canvas)
      const imgSrc =  canvas.toDataURL()
      const wrap =  document.querySelector('.qrCode')
      wrap.innerHTML = `<img src="${imgSrc}" width="100px" height="100px">`
    }
  }
  render() {
    const { classes,product } = this.props
    console.log(product)
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <img alt='logo' src={require('../../components/imgs/WechatIMG171.png')} style={{height:200,marginTop: -56,}}/>
          <div className={classes.slogon}>与其在别处仰望，不如在这里并肩</div>
        </div>
        <div className={classes.cover}>
          <img alt='商品主图' src={product.cover} style={{height:'auto',width:'100%'}}/>
        </div>
        <div className={classes.description}>
          <div>分享二维码或者商品链接</div>
          <div>鲜生活-至万家</div>
        </div>
        <Divider style={{width:'80%',marginLeft:'10%'}}/>
        <div className={`qrCode ${classes.qecode}`}>
          <QRCode value={ 'http://'+window.location.host +'/#/products/'+  this.props.match.params.id} logo={require('../../components/imgs/WechatIMG171.png')}

          />

        </div>
      </div>
     )
  }
}


function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout,
    product: state.ProductShow
  }
}

Share.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapToState)(withStyles(styles)(Share))
