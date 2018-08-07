import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { cancelOrder } from '../../actions/app_orders'


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
  _CancelOrder = (orderId,userId)  => {
    console.log(orderId)
      this.props.dispatch(cancelOrder(orderId,userId))
  }

  _confirmOrder = (orderId,userId) => {

  }
  handlePayClick = (orderId,userId) => {
    var urlencode = require('urlencode');
             let data = {
               "client": "web",
               "data": {
                 out_trade_no: orderId,
                 user_id: userId,
                 super_agency_id: "abcdef",
                 version: 2
               }
          }

    let payUrl = "http://bills.10000cars.cn/order/s?pdata="+urlencode(JSON.stringify(data));
    window.location.assign(payUrl);
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
    console.log(this.props)
    const {classes, products,productCounts,totalAmount,count,status,_id,userId,orderId} = this.props
    console.log(orderId)
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
                <Button variant="outlined"  size="small" className={classes.button} onClick={()=>this._CancelOrder(orderId,userId)}>
                  取消订单
                </Button>
                <Button variant="outlined"  size="small" href={`#/my/orders/${orderId}/confirmed`}   className={classes.button}>
                  查看详情
                </Button>
                <Button variant="raised"  size="small" color="secondary" className={classes.button} onClick={()=>this.handlePayClick(_id,userId)}>
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
                <Button variant="raised"  size="small" color="secondary" className={classes.button} >
                  确认收货
                </Button>
                </div>
              </Grid>
            </Grid>
        }
        </div>
        <Divider />

      </div>
    )
  }
}

OrderCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderCard);
