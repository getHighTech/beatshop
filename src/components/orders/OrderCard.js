import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { cancelOrder } from '../../actions/app_orders'
import {collectOrder} from '../../actions/app_orders'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getStore } from '../../tools/localStorage.js';
import { getToken } from '../../actions/token';
import axios from 'axios';
import serverConfig  from '../../config/server';


const styles = {

  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root:{
    width:'100%',
    marginTop:10,
  },
  shopName:{
    fontSize:12
  },
  orderStatus:{
    fontSize:12,
    textAlign:'right',
    color:'#ff5722'
  },
  productName:{
    fontSize:13,
  },
  price:{
    color:'#ff5722'

  },
  cardBottom:{
    textAlign:'right',
    fontSize:9,
  },
  finalPrice:{
    fontSize:15,
    color:'#ff5722'

  },
  button:{
    marginTop:12,
    marginLeft:12
  },
  orderButton:{
    marginBottom:10
  }
};
class OrderCard extends React.Component{
  state={
    open:false,
    localOrder:'',
    localUserId:''
  }

  cancelOrder = (orderId,userId)  => {
    console.log(orderId)
    console.log(userId)
      // this.props.dispatch(cancelOrder(orderId,userId))
      const appName='xianzhi';
      axios.get(`${serverConfig.server_url}/api/order/status_confirmed`,{
         params: {
               userId,
               orderId,
               appName,
           }
         }
       ).then((res)=>{
      //  dispatch(getConfirmedOrder(res.data.order))
       let value = res.data.order;
       this.props.aaa(value)

           })
           .catch((err)=>{
             console.log(err)
           })
  }

  _confirmOrder = (orderId,userId) => {

  }
  handlePayClick = async(orderId,userId,totalAmount,orderCode) => {
    var urlencode = require('urlencode');
    let key = await getToken()
    let token = key.token;
    let uuid = key.uuid
    let from_url =
    `http://xianzhi.10000cars.cn/api/v1/wechat/payback/show?fee=${totalAmount}&appname=xianzhi&order=${orderCode}&uuid=${uuid}&token=${token}`;

    from_url = urlencode(from_url);
    console.log(from_url);
    window.location.assign('http://xianzhi.10000cars.cn/app/getopenid/'+from_url);
  }





  handleCollect = (orderId,userId) => {
    this.setState({
      open:true,
      localOrder:orderId,
      localUserId:userId
    })


  }

  handleClose = () =>{
    this.setState({
      open:false,
      localUserId:'',
      localOrder:''
    })
  }
  handleAgree = () =>{
    let orderId  = this.state.localOrder;
    let userId = this.state.localUserId;
    if (orderId!=='') {
      this.props.dispatch(collectOrder(orderId,userId))
      this.setState({
        open:false,
        localUserId:'',
        localOrder:''
      })
    }
    else {
      console.log('未获取到orderId');

      this.setState({
        open:false,
        localUserId:'',
        localOrder:''
      })
    }
  }

  checkStatus = (status) => {
    switch (status) {
      case "confirmed":
        return "待付款"
      case "paid":
        return "待收货"
      case "recevied":
        return "已完成"
      case "cancel":
        return "已取消"
      default:
        break;
    }
  }
  render(){
    const {classes, products,productCounts,totalAmount,count,status,_id,userId,orderId,orderCode} = this.props
    return(
      <div className={classes.root}>
        <div className={classes.cardTitle}>
          <Grid container spacing={24}>
            <Grid item xs={9} sm={9} style={{display:'flex'}}>
              <img alt="店铺图标" style={{height:17}} src={require('../../components/imgs/shop.svg')}/>
              <div className={classes.shopName}>鲜至臻品自营店</div>
              <img alt="店铺图标" style={{height:17}} src={require('../../components/imgs/right.svg')}/>
            </Grid>
            <Grid item xs={3} sm={3} >
              <div className={classes.orderStatus} >{this.checkStatus(status)}</div>
            </Grid>
          </Grid>
        </div>
        { products!==undefined ? products.map((product,index)=> {
            return(
              <div className={classes.cardContent} key={index}>
              <Grid container spacing={24}>
                <Grid item xs={2} sm={2}>
                  <div className={classes.productImg}>
                    <img alt="店铺图标" style={{height:45,width:45}} src={product.cover}/>
                  </div>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <div className={classes.productName}>{product.name_zh}</div>
                </Grid>
                <Grid item xs={2} sm={2}>
                  <div className={classes.price}>￥{product.endPrice/100}</div>
                  <div className={classes.count}>x{productCounts[product._id]}</div>
                </Grid>
              </Grid>
            </div>
            )
        }) :
          <div className={classes.cardContent} >
          <Grid container spacing={24}>
            <Grid item xs={2} sm={2}>

            </Grid>
            <Grid item xs={8} sm={8}>
              <div className={classes.productName}>黑卡</div>
            </Grid>
            <Grid item xs={2} sm={2}>
              <div className={classes.price}>￥{this.props.price}</div>
              <div className={classes.count}>x{this.props.count}</div>
            </Grid>
          </Grid>
        </div>

      }



        <div className={classes.cardBottom}>
          {
          products!==undefined ?
           <div style={{marginTop:12}}>共计<span>{count}</span>件商品，合计：<span className={classes.finalPrice}>￥{totalAmount/100}</span>（含运费￥0.00）</div>
              :
            <div style={{marginTop:12}}>共计<span>{count}</span>件商品，合计：<span className={classes.finalPrice}>￥{this.props.price * this.props.count}</span>（含运费￥0.00）</div>
          }


          {status ==='confirmed'&&
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <div className={classes.orderButton}>
                <Button variant="outlined"  size="small" className={classes.button} onClick={()=>this.cancelOrder(orderId,userId)}>
                  取消订单
                </Button>
                <Button variant="outlined"  size="small" href={`#/my/orders/${orderId}/confirmed`}   className={classes.button}>
                  查看详情
                </Button>
                <Button variant="raised"  size="small" color="secondary" className={classes.button} onClick={()=>this.handlePayClick(_id,userId,totalAmount,orderCode)}>
                  付款
                </Button>
                </div>
              </Grid>
            </Grid>
        }
        {this.props.status ==='paid'&&
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <div className={classes.orderButton}>
                {/* <Button variant="outlined"  size="small" className={classes.button}>
                  申请退款
                </Button> */}
                <Button variant="outlined"  size="small"  className={classes.button} href={`#/my/orders/${orderId}/paid`} >
                  查看详情
                </Button>
                <Button variant="raised"  size="small" color="secondary" className={classes.button} onClick={()=> this.handleCollect(_id,userId)} >
                  确认收货
                </Button>
                </div>
              </Grid>
            </Grid>
        }
        </div>
        <Divider />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{width:200,textAlign:'center'}}>
              请确认是否收货
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.handleAgree} color="primary" autoFocus>
              确认
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

OrderCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderCard);
