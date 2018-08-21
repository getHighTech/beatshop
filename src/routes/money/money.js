import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAppLayout } from '../../actions/app';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { loadMoneyPage, getIncomeWithTime, getIncomesLimit } from '../../actions/balances';
import { getStore } from '../../tools/localStorage';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Withdrawals from '../../components/money/Withdrawals';
import TotalShow from './TotalShow';
import Statics from './Statics';
import Incomes from './Incomes';
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
    const { value, withdrawData} = this.state;
   
    
    let getUsername = function(income, index){
      console.log(income)
      console.log(index)
      if(income.shopCustomer){
        console.log(1)
        return income.shopCustomer.username;
      }
      if(income.user){
        console.log(2)
        return income.user.username;
      }
      if(income.userId){
        console.log(3)
        console.log(money.users[index].username)
        return money.users[index].username;
      }
    }
    return(
      <div>
       
        <TotalShow isBankcard={false} 
        cardData={{subtitle:'已在鲜至臻品获得佣金'}}/>
       
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
           <Statics />

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
              {value === 0 && <Incomes />
             }
              {value === 1 && <TabContainer>
                  <Withdrawals withdrawData={withdrawData}/>
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