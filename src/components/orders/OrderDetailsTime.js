import React from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

class OrderDetailsTime extends React.Component{
    render(){
      const { order } = this.props.order
      return(
        <ReCard>
          <CardTitle>
            <ImgIcon alt="下单时间"   style={{height:17,marginRight:5}}  src={require('../../components/imgs/details.svg')} />
            <div>下单时间</div>
          </CardTitle>
          { order.products!==undefined ?
            <div>订单编号：{order.orderCode}</div>
            :
            <div>订单编号：{order.transactionId}</div>
          }
          {order.tracking_number!==undefined ? <div>快递单号：{order.tracking_number}</div> : <div>快递单号：该订单还未发货</div>}
          <div>创建时间：{order.createdAt!==undefined ? moment(order.createdAt["$date"]).format("YYYY-MM-DD HH:mm:ss"): null}</div>
        </ReCard>

      )
    }
}
const CardTitle=styled.div`
    &&{
      display:flex;
      align-items:center;
      font-size:12px;
      margin-bottom:10px;
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
const ImgIcon =styled.img`
    &&{
      height:17px;
      margin-right:5px
    }
`

function mapToState(state){
  return {
    order: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(OrderDetailsTime);
