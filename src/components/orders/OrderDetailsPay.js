import React from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import QRCode from 'qrcode-react';
import styled from 'styled-components';


class OrderDetailsPay extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  }
    }
    checkStatus = (status) => {
      switch (status) {
        case "confirmed":
          return "待付款"
        case "paid":
          return "待收货"
        case "recevied":
          return "已完成"
        default:
          break;
      }
    }

    render(){
      const {order} = this.props.order;
      const {  match } = this.props;
      return(
        <ReCard>
          <CardTitle>
          <Grid container spacing={24}>
            <ReGrid item xs={9} sm={9} >
              <IconImg alt="店铺图标"   src={require('../../components/imgs/shop.svg')}/>
                <ShopName>鲜至臻品自营店</ShopName>
              <IconImg alt="店铺图标"  src={require('../../components/imgs/right.svg')}/>
            </ReGrid>
            <Grid item xs={3} sm={3} >
              <OrderStatus  >
                {this.checkStatus(match.params.status)}
              </OrderStatus>
            </Grid>
            </Grid>
          </CardTitle>
          <CardContent>
          {order.products!==undefined ? order.products.map((product,index)=> {
            return(
              <Grid container spacing={24} key={index}>
                <Grid item xs={2} sm={2}>
                  <ProductImg >
                    <ReImg alt="店铺图标"  src={product.cover}/>
                  </ProductImg>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <ProductName >{product.name_zh}</ProductName>
                </Grid>
                <Grid item xs={2} sm={2}>
                  <Price >￥{product.endPrice/100}</Price>
                  <Count >x{order.productCounts[product._id]}</Count>
                </Grid>
              </Grid>
            )
          })
          :
          <Grid container spacing={24} >
          <Grid item xs={2} sm={2}>
            <ProductImg >
              <ReImg alt="店铺图标"  src={'/imgs/webwxgetmsgimg.jpeg'}/>
            </ProductImg>
          </Grid>
          <Grid item xs={8} sm={8}>
            <ProductName >黑卡</ProductName>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Price >￥{order.price}</Price>
            <Count >x{order.price*order.count}</Count>
          </Grid>
        </Grid>
          }
          </CardContent>

          <CardBottom>
          {order.products!==undefined ?
            <Total >共计<span>{order.count}</span>件商品，合计：<FinalPrice >￥{order.totalAmount/100}</FinalPrice>（含运费￥0.00）</Total>
            :
            <Total >共计<span>{order.count}</span>件商品，合计：<FinalPrice >￥{order.price}</FinalPrice>（含运费￥0.00）</Total>
          }
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                  <OrderButton >
                  {
                    match.params.status === "paid"
                      ?
                    null
                      :
                    <div>
                      <ReButton variant="outlined"  size="small" >
                        取消订单
                      </ReButton>
                      <ReButton variant="raised"  size="small" color="secondary">
                        付款
                      </ReButton>
                    </div>
                  }

                  </OrderButton>
                </Grid>
              </Grid>
          </CardBottom>
        </ReCard>
      )
    }

}


const ReGrid =styled(Grid)`
    &&{
      display:flex;
    }
`
const IconImg =styled.img`
    &&{
      height:17px;
      margin-right:5px;
    }
`

const ReImg = styled.img`
    &&{
      width:45px;
      height:45px;
    }
`
const ReButton =styled(Button)`
    &&{
      margin-top:12px;
      margin-left:12px;
    }
`
const Total =styled.div`
    &&{
      margin-top:12px
    }
`

const ReCard =styled(Card)`
    &&{
      width:92%;
      margin-left:4%;
      margin-top:4px;
      border-radius:8px;
      padding:10px;
      font-size:13px;
    }
`
const CardTitle=styled.div`
    &&{
      display:flex;
      align-items:center;
      font-size:12px;
      margin-bottom:10px;
    }
`
const ShopName = styled.div`
    &&{
      font-size:12px
    }
`
const OrderStatus = styled.div`
    &&{
      font-size:12px;
      text-align:right;
      color:#ff5722;
    }
`
const CardBottom=styled.div`
    &&{
      text-align:right;
      font-size:9px;
    }
`
const CardContent=styled.div`

`
const ProductImg =styled.div`

`
const ProductName =styled.div`
    &&{
      font-size:13px;
    }
`
const Count =styled.div`

`
const Price = styled.div`
    &&{
      color:#ff5722
    }
`
const FinalPrice =styled.span`
    &&{
      font-size:15px;
      color:#ff5722
    }
`
const OrderButton =styled.div`
    &&{
      text-align:right;
      font-size:9px;
    }
`
function mapToState(state){
  return {
    order: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(OrderDetailsPay);
