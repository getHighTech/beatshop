import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAppLayout } from '../../actions/app';
import { withStyles } from '@material-ui/core/styles';
import Bankcard from '../../components/bankcard/'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { loadMoneyPage, getIncomeWithTime, getIncomesLimit } from '../../actions/balances';
import { getStore } from '../../tools/localStorage';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
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
    marginTop:'4%',
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
class Money extends React.Component{
  constructor(props){
    super(props);
    const {dispatch} = this.props;
    this.state = {
      value: 0,
      page: 0,
      rowsPerPage: 5,
      count:100,
      incomeSource:[],
      incomeTotle:6,
      withdrawData:[],
      withdrawTotle:6
    };
  }
  
  loadMore(){
    const {dispatch} = this.props;
    
    dispatch(getIncomesLimit(1, 5));    
   
  }
  loadFirstPageData(){
    
    this.setState({incomeSource:this.props.money.balance_incomes})
  }

  loadMoreWithdrawData(){
    
    this.setState({withdrawData:this.props.money.balance_incomes})
  }

  loadWithdrawFirstPageData(){
    let dataSource1 = [
      {id:1,withdraw:500,  arrival:500, time:'杨志强强', status:'提现成功'}
    ]
    this.setState({withdrawData:dataSource1})
  }
  componentDidMount(){
    const { dispatch, layout, money } = this.props;

    if(layout.title!=='财务'){
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/", 
                title: "财务", 
                hasCart: false, 
                hasBottomNav: true, 
                hasGeoLoc: false,
                hasEditor: false, 
                hasSearch: false,
                hasWithdraw: true,
                editorType: "withdraw"
            }
        ));
    }
    this.loadFirstPageData()
    this.loadWithdrawFirstPageData()
   
   console.log(money.staticDone);
     
    if(!money.staticDone && money.balance_incomes === "unloaded"){
       dispatch(loadMoneyPage(getStore('userId')));
       dispatch(getIncomeWithTime(1, getStore("userId"),"days"))
       dispatch(getIncomeWithTime(1, getStore("userId"),"weeks"))
       dispatch(getIncomeWithTime(1, getStore("userId"),"months"))
    }

    this.setState({
      page: 1
    })
    
  }


  handleChange = (event, value) => {
    this.setState({ value });

  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render(){

    const { classes, user, money } = this.props;
    const { value, incomeSource,withdrawData} = this.state;
   
    
    let getUsername = function(income, index){
      if(income.shopCustomer){
        return income.shopCustomer.username;
      }
      if(income.user){
        return income.user.username;
      }
      if(income.userId){
        return money.users[index].username;
      }
    }
    let totalAmount = ((money.balance.amount!==undefined) ? parseInt(money.balance.amount, 10)/100: "载入中");
    return(
      <div>
        <Bankcard isBankcard={false} 
        cardData={{title:user.user.username,subtitle:'已在万人车汇获得佣金',carNumber:'￥'+totalAmount}}/>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="div" className={classes.title} color="textSecondary">
            <div className={classes.itemBox}>
                <div className={classes.cardIcon}>
                  <img alt="收益图标" style={{height:17}} src={require('../../components/imgs/money_bag.svg')}/>
                </div>
                <div  className={classes.cardItem}>
                  收益
                </div>
              </div> 
            </Typography>
            <Typography variant="headline" component="div">
              <Table className={classes.table}>
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell className={classes.time} >今日</TableCell>
                    <TableCell className={classes.time} >一周</TableCell>
                    <TableCell  className={classes.time} >30天</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className={classes.row}>
                    <TableCell className={classes.incomeNumber} numeric>{(money.todayTotalAmount/100).toString()}</TableCell>
                    <TableCell className={classes.incomeNumber} numeric>{(money.weekTotalAmount/100).toString()}</TableCell>
                    <TableCell className={classes.incomeNumber} numeric>{(money.monthTotalAmount/100).toString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Typography>

          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="div" className={classes.title} color="textSecondary">
              <div className={classes.itemBox}>
                <div className={classes.cardIcon}>
                  <img alt="明细图标" style={{height:17}} src={require('../../components/imgs/list.svg')}/>
                </div>
                <div  className={classes.cardItem}>
                  明细
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
                  <Tab label="收入来源" />
                  <Tab label="提现记录"  />
                </Tabs>
              </div>
              {value === 0 && this.props.money.balance_incomes !== "unloaded" &&
              <TabContainer >
                <div className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.thName} >商品名称</TableCell>
                        <TableCell  className={classes.th} numeric>购买者</TableCell>
                        <TableCell  className={classes.th} numeric>我的收入</TableCell>
                        <TableCell  className={classes.th} numeric>时间</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { this.props.money.balance_incomes.length===0 ?
                        <div style={{
                          width: 339,
                          zIndex: 400,
                          height: 60,
                          top: -87,
                          position: "relative",
                          background: "white"
                        }}> 暂无数据 </div> :
                        this.props.money.balance_incomes.map((n, index) => {
                        
                        return (
                          <TableRow key={index}>
                            <TableCell className={classes.thName} component="th" scope="row">
                              {!n.product? "老黑卡会员卡分享": n.product.name_zh}
                            </TableCell>
                            <TableCell className={classes.th} numeric>{getUsername(n, index)}</TableCell>
                            <TableCell className={classes.th} numeric>{"￥"+n.amount/100}</TableCell>
                            <TableCell className={classes.th} numeric>{moment(n.createdAt["$date"]).fromNow()}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>

                  </Table>
                  <div className={classes.loadMore}>
                 
                    
                    <Button disabled={this.props.money.loadingMore} color="primary" className={classes.button} onClick={this.loadMore.bind(this)}>
                    {this.props.money.loadingMore? "正在加载" : "加载更多"}
                    </Button>
                  
                  </div>
                </div>
              </TabContainer>}
              {value === 1 && <TabContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.thName} >提现金额</TableCell>
                      <TableCell  className={classes.th} numeric>到账金额</TableCell>
                      <TableCell  className={classes.th} numeric>时间</TableCell>
                      <TableCell  className={classes.th} numeric>状态</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {withdrawData.map(n => {
                      return (
                        <TableRow key={n.id}>
                          <TableCell className={classes.thName} component="th" scope="row">
                            {n.withdraw}
                          </TableCell>
                          <TableCell className={classes.th} numeric>{n.arrival}</TableCell>
                          <TableCell className={classes.th} numeric>{n.time}</TableCell>
                          <TableCell className={classes.th} numeric>{n.status}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
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
    user: state.AppUser,
    layout: state.AppInfo.layout,
    money: state.UserMoney
  }
}

export default connect(mapToState)(withStyles(styles)(Money));