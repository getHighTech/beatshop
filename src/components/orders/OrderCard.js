import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


import Card from '@material-ui/core/Card';
import { color } from '@material-ui/core/colors';
const styles = {
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
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
    fontWeight:900,
    color:'#ff5722'

  },
  cardBottom:{
    textAlign:'right',
    fontSize:9,
  },
  finalPrice:{
    fontWeight:900,
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
  
  render(){
    const {classes} = this.props
    return(
      <div className={classes.root}>
        <div className={classes.cardTitle}>
          <Grid container spacing={24}>
            <Grid item xs={9} sm={9} style={{display:'flex'}}>
              <img alt="店铺图标" style={{height:17}} src={require('../../components/imgs/shop.svg')}/>
              <div className={classes.shopName}>万人车汇自营店</div>
              <img alt="店铺图标" style={{height:17}} src={require('../../components/imgs/right.svg')}/>

            </Grid>
            <Grid item xs={3} sm={3} >
              <div className={classes.orderStatus} >待付款</div>
            </Grid>
          </Grid>
        </div>
        <div className={classes.cardContent}>
          <Grid container spacing={24}>
            <Grid item xs={2} sm={2}>
              <div className={classes.productImg}>
                <img alt="店铺图标" style={{height:45,width:45}} src={'/imgs/webwxgetmsgimg.jpeg'}/>
              </div>
            </Grid>
            <Grid item xs={8} sm={8}>
              <div className={classes.productName}>万人车汇黑卡会员商品名字BLBLA人车汇黑L</div>
            </Grid>
            <Grid item xs={2} sm={2}>
              <div className={classes.price}>￥450</div>
              <div className={classes.count}>x1</div>
            </Grid>
          </Grid>
        </div>
        <div className={classes.cardBottom}>
          <div style={{marginTop:12}}>共计<span>1</span>件商品，合计：<span className={classes.finalPrice}>￥2000</span>（含运费￥0.00）</div>

          {this.props.status ==='unpaid'&&
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <div className={classes.orderButton}>
                <Button variant="outlined"  size="small" className={classes.button}>
                  取消订单
                </Button>
                <Button variant="raised"  size="small" color="secondary" className={classes.button}>
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
                <Button variant="raised"  size="small" color="secondary" className={classes.button}>
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
