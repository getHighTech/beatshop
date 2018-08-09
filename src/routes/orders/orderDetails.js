import React from 'react';
// import { connect } from 'react-redux';
import OrderDetailsPosition from '../../components/orders/OrderDetailsPosition.js';
import OrderDetailsPay from '../../components/orders/OrderDetailsPay.js';
import OrderDetailsQrcode from '../../components/orders/OrderDetailsQrcode.js';
import OrderDetailsTime from '../../components/orders/OrderDetailsTime.js'

class orderDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {  match } = this.props
    return (
      <div >
      <OrderDetailsPosition match={this.props.match}/>
      <OrderDetailsPay match={this.props.match}/>
      <OrderDetailsQrcode />
      <OrderDetailsTime />

      </div>
    )
  }
}




//
// function mapToState(state){
//   return {
//     order: state.OrderShow,
//     user: state.AppUser,
//     layout: state.AppInfo.layout
//   }
// }

export default orderDetails;
