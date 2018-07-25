import React from 'react';
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
import { withStyles } from '@material-ui/core/styles';
import { loadMoneyPage, getIncomeWithTime, getIncomesLimit } from '../../actions/balances';
import { getStore } from '../../tools/localStorage';
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



class Earn extends React.Component{
  componentDidMount(){
    // const { dispatch, layout, money } = this.props;
    // if(!money.staticDone && money.balance_incomes === "unloaded"){
    //     dispatch(loadMoneyPage(getStore('userId')));
    //     dispatch(getIncomeWithTime(1, getStore("userId"),"days"))
    //     dispatch(getIncomeWithTime(1, getStore("userId"),"weeks"))
    //     dispatch(getIncomeWithTime(1, getStore("userId"),"months"))
    //  }
  }
  
    render(){
     const { classes, user, money } = this.props;
     console.log(money)
      return (
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
                {/* <TableRow className={classes.row}>
                  <TableCell className={classes.incomeNumber} numeric>{(money.todayTotalAmount/100).toString()}</TableCell>
                  <TableCell className={classes.incomeNumber} numeric>{(money.weekTotalAmount/100).toString()}</TableCell>
                  <TableCell className={classes.incomeNumber} numeric>{(money.monthTotalAmount/100).toString()}</TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </Typography>

        </CardContent>
      </Card>
      )
    }
}

export default withStyles(styles)(Earn);
