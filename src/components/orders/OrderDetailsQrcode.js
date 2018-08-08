import React from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import QRCode from 'qrcode-react'
import styled from 'styled-components';

class OrderDetailsQrcode extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const { order } = this.props.order
    return(
      <ReCard>
        <CardTitle>
        <ImgIcon alt="二维码"     src={require('../../components/imgs/details.svg')} />
        <div>二维码</div>
        </CardTitle>
        <QrCode><QRCode value={`'/orders/order_details/${order._id}'`} logo='/imgs/webwxgetmsgimg.jpeg'/></QrCode>
      </ReCard>
    )
  }
}

const ImgIcon =styled.img`
    &&{
      height:17px;
      margin-right:5px
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
const QrCode = styled.div`
    &&{
      text-align:center;
      padding-bottom:12px;
    }
`
function mapToState(state){
  return {
    order: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}



export default connect(mapToState)(OrderDetailsQrcode);
