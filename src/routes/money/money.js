import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadOneOrder } from '../../actions/orders';
import { setAppLayout } from '../../actions/app';
import { withStyles } from 'material-ui/styles';
import Bankcard from '../../components/bankcard/'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Pull from 'pull-pro'


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
  }

})
class Money extends React.Component{
  state = {
    value: 0,
    page: 0,
    rowsPerPage: 5,
    count:100,
    incomeSource:[],
    incomeTotle:6,
    withdrawData:[],
    withdrawTotle:6
  };
  loadMore(){
    let dataSource2 = [
      {id:1,productName:'黑卡黑卡黑黑卡黑卡黑',  price:3651.11, buyer:'杨志强强', income:128.81,time:'今天'},
      {id:2,productName:'黑卡黑卡黑黑卡黑卡黑',  price:3651.11, buyer:'杨志强强', income:128.81,time:'今天'},
      {id:3,productName:'黑卡黑卡黑黑卡黑卡黑',  price:3651.11, buyer:'杨志强强', income:128.81,time:'今天'},
      {id:4,productName:'黑卡黑卡黑黑卡黑卡黑',  price:3651.11, buyer:'杨志强强', income:128.81,time:'今天'},
      {id:5,productName:'黑卡黑卡黑黑卡黑卡黑',  price:3651.11, buyer:'杨志强强', income:128.81,time:'今天'},
      {id:6,productName:'黑卡黑卡黑黑卡黑卡黑',  price:3651.11, buyer:'杨志强强', income:128.81,time:'今天'},
    ]
    this.setState({incomeSource:dataSource2})
  }
  loadFirstPageData(){
    let dataSource1 = [
      {id:1,productName:'黑卡黑卡黑黑卡黑卡黑',  price:3651.11, buyer:'杨志强强', income:128.81,time:'今天'},
      {id:2,productName:'黑卡黑卡黑黑卡黑卡黑',  price:3651.11, buyer:'杨志强强', income:128.81,time:'今天'},
      {id:3,productName:'黑卡黑卡黑黑卡黑卡黑',  price:3651.11, buyer:'杨志强强', income:128.81,time:'今天'},
    ]
    this.setState({incomeSource:dataSource1})
  }

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
    const { dispatch, match, layout } = this.props;

    if(layout.title!=='财务'){
        dispatch(loadOneOrder(match.params.id));
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
            }
        ));
    }
    this.loadFirstPageData()
    this.loadWithdrawFirstPageData()

  }


  handleChange = (event, value) => {
    this.setState({ value });

  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };


  render(){

    const { classes, theme } = this.props;
    const { value,count,incomeSource,withdrawData} = this.state;

    return(
      <div>
        <Bankcard isBankcard={false} cardData={{title:"杨志强",subtitle:'已在万人车汇获得佣金',carNumber:'￥9562356',}}/>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
             收益
            </Typography>
            <Typography variant="headline" component="h2">
              <Table className={classes.table}>
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell>今日</TableCell>
                    <TableCell numeric>一周</TableCell>
                    <TableCell numeric>30天</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className={classes.row}>
                    <TableCell numeric>100</TableCell>
                    <TableCell numeric>100</TableCell>
                    <TableCell numeric>1000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Typography>

          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
             明细
            </Typography>
            <Typography variant="headline" component="h2">
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
              {value === 0 && 
              <TabContainer >
                <div className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.thName} >商品名称</TableCell>
                        <TableCell  className={classes.th} numeric>价钱</TableCell>
                        <TableCell  className={classes.th} numeric>购买者</TableCell>
                        <TableCell  className={classes.th} numeric>我的收入</TableCell>
                        <TableCell  className={classes.th} numeric>时间</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {incomeSource.map(n => {
                        return (
                          <TableRow key={n.id}>
                            <TableCell className={classes.thName} component="th" scope="row">
                              {n.productName}
                            </TableCell>
                            <TableCell className={classes.th} numeric>{n.price}</TableCell>
                            <TableCell className={classes.th} numeric>{n.buyer}</TableCell>
                            <TableCell className={classes.th} numeric>{n.income}</TableCell>
                            <TableCell className={classes.th} numeric>{n.time}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>

                  </Table>
                  <div className={classes.loadMore}>
                  {this.state.incomeSource.length == this.state.incomeTotle?
                    <Button color="primary" className={classes.button} >
                    没有数据啦
                    </Button>:
                    <Button color="primary" className={classes.button} onClick={this.loadMore.bind(this)}>
                    加载更多
                    </Button>
                  }
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
                  {this.state.withdrawData.length == this.state.withdrawTotle?

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
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(Money));