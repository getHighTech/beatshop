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
import App from '../../config/app.json';
import styled from 'styled-components';


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
    loading: true,
    count:0
  }
  componentDidMount(){
    const userId = getStore('userId');
    const appName = App.name;
    axios.get(`${serverConfig.server_url}/api/withdraw`,{
      params: {
            userId,
            appName
        }
      }
    ).then((res)=>{
      console.log(res.data)
       this.setState({
         withdraw: res.data.balance_charges,
         count:res.data.balance_charges.length,
         page:1,
         loading:false
       })
      })
      .catch((err)=>{
        console.log(err)
        this.setState({
            loading: true,
            page: 1,
            withdraw: [],
            count:0
        })
      })
  }
  loadMore=()=>{
      if(this.state.loading){
          return 0;
      }
      this.setState({
          loading: true,
      })
      let withdraw = this.state.withdraw;
      let userId = getStore("userId");
      let appName = App.name;
      axios.get(
          `${serverConfig.server_url}/api/withdraw`,{
            params: {
              userId,
              page: this.state.page+1,
              pagesize: 10,
              appName
            }
          }
      ).then(rlt=>{
          console.log("请求收入数据", rlt.data);

          this.setState({
              loading: false,
              page: this.state.page+1,
              withdraw: withdraw.concat(rlt.data.balance_charges),
              count:rlt.data.balance_charges.length
          })

      }).catch(err=>{
          this.setState({
              loading: true,
              page: 1,
              incomes: [],
              count:0
          })
          console.log(err);

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
      const { withdraw, loading,count } = this.state;
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
                    {
                      withdraw.length> 0
                      ?
                      withdraw.map(n => {
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
                    })
                    :
                    <div style={{
                      width: 339,
                      height: 60,
                      top: -87,
                      position: "relative",
                      background: "white"
                    }}> 暂无数据 </div>
                    }

                  </TableBody>
        </Table>
        <div className={classes.loadMore}>
        {
          count===10
          ?
          <Button onClick={this.loadMore} disabled={loading}  color="primary" className={classes.button} >
              {loading? "正在加载": "加载更多"}
          </Button>
          :

          <Button style={{color:"#968d8a"}} >没有数据啦</Button>


        }



        </div>
           </div>
      )
    }
}

const Content = styled.div`
  display: flex;
  justify-content: center;
`

export default withStyles(styles)(Withdrawals);
