import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import serverConfig   from '../../config/server.js';
import  axios  from 'axios';
import { getStore } from '../../tools/localStorage';
import moment from 'moment';
import Button from '@material-ui/core/Button';


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
  loadMore:{
    textAlign:'center',
    marginTop:20,
    marginBottom:20
  },
});

class Withdrawals extends React.Component{
  state = {
    page: 1,
    withdraw: [],
    loading: true
  }
  componentDidMount(){
    const userId = getStore('userId')
    axios.get(`${serverConfig.server_url}/api/withdraw`,{
      params: {
            userId
        }
      }
    ).then((res)=>{
      console.log(res.data)
       this.setState({
         withdraw: res.data.balance_charges
       })
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  checkStatus = (status) => {
    switch (status) {
      case "revoke":
        return "撤销"
      case "unpaid":
        return "未支付"
      case "paid":
        return "已付款"
      default:
        break;
    }
  }
    render(){
      const { classes} = this.props;
      const { withdraw, loading } = this.state;
      return (
        <div>
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
                    {withdraw.map(n => {
                      return (
                        <TableRow key={n.id}>
                          <TableCell className={classes.thName} component="th" scope="row">
                            {n.money/100}
                          </TableCell>
                          <TableCell className={classes.th} numeric>
                              { n.status ==="paid" ? n.money/100 : "未到账"}
                          </TableCell>
                          <TableCell className={classes.th} numeric>{moment(n.createdAt).fromNow()}</TableCell>
                          <TableCell className={classes.th} numeric>{this.checkStatus(n.status)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
        </Table>
          <div className={classes.loadMore}>

          <Button onClick={this.loadMore} disabled={loading}  color="primary" className={classes.button} >
          {loading? "正在加载": "加载更多"}
          </Button>
          
           </div>
           </div>
      )
    }
}

export default withStyles(styles)(Withdrawals);
