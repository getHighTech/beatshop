import React from 'react'
import PropTypes from 'prop-types';
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import OrderCard from '../../components/orders/OrderCard'
import { getOrdersLimit } from '../../actions/app_orders'
import axios from 'axios';
import { getStore } from '../../tools/localStorage';

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  card:{
    width:'92%',
    marginLeft:'4%',
    marginTop:4,
    borderRadius:8
  },
  th:{
    padding:0,
    margin:0,
    textAlign:'center'
  },
  table:{
    padding:0
  },
  thName:{
    padding:0,
    margin:0,
    textAlign:'left',
    width:50
  },
  loadMore:{
    textAlign:'center',
    marginTop:20,
    marginBottom:20
  },
  tableHeader:{
    backgroundColor:'#2196f3',
  },
  time:{
    color:'white'
  },
  incomeNumber:{
    textAlign:'center'
  },
  cardItem:{
    marginLeft:10
  },
  itemBox:{
    display:'flex',
    marginBottom:5
  }

})

const hosturl = 'http://test2.10000cars.cn'

class MyOrders extends React.Component{
  state = {
    value: 0,
    page: 0,
    rowsPerPage: 5,
    count:100,
    incomeSource:[],
    incomeTotle:6,
    withdrawData:[],
    withdrawTotle:6,
    order_confirmed: [],
    order_paid: [],
    order_recevied: [],
    order_cancel: [],
  };

  handleChange = (event, value) => {
    const { dispatch
     } = this.props;
     let userId = getStore("userId");
     var status;
     switch (value) {
       case 0:
         status = "confirmed";
         axios.get(hosturl+'/api/order/status',{
            params: {
                  userId,
                  status
              }
            }
          ).then((res)=>{
            console.log(res)
                this.setState({
                  order_confirmed: res.data.order
                })
              })
              .catch((err)=>{
                console.log(err)
              })
         break;
       case 1:
        status = "paid";
        axios.get(hosturl+'/api/order/status',{
            params: {
                  userId,
                  status
              }
            }
          ).then((res)=>{
              this.setState({
                order_paid: res.data.order
              })
            })
            .catch((err)=>{
              console.log(err)
            })
        break;
       case 2:
        status = "recevied";
        axios.get(hosturl+'/api/order/status',{
            params: {
                  userId,
                  status
              }
            }
          ).then((res)=>{
              this.setState({
                order_recevied: res.data.order
              })
            })
            .catch((err)=>{
              console.log(err)
            })
       case 3:
        status = "cancel";
        axios.get(hosturl+'/api/order/status',{
            params: {
                  userId,
                  status
              }
            }
          ).then((res)=>{
              this.setState({
                order_cancel: res.data.order
              })
            })
            .catch((err)=>{
              console.log(err)
            })
       default:
         break;
     }
    this.setState({ value });
  };


  loadMoreWithdrawData(){
    let dataSource2 = [
      {id:1,withdraw:500,  arrival:500, time:'杨志强强', status:'提现成功'},
      {id:2,withdraw:500,  arrival:500, time:'杨志强强', status:'提现成功'},
      {id:3,withdraw:500,  arrival:500, time:'杨志强强', status:'提现成功'},
      {id:4,withdraw:500,  arrival:500, time:'杨志强强', status:'提现成功'},
      {id:5,withdraw:500,  arrival:500, time:'杨志强强', status:'提现成功'},
      {id:6,withdraw:500,  arrival:500, time:'杨志强强', status:'提现成功'}
    ]
    this.setState({withdrawData:dataSource2})
  }

  loadWithdrawFirstPageData(){
    let dataSource1 = [
      {id:1,withdraw:500,  arrival:500, time:'杨志强强', status:'提现成功'}
    ]
    this.setState({withdrawData:dataSource1})
  }
  componentDidMount(){
    const { dispatch, layout, orders } = this.props;

    if(layout.title!=='我的订单'){
        dispatch(setAppLayout(
            {
                isBack: true,
                backTo: "/my",
                title: "我的订单",
                hasCart: false,
                hasBottomNav: false,
                hasGeoLoc: false,
                hasEditor: false,
                hasSearch: false,
            }
        ));
    }
    let userId = getStore("userId");
    let status = "confirmed";
         axios.get(hosturl+'/api/order/status',{
            params: {
                  userId,
                  status
              }
            }
          ).then((res)=>{
            console.log(res)
                this.setState({
                  order_confirmed: res.data.order
                })
              })
              .catch((err)=>{
                console.log(err)
              })
    // this.loadWithdrawFirstPageData()
    // if(orders.orders_confirmed === "unloaded"){
    //   dispatch(getOrdersLimit("confirmed",1,4))
    // }

  }
  render (){
    const { classes, orders, user} = this.props;
    const { value,withdrawData, order_confirmed, order_paid, order_recevied,order_cancel} = this.state;
    return(
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="div" className={classes.title} color="textSecondary">
              <div className={classes.itemBox}>
                <div className={classes.cardIcon}>
                  <img alt="订单图标" style={{height:17}} src={require('../../components/imgs/list.svg')}/>
                </div>
                <div  className={classes.cardItem}>
                  我的订单
                </div>
              </div>
            </Typography>
            <Typography variant="headline" component="div">
              <div>
                <Tabs
                  value={this.state.value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleChange}
                  fullWidth
                >
                  <Tab label="待付款"  />
                  <Tab label="待收货"  />
                  <Tab label="已完成"  />
                  <Tab label="已取消"  />
                </Tabs>
              </div>
              {value === 0 &&
              <TabContainer >
                <div className={classes.root}>

                      {order_confirmed.map(n => {
                        return (
                            <OrderCard status="unpaid" key={n._id}  {...n} dispatch={this.props.dispatch} userId={user.userId}/>
                        );
                      })}

                  <div className={classes.loadMore}>
                  {this.state.incomeSource.length === this.state.incomeTotle?
                    <Button color="primary" className={classes.button} >
                    没有数据啦
                    </Button>:
                    <Button color="primary" className={classes.button} onClick={this.loadMoreWithdrawData.bind(this)}>
                    加载更多
                    </Button>
                  }
                  </div>
                </div>
              </TabContainer>}
              {value === 1 &&  <TabContainer>
                    {order_paid.map(n => {
                      return (
                        <OrderCard status="paid" key={n._id}  {...n} dispatch={this.props.dispatch}/>
                      );
                    })}

                <div className={classes.loadMore}>
                  {this.state.withdrawData.length === this.state.withdrawTotle?

                    <Button color="primary" className={classes.button} >
                    没有数据啦
                    </Button>:
                    <Button color="primary" className={classes.button} onClick={this.loadMoreWithdrawData.bind(this)}>
                    加载更多
                    </Button>
                  }
                  </div>
              </TabContainer>}
              {value === 2 &&  <TabContainer>
                      { order_recevied.map(n => {
                          return (
                              <OrderCard status="recevied" key={n._id}  {...n} dispatch={this.props.dispatch}/>
                          );
                        })
                      }

                <div className={classes.loadMore}>
                  {this.state.withdrawData.length === this.state.withdrawTotle?

                    <Button color="primary" className={classes.button} >
                    没有数据啦
                    </Button>:
                    <Button color="primary" className={classes.button} onClick={this.loadMoreWithdrawData.bind(this)}>
                    加载更多
                    </Button>
                  }
                  </div>
              </TabContainer>}
              {value === 3 && <TabContainer>
                      {order_cancel.map(n => {
                          return (
                              <OrderCard status="unpaid" key={n._id}  {...n} dispatch={this.props.dispatch}/>
                          );
                        })
                      }


                <div className={classes.loadMore}>
                  {this.state.withdrawData.length === this.state.withdrawTotle?

                    <Button color="primary" className={classes.button} >
                    没有数据啦
                    </Button>:
                    <Button color="primary" className={classes.button} onClick={this.loadMoreWithdrawData.bind(this)}>
                    加载更多
                    </Button>
                  }
                  </div>
              </TabContainer>}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}


function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout,
    orders: state.AppOrders
  }
}

export default connect(mapToState)(withStyles(styles)(MyOrders));
