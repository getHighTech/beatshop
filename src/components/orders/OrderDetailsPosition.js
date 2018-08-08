import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { loadOneOrder } from '../../actions/orders'
import styled from 'styled-components';
import { setAppLayout } from '../../actions/app';
class OrderDetailsPosition extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch, layout,match} = this.props;
    console.log(`去哪了`)
    console.log(this.props)
    console.log('id'+match.params.id)

    if(layout.title!=='订单详情'){
      if(match.params.id){
        dispatch(loadOneOrder(match.params.id));
      }
        dispatch(setAppLayout(
            {
                isBack: true,
                backTo: "/my/orders",
                title: "订单详情",
                hasCart: false,
                hasBottomNav: false,
                hasGeoLoc: false,
                hasEditor: false,
                hasSearch: false,
            }
        ));
    }

  }
  render(){
    const {order} = this.props.order;
    const {  match } = this.props;
    console.log(match);
    return(
      <Warp>
        <ReCard>
          <CardTitle>
            <img alt="收货地址"  style={{height:17,marginRight:5}} src={require('../../components/imgs/address.svg')} />
            <div>收货地址</div>
          </CardTitle>
          {     order.contact !== undefined ?
                    <div>
                      <div>姓名：{order.contact.name}</div>
                      <div>电话：{order.contact.mobile}</div>
                      <div>地址：{order.contact.address}</div>
                    </div>
                    :
                    null
          }
        </ReCard>

      </Warp>
    )

  }
}

const Warp = styled.div`
    &&{
      width:100%;
      margin-top:10px;
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


function mapToState(state){
  return {
    order: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(OrderDetailsPosition)
